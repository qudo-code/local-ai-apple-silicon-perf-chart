"use client";
import { useState, useMemo } from "react";

const chips = [
  { gen: "M1", tier: "Base",  ram: "8–16",   bw: 68,  price: "$428–999",   priceMin: 428,  maxModels: "7B",       tokS: "~14",    gpu: 8,  tops: 11,   year: 2020, available: "Used/Refurb" },
  { gen: "M1", tier: "Pro",   ram: "16–32",  bw: 200, price: "$800–1200",  priceMin: 800,  maxModels: "13B",      tokS: "~20–30", gpu: 16, tops: 11,   year: 2021, available: "Used/Refurb" },
  { gen: "M1", tier: "Max",   ram: "32–64",  bw: 400, price: "$1200–2000", priceMin: 1200, maxModels: "30B–33B",  tokS: "~25–35", gpu: 32, tops: 11,   year: 2021, available: "Used/Refurb" },
  { gen: "M1", tier: "Ultra", ram: "64–128", bw: 800, price: "$2000–3500", priceMin: 2000, maxModels: "65B–70B",  tokS: "~8–12",  gpu: 64, tops: 22,   year: 2022, available: "Used/Refurb" },
  { gen: "M2", tier: "Base",  ram: "8–24",   bw: 100, price: "$670–899",   priceMin: 670,  maxModels: "7B–8B",    tokS: "~16",    gpu: 10, tops: 15.8, year: 2022, available: "Used/Refurb" },
  { gen: "M2", tier: "Pro",   ram: "16–32",  bw: 200, price: "$1000–1500", priceMin: 1000, maxModels: "13B",      tokS: "~22–32", gpu: 19, tops: 15.8, year: 2023, available: "Used/Refurb" },
  { gen: "M2", tier: "Max",   ram: "32–96",  bw: 400, price: "$1500–2500", priceMin: 1500, maxModels: "30B–65B",  tokS: "~28–38", gpu: 38, tops: 15.8, year: 2023, available: "Used/Refurb" },
  { gen: "M2", tier: "Ultra", ram: "64–192", bw: 800, price: "$3000–5000", priceMin: 3000, maxModels: "70B–120B", tokS: "~10–15", gpu: 76, tops: 31.6, year: 2023, available: "Used/Refurb" },
  { gen: "M3", tier: "Base",  ram: "8–24",   bw: 100, price: "$839–1099",  priceMin: 839,  maxModels: "7B–8B",    tokS: "~18",    gpu: 10, tops: 18,   year: 2023, available: "New/Refurb" },
  { gen: "M3", tier: "Pro",   ram: "18–36",  bw: 150, price: "$1200–1800", priceMin: 1200, maxModels: "13B–14B",  tokS: "~24–30", gpu: 18, tops: 18,   year: 2023, available: "New/Refurb" },
  { gen: "M3", tier: "Max",   ram: "36–128", bw: 400, price: "$2000–3500", priceMin: 2000, maxModels: "30B–70B",  tokS: "~30–40", gpu: 40, tops: 18,   year: 2023, available: "New/Refurb" },
  { gen: "M3", tier: "Ultra", ram: "96–192", bw: 819, price: "$3999+",     priceMin: 3999, maxModels: "70B–120B", tokS: "~12–18", gpu: 80, tops: 36,   year: 2025, available: "New" },
  { gen: "M4", tier: "Base",  ram: "16–32",  bw: 120, price: "$599–1299",  priceMin: 599,  maxModels: "8B–14B",   tokS: "~20",    gpu: 10, tops: 38,   year: 2024, available: "New" },
  { gen: "M4", tier: "Pro",   ram: "24–64",  bw: 273, price: "$1399–2199", priceMin: 1399, maxModels: "14B–33B",  tokS: "~30–38", gpu: 20, tops: 38,   year: 2024, available: "New" },
  { gen: "M4", tier: "Max",   ram: "36–128", bw: 546, price: "$2499–3999", priceMin: 2499, maxModels: "33B–70B",  tokS: "~35–45", gpu: 40, tops: 38,   year: 2024, available: "New" },
  { gen: "M5", tier: "Base",  ram: "16–32",  bw: 154, price: "$1399–1799", priceMin: 1399, maxModels: "8B–14B",   tokS: "~25",    gpu: 10, tops: 45,   year: 2025, available: "New" },
] as const;

