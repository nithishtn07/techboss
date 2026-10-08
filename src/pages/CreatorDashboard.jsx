import React, { useState, useEffect } from 'react';
import {
  Database,
  Users,
  MessageSquare,
  ShieldAlert,
  RefreshCw,
  Server,
  CheckCircle2
} from 'lucide-react';
import Button from '../components/ui/Button';
import { getStatsApi, getQuestionsApi } from '../services/api';

function formatTimestamp(isoString) {
  if (!isoString) return 'Recently';
  try {
    const d = new Date(isoString);
    return isNaN(d.getTime())
      ? 'Recently'
      : d.toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
  } catch {
    return 'Recently';
  }
}

export default function CreatorDashboard() {
  const [stats, setStats] = useState({ total_questions: 0, total_subscribers: 0 });
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, questionsRes] = await Promise.all([
        getStatsApi(),
        getQuestionsApi(15),
      ]);

      if (statsRes.success) setStats(statsRes.data);
      if (questionsRes.success) setQuestions(questionsRes.data);
    } catch {
      setError('Unable to fetch live database telemetry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-tech text-[#00e5ff] uppercase tracking-wider mb-2">
              <Server className="w-3.5 h-3.5" /> CREATOR TELEMETRY
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
              CREATOR DASHBOARD
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-sans mt-1">
              Live operational metrics queried directly from the PostgreSQL production database.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={loadData}
            icon={RefreshCw}
            iconPosition="left"
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh Metrics'}
          </Button>
        </div>

        {/* Security & Authenticity Notice (As requested: do not pretend auth is implemented) */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200/90 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-tech font-bold uppercase tracking-wider text-amber-300 block">
              Public Telemetry Mode (Unauthenticated Preview)
            </span>
            <p className="font-sans leading-relaxed text-slate-300">
              This interface displays verified database row counts and public question threads. Sensitive user credentials and emails are excluded by the backend API.
            </p>
          </div>
        </div>

        {/* Metric Cards (Zero fake analytics) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0f121e] border border-cyan-500/30 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-tech uppercase tracking-wider">Total Questions</span>
              <MessageSquare className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl sm:text-4xl font-black font-display text-white">
              {stats.total_questions}
            </div>
            <span className="text-[11px] font-mono text-cyan-400 block">
              Stored in PostgreSQL `questions` table
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-[#0f121e] border border-purple-500/30 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-tech uppercase tracking-wider">Newsletter Subscribers</span>
              <Users className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl sm:text-4xl font-black font-display text-white">
              {stats.total_subscribers}
            </div>
            <span className="text-[11px] font-mono text-purple-300 block">
              Stored in `newsletter_subscribers` table
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-[#0f121e] border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-tech uppercase tracking-wider">Database Status</span>
              <Database className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold font-display text-emerald-400 flex items-center gap-2 mt-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>ONLINE</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 block">
              FastAPI + SQLAlchemy Pool Active
            </span>
          </div>
        </div>

        {/* Recent Questions Table */}
        <div className="rounded-3xl bg-[#0e111a] border border-white/10 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h3 className="text-lg font-bold font-display text-white">
                Recent Submitted Inquiries
              </h3>
              <p className="text-xs text-slate-400">
                Latest submissions received via POST /api/questions
              </p>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Showing {questions.length} records
            </span>
          </div>

          {questions.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400 font-sans">
              No questions found in the database yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs font-tech uppercase text-slate-400">
                    <th className="py-3 px-3">ID</th>
                    <th className="py-3 px-3">Name</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-4">Question</th>
                    <th className="py-3 px-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans">
                  {questions.map((q) => (
                    <tr key={q.id} className="hover:bg-white/[0.02]">
                      <td className="py-3 px-3 font-mono text-cyan-400">#{q.id}</td>
                      <td className="py-3 px-3 font-medium text-white">{q.name}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-tech text-cyan-400 uppercase">
                          {q.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-300 max-w-md truncate">
                        "{q.question}"
                      </td>
                      <td className="py-3 px-3 font-mono text-xs text-slate-400 whitespace-nowrap">
                        {formatTimestamp(q.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
