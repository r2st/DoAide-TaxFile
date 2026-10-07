from datetime import date

from fastapi import APIRouter
from fastapi.responses import Response

router = APIRouter()

BASE_URL = "https://tax.doaide.com"

PAGES = [
    "/",
    "/income-tax-calculator",
    "/itr-form-selector",
    "/hra-calculator",
    "/80c-planner",
    "/capital-gains-calculator",
    "/tds-calculator",
    "/advance-tax-calculator",
    "/rent-receipt-generator",
    "/form-16-analyzer",
    "/tax-refund-status",
    "/standard-deduction-calculator",
    "/nps-calculator",
    "/home-loan-calculator",
    "/senior-citizen-calculator",
    "/take-home-salary-calculator",
    "/gratuity-calculator",
    "/ppf-calculator",
    "/sip-calculator",
    "/fd-calculator",
    "/mutual-fund-calculator",
    "/emi-calculator",
    "/compound-interest-calculator",
    "/80d-calculator",
    "/salary-tax-optimizer",
    "/ssy-calculator",
    "/epf-calculator",
    "/elss-vs-ppf-vs-fd",
    "/tax-loss-harvesting",
    "/form-16-decoder",
    "/refund-calculator",
    "/professional-tax-calculator",
    "/calculators/stamp-duty",
    "/calculators/rental-income",
    "/guides",
    "/guides/income-tax-slabs-2026-27",
    "/guides/section-80c-deductions",
    "/guides/how-to-file-itr-online",
    "/guides/best-tax-saving-salaried",
    "/guides/save-tax-new-regime",
    "/guides/nps-vs-ppf-vs-elss",
    "/guides/advance-tax",
    "/guides/tax-on-salary",
    "/guides/old-vs-new-regime",
    "/guides/tax-saving-tips",
    "/guides/home-loan-tax",
    "/guides/hra-exemption-calculation",
    "/guides/capital-gains-mutual-funds",
    "/guides/section-80c-complete-list",
    "/compare/cleartax",
    "/compare/tax2win",
    "/best-income-tax-calculator",
    "/gst-calculator",
    "/lumpsum-calculator",
    "/rd-calculator",
    "/swp-calculator",
    "/cagr-calculator",
    "/inflation-calculator",
    "/retirement-calculator",
]


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
