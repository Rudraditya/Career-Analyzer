import React, { useState } from 'react';
import { CompanyResearch } from '../../types/career';
import {
  Building2,
  Globe,
  TrendingUp,
  Users,
  Layers,
  Newspaper,
  CheckCircle,
  Lightbulb,
  Search,
  Loader2,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

interface CompanyResearchViewProps {
  companyResearch: CompanyResearch;
  industry?: string;
}

export const CompanyResearchView: React.FC<CompanyResearchViewProps> = ({
  companyResearch,
  industry,
}) => {
  const [liveResearch, setLiveResearch] = useState<string | null>(null);
  const [liveSources, setLiveSources] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleLiveSearch = async () => {
    setIsSearching(true);
    setSearchError(null);
    try {
      const res = await fetch('/api/research-company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: companyResearch.companyName,
          industry: industry || 'Tech & Enterprise',
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to retrieve live Google Search intelligence');
      }

      const data = await res.json();
      setLiveResearch(data.content);
      if (data.groundingMetadata?.groundingChunks) {
        setLiveSources(data.groundingMetadata.groundingChunks);
      }
    } catch (err: any) {
      console.error(err);
      setSearchError(err.message || 'Live research failed');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Company Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Building2 className="w-3.5 h-3.5" />
              <span>Target Company Intelligence</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {companyResearch.companyName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {companyResearch.overview}
            </p>
          </div>

          {/* Live Google Search Button */}
          <button
            onClick={handleLiveSearch}
            disabled={isSearching}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20 shrink-0 self-start md:self-auto"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                <span>Searching Google Grounding...</span>
              </>
            ) : (
              <>
                <Search className="w-3.5 h-3.5 text-cyan-300" />
                <span>Live Google Search Grounding</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Live Google Search Grounding Results if requested */}
      {liveResearch && (
        <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Live Google Search Synthesized Intelligence</span>
            </div>
            <span className="text-[11px] text-slate-400">Current Grounded Data</span>
          </div>

          <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-line bg-slate-950/80 p-4 rounded-xl border border-slate-800 font-sans">
            {liveResearch}
          </div>

          {liveSources.length > 0 && (
            <div className="pt-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Grounding Sources & Citations
              </div>
              <div className="flex flex-wrap gap-2">
                {liveSources.map((chunk, i) => {
                  const web = chunk.web;
                  if (!web) return null;
                  return (
                    <a
                      key={i}
                      href={web.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] bg-slate-950 text-indigo-300 hover:text-white border border-slate-800 hover:border-indigo-500 transition-colors"
                    >
                      <span className="truncate max-w-[200px]">{web.title || web.uri}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Business Model & Strategy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <Layers className="w-4 h-4 text-indigo-400" />
            <h2 className="font-bold text-sm text-white">Business Model & Monetization</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{companyResearch.businessModel}</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <h2 className="font-bold text-sm text-white">Business Strategy & Growth Priorities</h2>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {companyResearch.businessStrategyAndGrowth}
          </p>
        </div>
      </div>

      {/* Products, Target Markets, Competitors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Products & Services */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Major Products & Services</span>
          </div>
          <ul className="space-y-1.5">
            {companyResearch.majorProductsAndServices.map((p, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-1.5" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Target Markets */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Target Markets & Customers</span>
          </div>
          <ul className="space-y-1.5">
            {companyResearch.targetMarkets.map((m, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Competitors */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Key Competitors</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {companyResearch.competitors.map((comp, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-950 text-slate-300 border border-slate-800"
              >
                {comp}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Developments & News */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <Newspaper className="w-4 h-4 text-cyan-400" />
          <h2 className="font-bold text-sm text-white">
            Recent Announcements, Deals & Developments
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {companyResearch.recentDevelopments.map((dev, i) => (
            <div
              key={i}
              className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2 hover:border-slate-700 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-xs font-bold text-white">{dev.headline}</h3>
                <span className="text-[10px] text-slate-400 font-mono shrink-0">{dev.date}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{dev.details}</p>
              <div className="text-[10px] text-indigo-400 font-medium">Source: {dev.source}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Facts vs AI Strategic Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Verified Facts */}
        <div className="bg-slate-900/90 border border-emerald-500/20 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <CheckCircle className="w-4 h-4" />
            <span>Verified Facts & Corporate Data</span>
          </div>
          <ul className="space-y-2">
            {companyResearch.verifiedFactsVsAnalysis.verifiedFacts.map((fact, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* AI Strategic Analysis */}
        <div className="bg-slate-900/90 border border-indigo-500/20 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800 text-indigo-400 font-bold text-xs uppercase tracking-wider">
            <Lightbulb className="w-4 h-4" />
            <span>AI Strategic Projections & Analysis</span>
          </div>
          <ul className="space-y-2">
            {companyResearch.verifiedFactsVsAnalysis.aiStrategicAnalysis.map((item, i) => (
              <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                <Lightbulb className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
