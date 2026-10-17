import React, { useState } from 'react';
import { CvOptimizer } from '../../types/career';
import { getScoreColor, copyToClipboard, downloadFile } from '../../utils/helpers';
import {
  Sparkles,
  Check,
  Copy,
  Download,
  Printer,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  FileText,
  Tag,
  Wand2,
} from 'lucide-react';

interface CvOptimizerViewProps {
  cvOptimizer: CvOptimizer;
  candidateName: string;
  targetRole: string;
}

export const CvOptimizerView: React.FC<CvOptimizerViewProps> = ({
  cvOptimizer,
  candidateName,
  targetRole,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'rewrites' | 'tailored-cv' | 'weak-statements'>(
    'rewrites'
  );

  const atsColor = getScoreColor(cvOptimizer.atsScore);

  const handleCopyCv = async () => {
    const success = await copyToClipboard(cvOptimizer.tailoredCvMarkdown);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const filename = `${candidateName.replace(/\s+/g, '_')}_Tailored_CV_${targetRole.replace(/\s+/g, '_')}.md`;
    downloadFile(filename, cvOptimizer.tailoredCvMarkdown, 'text/markdown');
  };

  return (
    <div className="space-y-8">
      {/* ATS Readiness Score Header */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ATS Parser & Keyword Optimization</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              CV Optimizer & ATS Readiness
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Algorithmic scan of resume formatting, keyword density, quantifiable metrics, and
              action-oriented accomplishments.
            </p>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 text-center shrink-0 min-w-[200px] shadow-2xl">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              ATS-Readiness Score
            </span>
            <div className="flex items-baseline justify-center gap-1.5 my-2">
              <span className={`text-5xl font-black ${atsColor.text}`}>{cvOptimizer.atsScore}</span>
              <span className="text-slate-400 text-lg font-bold">/100</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
              <div
                className={`h-full bg-gradient-to-r ${atsColor.gradient}`}
                style={{ width: `${cvOptimizer.atsScore}%` }}
              />
            </div>
            <span
              className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full ${atsColor.bg} ${atsColor.text} border ${atsColor.border}`}
            >
              {cvOptimizer.atsScore >= 80 ? 'ATS Screen Pass Ready' : 'Needs Optimization'}
            </span>
          </div>
        </div>

        {/* 4 ATS Sub-dimensions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <div className="text-[10px] uppercase font-bold text-slate-400">Formatting</div>
            <div className="text-lg font-bold text-white">
              {cvOptimizer.atsScoreBreakdown.formatting}%
            </div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <div className="text-[10px] uppercase font-bold text-slate-400">Keyword Density</div>
            <div className="text-lg font-bold text-white">
              {cvOptimizer.atsScoreBreakdown.keywordDensity}%
            </div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <div className="text-[10px] uppercase font-bold text-slate-400">Quantifiable Impact</div>
            <div className="text-lg font-bold text-white">
              {cvOptimizer.atsScoreBreakdown.quantifiableImpact}%
            </div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <div className="text-[10px] uppercase font-bold text-slate-400">Action Verbs</div>
            <div className="text-lg font-bold text-white">
              {cvOptimizer.atsScoreBreakdown.actionVerbs}%
            </div>
          </div>
        </div>
      </div>

      {/* Missing Keywords Box */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-amber-400" />
          <h2 className="text-sm font-bold text-white">
            Missing Keywords & High-Priority Skill Phrases ({cvOptimizer.missingKeywords.length})
          </h2>
        </div>
        <p className="text-xs text-slate-400">
          These exact terms appear prominently in the JD but are missing or underrepresented in your CV.
          Integrate them into your experience bullets where truthfully applicable.
        </p>
        <div className="flex flex-wrap gap-2 pt-1">
          {cvOptimizer.missingKeywords.map((kw, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>{kw}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Navigation Tabs for CV Optimization Tools */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('rewrites')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'rewrites'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span>Rewritten High-Impact Bullets ({cvOptimizer.rewrittenBullets.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('tailored-cv')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'tailored-cv'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Full Tailored CV</span>
        </button>
        <button
          onClick={() => setActiveTab('weak-statements')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'weak-statements'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Weak Statements Diagnostic ({cvOptimizer.weakStatements.length})</span>
        </button>
      </div>

      {/* Tab 1: Rewritten Bullets */}
      {activeTab === 'rewrites' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              All bullet rewrites follow the Google XYZ formula: <em>"Accomplished [X] as measured by [Y], by doing [Z]"</em>.
              No qualifications or metrics were invented. Placeholders like <span className="text-cyan-400 font-mono">[Insert %]</span> require your actual numbers.
            </span>
          </div>

          <div className="space-y-4">
            {cvOptimizer.rewrittenBullets.map((bullet, i) => (
              <div
                key={i}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">
                    Bullet #{i + 1} • {bullet.framework}
                  </span>
                  {bullet.additionalInfoNeeded && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      User input needed: {bullet.additionalInfoNeeded}
                    </span>
                  )}
                </div>

                {/* Original vs Rewritten */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      Original CV Bullet
                    </span>
                    <p className="text-xs text-slate-400 leading-relaxed italic">
                      "{bullet.originalBullet}"
                    </p>
                  </div>

                  <div className="bg-indigo-950/20 p-3.5 rounded-xl border border-indigo-500/30 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-indigo-300">
                        Tailored High-Impact Bullet
                      </span>
                      <button
                        onClick={() => copyToClipboard(bullet.rewrittenBullet)}
                        className="text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                        title="Copy bullet"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </button>
                    </div>
                    <p className="text-xs text-white leading-relaxed font-medium">
                      {bullet.rewrittenBullet}
                    </p>
                  </div>
                </div>

                <div className="text-[11px] text-cyan-400 pt-1">
                  <strong>Impact Highlight:</strong> {bullet.impactHighlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Full Tailored CV */}
      {activeTab === 'tailored-cv' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <h3 className="font-bold text-sm text-white">Full Tailored CV Markdown</h3>
              <p className="text-xs text-slate-400">
                Optimized with target keywords and achievement-oriented formatting. Ready to copy or download.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCv}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-1.5 transition-all shadow-md"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Markdown'}</span>
              </button>
              <button
                onClick={handleDownload}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Download .MD</span>
              </button>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed shadow-inner max-h-[600px] overflow-y-auto">
            {cvOptimizer.tailoredCvMarkdown}
          </div>
        </div>
      )}

      {/* Tab 3: Weak Statements Diagnostic */}
      {activeTab === 'weak-statements' && (
        <div className="space-y-4">
          {cvOptimizer.weakStatements.map((ws, i) => (
            <div
              key={i}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3"
            >
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>Weak Statement #{i + 1}</span>
              </div>

              <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-xs text-slate-400 italic">
                "{ws.original}"
              </div>

              <div className="text-xs text-slate-300">
                <strong className="text-white">Diagnosis: </strong>
                {ws.diagnosis}
              </div>

              <div className="bg-emerald-950/20 p-3.5 rounded-xl border border-emerald-500/30 text-xs text-slate-200">
                <strong className="text-emerald-300">Recommended Improvement: </strong>
                {ws.improvement}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
