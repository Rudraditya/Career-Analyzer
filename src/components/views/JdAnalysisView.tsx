import React from 'react';
import { JdAnalysis } from '../../types/career';
import {
  FileSearch,
  Building2,
  Briefcase,
  CheckCircle,
  Wrench,
  GraduationCap,
  Layers,
  BookOpen,
} from 'lucide-react';

interface JdAnalysisViewProps {
  jdAnalysis: JdAnalysis;
}

export const JdAnalysisView: React.FC<JdAnalysisViewProps> = ({ jdAnalysis }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                JD Analysis & Extraction
              </span>
              <span className="text-xs text-slate-400">Seniority: {jdAnalysis.seniorityLevel}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {jdAnalysis.jobTitle}
            </h1>
            <div className="flex items-center gap-2 mt-1 text-slate-300 font-medium text-sm">
              <Building2 className="w-4 h-4 text-indigo-400" />
              <span>{jdAnalysis.company}</span>
              <span className="text-slate-500">•</span>
              <Briefcase className="w-4 h-4 text-cyan-400" />
              <span>{jdAnalysis.experienceYearsRequired}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {jdAnalysis.summary}
        </div>
      </div>

      {/* Grid: Responsibilities & Qualifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Responsibilities */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Layers className="w-4 h-4 text-indigo-400" />
            <h2 className="font-bold text-sm text-white">Key Job Responsibilities</h2>
            <span className="text-xs text-slate-400 ml-auto">
              ({jdAnalysis.responsibilities.length})
            </span>
          </div>
          <ul className="space-y-2.5">
            {jdAnalysis.responsibilities.map((resp, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-4 h-4 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Qualifications */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <h2 className="font-bold text-sm text-white">Qualifications & Requirements</h2>
            <span className="text-xs text-slate-400 ml-auto">
              ({jdAnalysis.qualifications.length})
            </span>
          </div>
          <ul className="space-y-2.5">
            {jdAnalysis.qualifications.map((qual, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{qual}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Skills, Tools, Industry Knowledge Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Required Skills */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
            <span>Required Skills</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {jdAnalysis.requiredSkills.map((skill, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Tools and Tech */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Wrench className="w-3.5 h-3.5 text-cyan-400" />
            <span>Tools & Technologies</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {jdAnalysis.toolsAndTech.map((tool, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Industry Knowledge */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Domain Knowledge</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {jdAnalysis.industryKnowledge.map((item, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
