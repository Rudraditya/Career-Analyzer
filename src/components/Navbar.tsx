import React from 'react';
import { Sparkles, FileText, Printer, RotateCcw, Compass, ArrowRight } from 'lucide-react';
import { SAMPLE_PRESETS, Preset } from '../data/samplePresets';

interface NavbarProps {
  hasReport: boolean;
  onReset: () => void;
  onSelectPreset: (preset: Preset) => void;
  onPrint: () => void;
  activePresetId?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  hasReport,
  onReset,
  onSelectPreset,
  onPrint,
  activePresetId,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                CareerMatch<span className="text-indigo-400">AI</span>
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                PRO 2026
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              AI Job Fit Matcher, ATS Checker & Interview Intelligence
            </p>
          </div>
        </div>

        {/* Preset Quick Select & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Presets Dropdown/Buttons */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-600 transition-all">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Load Sample Profile</span>
            </button>
            <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 hidden group-hover:block transition-all z-50">
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-2 py-1">
                Select Tested Role & CV
              </div>
              <div className="space-y-1">
                {SAMPLE_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onSelectPreset(p)}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-colors flex flex-col ${
                      activePresetId === p.id
                        ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="font-semibold text-slate-200">{p.name}</span>
                    <span className="text-[11px] text-slate-400">{p.company} • {p.category}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {hasReport && (
            <>
              <button
                onClick={onPrint}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-600 transition-all"
                title="Print or Save as PDF"
              >
                <Printer className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Export / Print</span>
              </button>

              <button
                onClick={onReset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 transition-all"
                title="Start a new analysis"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New Match</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
