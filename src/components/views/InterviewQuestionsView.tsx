import React, { useState } from 'react';
import { InterviewQuestion } from '../../types/career';
import {
  HelpCircle,
  Search,
  Filter,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Award,
  AlertCircle,
  Lightbulb,
  Shield,
  Layers,
} from 'lucide-react';

interface InterviewQuestionsViewProps {
  questions: InterviewQuestion[];
}

export const InterviewQuestionsView: React.FC<InterviewQuestionsViewProps> = ({ questions }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(questions[0]?.id || null);

  const categories = [
    'all',
    'HR & Behavioral',
    'CV-Based',
    'JD-Based',
    'Company-Specific',
    'Technical',
    'Difficult Follow-up',
  ];

  const filteredQuestions = questions.filter((q) => {
    const matchesCat = selectedCategory === 'all' || q.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || q.priority === selectedPriority;
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.whatInterviewerEvaluates.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.sampleAnswer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesPriority && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Personalized Mock Interview Questionnaire</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Targeted Interview Questions & Evaluation Criteria
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Personalized questions drawn from the JD, CV, company specifics, and difficult follow-ups
              with suggested answer frameworks and evaluation rubrics.
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-2xl font-black text-indigo-400">{questions.length}</span>
            <span className="text-xs text-slate-400 block font-medium">Curated Questions</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search interview questions, keywords, or topics..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Priority Filter */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs text-slate-400 mr-1">Priority:</span>
            {['all', 'High', 'Medium', 'Low'].map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPriority(p)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedPriority === p
                    ? p === 'High'
                      ? 'bg-rose-600 text-white'
                      : 'bg-indigo-600 text-white'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Question Accordion List */}
      <div className="space-y-4">
        {filteredQuestions.map((q, idx) => {
          const isExpanded = expandedId === q.id || (!expandedId && idx === 0);
          const isHighPriority = q.priority === 'High';

          return (
            <div
              key={q.id || idx}
              className={`bg-slate-900 border rounded-2xl transition-all shadow-md overflow-hidden ${
                isExpanded ? 'border-indigo-500/40 ring-1 ring-indigo-500/20' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Question Header Card */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : q.id)}
                className="w-full text-left p-5 flex items-start justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        isHighPriority
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                      }`}
                    >
                      {q.priority} Priority
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-slate-300">
                      {q.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">
                    {idx + 1}. {q.question}
                  </h3>
                </div>

                <div className="shrink-0 p-1 rounded-lg text-slate-400 hover:text-white">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Expanded Detail Panel */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 space-y-4">
                  {/* Evaluation Rubric */}
                  <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5" />
                      <span>What the Interviewer is Evaluating</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{q.whatInterviewerEvaluates}</p>
                  </div>

                  {/* Suggested Answer Framework */}
                  <div className="bg-indigo-950/20 p-3.5 rounded-xl border border-indigo-500/20 space-y-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Suggested Answer Framework</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-mono">
                      {q.suggestedFramework}
                    </p>
                  </div>

                  {/* Sample Answer Outline */}
                  <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Exemplary Response Outline</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                      {q.sampleAnswer}
                    </p>
                  </div>

                  {/* Feedback Guidance */}
                  {q.feedbackGuidance && (
                    <div className="text-xs text-slate-400 flex items-start gap-2 pt-1">
                      <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-slate-300">Coach Guidance: </strong>
                        {q.feedbackGuidance}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
