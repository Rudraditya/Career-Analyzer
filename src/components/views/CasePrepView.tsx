import React, { useState } from 'react';
import { CaseInterview } from '../../types/career';
import {
  Briefcase,
  HelpCircle,
  Layers,
  Calculator,
  CheckCircle2,
  Shield,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

interface CasePrepViewProps {
  cases: CaseInterview[];
}

export const CasePrepView: React.FC<CasePrepViewProps> = ({ cases }) => {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);

  const activeCase = cases[selectedCaseIndex] || cases[0];

  if (!cases || cases.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
        No case interview preparation scenarios generated for this role.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Consulting & Strategic Problem Solving</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Case Interview Preparation
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Structured cases covering profitability, market entry, growth strategy, pricing,
              operations, market sizing, and business diagnostics.
            </p>
          </div>
          <span className="px-3 py-1 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
            {cases.length} Case Scenarios Available
          </span>
        </div>
      </div>

      {/* Case Type Navigation Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {cases.map((c, i) => (
          <button
            key={i}
            onClick={() => setSelectedCaseIndex(i)}
            className={`shrink-0 px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              selectedCaseIndex === i
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white/20 text-white text-[10px] flex items-center justify-center font-bold">
              {i + 1}
            </span>
            <span>{c.caseType}</span>
          </button>
        ))}
      </div>

      {/* Active Case Details Card */}
      {activeCase && (
        <div className="space-y-6">
          {/* Scenario Overview */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {activeCase.caseType} Case
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white">{activeCase.title}</h2>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Client Scenario / Interviewer Prompt</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                {activeCase.promptScenario}
              </p>
            </div>
          </div>

          {/* Clarifying Questions & Recommended Framework */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Clarifying Questions */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-sm text-white">
                  Clarifying Questions the Candidate Must Ask
                </h3>
              </div>
              <ul className="space-y-2">
                {activeCase.clarifyingQuestions.map((q, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <span className="w-4 h-4 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      ?
                    </span>
                    <span className="leading-relaxed">{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Framework */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
                <Layers className="w-4 h-4 text-indigo-400" />
                <h3 className="font-bold text-sm text-white">Recommended Framework</h3>
              </div>
              <div className="bg-indigo-950/20 p-3.5 rounded-xl border border-indigo-500/20 text-xs text-slate-200 leading-relaxed font-mono">
                {activeCase.recommendedFramework}
              </div>
              <p className="text-[11px] text-slate-400">
                Structure your thoughts MECE (Mutually Exclusive, Collectively Exhaustive) before
                diving into calculations.
              </p>
            </div>
          </div>

          {/* Step-by-Step Approach & Math / Logic */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <Calculator className="w-4 h-4 text-cyan-400" />
              <h3 className="font-bold text-sm text-white">Step-by-Step Approach & Logic Flow</h3>
            </div>
            <div className="space-y-2.5">
              {activeCase.stepByStepAnalysis &&
                activeCase.stepByStepAnalysis.map((step: string, i: number) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3 text-xs text-slate-300"
                  >
                    <span className="w-5 h-5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Sample Candidate Response & Evaluation Rubric */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Exemplary Candidate Final Recommendation</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                {activeCase.sampleCandidateResponse}
              </p>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Shield className="w-4 h-4" />
                <span>Interviewer Evaluation Rubric</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                {activeCase.evaluationRubric}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
