import React from 'react';
import {
  LayoutDashboard,
  FileSearch,
  UserCheck,
  Target,
  Award,
  Sparkles,
  HelpCircle,
  Briefcase,
  Building2,
  TrendingUp,
  Bookmark,
  CalendarCheck,
  ShieldCheck,
} from 'lucide-react';
import { ActiveSectionId } from '../types/career';

interface NavItem {
  id: ActiveSectionId;
  label: string;
  number: number;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', number: 1, icon: LayoutDashboard },
  { id: 'jd-analysis', label: 'JD Analysis', number: 2, icon: FileSearch },
  { id: 'cv-analysis', label: 'CV Analysis', number: 3, icon: UserCheck },
  { id: 'fit-score', label: 'Fit Score', number: 4, icon: Target },
  { id: 'strengths-gaps', label: 'Strengths & Gaps', number: 5, icon: Award },
  { id: 'cv-optimizer', label: 'CV Optimizer', number: 6, icon: Sparkles, badge: 'ATS' },
  { id: 'interview-questions', label: 'Interview Questions', number: 7, icon: HelpCircle },
  { id: 'case-prep', label: 'Case Prep', number: 8, icon: Briefcase, badge: 'Consulting' },
  { id: 'company-research', label: 'Company Research', number: 9, icon: Building2 },
  { id: 'industry-research', label: 'Industry Research', number: 10, icon: TrendingUp },
  { id: 'story-bank', label: 'Story Bank', number: 11, icon: Bookmark, badge: 'STAR' },
  { id: 'prep-plan', label: 'Preparation Plan', number: 12, icon: CalendarCheck, badge: '7-Day' },
  { id: 'interview-readiness', label: 'Interview Readiness', number: 13, icon: ShieldCheck },
];

interface SidebarNavProps {
  activeSection: ActiveSectionId;
  onSelectSection: (id: ActiveSectionId) => void;
  overallScore?: number;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeSection,
  onSelectSection,
  overallScore,
}) => {
  return (
    <aside className="w-full lg:w-64 shrink-0 no-print">
      {/* Mobile Horizontal Scroll */}
      <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto py-2.5 px-4 bg-slate-900/90 border-b border-slate-800 scrollbar-none sticky top-14 z-30 backdrop-blur-md">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Desktop Sticky Sidebar */}
      <div className="hidden lg:block sticky top-20 space-y-4">
        {overallScore !== undefined && (
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/20 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  AI Job Fit Score
                </span>
                <div className="text-2xl font-black text-white">
                  {overallScore}
                  <span className="text-xs font-normal text-slate-400">/100</span>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {overallScore >= 80 ? 'High Fit' : overallScore >= 65 ? 'Moderate Fit' : 'Stretch Role'}
                </span>
              </div>
            </div>
          </div>
        )}

        <nav className="space-y-1 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-2 shadow-lg">
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Report Modules (13)
          </div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectSection(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.number}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                      isActive
                        ? 'bg-indigo-500/40 text-indigo-100'
                        : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
