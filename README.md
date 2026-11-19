# AI Job Swipe — Ghost Job Detector (MVP Scaffold)

An early-stage job discovery application aiming to reduce wasted applications by detecting suspicious or unverified job listings and eventually generating tailored ATS-friendly CVs.

## Current implementation
- Next.js 15 + TypeScript + Tailwind CSS demo job-card UI with Pass / Save actions
- FastAPI `/health`, `/jobs`, and `/verify` endpoints
- Conservative verification placeholder: **does not fetch or verify external career pages yet**
- Supabase PostgreSQL schema with row-level security enabled and user-scoped application policies
- Backend API tests

**Not implemented:** Supabase connectivity and login, live job ingestion, external verification, persistence of saved jobs, AI CV generation, automatic applications, deployment. Demo job records are fictional. Verification scores are not evidence of legitimacy.

## Run backend
```bash
cd backend
python -m venv .venv
# macOS/Linux: source .venv/bin/activate
# Windows PowerShell: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn app.main:app --reload
```
API docs: http://localhost:8000/docs

## Run frontend
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:3000 (requires backend on port 8000).

## Test backend
```bash
cd backend
pytest -q
```

## Supabase setup (future integration)
Create a Supabase project and apply `supabase/schema.sql`. Never commit credentials. Implement authentication and authorized data access before enabling production data.

## Next milestones
1. Wire Supabase Auth and persistent saved jobs with authorization tests.
2. Ingest listings from authorized feeds and official company career pages.
3. Verify URLs, timestamps, and duplicates with rate limits and caching; inconclusive results stay `unverified`.
4. Generate truthful, user-approved LaTeX CV drafts and track applications.

No automated job applications, no bypassing access restrictions, no fabricated CV claims, and no secrets in this repository.

## License
Prototype scaffold for evaluation; no license granted for third-party reuse.