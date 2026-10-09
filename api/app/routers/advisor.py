import os
from pathlib import Path

import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

GEMINI_MODEL = "gemini-3.8-flash"
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent"
SYSTEM_PROMPT = (
    "You are an expert Indian income tax advisor. Help with ITR filing "
    "(ITR-1 to ITR-7), tax planning, deductions under 80C/80D/80E/80G, "
    "HRA exemption, capital gains tax, TDS, advance tax, and tax-saving "
    "investments. Explain in simple language for Indian taxpayers."
)
KEY_FILE = Path(__file__).resolve().parent.parent.parent / "keys" / "gemini-api-key"


def _get_api_key() -> str:
    key = os.environ.get("GEMINI_API_KEY", "")
    if key:
        return key
    if KEY_FILE.exists():
        return KEY_FILE.read_text().strip()
    return ""


class HistoryItem(BaseModel):
    role: str
    text: str


class AdvisorRequest(BaseModel):
    message: str
    history: list[HistoryItem] = []


@router.post("/api/advisor/ask")
async def ask_advisor(req: AdvisorRequest):
    api_key = _get_api_key()
    if not api_key:
        raise HTTPException(status_code=500, detail="Gemini API key not configured")

    contents = [
        {"role": "user", "parts": [{"text": SYSTEM_PROMPT}]},
        {"role": "model", "parts": [{"text": "Understood. I am ready to help with Indian income tax queries."}]},
    ]
    for item in req.history:
        contents.append({
            "role": "user" if item.role == "user" else "model",
            "parts": [{"text": item.text}],
        })
    contents.append({"role": "user", "parts": [{"text": req.message}]})

    async with httpx.AsyncClient(timeout=30) as client:
        try:
            resp = await client.post(
                GEMINI_URL,
                params={"key": api_key},
                json={"contents": contents},
            )
            resp.raise_for_status()
            data = resp.json()
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=502, detail=f"Gemini API error: {e.response.status_code}")
        except httpx.RequestError:
            raise HTTPException(status_code=502, detail="Failed to reach Gemini API")

    reply = ""
    try:
        reply = data["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError):
        reply = "Sorry, I could not generate a response. Please try again."

    return {"reply": reply}
