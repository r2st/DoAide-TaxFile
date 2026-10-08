import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRecentTools } from "../lib/doaideViral";

const section = {
  marginTop: 24,
  marginBottom: 8,
  padding: "16px 20px",
  background: "var(--doaide-gold-bg)",
  border: "1px solid var(--doaide-gold-dim)",
  borderRadius: "var(--doaide-radius-lg)",
};

const title = {
  fontSize: 13,
  fontWeight: 600,
  color: "var(--doaide-gold)",
  textTransform: "uppercase",
  letterSpacing: 0.5,
  marginBottom: 10,
};

const row = {
  display: "flex",
  gap: 8,
  overflowX: "auto",
  paddingBottom: 4,
};

const chip = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "8px 16px",
  background: "var(--doaide-surface)",
  border: "1px solid var(--doaide-border)",
  borderRadius: 20,
  textDecoration: "none",
  color: "var(--doaide-text)",
  fontSize: 13,
  fontWeight: 500,
  whiteSpace: "nowrap",
  transition: "all var(--doaide-transition)",
};

const cta = {
  fontSize: 11,
  fontWeight: 700,
  color: "var(--doaide-gold)",
};

export default function RecentTools() {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    setRecent(getRecentTools());
  }, []);

  if (recent.length === 0) return null;

  return (
    <div style={section}>
      <div style={title}>Pick up where you left off</div>
      <div style={row}>
        {recent.map((tool) => (
          <Link
            key={tool.path}
            to={tool.path}
            style={chip}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--doaide-gold)"; e.currentTarget.style.color = "var(--doaide-gold)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--doaide-border)"; e.currentTarget.style.color = "var(--doaide-text)"; }}
          >
            <span>{tool.name}</span>
            <span style={cta}>Continue &rarr;</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
