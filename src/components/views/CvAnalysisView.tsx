import React from 'react';
import { CvAnalysis } from '../../types/career';
import {
  UserCheck,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Trophy,
  Award,
  Hash,
  Sparkles,
} from 'lucide-react';

interface CvAnalysisViewProps {
  cvAnalysis: CvAnalysis;
}

export const CvAnalysisView: React.FC<CvAnalysisViewProps> = ({ cvAnalysis }) => {
  return (
    <div className="space-y-6">
      {/* Candidate Profile Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Parsed Candidate CV Profile
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {cvAnalysis.candidateName}
            </h1>
            <p className="text-slate-300 font-medium text-sm mt-1">{cvAnalysis.currentTitle}</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {cvAnalysis.summary}
        </div>
      </div>

      {/* Quantifiable Measurable Results Highlights */}
      {cvAnalysis.measurableResults && cvAnalysis.measurableResults.length > 0 && (
        <div className="bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-900 border border-emerald-500/20 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <Hash className="w-4 h-4" />
            <span>Extracted Measurable Results & Impact Metrics ({cvAnalysis.measurableResults.length})</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {cvAnalysis.measurableResults.map((result, i) => (
              <div
                key={i}
                className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3 text-xs text-slate-200 flex items-start gap-2.5"
              >
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{result}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Professional Experience */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Briefcase className="w-4 h-4 text-indigo-400" />
          <h2 className="font-bold text-sm text-white">Documented Work Experience</h2>
        </div>

        <div className="space-y-6">
          {cvAnalysis.experience.map((exp, i) => (
            <div key={i} className="space-y-2 border-l-2 border-indigo-500/30 pl-4 ml-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="font-bold text-sm text-white">{exp.role}</h3>
                <span className="text-xs text-indigo-400 font-mono">{exp.duration}</span>
              </div>
              <div className="text-xs font-semibold text-slate-400">{exp.company}</div>
              <ul className="space-y-1.5 pt-1">
                {exp.highlights.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-1.5" />
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Technical */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Technical Skills ({cvAnalysis.skills.technical.length})
          </div>
          <div className="flex flex-wrap gap-1.5">
            {cvAnalysis.skills.technical.map((skill, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Leadership & Soft Skills ({cvAnalysis.skills.soft.length})
          </div>
          <div className="flex flex-wrap gap-1.5">
            {cvAnalysis.skills.soft.map((skill, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Tools & Platforms ({cvAnalysis.skills.tools.length})
          </div>
          <div className="flex flex-wrap gap-1.5">
            {cvAnalysis.skills.tools.map((tool, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Education & Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Education */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <h2 className="font-bold text-sm text-white">Education</h2>
          </div>
          <div className="space-y-3">
            {cvAnalysis.education.map((edu, i) => (
              <div key={i} className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-xs text-white">{edu.degree}</h3>
                  <span className="text-[11px] text-slate-400 font-mono">{edu.year}</span>
                </div>
                <div className="text-xs text-slate-400">{edu.institution}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Achievements */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Award className="w-4 h-4 text-amber-400" />
            <h2 className="font-bold text-sm text-white">Certifications & Achievements</h2>
          </div>
          <div className="space-y-3">
            {cvAnalysis.certifications.map((cert, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{cert}</span>
              </div>
            ))}
            {cvAnalysis.achievements.map((ach, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <Trophy className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>{ach}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
