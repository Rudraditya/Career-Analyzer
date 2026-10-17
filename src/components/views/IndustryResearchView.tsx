import React from 'react';
import { IndustryResearch } from '../../types/career';
import {
  TrendingUp,
  AlertTriangle,
  Scale,
  Cpu,
  BookOpen,
  Calendar,
  ExternalLink,
} from 'lucide-react';

interface IndustryResearchViewProps {
  industryResearch: IndustryResearch;
}

export const IndustryResearchView: React.FC<IndustryResearchViewProps> = ({ industryResearch }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-2">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Industry Landscape & Market Analysis</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          {industryResearch.industry} Sector Intelligence
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
          Macroeconomic forces, regulatory shifts, technology transformations, and authoritative
          reports relevant to this target role.
        </p>
      </div>

      {/* 4 Sector Dimensions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Key Trends */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-cyan-400 font-bold text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>Macro Industry Trends</span>
          </div>
          <ul className="space-y-2">
            {industryResearch.keyTrends.map((trend, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                <span className="leading-relaxed">{trend}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Major Challenges */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-amber-400 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Industry Challenges & Headwinds</span>
          </div>
          <ul className="space-y-2">
            {industryResearch.majorChallenges.map((challenge, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                <span className="leading-relaxed">{challenge}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Regulatory & Compliance */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-indigo-400 font-bold text-sm">
            <Scale className="w-4 h-4" />
            <span>Regulations & Compliance Frameworks</span>
          </div>
          <ul className="space-y-2">
            {industryResearch.regulatoryAndCompliance.map((reg, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-1.5" />
                <span className="leading-relaxed">{reg}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technological Changes */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-emerald-400 font-bold text-sm">
            <Cpu className="w-4 h-4" />
            <span>Technological Shifts & Disruptions</span>
          </div>
          <ul className="space-y-2">
            {industryResearch.technologicalChanges.map((tech, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                <span className="leading-relaxed">{tech}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Relevant Articles and Reports */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <h2 className="font-bold text-sm text-white">
            Authoritative Industry Articles, Reports & Benchmark Papers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {industryResearch.relevantArticlesAndReports.map((article, i) => (
            <div
              key={i}
              className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2 hover:border-slate-700 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-xs font-bold text-white">{article.title}</h3>
                <span className="text-[10px] text-slate-400 font-mono shrink-0">
                  {article.date}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{article.keyTakeaway}</p>
              <div className="text-[10px] text-indigo-400 font-medium flex items-center justify-between">
                <span>Source: {article.source}</span>
                <span className="text-slate-500">Documented Reference</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