type Chip = typeof chips[number];
type Gen = Chip["gen"];

const GC: Record<Gen, { color: string; dim: string; border: string }> = {
  M1: { color: "#F87171", dim: "rgba(248,113,113,0.1)",  border: "rgba(248,113,113,0.25)" },
  M2: { color: "#34D399", dim: "rgba(52,211,153,0.1)",   border: "rgba(52,211,153,0.25)"  },
  M3: { color: "#FBBF24", dim: "rgba(251,191,36,0.1)",   border: "rgba(251,191,36,0.25)"  },
  M4: { color: "#A78BFA", dim: "rgba(167,139,250,0.1)",  border: "rgba(167,139,250,0.25)" },
  M5: { color: "#38BDF8", dim: "rgba(56,189,248,0.1)",   border: "rgba(56,189,248,0.25)"  },
};

const TIER_ORDER: Record<string, number> = { Base: 0, Pro: 1, Max: 2, Ultra: 3 };
const MAX_BW = 819;

const modelGuide = [
  { size: "3B–7B",   ram: "8 GB",       example: "Llama 3.2 3B, Phi-3 Mini, Gemma 2B",    use: "Fast chat, code completion" },
  { size: "8B",      ram: "8–16 GB",    example: "Llama 3.1 8B, Mistral 7B, Qwen2 7B",    use: "General assistant, coding" },
  { size: "13B–14B", ram: "16–24 GB",   example: "Llama 2 13B, Qwen2 14B",                use: "Better reasoning, longer ctx" },
  { size: "30B–33B", ram: "24–48 GB",   example: "Qwen 30B MoE, CodeLlama 34B",           use: "Near-GPT-3.5 quality" },
  { size: "65B–70B", ram: "48–96 GB",   example: "Llama 3.1 70B, Qwen2 72B",             use: "Near-GPT-4 quality" },
  { size: "120B+",   ram: "128–192 GB", example: "Llama 3.1 405B (Q), Falcon 180B",       use: "Frontier-class, research" },
];

function score(c: { bw: number; priceMin: number }) {
  return ((c.bw / c.priceMin) * 100).toFixed(1);
}

