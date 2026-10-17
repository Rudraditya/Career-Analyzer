import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import mammoth from 'mammoth';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
});

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in environment variables');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Extract text from uploaded file (PDF, DOCX, TXT)
app.post('/api/extract-file', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { originalname, mimetype, buffer } = req.file;
    const ext = path.extname(originalname).toLowerCase();

    // Plain text or markdown
    if (ext === '.txt' || ext === '.md' || mimetype === 'text/plain') {
      const text = buffer.toString('utf-8');
      return res.json({ text, filename: originalname, type: 'text' });
    }

    // DOCX via mammoth
    if (ext === '.docx' || mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ buffer });
      return res.json({ text: result.value, filename: originalname, type: 'docx' });
    }

    // PDF or DOC: Send to Gemini for document text transcription
    if (ext === '.pdf' || mimetype === 'application/pdf' || ext === '.doc') {
      const ai = getGeminiClient();
      const base64Data = buffer.toString('base64');
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            inlineData: {
              mimeType: ext === '.pdf' ? 'application/pdf' : 'application/octet-stream',
              data: base64Data,
            },
          },
          {
            text: 'Extract and transcribe all the textual content of this document completely and accurately into clean, readable text. Preserve all headings, bullet points, company names, job titles, dates, metrics, and details verbatim without summarizing.',
          },
        ],
      });

      const extractedText = response.text || '';
      return res.json({ text: extractedText, filename: originalname, type: ext.replace('.', '') });
    }

    // Default fallback: utf-8 string
    const fallbackText = buffer.toString('utf-8');
    return res.json({ text: fallbackText, filename: originalname, type: 'raw' });
  } catch (error: any) {
    console.error('File extraction error:', error);
    res.status(500).json({ error: error.message || 'Failed to extract text from file' });
  }
});

