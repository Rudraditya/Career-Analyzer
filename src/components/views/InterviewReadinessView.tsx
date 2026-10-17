import React, { useState } from 'react';
import { InterviewReadiness, FullAnalysisReport } from '../../types/career';
import { getScoreColor, copyToClipboard, downloadFile } from '../../utils/helpers';
import {
  ShieldCheck,
  Target,
  Sparkles,
  Award,
  AlertTriangle,
  TrendingUp,
  FileCheck,
  Printer,
  Copy,
  Download,
  Check,
  CheckCircle2,
} from 'lucide-react';

interface InterviewReadinessViewProps {
  interviewReadiness: InterviewReadiness;
  fullReport: FullAnalysisReport;
  onPrint: () => void;
}

export const InterviewReadinessView: React.FC<InterviewReadinessViewProps> = ({
  interviewReadiness,
  fullReport,
  onPrint,
}) => {
  const [copiedSummary, setCopiedSummary] = useState(false);

  const fitColor = getScoreColor(interviewReadiness.overallJobFitScore);
  const atsColor = getScoreColor(interviewReadiness.atsReadinessScore);
  const prepColor = getScoreColor(interviewReadiness.interviewReadinessScore);

  const handleCopySummary = async () => {
    const summaryMd = `# Career Readiness Report: ${fullReport.cvAnalysis.candidateName} for ${fullReport.jdAnalysis.jobTitle} at ${fullReport.jdAnalysis.company}

## Scores
- Overall Job Fit: ${interviewReadiness.overallJobFitScore}/100
- ATS-Readiness: ${interviewReadiness.atsReadinessScore}/100
- Interview Readiness: ${interviewReadiness.interviewReadinessScore}/100

## Strongest Qualifications
${interviewReadiness.strongestQualifications.map((q) => `- ${q}`).join('\n')}

## Most Important Skill Gaps
${interviewReadiness.mostImportantSkillGaps.map((g) => `- ${g}`).join('\n')}

## Biggest Potential Interview Risks
${interviewReadiness.biggestInterviewRisks.map((r) => `- ${r}`).join('\n')}

## Competitive Advantages
${interviewReadiness.competitiveAdvantages.map((a) => `- ${a}`).join('\n')}

## Top 3 Preparation Priorities
${interviewReadiness.topThreePreparationPriorities.map((p, i) => `${i + 1}. ${p}`).join('\n')}
`;
    const ok = await copyToClipboard(summaryMd);
    if (ok) {
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2000);
    }
  };

  const handleDownloadJson = () => {
    const filename = `${fullReport.cvAnalysis.candidateName.replace(/\s+/g, '_')}_CareerMatch_Report.json`;
    downloadFile(filename, JSON.stringify(fullReport, null, 2), 'application/json');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Final Assessment</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Interview Readiness Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Consolidated readiness scorecard combining qualification fit, ATS mechanics, interview
              defensibility, and competitive advantages.
            </p>
          </div>

          {/* Export Actions */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleCopySummary}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all shadow-sm"
            >
              {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-indigo-400" />}
              <span>{copiedSummary ? 'Copied Summary!' : 'Copy Summary'}</span>
            </button>
            <button
              onClick={handleDownloadJson}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Download JSON</span>
            </button>
            <button
              onClick={onPrint}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export / Print Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Triple Scorecard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Overall Job Fit */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-indigo-400" />
              <span>Overall Job Fit</span>
            </span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${fitColor.bg} ${fitColor.text} border ${fitColor.border}`}
            >
              Requirements Fit
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-5xl font-black ${fitColor.text}`}>
              {interviewReadiness.overallJobFitScore}
            </span>
            <span className="text-slate-400 text-sm font-semibold">/ 100</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${fitColor.gradient}`}
              style={{ width: `${interviewReadiness.overallJobFitScore}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400">
            Calculated across experience, skills, education, industry, responsibilities, leadership,
            technical, and soft skills.
          </p>
        </div>

        {/* ATS Readiness */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>ATS-Readiness</span>
            </span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${atsColor.bg} ${atsColor.text} border ${atsColor.border}`}
            >
              Resume Screen
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-5xl font-black ${atsColor.text}`}>
              {interviewReadiness.atsReadinessScore}
            </span>
            <span className="text-slate-400 text-sm font-semibold">/ 100</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${atsColor.gradient}`}
              style={{ width: `${interviewReadiness.atsReadinessScore}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400">
            Based on keyword density, quantifiable metrics, section hierarchy, and active power verbs.
          </p>
        </div>

        {/* Interview Readiness */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Interview Readiness</span>
            </span>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${prepColor.bg} ${prepColor.text} border ${prepColor.border}`}
            >
              Live Performance
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-5xl font-black ${prepColor.text}`}>
              {interviewReadiness.interviewReadinessScore}
            </span>
            <span className="text-slate-400 text-sm font-semibold">/ 100</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${prepColor.gradient}`}
              style={{ width: `${interviewReadiness.interviewReadinessScore}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400">
            Based on story bank coverage, case interview preparation, and counter-questioning agility.
          </p>
        </div>
      </div>

      {/* Grid: Strongest Qualifications & Skill Gaps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strongest Qualifications */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-emerald-400 font-bold text-sm">
            <Award className="w-4 h-4" />
            <span>Candidate Strongest Qualifications</span>
          </div>
          <ul className="space-y-2.5">
            {interviewReadiness.strongestQualifications.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Most Important Skill Gaps */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-amber-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Most Important Skill Gaps</span>
          </div>
          <ul className="space-y-2.5">
            {interviewReadiness.mostImportantSkillGaps.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Grid: Interview Risks & Competitive Advantages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Potential Risks */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-rose-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Biggest Potential Interview Risks</span>
          </div>
          <ul className="space-y-2.5">
            {interviewReadiness.biggestInterviewRisks.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Competitive Advantages */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-cyan-400 font-bold text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>Candidate Competitive Advantages</span>
          </div>
          <ul className="space-y-2.5">
            {interviewReadiness.competitiveAdvantages.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Top 3 Preparation Priorities */}
      <div className="bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <h2 className="font-bold text-sm text-white">Top Three Preparation Priorities</h2>
        </div>
        <div className="space-y-2.5">
          {interviewReadiness.topThreePreparationPriorities.map((prio, i) => (
            <div
              key={i}
              className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 flex items-start gap-3 text-xs text-slate-200"
            >
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="leading-relaxed">{prio}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
