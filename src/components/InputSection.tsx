import React, { useState, useRef } from 'react';
import {
  Upload,
  FileText,
  Briefcase,
  UserCheck,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trash2,
  FileCheck,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { SAMPLE_PRESETS, Preset } from '../data/samplePresets';

interface InputSectionProps {
  jdText: string;
  setJdText: (text: string) => void;
  cvText: string;
  setCvText: (text: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  onSelectPreset: (preset: Preset) => void;
  activePresetId?: string;
  loadingStepText?: string;
}

export const InputSection: React.FC<InputSectionProps> = ({
  jdText,
  setJdText,
  cvText,
  setCvText,
  onAnalyze,
  isLoading,
  onSelectPreset,
  activePresetId,
  loadingStepText,
}) => {
  const [jdFileName, setJdFileName] = useState<string | null>(null);
  const [cvFileName, setCvFileName] = useState<string | null>(null);
  const [uploadingJd, setUploadingJd] = useState(false);
  const [uploadingCv, setUploadingCv] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const jdFileInputRef = useRef<HTMLInputElement>(null);
  const cvFileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File, target: 'jd' | 'cv') => {
    setUploadError(null);
    if (target === 'jd') {
      setUploadingJd(true);
      setJdFileName(file.name);
    } else {
      setUploadingCv(true);
      setCvFileName(file.name);
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/extract-file', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Failed to extract text from ${file.name}`);
      }

      const data = await res.json();
      if (target === 'jd') {
        setJdText(data.text);
      } else {
        setCvText(data.text);
      }
    } catch (err: any) {
      console.error(err);
      setUploadError(err.message || 'File processing failed');
      if (target === 'jd') setJdFileName(null);
      else setCvFileName(null);
    } finally {
      if (target === 'jd') setUploadingJd(false);
      else setUploadingCv(false);
    }
  };

  const isReady = jdText.trim().length > 50 && cvText.trim().length > 50;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Generation Career Readiness Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Supercharge your interview prep with{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
            AI JD & CV Matching
          </span>
        </h1>
        <p className="text-base sm:text-lg text-slate-400">
          Compare your CV against any job description. Get 8-dimension fit scoring, ATS
          optimization, company research, tailored consulting cases, and a 7-day interview plan.
        </p>

        {/* Quick Sample Presets */}
        <div className="pt-2">
          <div className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
            Try an instant pre-loaded profile:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {SAMPLE_PRESETS.map((p) => {
              const isSelected = activePresetId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectPreset(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <Briefcase className="w-3 h-3 text-indigo-400" />
                  <span>{p.name}</span>
                  <span className="text-[10px] text-slate-400">({p.company})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {uploadError && (
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 flex items-center gap-3 text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Dual Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Job Description Input Card */}
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xl space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-indigo-400" />
                </div>
                <h2 className="text-base font-bold text-white">1. Job Description (JD)</h2>
              </div>
              <span className="text-xs text-slate-400">
                {jdText.length > 0 ? `${jdText.trim().split(/\s+/).length} words` : 'Required'}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Paste the target role description or upload a PDF, DOC, DOCX, or TXT file.
            </p>
          </div>

          {/* Upload Button */}
          <div className="flex items-center gap-3">
            <input
              type="file"
              ref={jdFileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file, 'jd');
              }}
              accept=".pdf,.doc,.docx,.txt,.md"
              className="hidden"
            />
            <button
              onClick={() => jdFileInputRef.current?.click()}
              disabled={uploadingJd}
              className="flex-1 py-2 px-3 border border-dashed border-slate-700 hover:border-indigo-500 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-950/60 transition-colors flex items-center justify-center gap-2"
            >
              {uploadingJd ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                  <span>Parsing JD with AI...</span>
                </>
              ) : jdFileName ? (
                <>
                  <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="truncate max-w-[200px]">{jdFileName}</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Upload JD (PDF, DOCX, TXT)</span>
                </>
              )}
            </button>
            {jdText.length > 0 && (
              <button
                onClick={() => {
                  setJdText('');
                  setJdFileName(null);
                }}
                className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Clear JD"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Textarea */}
          <textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste complete Job Description here... (e.g. Responsibilities, Qualifications, Required Tech Stack, Company Info)"
            rows={12}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs sm:text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 font-mono transition-all resize-y"
          />
        </div>

        {/* Candidate CV Input Card */}
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-xl space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <UserCheck className="w-4 h-4 text-cyan-400" />
                </div>
                <h2 className="text-base font-bold text-white">2. Candidate CV / Resume</h2>
              </div>
              <span className="text-xs text-slate-400">
                {cvText.length > 0 ? `${cvText.trim().split(/\s+/).length} words` : 'Required'}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Paste your resume text or upload a PDF, DOC, or DOCX document.
            </p>
          </div>

          {/* Upload Button */}
          <div className="flex items-center gap-3">
            <input
              type="file"
              ref={cvFileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file, 'cv');
              }}
              accept=".pdf,.doc,.docx,.txt"
              className="hidden"
            />
            <button
              onClick={() => cvFileInputRef.current?.click()}
              disabled={uploadingCv}
              className="flex-1 py-2 px-3 border border-dashed border-slate-700 hover:border-cyan-500 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-slate-950/60 transition-colors flex items-center justify-center gap-2"
            >
              {uploadingCv ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                  <span>Parsing CV with AI...</span>
                </>
              ) : cvFileName ? (
                <>
                  <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="truncate max-w-[200px]">{cvFileName}</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Upload CV (PDF, DOCX)</span>
                </>
              )}
            </button>
            {cvText.length > 0 && (
              <button
                onClick={() => {
                  setCvText('');
                  setCvFileName(null);
                }}
                className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Clear CV"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Textarea */}
          <textarea
            value={cvText}
            onChange={(e) => setCvText(e.target.value)}
            placeholder="Paste your CV text here... (Work experience, education, skills, metrics, certifications, projects)"
            rows={12}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs sm:text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500 font-mono transition-all resize-y"
          />
        </div>
      </div>

      {/* CTA Action Banner */}
      <div className="bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-indigo-300 font-semibold text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Ethical, Fact-Grounded Analysis</span>
          </div>
          <p className="text-xs text-slate-400 max-w-xl">
            Never invents qualifications or numbers. Clearly flags candidate placeholders. Does not
            assess protected attributes. Delivers a ready-to-use 13-section career intelligence report.
          </p>
        </div>

        <button
          onClick={onAnalyze}
          disabled={!isReady || isLoading}
          className={`px-8 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2.5 shrink-0 shadow-lg ${
            isReady && !isLoading
              ? 'bg-gradient-to-r from-indigo-500 via-purple-600 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white shadow-indigo-500/25 cursor-pointer scale-100 hover:scale-[1.02]'
              : 'bg-slate-800 text-slate-400 cursor-not-allowed opacity-75'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>{loadingStepText || 'Analyzing Fit & Prep Plan...'}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Analyze Job Fit & Generate Report</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
