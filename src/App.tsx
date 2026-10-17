import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { InputSection } from './components/InputSection';
import { SidebarNav } from './components/SidebarNav';
import { OverviewView } from './components/views/OverviewView';
import { JdAnalysisView } from './components/views/JdAnalysisView';
import { CvAnalysisView } from './components/views/CvAnalysisView';
import { FitScoreView } from './components/views/FitScoreView';
import { StrengthsGapsView } from './components/views/StrengthsGapsView';
import { CvOptimizerView } from './components/views/CvOptimizerView';
import { InterviewQuestionsView } from './components/views/InterviewQuestionsView';
import { CasePrepView } from './components/views/CasePrepView';
import { CompanyResearchView } from './components/views/CompanyResearchView';
import { IndustryResearchView } from './components/views/IndustryResearchView';
import { StoryBankView } from './components/views/StoryBankView';
import { PrepPlanView } from './components/views/PrepPlanView';
import { InterviewReadinessView } from './components/views/InterviewReadinessView';
import { FullAnalysisReport, ActiveSectionId } from './types/career';
import { SAMPLE_PRESETS, Preset } from './data/samplePresets';
import { AlertCircle, Edit3, ArrowLeft } from 'lucide-react';

export default function App() {
  const [jdText, setJdText] = useState(SAMPLE_PRESETS[0].jdText);
  const [cvText, setCvText] = useState(SAMPLE_PRESETS[0].cvText);
  const [activePresetId, setActivePresetId] = useState<string | undefined>(SAMPLE_PRESETS[0].id);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStepText, setLoadingStepText] = useState('Initiating AI CareerMatch Analysis...');
  const [error, setError] = useState<string | null>(null);

  const [report, setReport] = useState<FullAnalysisReport | null>(null);
  const [activeSection, setActiveSection] = useState<ActiveSectionId>('overview');
  const [isEditingInputs, setIsEditingInputs] = useState(false);

  // Reassuring loading steps
  useEffect(() => {
    if (!isLoading) return;

    const steps = [
      'Extracting JD requirements and technical qualifications...',
      'Parsing Candidate CV metrics, skills, and work history...',
      'Computing 8-dimension Job Fit Alignment Score...',
      'Benchmarking ATS keywords and quantifiable bullet impact...',
      'Drafting tailored STAR Story Bank and Case Interview problems...',
      'Compiling 7-Day Sprint Plan & Interview Readiness Dashboard...',
    ];

    let stepIndex = 0;
    setLoadingStepText(steps[0]);

    const interval = setInterval(() => {
      stepIndex = (stepIndex + 1) % steps.length;
      setLoadingStepText(steps[stepIndex]);
    }, 2800);

    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSelectPreset = (preset: Preset) => {
    setJdText(preset.jdText);
    setCvText(preset.cvText);
    setActivePresetId(preset.id);
    setError(null);
  };

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jdText, cvText }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to analyze Job Description and CV.');
      }

      const data: FullAnalysisReport = await res.json();
      setReport(data);
      setActiveSection('overview');
      setIsEditingInputs(false);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || 'An unexpected error occurred during analysis.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setReport(null);
    setIsEditingInputs(false);
    setActiveSection('overview');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        hasReport={!!report}
        onReset={handleReset}
        onSelectPreset={handleSelectPreset}
        onPrint={handlePrint}
        activePresetId={activePresetId}
      />

      {/* Main Container */}
      <main className="flex-1 pb-16">
        {error && (
          <div className="max-w-4xl mx-auto mt-4 px-4">
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 flex items-center justify-between gap-3 text-rose-300 text-sm">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-xs text-rose-400 hover:text-white"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* View 1: Input Screen (when no report or user is editing inputs) */}
        {(!report || isEditingInputs) && (
          <div>
            {isEditingInputs && report && (
              <div className="max-w-6xl mx-auto px-4 pt-6">
                <button
                  onClick={() => setIsEditingInputs(false)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Generated Report</span>
                </button>
              </div>
            )}
            <InputSection
              jdText={jdText}
              setJdText={setJdText}
              cvText={cvText}
              setCvText={setCvText}
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
              onSelectPreset={handleSelectPreset}
              activePresetId={activePresetId}
              loadingStepText={loadingStepText}
            />
          </div>
        )}

        {/* View 2: Report Dashboard Workspace */}
        {report && !isEditingInputs && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
            {/* Top Toolbar in Report Mode */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800/80 no-print">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Active Target:</span>
                <span className="font-semibold text-white">{report.jdAnalysis.jobTitle}</span>
                <span>at</span>
                <span className="font-semibold text-indigo-400">{report.jdAnalysis.company}</span>
              </div>

              <button
                onClick={() => setIsEditingInputs(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all"
              >
                <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Edit JD or CV</span>
              </button>
            </div>

            {/* Sidebar + Main Content Layout */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Navigation */}
              <SidebarNav
                activeSection={activeSection}
                onSelectSection={(sec) => {
                  setActiveSection(sec);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                overallScore={report.fitScore.overall}
              />

              {/* Active Section Content */}
              <div className="flex-1 min-w-0">
                {activeSection === 'overview' && (
                  <OverviewView report={report} onNavigate={setActiveSection} />
                )}
                {activeSection === 'jd-analysis' && (
                  <JdAnalysisView jdAnalysis={report.jdAnalysis} />
                )}
                {activeSection === 'cv-analysis' && (
                  <CvAnalysisView cvAnalysis={report.cvAnalysis} />
                )}
                {activeSection === 'fit-score' && <FitScoreView fitScore={report.fitScore} />}
                {activeSection === 'strengths-gaps' && (
                  <StrengthsGapsView strengthsAndGaps={report.strengthsAndGaps} />
                )}
                {activeSection === 'cv-optimizer' && (
                  <CvOptimizerView
                    cvOptimizer={report.cvOptimizer}
                    candidateName={report.cvAnalysis.candidateName}
                    targetRole={report.jdAnalysis.jobTitle}
                  />
                )}
                {activeSection === 'interview-questions' && (
                  <InterviewQuestionsView questions={report.interviewQuestions} />
                )}
                {activeSection === 'case-prep' && (
                  <CasePrepView cases={report.caseInterviewPreparation} />
                )}
                {activeSection === 'company-research' && (
                  <CompanyResearchView
                    companyResearch={report.companyResearch}
                    industry={report.industryResearch?.industry}
                  />
                )}
                {activeSection === 'industry-research' && (
                  <IndustryResearchView industryResearch={report.industryResearch} />
                )}
                {activeSection === 'story-bank' && (
                  <StoryBankView careerCoaching={report.careerCoaching} />
                )}
                {activeSection === 'prep-plan' && (
                  <PrepPlanView preparationPlan={report.preparationPlan} />
                )}
                {activeSection === 'interview-readiness' && (
                  <InterviewReadinessView
                    interviewReadiness={report.interviewReadiness}
                    fullReport={report}
                    onPrint={handlePrint}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
