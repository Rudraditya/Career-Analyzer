import React, { useState } from 'react';
import { CareerCoaching, StoryBankItem } from '../../types/career';
import {
  Bookmark,
  MessageSquare,
  ShieldAlert,
  Sparkles,
  Layers,
  CheckCircle2,
  Copy,
  Check,
  ChevronRight,
} from 'lucide-react';
import { copyToClipboard } from '../../utils/helpers';

interface StoryBankViewProps {
  careerCoaching: CareerCoaching;
}

export const StoryBankView: React.FC<StoryBankViewProps> = ({ careerCoaching }) => {
  const [activeCoreTab, setActiveCoreTab] = useState<
    'tellMeAboutYourself' | 'whyThisCompany' | 'whyThisRole' | 'whyShouldWeHireYou'
  >('tellMeAboutYourself');

  const [copiedStoryIndex, setCopiedStoryIndex] = useState<number | null>(null);

  const { coreAnswers, storyBank, redFlags } = careerCoaching;

  const corePillars = [
    { id: 'tellMeAboutYourself', label: '1. Tell Me About Yourself' },
    { id: 'whyThisCompany', label: '2. Why This Company?' },
    { id: 'whyThisRole', label: '3. Why This Role?' },
    { id: 'whyShouldWeHireYou', label: '4. Why Should We Hire You?' },
  ] as const;

  const activeAnswer = coreAnswers[activeCoreTab];

  const handleCopyStory = async (story: StoryBankItem, index: number) => {
    const text = `STAR Story (${story.category})
Situation: ${story.situation}
Task: ${story.task}
Action: ${story.action}
Result: ${story.result}
Lessons Learned: ${story.lessonsLearned}`;

    const success = await copyToClipboard(text);
    if (success) {
      setCopiedStoryIndex(index);
      setTimeout(() => setCopiedStoryIndex(null), 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
          <Bookmark className="w-3.5 h-3.5" />
          <span>Personalized Career Coach & STAR Arsenal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Core Pillar Answers, STAR Story Bank & Red Flag Defenses
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
          Crafted from your actual documented CV experiences without hallucinated credentials.
        </p>
      </div>

      {/* Part 1: Four Core Pillar Answers */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <MessageSquare className="w-4 h-4 text-cyan-400" />
          <h2 className="font-bold text-sm text-white">The 4 Foundation Interview Questions</h2>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {corePillars.map((p) => (
            <button
              key={p.id}
              onClick={() => setActiveCoreTab(p.id)}
              className={`p-3 rounded-xl text-xs font-bold transition-all text-left ${
                activeCoreTab === p.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Active Core Answer Card */}
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 space-y-4">
          {activeAnswer.framework && (
            <div className="text-[11px] font-mono text-indigo-400 bg-indigo-950/20 px-3 py-1.5 rounded-lg border border-indigo-500/20">
              <strong>Framework:</strong> {activeAnswer.framework}
            </div>
          )}

          <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line font-sans">
            {activeAnswer.tailoredAnswer}
          </div>

          {activeAnswer.tips && (
            <div className="text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <strong className="text-cyan-400">Executive Delivery Tip: </strong>
              {activeAnswer.tips}
            </div>
          )}

          {activeAnswer.keyConnectionPoints && activeAnswer.keyConnectionPoints.length > 0 && (
            <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
              <span className="text-[11px] uppercase font-bold text-slate-400">
                Key Connection Points to Reiterate:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeAnswer.keyConnectionPoints.map((pt, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs bg-slate-900 border border-slate-800 text-slate-300"
                  >
                    • {pt}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeAnswer.unfairAdvantages && activeAnswer.unfairAdvantages.length > 0 && (
            <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
              <span className="text-[11px] uppercase font-bold text-emerald-400">
                Candidate Unfair Advantages:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeAnswer.unfairAdvantages.map((adv, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
                  >
                    ✓ {adv}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Part 2: STAR Story Bank */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-indigo-400" />
          <div>
            <h2 className="text-xl font-bold text-white">
              STAR Story Bank ({storyBank.length} Behavioral Stories)
            </h2>
            <p className="text-xs text-slate-400">
              Structured Situation-Task-Action-Result narratives drawn from your actual career record.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {storyBank.map((story, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {story.category}
                  </span>
                  <button
                    onClick={() => handleCopyStory(story, idx)}
                    className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
                  >
                    {copiedStoryIndex === idx ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy STAR</span>
                      </>
                    )}
                  </button>
                </div>

                {/* S - T - A - R breakdown */}
                <div className="space-y-2 text-xs">
                  <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80">
                    <strong className="text-indigo-400">S (Situation): </strong>
                    <span className="text-slate-300">{story.situation}</span>
                  </div>
                  <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80">
                    <strong className="text-cyan-400">T (Task): </strong>
                    <span className="text-slate-300">{story.task}</span>
                  </div>
                  <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80">
                    <strong className="text-purple-400">A (Action): </strong>
                    <span className="text-slate-300">{story.action}</span>
                  </div>
                  <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80">
                    <strong className="text-emerald-400">R (Result): </strong>
                    <span className="text-slate-200 font-medium">{story.result}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-2">
                <div className="text-[11px] text-slate-400">
                  <strong className="text-slate-300">Lessons Learned: </strong>
                  {story.lessonsLearned}
                </div>
                {story.bestUsedForQuestions && story.bestUsedForQuestions.length > 0 && (
                  <div className="text-[10px] text-indigo-300">
                    <strong>Best for: </strong>
                    {story.bestUsedForQuestions.join(' • ')}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 3: Potential CV Red Flags & Honest Talking Points */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <ShieldAlert className="w-4 h-4 text-rose-400" />
          <div>
            <h2 className="font-bold text-sm text-white">
              Potential CV Red Flags & Honest Re-Framing
            </h2>
            <p className="text-xs text-slate-400">
              Anticipate tough inquiries and address them constructively without defensiveness.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {redFlags.map((rf, i) => (
            <div
              key={i}
              className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-2.5 hover:border-slate-700 transition-all"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-rose-300">{rf.potentialConcern}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  {rf.severity} Concern
                </span>
              </div>

              <div className="text-xs text-slate-400">
                <strong className="text-slate-300">Context: </strong>
                {rf.honestContext}
              </div>

              <div className="bg-emerald-950/20 p-3 rounded-lg border border-emerald-500/20 text-xs text-emerald-200">
                <strong className="text-emerald-300">Honest Talking Point: </strong>
                {rf.suggestedReframing}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
