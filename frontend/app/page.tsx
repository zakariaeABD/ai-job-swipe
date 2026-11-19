'use client';
import { useEffect, useState } from 'react';
type Job = { id: number; title: string; company: string; location: string; official_url: string | null };
export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [index, setIndex] = useState(0);
  const [saved, setSaved] = useState<Job[]>([]);
  const [error, setError] = useState('');
  useEffect(() => { fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/jobs`).then(r => { if (!r.ok) throw Error('API error'); return r.json(); }).then(setJobs).catch(() => setError('Start the FastAPI backend to load demo jobs.')); }, []);
  const job = jobs[index];
  const swipe = (accept: boolean) => { if (job && accept) setSaved(prev => [...prev, job]); setIndex(prev => prev + 1); };
  return <main className="mx-auto max-w-xl p-8 space-y-6">
    <h1 className="text-4xl font-bold">AI Job Swipe</h1><p className="text-slate-600">Find opportunities. Verify before applying.</p>
    {error && <p role="alert" className="text-red-700">{error}</p>}
    {job ? <section className="rounded-2xl bg-white shadow-lg p-8 space-y-4" aria-label="Job card">
      <p className="text-sm text-amber-700">Verification pending — demo data</p>
      <h2 className="text-2xl font-semibold">{job.title}</h2><p>{job.company} · {job.location}</p>
      <div className="flex gap-3"><button onClick={() => swipe(false)} className="rounded-lg border px-6 py-3">Pass</button><button onClick={() => swipe(true)} className="rounded-lg bg-slate-900 text-white px-6 py-3">Save job</button></div>
    </section> : <p>{jobs.length ? 'You have reviewed all demo jobs.' : 'Loading jobs...'}</p>}
    <section><h2 className="text-xl font-semibold">Saved jobs ({saved.length})</h2><ul>{saved.map(j => <li key={j.id} className="py-2">{j.title} — {j.company}</li>)}</ul><p className="text-sm text-slate-500">Saved jobs are held in browser memory only. No applications are submitted.</p></section>
  </main>;
}