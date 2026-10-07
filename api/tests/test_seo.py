from app.routers.seo import PAGES, BASE_URL


class TestSitemapPages:
    def test_has_homepage(self):
        assert "/" in PAGES

    def test_has_all_calculators(self):
        expected_calculators = [
            "/income-tax-calculator",
            "/hra-calculator",
            "/tds-calculator",
            "/ppf-calculator",
            "/sip-calculator",
            "/fd-calculator",
            "/emi-calculator",
            "/ssy-calculator",
            "/epf-calculator",
            "/refund-calculator",
            "/professional-tax-calculator",
        ]
        for calc in expected_calculators:
            assert calc in PAGES, f"Missing: {calc}"

    def test_has_guides(self):
        assert "/guides" in PAGES
        guide_pages = [p for p in PAGES if p.startswith("/guides/")]
        assert len(guide_pages) == 4

    def test_minimum_page_count(self):
        assert len(PAGES) >= 35

    def test_base_url(self):
        assert BASE_URL == "https://tax.doaide.com"

    def test_no_duplicate_pages(self):
        assert len(PAGES) == len(set(PAGES))


class TestSitemapRoute:
    def test_sitemap_xml(self):
        from fastapi.testclient import TestClient
        from app.main import app

        client = TestClient(app)
        response = client.get("/sitemap.xml")
        assert response.status_code == 200
        assert response.headers["content-type"].startswith("application/xml")
        body = response.text
        assert '<?xml version="1.0"' in body
        assert "<urlset" in body
        assert "<loc>https://tax.doaide.com/</loc>" in body
        assert "<loc>https://tax.doaide.com/income-tax-calculator</loc>" in body
        assert "<loc>https://tax.doaide.com/ssy-calculator</loc>" in body
        assert "<loc>https://tax.doaide.com/guides</loc>" in body

    def test_robots_txt(self):
        from fastapi.testclient import TestClient
        from app.main import app

        client = TestClient(app)
        response = client.get("/robots.txt")
        assert response.status_code == 200
        assert "text/plain" in response.headers["content-type"]
        body = response.text
        assert "User-agent: *" in body
        assert "Sitemap: https://tax.doaide.com/sitemap.xml" in body
