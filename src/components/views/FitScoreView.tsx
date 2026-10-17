import React, { useState } from 'react';
import { FitScore, ComparisonItem } from '../../types/career';
import { getScoreColor } from '../../utils/helpers';
import {
  Target,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Search,
  Filter,
  Info,
  Check,
} from 'lucide-react';

interface FitScoreViewProps {
  fitScore: FitScore;
}

export const FitScoreView: React.FC<FitScoreViewProps> = ({ fitScore }) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'strong' | 'partial' | 'gap'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const overallColor = getScoreColor(fitScore.overall);

  const dimensionKeys = [
    { key: 'experience', label: 'Experience & Seniority' },
    { key: 'skills', label: 'Core Skills' },
    { key: 'education', label: 'Education & Credentials' },
    { key: 'industryKnowledge', label: 'Industry & Domain Knowledge' },
    { key: 'jobResponsibilities', label: 'Job Responsibilities Alignment' },
    { key: 'leadership', label: 'Leadership & Project Ownership' },
    { key: 'technicalSkills', label: 'Technical & Specialized Skills' },
    { key: 'softSkills', label: 'Soft Skills & Communication' },
  ] as const;

  const filteredComparison = fitScore.comparisonTable.filter((item) => {
    const matchesFilter = filterStatus === 'all' || item.matchStatus === filterStatus;
    const matchesSearch =
      item.requirement.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cvEvidence.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const counts = {
    all: fitScore.comparisonTable.length,
    strong: fitScore.comparisonTable.filter((i) => i.matchStatus === 'strong').length,
    partial: fitScore.comparisonTable.filter((i) => i.matchStatus === 'partial').length,
    gap: fitScore.comparisonTable.filter((i) => i.matchStatus === 'gap').length,
  };

  return (
    <div className="space-y-8">
      {/* Overall Score & Disclaimer Header */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Target className="w-3.5 h-3.5" />
              <span>Multi-Dimensional AI Evaluation</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Job Fit Analysis (8 Dimensions)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {fitScore.summaryExplanation}
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 text-center shrink-0 min-w-[200px] shadow-2xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Overall Job Fit Score
            </span>
            <div className="flex items-baseline justify-center gap-1.5 my-2">
              <span className={`text-5xl font-black ${overallColor.text}`}>{fitScore.overall}</span>
              <span className="text-slate-400 text-lg font-bold">/100</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
              <div
                className={`h-full bg-gradient-to-r ${overallColor.gradient}`}
                style={{ width: `${fitScore.overall}%` }}
              />
            </div>
            <span
              className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full ${overallColor.bg} ${overallColor.text} border ${overallColor.border}`}
            >
              {fitScore.overall >= 80 ? 'High Capability Alignment' : 'Moderate Alignment'}
            </span>
          </div>
        </div>

        {/* Strict Mandatory Non-Probability Hiring Disclaimer */}
        <div className="mt-6 p-4 rounded-xl bg-slate-950/90 border border-indigo-500/20 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <div className="font-bold text-white flex items-center gap-1.5">
              <span>Hiring Assessment Disclaimer</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-800 text-slate-400">
                Ethical AI Standard
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">{fitScore.disclaimer}</p>
          </div>
        </div>
      </div>

      {/* 8-Dimension Breakdown Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400" />
          <span>Dimension-by-Dimension Scorecard</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dimensionKeys.map(({ key, label }) => {
            const dim = fitScore.breakdown[key];
            const color = getScoreColor(dim.score);
            return (
              <div
                key={key}
                className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-md flex flex-col justify-between hover:border-slate-700 transition-all space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-white">{label}</span>
                    <span className={`text-base font-extrabold ${color.text}`}>
                      {dim.score}
                      <span className="text-xs text-slate-500 font-normal">/100</span>
                    </span>
                  </div>

                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-full bg-gradient-to-r ${color.gradient}`}
                      style={{ width: `${dim.score}%` }}
                    />
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{dim.explanation}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Requirement-by-Requirement Comparison Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-white">
              Requirement-by-Requirement Comparison Table
            </h2>
            <p className="text-xs text-slate-400">
              Detailed mapping of JD requirements against direct candidate CV evidence.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search requirements or skills..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterStatus === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Requirements ({counts.all})
          </button>
          <button
            onClick={() => setFilterStatus('strong')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filterStatus === 'strong'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Strong Matches ({counts.strong})</span>
          </button>
          <button
            onClick={() => setFilterStatus('partial')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filterStatus === 'partial'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Partial Matches ({counts.partial})</span>
          </button>
          <button
            onClick={() => setFilterStatus('gap')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filterStatus === 'gap'
                ? 'bg-rose-600 text-white'
                : 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20'
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Gaps ({counts.gap})</span>
          </button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="p-3.5">Job Requirement</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">CV Evidence / Verification</th>
                <th className="p-3.5">Match Status</th>
                <th className="p-3.5">Evaluation & Commentary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredComparison.map((item, idx) => {
                let badgeClass = 'bg-rose-500/10 text-rose-400 border-rose-500/30';
                let statusLabel = 'Gap';
                let Icon = XCircle;

                if (item.matchStatus === 'strong') {
                  badgeClass = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
                  statusLabel = 'Strong Match';
                  Icon = CheckCircle2;
                } else if (item.matchStatus === 'partial') {
                  badgeClass = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
                  statusLabel = 'Partial Match';
                  Icon = AlertCircle;
                }

                return (
                  <tr key={idx} className="hover:bg-slate-950/50 transition-colors">
                    <td className="p-3.5 font-medium text-slate-200 min-w-[180px]">
                      {item.requirement}
                    </td>
                    <td className="p-3.5 text-slate-400 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-[11px]">
                        {item.category}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-300 min-w-[220px]">
                      {item.cvEvidence}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${badgeClass}`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{statusLabel}</span>
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-400 min-w-[200px] leading-relaxed">
                      {item.commentary}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
