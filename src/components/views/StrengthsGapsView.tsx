import React, { useState } from 'react';
import { StrengthsAndGaps, GapItem } from '../../types/career';
import {
  Award,
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface StrengthsGapsViewProps {
  strengthsAndGaps: StrengthsAndGaps;
}

export const StrengthsGapsView: React.FC<StrengthsGapsViewProps> = ({ strengthsAndGaps }) => {
  const [activeGapTab, setActiveGapTab] = useState<'all' | 'critical' | 'moderate' | 'minor'>('all');

  const { topStrengths, gaps } = strengthsAndGaps;

  const renderGapCard = (item: GapItem, severity: 'critical' | 'moderate' | 'minor', index: number) => {
    let borderClass = 'border-rose-500/30';
    let badgeClass = 'bg-rose-500/10 text-rose-400 border-rose-500/20';
    let titleColor = 'text-rose-300';
    let severityLabel = 'Critical Gap';

    if (severity === 'moderate') {
      borderClass = 'border-amber-500/30';
      badgeClass = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      titleColor = 'text-amber-300';
      severityLabel = 'Moderate Gap';
    } else if (severity === 'minor') {
      borderClass = 'border-blue-500/30';
      badgeClass = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      titleColor = 'text-blue-300';
      severityLabel = 'Minor Gap';
    }

    return (
      <div
        key={`${severity}-${index}`}
        className={`bg-slate-900 border ${borderClass} rounded-2xl p-5 shadow-lg space-y-4`}
      >
        <div className="flex items-center justify-between gap-2">
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badgeClass}`}>
            {severityLabel}
          </span>
        </div>

        <div>
          <h3 className={`text-base font-bold ${titleColor}`}>{item.gap}</h3>
          <div className="mt-2 text-xs text-slate-300 leading-relaxed">
            <strong className="text-white">Why It Matters: </strong>
            {item.importance}
          </div>
        </div>

        {/* Practical Remedy */}
        <div className="bg-slate-950/80 rounded-xl p-3.5 border border-slate-800 space-y-1.5">
          <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Practical Action & Remedy</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">{item.practicalRemedy}</p>
        </div>

        {/* Learning Resources */}
        {item.learningResources && item.learningResources.length > 0 && (
          <div className="space-y-2 pt-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>Recommended Learning Resources</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {item.learningResources.map((res, i) => (
                <div
                  key={i}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-1.5"
                >
                  <span className="font-semibold text-white">{res.name}</span>
                  <span className="text-[11px] text-indigo-400">({res.provider})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Top 5 Strengths Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Top 5 Candidate Strengths</h2>
            <p className="text-xs text-slate-400">
              Verified with factual evidence extracted directly from the candidate's CV.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topStrengths.map((str, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-emerald-500/20 rounded-2xl p-5 shadow-lg flex flex-col justify-between space-y-3 hover:border-emerald-500/40 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h3 className="font-bold text-sm text-white">{str.title}</h3>
                </div>

                <div className="bg-slate-950/70 rounded-xl p-3 border border-slate-800/80 text-xs text-slate-300 italic">
                  "{str.cvEvidence}"
                </div>
              </div>

              <div className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-800">
                <span className="font-semibold text-emerald-300">Strategic Value: </span>
                {str.whyItMatters}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gaps Breakdown (Critical, Moderate, Minor) */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Categorized Gaps & Actionable Remedies</h2>
              <p className="text-xs text-slate-400">
                Prioritized by impact with practical solutions and learning resources.
              </p>
            </div>
          </div>

          {/* Gap Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveGapTab('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeGapTab === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({gaps.critical.length + gaps.moderate.length + gaps.minor.length})
            </button>
            <button
              onClick={() => setActiveGapTab('critical')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeGapTab === 'critical' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-rose-400'
              }`}
            >
              Critical ({gaps.critical.length})
            </button>
            <button
              onClick={() => setActiveGapTab('moderate')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeGapTab === 'moderate' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-amber-400'
              }`}
            >
              Moderate ({gaps.moderate.length})
            </button>
            <button
              onClick={() => setActiveGapTab('minor')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeGapTab === 'minor' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-blue-400'
              }`}
            >
              Minor ({gaps.minor.length})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {(activeGapTab === 'all' || activeGapTab === 'critical') &&
            gaps.critical.map((item, i) => renderGapCard(item, 'critical', i))}

          {(activeGapTab === 'all' || activeGapTab === 'moderate') &&
            gaps.moderate.map((item, i) => renderGapCard(item, 'moderate', i))}

          {(activeGapTab === 'all' || activeGapTab === 'minor') &&
            gaps.minor.map((item, i) => renderGapCard(item, 'minor', i))}
        </div>
      </div>
    </div>
  );
};