export default function Page() {
  const [filterGen, setFilterGen] = useState<string>("All");
  const [sortBy, setSortBy] = useState("default");
  const [showGuide, setShowGuide] = useState(false);

  const filtered = useMemo(() => {
    const result = filterGen === "All" ? [...chips] : chips.filter(c => c.gen === filterGen);
    if (sortBy === "bandwidth") result.sort((a, b) => b.bw - a.bw);
    else if (sortBy === "price") result.sort((a, b) => a.priceMin - b.priceMin);
    else if (sortBy === "value") result.sort((a, b) => parseFloat(score(b)) - parseFloat(score(a)));
    else result.sort((a, b) => {
      const d = parseInt(a.gen.slice(1)) - parseInt(b.gen.slice(1));
      return d !== 0 ? d : TIER_ORDER[a.tier] - TIER_ORDER[b.tier];
    });
    return result;
  }, [filterGen, sortBy]);

  const bestValue = useMemo(() => {
    let best: Chip | null = null, top = 0;
    chips.forEach(c => { const s = parseFloat(score(c)); if (s > top) { top = s; best = c; } });
    return best;
  }, []);

  return (
    <>
      <style>{`
        @keyframes barIn {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
        .anim-up { opacity: 0; animation: fadeUp 0.55s cubic-bezier(0.16,1,0.3,1) forwards; }
        .bw-bar  { transform-origin: left; animation: barIn 0.65s cubic-bezier(0.16,1,0.3,1) forwards; opacity: 0; }
        .chip-row { transition: background 0.1s; }
        .chip-row:hover { background: rgba(255,255,255,0.032) !important; }
        .gen-pill { transition: all 0.12s; }
        .gen-pill:hover { opacity: 1 !important; filter: brightness(1.1); }
      `}</style>

      <div style={{
        background: "#080810",
        minHeight: "100vh",
        color: "#D4D4E8",
        fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
        fontSize: 12,
      }}>

        {/* Grid texture */}
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", padding: "48px 24px 80px" }}>

          {/* ── HEADER ─────────────────────────────────── */}
          <div className="anim-up" style={{ animationDelay: "0s", marginBottom: 44 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 24 }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: "0.22em", color: "#3A3A55", textTransform: "uppercase", marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#34D399", animation: "pulse-dot 2.5s ease-in-out infinite" }} />
                  Local AI Reference · Feb 2026
                </div>
                <h1 style={{
                  margin: 0,
                  fontFamily: "var(--font-syne), sans-serif",
                  fontSize: "clamp(32px, 5.5vw, 60px)",
                  fontWeight: 800,
                  letterSpacing: "-2px",
                  lineHeight: 1.0,
                  color: "#E8E8F8",
                }}>
                  Apple Silicon
                  <br />
                  <span style={{
                    background: "linear-gradient(100deg, #A78BFA 0%, #38BDF8 60%, #34D399 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>× Local LLM</span>
                </h1>
                <p style={{ fontSize: 11, color: "#3D3D58", margin: "14px 0 0", letterSpacing: "0.02em", lineHeight: 1.5 }}>
                  Bandwidth (GB/s) determines inference speed · RAM determines max model size · Assumes Q4 quantization
                </p>
              </div>

              {/* Key stats */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-start" }}>
                {[
                  { label: "Chips", value: "16",         sub: "across 5 gens" },
                  { label: "Max BW",  value: "819 GB/s", sub: "M3 Ultra" },
                  { label: "Max RAM", value: "192 GB",   sub: "M2/M3 Ultra" },
                  { label: "Latest",  value: "M5",       sub: "2025" },
                ].map(s => (
                  <div key={s.label} style={{
                    padding: "10px 16px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 10,
                    minWidth: 90,
                  }}>
                    <div style={{ fontSize: 9, color: "#3A3A55", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#C8C8E0", letterSpacing: "-0.5px" }}>{s.value}</div>
                    <div style={{ fontSize: 9, color: "#2E2E46", marginTop: 2 }}>{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── CONTROLS ───────────────────────────────── */}
          <div className="anim-up" style={{ animationDelay: "0.08s", marginBottom: 16 }}>
            <div style={{
              display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center",
              padding: "10px 14px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 12,
            }}>
              {(["All", "M1", "M2", "M3", "M4", "M5"] as const).map(g => {
                const isAll = g === "All";
                const color = isAll ? "#8888AA" : GC[g as Gen].color;
                const active = filterGen === g;
                return (
                  <button key={g} className="gen-pill" onClick={() => setFilterGen(g)} style={{
                    padding: "4px 13px",
                    borderRadius: 6,
                    border: `1px solid ${active ? color + "60" : "transparent"}`,
                    background: active ? color + "18" : "transparent",
                    color: active ? color : "#3E3E5A",
                    cursor: "pointer",
                    fontSize: 12,
                    fontFamily: "inherit",
                    fontWeight: 600,
                    opacity: active ? 1 : 0.9,
                    letterSpacing: "0.03em",
                  }}>
                    {g}
                  </button>
                );
              })}

              <div style={{ flex: 1 }} />

              <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
                padding: "4px 10px",
                borderRadius: 6,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.04)",
                color: "#666880",
                fontSize: 11,
                fontFamily: "inherit",
                cursor: "pointer",
                outline: "none",
              }}>
                <option value="default">Sort: Generation</option>
                <option value="bandwidth">Sort: Bandwidth ↓</option>
                <option value="price">Sort: Price ↑</option>
                <option value="value">Sort: Value Score ↓</option>
              </select>

              <button onClick={() => setShowGuide(!showGuide)} style={{
                padding: "4px 12px",
                borderRadius: 6,
                border: `1px solid ${showGuide ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.06)"}`,
                background: showGuide ? "rgba(255,255,255,0.06)" : "transparent",
                color: showGuide ? "#A0A0C0" : "#3E3E5A",
                cursor: "pointer",
                fontSize: 11,
                fontFamily: "inherit",
                transition: "all 0.12s",
              }}>
                {showGuide ? "Hide" : "Model"} Guide
              </button>
            </div>
          </div>

          {/* ── MODEL GUIDE ────────────────────────────── */}
          {showGuide && (
            <div className="anim-up" style={{ animationDelay: "0s", marginBottom: 16 }}>
              <div style={{
                padding: 16,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
              }}>
                <div style={{ fontSize: 9, letterSpacing: "0.18em", color: "#3A3A55", textTransform: "uppercase", marginBottom: 12 }}>
                  Model Size → RAM Required (4-bit quantized)
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(175px, 1fr))", gap: 8 }}>
                  {modelGuide.map((m, i) => (
                    <div key={i} style={{
                      padding: "10px 12px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                      borderRadius: 8,
                    }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#D0D0E8" }}>{m.size}</div>
                      <div style={{ fontSize: 10, color: "#A78BFA", margin: "3px 0" }}>~{m.ram}</div>
                      <div style={{ fontSize: 9, color: "#38384E", marginTop: 4, lineHeight: 1.4 }}>{m.example}</div>
                      <div style={{ fontSize: 9, color: "#2E2E44", marginTop: 2, fontStyle: "italic" }}>{m.use}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── TABLE ──────────────────────────────────── */}
          <div className="anim-up" style={{ animationDelay: "0.16s", marginBottom: 20 }}>
            <div style={{
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12,
              overflow: "hidden",
            }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "rgba(255,255,255,0.025)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                      {["Chip", "RAM (GB)", "Bandwidth (GB/s)", "Max Model", "tok/s", "GPU", "TOPS", "Price", "Value", "Status"].map(h => (
                        <th key={h} style={{
                          padding: "9px 14px",
                          textAlign: "left",
                          fontSize: 9,
                          fontWeight: 600,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: "#30304A",
                          whiteSpace: "nowrap",
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((c, i) => {
                      const gc = GC[c.gen as Gen];
                      const isBest = (c as Chip) === bestValue;
                      const bwPct = Math.min((c.bw / MAX_BW) * 100, 100);
                      const valScore = parseFloat(score(c));

                      return (
                        <tr
                          key={`${c.gen}-${c.tier}`}
                          className="chip-row"
                          style={{
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                            background: isBest
                              ? "rgba(52,211,153,0.035)"
                              : i % 2 === 1
                              ? "rgba(255,255,255,0.01)"
                              : "transparent",
                          }}
                        >
                          {/* Chip name */}
                          <td style={{ padding: "11px 14px", whiteSpace: "nowrap" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{ width: 2, height: 32, borderRadius: 1, background: gc.color, flexShrink: 0 }} />
                              <div>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "nowrap" }}>
                                  <span style={{
                                    fontSize: 10, fontWeight: 700, letterSpacing: "0.04em",
                                    color: gc.color,
                                    background: gc.dim,
                                    border: `1px solid ${gc.border}`,
                                    padding: "1px 7px", borderRadius: 4,
                                  }}>{c.gen}</span>
                                  <span style={{ fontWeight: 600, color: "#B8B8D4", fontSize: 12 }}>{c.tier}</span>
                                  {isBest && (
                                    <span style={{
                                      fontSize: 8, fontWeight: 700, letterSpacing: "0.1em",
                                      color: "#34D399",
                                      background: "rgba(52,211,153,0.1)",
                                      border: "1px solid rgba(52,211,153,0.3)",
                                      padding: "1px 5px", borderRadius: 3,
                                    }}>BEST VALUE</span>
                                  )}
                                </div>
                                <div style={{ fontSize: 9, color: "#2E2E46", marginTop: 3 }}>{c.year}</div>
                              </div>
                            </div>
                          </td>

                          {/* RAM */}
                          <td style={{ padding: "11px 14px", color: "#666880" }}>{c.ram}</td>

                          {/* Bandwidth visual */}
                          <td style={{ padding: "11px 14px", minWidth: 160 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
                                <div
                                  className="bw-bar"
                                  style={{
                                    height: "100%",
                                    width: `${bwPct}%`,
                                    background: `linear-gradient(90deg, ${gc.color}, ${gc.color}55)`,
                                    borderRadius: 2,
                                    animationDelay: `${0.18 + i * 0.035}s`,
                                  }}
                                />
                              </div>
                              <span style={{ fontWeight: 700, color: gc.color, fontSize: 12, minWidth: 32, textAlign: "right" }}>{c.bw}</span>
                            </div>
                          </td>

                          {/* Max Model */}
                          <td style={{ padding: "11px 14px", color: "#9090B0" }}>{c.maxModels}</td>

                          {/* tok/s */}
                          <td style={{ padding: "11px 14px", color: "#585870" }}>{c.tokS}</td>

                          {/* GPU */}
                          <td style={{ padding: "11px 14px", color: "#484860" }}>{c.gpu}</td>

                          {/* TOPS */}
                          <td style={{ padding: "11px 14px", color: "#484860" }}>{c.tops}</td>

                          {/* Price */}
                          <td style={{ padding: "11px 14px", color: "#666880", whiteSpace: "nowrap" }}>{c.price}</td>

                          {/* Value score */}
                          <td style={{ padding: "11px 14px" }}>
                            <span style={{
                              fontWeight: 700, fontSize: 12,
                              color: valScore > 20 ? "#34D399" : valScore > 10 ? "#FBBF24" : "#F87171",
                            }}>
                              {score(c)}
                            </span>
                          </td>

                          {/* Status */}
                          <td style={{ padding: "11px 14px" }}>
                            <span style={{
                              fontSize: 10, padding: "2px 8px", borderRadius: 4, whiteSpace: "nowrap",
                              background: c.available === "New"
                                ? "rgba(56,189,248,0.1)"
                                : c.available === "New/Refurb"
                                ? "rgba(167,139,250,0.1)"
                                : "rgba(255,255,255,0.04)",
                              color: c.available === "New"
                                ? "#38BDF8"
                                : c.available === "New/Refurb"
                                ? "#A78BFA"
                                : "#484860",
                              border: `1px solid ${c.available === "New"
                                ? "rgba(56,189,248,0.22)"
                                : c.available === "New/Refurb"
                                ? "rgba(167,139,250,0.22)"
                                : "rgba(255,255,255,0.06)"}`,
                            }}>
                              {c.available}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* ── INSIGHTS ───────────────────────────────── */}
          <div className="anim-up" style={{ animationDelay: "0.24s", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10, marginBottom: 36 }}>
            {[
              { tag: "VALUE",  color: "#34D399", title: "Best Bang for Buck",   body: "M2 Ultra (used ~$3K) gives 800 GB/s and up to 192GB RAM — run 70B+ models at great speed." },
              { tag: "PICK",   color: "#A78BFA", title: "Sweet Spot Buy",        body: "M4 Pro 48GB ($1,599+) — 273 GB/s, runs 14B–33B Q4 models smoothly. Best new-purchase value." },
              { tag: "SPEED",  color: "#F87171", title: "Speed King",            body: "M4 Max 128GB ($3,999) — 546 GB/s, runs 70B models at 35–45 tok/s. Serious local AI." },
              { tag: "THEORY", color: "#FBBF24", title: "The Key Metric",        body: "Bandwidth (GB/s) = token generation speed. RAM = max model size. Bigger isn't always faster." },
            ].map((ins, i) => (
              <div key={i} style={{
                padding: "14px 16px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderTop: `2px solid ${ins.color}`,
                borderRadius: 10,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{
                    fontSize: 8, fontWeight: 700, letterSpacing: "0.12em",
                    color: ins.color,
                    border: `1px solid ${ins.color}44`,
                    padding: "2px 6px", borderRadius: 3,
                  }}>{ins.tag}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#B8B8D4" }}>{ins.title}</span>
                </div>
                <p style={{ margin: 0, fontSize: 11, color: "#484860", lineHeight: 1.6 }}>{ins.body}</p>
              </div>
            ))}
          </div>

          {/* ── FOOTER ─────────────────────────────────── */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 16, fontSize: 10, color: "#2A2A3E", lineHeight: 1.8 }}>
            tok/s estimates at max model size via llama.cpp or MLX. Smaller models run proportionally faster.
            Value score = (BW / min price) × 100. Prices reflect Feb 2026 new/refurb street prices.
            ~75% of unified memory available for GPU by default. M4 Ultra &amp; M5 Pro/Max/Ultra not yet released.
            <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.03)", color: "#222233" }}>
              ⚠ Data aggregated via Claude web search. Do your own research before purchasing — specs, pricing, and availability change frequently.
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
