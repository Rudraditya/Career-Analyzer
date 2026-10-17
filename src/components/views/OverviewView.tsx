import React from 'react';
import {
  FullAnalysisReport,
  ActiveSectionId,
} from '../../types/career';
import { getScoreColor } from '../../utils/helpers';
import {
  Target,
  Sparkles,
  ShieldCheck,
  Award,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Briefcase,
  Building2,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

interface OverviewViewProps {
  report: FullAnalysisReport;
  onNavigate: (section: ActiveSectionId) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ report, onNavigate }) => {
  const { jdAnalysis, cvAnalysis, fitScore, cvOptimizer, interviewReadiness, strengthsAndGaps } =
    report;

  const fitColor = getScoreColor(fitScore.overall);
  const atsColor = getScoreColor(cvOptimizer.atsScore);
  const prepColor = getScoreColor(interviewReadiness.interviewReadinessScore);

  return (
    <div className="space-y-6">
      {/* Target Role & Candidate Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Target Role
              </span>
              <span className="text-xs text-slate-400">{jdAnalysis.seniorityLevel}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {jdAnalysis.jobTitle}
            </h1>
            <div className="flex items-center gap-2 text-sm text-slate-300 font-medium">
              <Building2 className="w-4 h-4 text-cyan-400" />
              <span>{jdAnalysis.company}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">Candidate:</span>
              <span className="text-white font-semibold">{cvAnalysis.candidateName}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onNavigate('fit-score')}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Explore Fit Breakdown</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('prep-plan')}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>7-Day Prep Plan</span>
            </button>
          </div>
        </div>

        {/* Non-probability hiring disclaimer badge */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-start sm:items-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5 sm:mt-0" />
          <span>
            <strong className="text-slate-300 font-medium">Important Notice:</strong> Scores reflect
            algorithmic qualification and requirement alignment. They are not a probability or
            guarantee of employment.
          </span>
        </div>
      </div>

      {/* 3 Executive Metric Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Job Fit Score */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <Target className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Overall Job Fit
              </span>
            </div>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${fitColor.bg} ${fitColor.text} border ${fitColor.border}`}
            >
              8 Dimensions
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-3">
            <span className={`text-4xl font-black ${fitColor.text}`}>{fitScore.overall}</span>
            <span className="text-slate-400 text-sm font-semibold">/ 100</span>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
            <div
              className={`h-full bg-gradient-to-r ${fitColor.gradient} transition-all duration-1000`}
              style={{ width: `${fitScore.overall}%` }}
            />
          </div>

          <p className="text-xs text-slate-400 line-clamp-2">{fitScore.summaryExplanation}</p>

          <button
            onClick={() => onNavigate('fit-score')}
            className="mt-3 text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <span>View 8-dimension breakdown</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* ATS Readiness Score */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                ATS Readiness
              </span>
            </div>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${atsColor.bg} ${atsColor.text} border ${atsColor.border}`}
            >
              Optimization
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-3">
            <span className={`text-4xl font-black ${atsColor.text}`}>{cvOptimizer.atsScore}</span>
            <span className="text-slate-400 text-sm font-semibold">/ 100</span>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
            <div
              className={`h-full bg-gradient-to-r ${atsColor.gradient} transition-all duration-1000`}
              style={{ width: `${cvOptimizer.atsScore}%` }}
            />
          </div>

          <p className="text-xs text-slate-400">
            {cvOptimizer.missingKeywords.length} missing keywords identified • Rewritten impact
            bullets ready
          </p>

          <button
            onClick={() => onNavigate('cv-optimizer')}
            className="mt-3 text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>Optimize CV & view tailored resume</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Interview Readiness Score */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Interview Readiness
              </span>
            </div>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${prepColor.bg} ${prepColor.text} border ${prepColor.border}`}
            >
              Prep Status
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-3">
            <span className={`text-4xl font-black ${prepColor.text}`}>
              {interviewReadiness.interviewReadinessScore}
            </span>
            <span className="text-slate-400 text-sm font-semibold">/ 100</span>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
            <div
              className={`h-full bg-gradient-to-r ${prepColor.gradient} transition-all duration-1000`}
              style={{ width: `${interviewReadiness.interviewReadinessScore}%` }}
            />
          </div>

          <p className="text-xs text-slate-400">
            {report.interviewQuestions.length} tailored interview questions & {report.caseInterviewPreparation.length} consulting cases generated
          </p>

          <button
            onClick={() => onNavigate('interview-readiness')}
            className="mt-3 text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <span>Open Readiness Dashboard</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 4 Pillars Grid: Strongest Qualifications, Gaps, Risks, Advantages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Strongest Qualifications */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-sm text-white">Strongest Qualifications</h3>
            </div>
            <button
              onClick={() => onNavigate('strengths-gaps')}
              className="text-xs text-indigo-400 hover:underline"
            >
              View all
            </button>
          </div>
          <ul className="space-y-2">
            {interviewReadiness.strongestQualifications.slice(0, 3).map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Most Important Skill Gaps */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-sm text-white">Most Important Skill Gaps</h3>
            </div>
            <button
              onClick={() => onNavigate('strengths-gaps')}
              className="text-xs text-indigo-400 hover:underline"
            >
              Remedies
            </button>
          </div>
          <ul className="space-y-2">
            {interviewReadiness.mostImportantSkillGaps.slice(0, 3).map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Potential Interview Risks */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-rose-400" />
              <h3 className="font-bold text-sm text-white">Biggest Potential Interview Risks</h3>
            </div>
            <button
              onClick={() => onNavigate('story-bank')}
              className="text-xs text-indigo-400 hover:underline"
            >
              Talking points
            </button>
          </div>
          <ul className="space-y-2">
            {interviewReadiness.biggestInterviewRisks.slice(0, 3).map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Competitive Advantages */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <h3 className="font-bold text-sm text-white">Candidate Competitive Advantages</h3>
            </div>
            <button
              onClick={() => onNavigate('story-bank')}
              className="text-xs text-indigo-400 hover:underline"
            >
              Story bank
            </button>
          </div>
          <ul className="space-y-2">
            {interviewReadiness.competitiveAdvantages.slice(0, 3).map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Top 3 Preparation Priorities */}
      <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/20 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-bold text-white">Top 3 Immediate Preparation Priorities</h2>
          </div>
          <button
            onClick={() => onNavigate('prep-plan')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <span>View Full 7-Day Plan</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {report.preparationPlan.topThreeActions.map((action) => (
            <div
              key={action.rank}
              className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 space-y-2 hover:border-slate-700 transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs font-bold flex items-center justify-center">
                  {action.rank}
                </span>
                <span className="text-xs font-bold text-white truncate">{action.action}</span>
              </div>
              <p className="text-xs text-slate-400">{action.howToExecute}</p>
              <div className="pt-1 text-[11px] text-cyan-400 font-medium">
                Impact: {action.expectedImpact}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
