export interface JdAnalysis {
  jobTitle: string;
  company: string;
  seniorityLevel: string;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
  requiredSkills: string[];
  experienceYearsRequired: string;
  toolsAndTech: string[];
  industryKnowledge: string[];
}

export interface CvEducation {
  degree: string;
  institution: string;
  year: string;
}

export interface CvExperience {
  role: string;
  company: string;
  duration: string;
  highlights: string[];
}

export interface CvProject {
  title: string;
  description: string;
  technologies: string[];
}

export interface CvAnalysis {
  candidateName: string;
  currentTitle: string;
  summary: string;
  education: CvEducation[];
  experience: CvExperience[];
  skills: {
    technical: string[];
    soft: string[];
    tools: string[];
  };
  projects: CvProject[];
  achievements: string[];
  certifications: string[];
  measurableResults: string[];
}

export interface ComparisonItem {
  requirement: string;
  category: string;
  cvEvidence: string;
  matchStatus: 'strong' | 'partial' | 'gap';
  commentary: string;
}

export interface FitScoreDimension {
  score: number;
  explanation: string;
}

export interface FitScore {
  overall: number;
  breakdown: {
    experience: FitScoreDimension;
    skills: FitScoreDimension;
    education: FitScoreDimension;
    industryKnowledge: FitScoreDimension;
    jobResponsibilities: FitScoreDimension;
    leadership: FitScoreDimension;
    technicalSkills: FitScoreDimension;
    softSkills: FitScoreDimension;
  };
  summaryExplanation: string;
  disclaimer: string;
  comparisonTable: ComparisonItem[];
}

export interface LearningResource {
  name: string;
  provider: string;
  type: string;
}

export interface GapItem {
  gap: string;
  importance: string;
  practicalRemedy: string;
  learningResources: LearningResource[];
}

export interface StrengthItem {
  title: string;
  cvEvidence: string;
  whyItMatters: string;
}

export interface StrengthsAndGaps {
  topStrengths: StrengthItem[];
  gaps: {
    critical: GapItem[];
    moderate: GapItem[];
    minor: GapItem[];
  };
}

export interface WeakStatement {
  original: string;
  diagnosis: string;
  improvement: string;
}

export interface RewrittenBullet {
  originalBullet: string;
  rewrittenBullet: string;
  framework: string;
  impactHighlight: string;
  additionalInfoNeeded: string | null;
}

export interface CvOptimizer {
  atsScore: number;
  atsScoreBreakdown: {
    formatting: number;
    keywordDensity: number;
    quantifiableImpact: number;
    actionVerbs: number;
  };
  missingKeywords: string[];
  weakStatements: WeakStatement[];
  rewrittenBullets: RewrittenBullet[];
  tailoredCvMarkdown: string;
}

export interface InterviewQuestion {
  id: string;
  category: 'HR & Behavioral' | 'CV-Based' | 'JD-Based' | 'Company-Specific' | 'Technical' | 'Difficult Follow-up';
  priority: 'High' | 'Medium' | 'Low';
  question: string;
  whatInterviewerEvaluates: string;
  suggestedFramework: string;
  sampleAnswer: string;
  feedbackGuidance: string;
}

export interface CaseInterview {
  title: string;
  caseType: 'Profitability' | 'Market Entry' | 'Growth Strategy' | 'Pricing' | 'Operations' | 'Market Sizing' | 'Business Problem-Solving';
  promptScenario: string;
  clarifyingQuestions: string[];
  recommendedFramework: string;
  stepByStepAnalysis: string[];
  sampleCandidateResponse: string;
  evaluationRubric: string;
}

export interface RecentDevelopment {
  headline: string;
  date: string;
  details: string;
  source: string;
}

export interface CompanyResearch {
  companyName: string;
  overview: string;
  businessModel: string;
  majorProductsAndServices: string[];
  targetMarkets: string[];
  competitors: string[];
  businessStrategyAndGrowth: string;
  recentDevelopments: RecentDevelopment[];
  verifiedFactsVsAnalysis: {
    verifiedFacts: string[];
    aiStrategicAnalysis: string[];
  };
}

export interface ArticleReport {
  title: string;
  source: string;
  date: string;
  keyTakeaway: string;
}

export interface IndustryResearch {
  industry: string;
  keyTrends: string[];
  majorChallenges: string[];
  regulatoryAndCompliance: string[];
  technologicalChanges: string[];
  relevantArticlesAndReports: ArticleReport[];
}

export interface CoreAnswer {
  framework?: string;
  tailoredAnswer: string;
  tips?: string;
  keyConnectionPoints?: string[];
  unfairAdvantages?: string[];
}

export interface StoryBankItem {
  category: 'Leadership' | 'Teamwork' | 'Conflict' | 'Failure & Resilience' | 'Problem-Solving' | 'Initiative' | 'High Impact Achievement';
  situation: string;
  task: string;
  action: string;
  result: string;
  lessonsLearned: string;
  bestUsedForQuestions: string[];
}

export interface RedFlagItem {
  potentialConcern: string;
  severity: 'High' | 'Medium' | 'Low';
  honestContext: string;
  suggestedReframing: string;
}

export interface CareerCoaching {
  coreAnswers: {
    tellMeAboutYourself: CoreAnswer;
    whyThisCompany: CoreAnswer;
    whyThisRole: CoreAnswer;
    whyShouldWeHireYou: CoreAnswer;
  };
  storyBank: StoryBankItem[];
  redFlags: RedFlagItem[];
}

export interface DayPlan {
  day: number;
  theme: string;
  tasks: string[];
  practiceQuestions: string[];
  learningResources: string[];
  revisionPriorities: string[];
}

export interface TopAction {
  rank: number;
  action: string;
  expectedImpact: string;
  howToExecute: string;
}

export interface PreparationPlan {
  sevenDayPlan: DayPlan[];
  topThreeActions: TopAction[];
}

export interface InterviewReadiness {
  overallJobFitScore: number;
  atsReadinessScore: number;
  interviewReadinessScore: number;
  strongestQualifications: string[];
  mostImportantSkillGaps: string[];
  biggestInterviewRisks: string[];
  competitiveAdvantages: string[];
  topThreePreparationPriorities: string[];
}

export interface FullAnalysisReport {
  jdAnalysis: JdAnalysis;
  cvAnalysis: CvAnalysis;
  fitScore: FitScore;
  strengthsAndGaps: StrengthsAndGaps;
  cvOptimizer: CvOptimizer;
  interviewQuestions: InterviewQuestion[];
  caseInterviewPreparation: CaseInterview[];
  companyResearch: CompanyResearch;
  industryResearch: IndustryResearch;
  careerCoaching: CareerCoaching;
  preparationPlan: PreparationPlan;
  interviewReadiness: InterviewReadiness;
}

export type ActiveSectionId =
  | 'overview'
  | 'jd-analysis'
  | 'cv-analysis'
  | 'fit-score'
  | 'strengths-gaps'
  | 'cv-optimizer'
  | 'interview-questions'
  | 'case-prep'
  | 'company-research'
  | 'industry-research'
  | 'story-bank'
  | 'prep-plan'
  | 'interview-readiness';
