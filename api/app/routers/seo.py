import json
from datetime import date
from pathlib import Path

from fastapi import APIRouter
from fastapi.responses import Response

router = APIRouter()

BASE_URL = "https://tax.doaide.com"

# Single source of truth shared with the web build (prerender) — see web/src/seo/routes.json.
ROUTES_FILE = Path(__file__).resolve().parents[3] / "web" / "src" / "seo" / "routes.json"
PAGES = json.loads(ROUTES_FILE.read_text())


@router.get("/sitemap.xml")
def sitemap():
    today = date.today().isoformat()
    urls = []
    for page in PAGES:
        priority = "1.0" if page == "/" else "0.8" if page.startswith("/guides/") or page.startswith("/compare/") else "0.9"
        freq = "weekly" if page == "/" else "monthly"
        urls.append(
            f"  <url>\n"
            f"    <loc>{BASE_URL}{page}</loc>\n"
            f"    <lastmod>{today}</lastmod>\n"
            f"    <changefreq>{freq}</changefreq>\n"
            f"    <priority>{priority}</priority>\n"
            f"  </url>"
        )
    xml = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "\n".join(urls)
        + "\n</urlset>\n"
    )
    return Response(content=xml, media_type="application/xml")


@router.get("/robots.txt")
def robots():
    content = (
        "User-agent: *\n"
        "Allow: /\n"
        f"Sitemap: {BASE_URL}/sitemap.xml\n"
    )
    return Response(content=content, media_type="text/plain")
