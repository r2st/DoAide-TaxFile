import json
from datetime import datetime
from pathlib import Path

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

FEEDBACK_FILE = Path(__file__).resolve().parent.parent.parent / "feedback.json"


class FeedbackItem(BaseModel):
    rating: str
    comment: str | None = None
    page: str | None = None
    timestamp: str | None = None


@router.post("/api/feedback", status_code=201)
def submit_feedback(item: FeedbackItem):
    if item.rating not in ("up", "down"):
        raise HTTPException(status_code=422, detail="rating must be 'up' or 'down'")
    entry = item.model_dump()
    if not entry.get("timestamp"):
        entry["timestamp"] = datetime.utcnow().isoformat()

    data = []
    if FEEDBACK_FILE.exists():
        try:
            data = json.loads(FEEDBACK_FILE.read_text())
        except (json.JSONDecodeError, OSError):
            data = []

    data.append(entry)
    FEEDBACK_FILE.write_text(json.dumps(data, indent=2))
    return {"ok": True}