// Comprehensive AI Analysis endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const { jdText, cvText } = req.body;
    if (!jdText || !cvText) {
      return res.status(400).json({ error: 'Both Job Description (JD) and Candidate CV are required.' });
    }

    const ai = getGeminiClient();

    const analysisPrompt = `
You are an expert executive talent acquisition director, elite career coach, and ATS algorithms specialist.
Perform a thorough, rigorous, and professional evaluation of the candidate's CV against the target Job Description (JD).

IMPORTANT STRICT RULES:
1. Base all candidate-specific findings solely on the submitted CV. Never invent qualifications, employers, degrees, experience, numbers, or achievements.
2. If specific metrics or context are missing in the CV, clearly specify placeholders like "[Insert exact % revenue growth or team size]" where the candidate must fill in their real numbers.
3. The Fit Score must NOT be presented as a probability or likelihood of getting hired. It is an objective capability and requirements alignment score out of 100.
4. Distinguish verified facts, transferable skills, and AI recommendations clearly.
5. Provide realistic, high-quality, practical advice with actual learning resources (e.g. Coursera, AWS Certs, Harvard Business Review, LeetCode, Wharton online, specific books/standards).
6. For Case Interview preparation, generate thorough, structured consulting cases (profitability, market entry, growth strategy, pricing, operations, market sizing, problem solving) tailored to business/consulting/strategy/tech roles.

Here is the Job Description (JD):
---
${jdText}
---

Here is the Candidate CV:
---
${cvText}
---

Return ONLY valid JSON matching this exact structure:
{
  "jdAnalysis": {
    "jobTitle": "string",
    "company": "string",
    "seniorityLevel": "string",
    "summary": "string",
    "responsibilities": ["string"],
    "qualifications": ["string"],
    "requiredSkills": ["string"],
    "experienceYearsRequired": "string",
    "toolsAndTech": ["string"],
    "industryKnowledge": ["string"]
  },
  "cvAnalysis": {
    "candidateName": "string",
    "currentTitle": "string",
    "summary": "string",
    "education": [
      { "degree": "string", "institution": "string", "year": "string" }
    ],
    "experience": [
      { "role": "string", "company": "string", "duration": "string", "highlights": ["string"] }
    ],
    "skills": {
      "technical": ["string"],
      "soft": ["string"],
      "tools": ["string"]
    },
    "projects": [
      { "title": "string", "description": "string", "technologies": ["string"] }
    ],
    "achievements": ["string"],
    "certifications": ["string"],
    "measurableResults": ["string"]
  },
  "fitScore": {
    "overall": 85,
    "breakdown": {
      "experience": { "score": 85, "explanation": "string" },
      "skills": { "score": 90, "explanation": "string" },
      "education": { "score": 80, "explanation": "string" },
      "industryKnowledge": { "score": 75, "explanation": "string" },
      "jobResponsibilities": { "score": 85, "explanation": "string" },
      "leadership": { "score": 80, "explanation": "string" },
      "technicalSkills": { "score": 90, "explanation": "string" },
      "softSkills": { "score": 85, "explanation": "string" }
    },
    "summaryExplanation": "string",
    "disclaimer": "This score represents an AI-estimated alignment between the documented qualifications and the stated job requirements. It does not reflect a probability of getting hired or an actual employment guarantee.",
    "comparisonTable": [
      {
        "requirement": "string",
        "category": "string (e.g. Technical, Leadership, Education, Domain)",
        "cvEvidence": "string (quoted or summarized directly from CV, or 'Not explicitly found in CV')",
        "matchStatus": "strong" | "partial" | "gap",
        "commentary": "string"
      }
    ]
  },
  "strengthsAndGaps": {
    "topStrengths": [
      {
        "title": "string",
        "cvEvidence": "string",
        "whyItMatters": "string"
      }
    ],
    "gaps": {
      "critical": [
        {
          "gap": "string",
          "importance": "string",
          "practicalRemedy": "string",
          "learningResources": [
            { "name": "string", "provider": "string", "type": "string" }
          ]
        }
      ],
      "moderate": [
        {
          "gap": "string",
          "importance": "string",
          "practicalRemedy": "string",
          "learningResources": [
            { "name": "string", "provider": "string", "type": "string" }
          ]
        }
      ],
      "minor": [
        {
          "gap": "string",
          "importance": "string",
          "practicalRemedy": "string",
          "learningResources": [
            { "name": "string", "provider": "string", "type": "string" }
          ]
        }
      ]
    }
  },
  "cvOptimizer": {
    "atsScore": 82,
    "atsScoreBreakdown": {
      "formatting": 90,
      "keywordDensity": 75,
      "quantifiableImpact": 80,
      "actionVerbs": 85
    },
    "missingKeywords": ["string"],
    "weakStatements": [
      {
        "original": "string",
        "diagnosis": "string",
        "improvement": "string"
      }
    ],
    "rewrittenBullets": [
      {
        "originalBullet": "string",
        "rewrittenBullet": "string",
        "framework": "XYZ Formula (Accomplished [X] as measured by [Y] by doing [Z])",
        "impactHighlight": "string",
        "additionalInfoNeeded": "string or null"
      }
    ],
    "tailoredCvMarkdown": "string (full, beautifully formatted markdown tailored CV for the role, keeping honest candidate data and marking candidate placeholders like [Insert % or exact metric] where necessary)"
  },
  "interviewQuestions": [
    {
      "id": "q1",
      "category": "HR & Behavioral" | "CV-Based" | "JD-Based" | "Company-Specific" | "Technical" | "Difficult Follow-up",
      "priority": "High" | "Medium" | "Low",
      "question": "string",
      "whatInterviewerEvaluates": "string",
      "suggestedFramework": "string",
      "sampleAnswer": "string",
      "feedbackGuidance": "string"
    }
  ],
  "caseInterviewPreparation": [
    {
      "title": "string",
      "caseType": "Profitability" | "Market Entry" | "Growth Strategy" | "Pricing" | "Operations" | "Market Sizing" | "Business Problem-Solving",
      "promptScenario": "string",
      "clarifyingQuestions": ["string"],
      "recommendedFramework": "string",
      "stepByStepAnalysis": ["string"],
      "sampleCandidateResponse": "string",
      "evaluationRubric": "string"
    }
  ],
  "companyResearch": {
    "companyName": "string",
    "overview": "string",
    "businessModel": "string",
    "majorProductsAndServices": ["string"],
    "targetMarkets": ["string"],
    "competitors": ["string"],
    "businessStrategyAndGrowth": "string",
    "recentDevelopments": [
      {
        "headline": "string",
        "date": "string",
        "details": "string",
        "source": "string"
      }
    ],
    "verifiedFactsVsAnalysis": {
      "verifiedFacts": ["string"],
      "aiStrategicAnalysis": ["string"]
    }
  },
  "industryResearch": {
    "industry": "string",
    "keyTrends": ["string"],
    "majorChallenges": ["string"],
    "regulatoryAndCompliance": ["string"],
    "technologicalChanges": ["string"],
    "relevantArticlesAndReports": [
      {
        "title": "string",
        "source": "string",
        "date": "string",
        "keyTakeaway": "string"
      }
    ]
  },
  "careerCoaching": {
    "coreAnswers": {
      "tellMeAboutYourself": {
        "framework": "Present, Past, Future pitch connecting past accomplishments to target role",
        "tailoredAnswer": "string",
        "tips": "string"
      },
      "whyThisCompany": {
        "tailoredAnswer": "string",
        "keyConnectionPoints": ["string"]
      },
      "whyThisRole": {
        "tailoredAnswer": "string",
        "keyConnectionPoints": ["string"]
      },
      "whyShouldWeHireYou": {
        "tailoredAnswer": "string",
        "unfairAdvantages": ["string"]
      }
    },
    "storyBank": [
      {
        "category": "Leadership" | "Teamwork" | "Conflict" | "Failure & Resilience" | "Problem-Solving" | "Initiative" | "High Impact Achievement",
        "situation": "string",
        "task": "string",
        "action": "string",
        "result": "string",
        "lessonsLearned": "string",
        "bestUsedForQuestions": ["string"]
      }
    ],
    "redFlags": [
      {
        "potentialConcern": "string",
        "severity": "High" | "Medium" | "Low",
        "honestContext": "string",
        "suggestedReframing": "string"
      }
    ]
  },
  "preparationPlan": {
    "sevenDayPlan": [
      {
        "day": 1,
        "theme": "Role & Company Immersion",
        "tasks": ["string"],
        "practiceQuestions": ["string"],
        "learningResources": ["string"],
        "revisionPriorities": ["string"]
      },
      {
        "day": 2,
        "theme": "Story Bank & Behavioral Mastery",
        "tasks": ["string"],
        "practiceQuestions": ["string"],
        "learningResources": ["string"],
        "revisionPriorities": ["string"]
      },
      {
        "day": 3,
        "theme": "Technical & Core Competencies Drill",
        "tasks": ["string"],
        "practiceQuestions": ["string"],
        "learningResources": ["string"],
        "revisionPriorities": ["string"]
      },
      {
        "day": 4,
        "theme": "Case Interview & Structured Problem Solving",
        "tasks": ["string"],
        "practiceQuestions": ["string"],
        "learningResources": ["string"],
        "revisionPriorities": ["string"]
      },
      {
        "day": 5,
        "theme": "Difficult Scenarios, Red Flags & Counter-Questions",
        "tasks": ["string"],
        "practiceQuestions": ["string"],
        "learningResources": ["string"],
        "revisionPriorities": ["string"]
      },
      {
        "day": 6,
        "theme": "Simulated Mock Interview & Time Trials",
        "tasks": ["string"],
        "practiceQuestions": ["string"],
        "learningResources": ["string"],
        "revisionPriorities": ["string"]
      },
      {
        "day": 7,
        "theme": "Executive Presence, Calm Mindset & Final Review",
        "tasks": ["string"],
        "practiceQuestions": ["string"],
        "learningResources": ["string"],
        "revisionPriorities": ["string"]
      }
    ],
    "topThreeActions": [
      {
        "rank": 1,
        "action": "string",
        "expectedImpact": "string",
        "howToExecute": "string"
      },
      {
        "rank": 2,
        "action": "string",
        "expectedImpact": "string",
        "howToExecute": "string"
      },
      {
        "rank": 3,
        "action": "string",
        "expectedImpact": "string",
        "howToExecute": "string"
      }
    ]
  },
  "interviewReadiness": {
    "overallJobFitScore": 85,
    "atsReadinessScore": 82,
    "interviewReadinessScore": 88,
    "strongestQualifications": ["string"],
    "mostImportantSkillGaps": ["string"],
    "biggestInterviewRisks": ["string"],
    "competitiveAdvantages": ["string"],
    "topThreePreparationPriorities": ["string"]
  }
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: analysisPrompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const responseText = response.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
    } catch (parseErr) {
      // Clean possible backticks or whitespace
      const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedData = JSON.parse(cleanJson);
    }

    return res.json(parsedData);
  } catch (error: any) {
    console.error('Analysis error:', error);
    res.status(500).json({
      error: error.message || 'Failed to complete CareerMatch AI analysis',
    });
  }
});

// Live Google Search Grounded Company & Industry Deep Research
app.post('/api/research-company', async (req, res) => {
  try {
    const { companyName, industry } = req.body;
    if (!companyName) {
      return res.status(400).json({ error: 'Company name is required' });
    }

    const ai = getGeminiClient();

    const prompt = `
Perform current, verified research on "${companyName}" in the "${industry || 'relevant'}" industry using Google Search.
Include:
1. Executive company overview, primary business model, revenue streams.
2. Flagship products, core services, target customer segments and key markets.
3. Top direct and indirect competitors with brief positioning comparison.
4. Current strategic growth priorities, major strategic initiatives, and expansion plans.
5. Real recent announcements, funding rounds, M&A deals, executive changes, product launches (with actual dates and verifiable sources).
6. Industry trends, macroeconomic/regulatory challenges, and technological disruptions.
7. Relevant recent articles, press releases, and industry analyst reports with titles, publishers, dates, and links where found.

Explicitly distinguish verified factual statements from analytical projections. Never fabricate news or sources.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || '';
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata || null;

    res.json({
      content: text,
      groundingMetadata,
    });
  } catch (error: any) {
    console.error('Company research error:', error);
    res.status(500).json({ error: error.message || 'Failed to perform company research' });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`CareerMatch AI server running on http://localhost:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
