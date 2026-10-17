import React, { useState } from 'react';
import { PreparationPlan, DayPlan } from '../../types/career';
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  HelpCircle,
  TrendingUp,
  Target,
  ArrowRight,
} from 'lucide-react';

interface PrepPlanViewProps {
  preparationPlan: PreparationPlan;
}

export const PrepPlanView: React.FC<PrepPlanViewProps> = ({ preparationPlan }) => {
  const [activeDayNumber, setActiveDayNumber] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});

  const { sevenDayPlan, topThreeActions } = preparationPlan;

  const activeDay =
    sevenDayPlan.find((d) => d.day === activeDayNumber) || sevenDayPlan[0];

  const toggleTask = (taskKey: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskKey]: !prev[taskKey],
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
          <CalendarCheck className="w-3.5 h-3.5" />
          <span>Sprint Roadmap</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Personalized 7-Day Interview Preparation Plan
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
          Engineered around your specific skill gaps, role seniority, and company strategic priorities.
        </p>
      </div>

      {/* Top 3 Most Effective Immediate Actions */}
      <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <div>
            <h2 className="font-bold text-sm text-white">
              The 3 Most Effective Actions to Become More Competitive
            </h2>
            <p className="text-xs text-slate-400">
              Highest ROI investments for this specific job opening.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topThreeActions.map((action) => (
            <div
              key={action.rank}
              className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    #{action.rank}
                  </span>
                  <h3 className="font-bold text-xs text-white leading-tight">{action.action}</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{action.howToExecute}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-cyan-300 font-semibold">
                Expected Lift: {action.expectedImpact}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7-Day Day Selector Tabs */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {sevenDayPlan.map((d) => {
            const isSelected = activeDayNumber === d.day;
            return (
              <button
                key={d.day}
                onClick={() => setActiveDayNumber(d.day)}
                className={`shrink-0 px-4 py-3 rounded-2xl text-xs font-bold transition-all text-left flex flex-col min-w-[140px] ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-100 ring-2 ring-indigo-400'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">
                    Day {d.day}
                  </span>
                  <Clock className="w-3 h-3 opacity-60" />
                </div>
                <span className="font-bold truncate text-slate-100">{d.theme}</span>
              </button>
            );
          })}
        </div>

        {/* Active Day Detail Card */}
        {activeDay && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Day {activeDay.day} Focus
                </span>
                <h2 className="text-xl font-bold text-white mt-0.5">{activeDay.theme}</h2>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 self-start sm:self-auto">
                Estimated: 2–3 Hours
              </span>
            </div>

            {/* Daily Tasks with Interactive Checkboxes */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Actionable Tasks for Today</span>
              </div>
              <div className="space-y-2">
                {activeDay.tasks.map((task, i) => {
                  const taskKey = `day-${activeDay.day}-task-${i}`;
                  const isChecked = !!completedTasks[taskKey];
                  return (
                    <div
                      key={i}
                      onClick={() => toggleTask(taskKey)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 text-xs ${
                        isChecked
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-400 line-through'
                          : 'bg-slate-950/70 border-slate-800 text-slate-200 hover:border-slate-700'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 rounded border-slate-700 text-indigo-600 focus:ring-0 cursor-pointer"
                      />
                      <span className="leading-relaxed flex-1">{task}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Practice Questions for Today */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>Practice Questions to Rehearse Out Loud</span>
              </div>
              <div className="space-y-2">
                {activeDay.practiceQuestions.map((q, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5"
                  >
                    <span className="w-4 h-4 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{q}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curated Resources & Revision Priorities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Curated Learning Resources</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeDay.learningResources.map((res, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-1.5" />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" />
                  <span>Revision Priorities & Milestones</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeDay.revisionPriorities.map((prio, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                      <span>{prio}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
