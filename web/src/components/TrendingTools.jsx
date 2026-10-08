import { useMemo } from "react";
import { TRENDING_TOOLS } from "../lib/doaideViral";

const section = {
  marginTop: 48,
  padding: "24px",
  background: "var(--doaide-surface)",
  border: "1px solid var(--doaide-border)",
  borderRadius: "var(--doaide-radius-lg)",
};

const heading = {
  fontFamily: "var(--doaide-font-display)",
  fontSize: 20,
  marginBottom: 16,
  color: "var(--doaide-text)",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: 12,
};

const card = {
  display: "block",
  padding: "16px",
  background: "var(--doaide-gold-bg)",
  border: "1px solid var(--doaide-gold-dim)",
  borderRadius: "var(--doaide-radius-lg)",
  textDecoration: "none",
  color: "var(--doaide-text)",
  transition: "all var(--doaide-transition)",
};

const cardName = {
  fontSize: 14,
  fontWeight: 600,
};

const cardProduct = {
  fontSize: 11,
  color: "var(--doaide-text-muted)",
  marginTop: 4,
};

export default function TrendingTools() {
  const shown = useMemo(() => {
    const day = new Date().getDate();
    const shuffled = [...TRENDING_TOOLS];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = (day + i * 7) % (i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 6);
  }, []);

  return (
    <div style={section}>
      <div style={heading}>
        <span role="img" aria-label="fire">🔥</span> Trending on DoAide
      </div>
      <div style={grid}>
        {shown.map((tool) => (
          <a
            key={tool.url}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            style={card}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--doaide-gold)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--doaide-gold-dim)"; e.currentTarget.style.transform = "none"; }}
          >
            <div style={cardName}>
              <span style={{ marginRight: 6 }}>{tool.icon}</span>
              {tool.name}
            </div>
            <div style={cardProduct}>on DoAide {tool.product}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
