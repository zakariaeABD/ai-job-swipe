from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
from typing import Optional
from urllib.parse import urlparse

app = FastAPI(title="AI Job Swipe API", version="0.1.0")
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:3000"], allow_methods=["GET"], allow_headers=["*"])

JOBS = [
    {"id": 1, "title": "Junior Python Developer", "company": "Example Labs", "location": "Remote", "source_url": "https://example.com/jobs/1", "official_url": None},
    {"id": 2, "title": "Frontend Engineer", "company": "Demo Studio", "location": "Paris", "source_url": "https://example.org/jobs/2", "official_url": None},
]

class VerifyRequest(BaseModel):
    source_url: HttpUrl
    official_url: Optional[HttpUrl] = None

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/jobs")
def jobs():
    return JOBS

@app.post("/verify")
def verify_job(payload: VerifyRequest):
    if payload.official_url is None:
        return {"status": "unverified", "confidence_score": 0, "reason": "No official listing URL supplied"}
    source = urlparse(str(payload.source_url))
    official = urlparse(str(payload.official_url))
    if official.scheme != "https":
        raise HTTPException(400, "Official URL must use HTTPS")
    return {"status": "needs_review", "confidence_score": 0, "reason": "Official URL supplied but page contents not yet checked", "source_host": source.hostname, "official_host": official.hostname}
