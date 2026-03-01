"use client";
import { useState, useMemo } from "react";

const chips = [
  // M1 family
  { gen: "M1", tier: "Base", ram: "8–16", bw: 68, price: "$428–999", priceMin: 428, maxModels: "7B", tokS: "~14", gpu: 8, neural: 16, tops: 11, year: 2020, available: "Used/Refurb" },
  { gen: "M1", tier: "Pro", ram: "16–32", bw: 200, price: "$800–1200", priceMin: 800, maxModels: "13B", tokS: "~20–30", gpu: 16, neural: 16, tops: 11, year: 2021, available: "Used/Refurb" },
  { gen: "M1", tier: "Max", ram: "32–64", bw: 400, price: "$1200–2000", priceMin: 1200, maxModels: "30B–33B", tokS: "~25–35", gpu: 32, neural: 16, tops: 11, year: 2021, available: "Used/Refurb" },
  { gen: "M1", tier: "Ultra", ram: "64–128", bw: 800, price: "$2000–3500", priceMin: 2000, maxModels: "65B–70B", tokS: "~8–12", gpu: 64, neural: 32, tops: 22, year: 2022, available: "Used/Refurb" },

  // M2 family
  { gen: "M2", tier: "Base", ram: "8–24", bw: 100, price: "$670–899", priceMin: 670, maxModels: "7B–8B", tokS: "~16", gpu: 10, neural: 16, tops: 15.8, year: 2022, available: "Used/Refurb" },
  { gen: "M2", tier: "Pro", ram: "16–32", bw: 200, price: "$1000–1500", priceMin: 1000, maxModels: "13B", tokS: "~22–32", gpu: 19, neural: 16, tops: 15.8, year: 2023, available: "Used/Refurb" },
  { gen: "M2", tier: "Max", ram: "32–96", bw: 400, price: "$1500–2500", priceMin: 1500, maxModels: "30B–65B", tokS: "~28–38", gpu: 38, neural: 16, tops: 15.8, year: 2023, available: "Used/Refurb" },
  { gen: "M2", tier: "Ultra", ram: "64–192", bw: 800, price: "$3000–5000", priceMin: 3000, maxModels: "70B–120B", tokS: "~10–15", gpu: 76, neural: 32, tops: 31.6, year: 2023, available: "Used/Refurb" },

  // M3 family
  { gen: "M3", tier: "Base", ram: "8–24", bw: 100, price: "$839–1099", priceMin: 839, maxModels: "7B–8B", tokS: "~18", gpu: 10, neural: 16, tops: 18, year: 2023, available: "New/Refurb" },
  { gen: "M3", tier: "Pro", ram: "18–36", bw: 150, price: "$1200–1800", priceMin: 1200, maxModels: "13B–14B", tokS: "~24–30", gpu: 18, neural: 16, tops: 18, year: 2023, available: "New/Refurb" },
  { gen: "M3", tier: "Max", ram: "36–128", bw: 400, price: "$2000–3500", priceMin: 2000, maxModels: "30B–70B", tokS: "~30–40", gpu: 40, neural: 16, tops: 18, year: 2023, available: "New/Refurb" },
  { gen: "M3", tier: "Ultra", ram: "96–192", bw: 819, price: "$3999+", priceMin: 3999, maxModels: "70B–120B", tokS: "~12–18", gpu: 80, neural: 32, tops: 36, year: 2025, available: "New" },

  // M4 family
  { gen: "M4", tier: "Base", ram: "16–32", bw: 120, price: "$599–1299", priceMin: 599, maxModels: "8B–14B", tokS: "~20", gpu: 10, neural: 16, tops: 38, year: 2024, available: "New" },
  { gen: "M4", tier: "Pro", ram: "24–64", bw: 273, price: "$1399–2199", priceMin: 1399, maxModels: "14B–33B", tokS: "~30–38", gpu: 20, neural: 16, tops: 38, year: 2024, available: "New" },
  { gen: "M4", tier: "Max", ram: "36–128", bw: 546, price: "$2499–3999", priceMin: 2499, maxModels: "33B–70B", tokS: "~35–45", gpu: 40, neural: 16, tops: 38, year: 2024, available: "New" },

  // M5 family
  { gen: "M5", tier: "Base", ram: "16–32", bw: 154, price: "$1399–1799", priceMin: 1399, maxModels: "8B–14B", tokS: "~25", gpu: 10, neural: 16, tops: 45, year: 2025, available: "New" },
];

const genColors = {
  M1: { bg: "#1a1a2e", text: "#e94560", accent: "#e94560", ring: "rgba(233,69,96,0.15)" },
  M2: { bg: "#1a1a2e", text: "#0f9b8e", accent: "#0f9b8e", ring: "rgba(15,155,142,0.15)" },
  M3: { bg: "#1a1a2e", text: "#f5a623", accent: "#f5a623", ring: "rgba(245,166,35,0.15)" },
  M4: { bg: "#1a1a2e", text: "#7b68ee", accent: "#7b68ee", ring: "rgba(123,104,238,0.15)" },
  M5: { bg: "#1a1a2e", text: "#00d4ff", accent: "#00d4ff", ring: "rgba(0,212,255,0.15)" },
};

const tierOrder = { Base: 0, Pro: 1, Max: 2, Ultra: 3 };

const modelGuide = [
  { size: "3B–7B", ram: "8 GB", example: "Llama 3.2 3B, Phi-3 Mini, Gemma 2B", use: "Fast chat, code completion" },
  { size: "8B", ram: "8–16 GB", example: "Llama 3.1 8B, Mistral 7B, Qwen2 7B", use: "General assistant, coding" },
  { size: "13B–14B", ram: "16–24 GB", example: "Llama 2 13B, Qwen2 14B", use: "Better reasoning, longer context" },
  { size: "30B–33B", ram: "24–48 GB", example: "Qwen 30B MoE, CodeLlama 34B", use: "Near-GPT-3.5 quality" },
  { size: "65B–70B", ram: "48–96 GB", example: "Llama 3.1 70B, Qwen2 72B", use: "Near-GPT-4 quality" },
  { size: "120B+", ram: "128–192 GB", example: "Llama 3.1 405B (heavy Q), Falcon 180B", use: "Frontier-class, research" },
];

function getBwColor(bw: number) {
  if (bw >= 800) return "#00ff88";
  if (bw >= 500) return "#7bff7b";
  if (bw >= 300) return "#b8e986";
  if (bw >= 150) return "#f5d76e";
  if (bw >= 100) return "#f7a541";
  return "#e74c3c";
}

function getValueScore(chip: { bw: number; priceMin: number }) {
  return ((chip.bw / chip.priceMin) * 100).toFixed(1);
}

export default function AppleSiliconLLMChart() {
  const [filterGen, setFilterGen] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [showGuide, setShowGuide] = useState(false);

  const filtered = useMemo(() => {
    let result = filterGen === "All" ? [...chips] : chips.filter(c => c.gen === filterGen);
    if (sortBy === "bandwidth") result.sort((a, b) => b.bw - a.bw);
    else if (sortBy === "price") result.sort((a, b) => a.priceMin - b.priceMin);
    else if (sortBy === "value") result.sort((a, b) => parseFloat(getValueScore(b)) - parseFloat(getValueScore(a)));
    else result.sort((a, b) => {
      const genDiff = parseInt(a.gen.slice(1)) - parseInt(b.gen.slice(1));
      // @ts-expect-error
      return genDiff !== 0 ? genDiff : tierOrder[a.tier] - tierOrder[b.tier];
    });
    return result;
  }, [filterGen, sortBy]);

  const bestValue = useMemo(() => {
    let best = null;
    let bestScore = 0;
    chips.forEach(c => {
      const s = parseFloat(getValueScore(c));
      if (s > bestScore) { bestScore = s; best = c; }
    });
    return best;
  }, []);

  return (
    <div style={{
      fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
      background: "linear-gradient(145deg, #0a0a1a 0%, #111128 50%, #0d0d20 100%)",
      color: "#e0e0e0",
      minHeight: "100vh",
      padding: "24px 16px",
    }}>
      {/* Header */}
      <div style={{ maxWidth: 1100, margin: "0 auto 24px" }}>
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 28,
          fontWeight: 700,
          margin: 0,
          background: "linear-gradient(90deg, #00d4ff, #7b68ee, #e94560)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: "-0.5px",
        }}>
          Apple M-Chip × Local LLM Guide
        </h1>
        <p style={{ fontSize: 13, color: "#888", margin: "6px 0 0", fontWeight: 300 }}>
          Memory bandwidth = LLM speed · RAM = max model size · All models assume 4-bit quantization (Q4)
        </p>
      </div>

      {/* Controls */}
      <div style={{ maxWidth: 1100, margin: "0 auto 16px", display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        {["All", "M1", "M2", "M3", "M4", "M5"].map(g => (
            
          <button key={g} onClick={() => setFilterGen(g)} style={{
            padding: "6px 14px",
            borderRadius: 6,
            // @ts-expect-error
            border: filterGen === g ? `1.5px solid ${g === "All" ? "#888" : genColors[g]?.accent}` : "1.5px solid #333",
            // @ts-expect-error
            background: filterGen === g ? (g === "All" ? "rgba(255,255,255,0.08)" : genColors[g]?.ring) : "transparent",
            // @ts-expect-error
            color: filterGen === g ? (g === "All" ? "#fff" : genColors[g]?.text) : "#777",
            cursor: "pointer",
            fontSize: 12,
            fontFamily: "inherit",
            fontWeight: 500,
            transition: "all 0.15s",
          }}>
            {g}
          </button>
        ))}

        <div style={{ flex: 1 }} />

        <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
          padding: "6px 12px",
          borderRadius: 6,
          border: "1.5px solid #333",
          background: "#111",
          color: "#aaa",
          fontSize: 12,
          fontFamily: "inherit",
          cursor: "pointer",
        }}>
          <option value="default">Sort: Generation</option>
          <option value="bandwidth">Sort: Bandwidth ↓</option>
          <option value="price">Sort: Price ↑</option>
          <option value="value">Sort: Value Score ↓</option>
        </select>

        <button onClick={() => setShowGuide(!showGuide)} style={{
          padding: "6px 14px",
          borderRadius: 6,
          border: "1.5px solid #444",
          background: showGuide ? "rgba(255,255,255,0.08)" : "transparent",
          color: "#aaa",
          cursor: "pointer",
          fontSize: 12,
          fontFamily: "inherit",
        }}>
          {showGuide ? "Hide" : "Show"} Model Guide
        </button>
      </div>

      {/* Model size guide */}
      {showGuide && (
        <div style={{ maxWidth: 1100, margin: "0 auto 16px" }}>
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid #222",
            borderRadius: 10,
            padding: 16,
            overflowX: "auto",
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: "#ccc" }}>Model Size → RAM Needed (4-bit quantized)</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 8 }}>
              {modelGuide.map((m, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: 8,
                  padding: "10px 12px",
                  border: "1px solid #1a1a1a",
                }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{m.size}</div>
                  <div style={{ fontSize: 11, color: "#7b68ee", marginTop: 2 }}>Needs ~{m.ram}</div>
                  <div style={{ fontSize: 10, color: "#666", marginTop: 4 }}>{m.example}</div>
                  <div style={{ fontSize: 10, color: "#555", marginTop: 2, fontStyle: "italic" }}>{m.use}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ maxWidth: 1100, margin: "0 auto", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0 4px", fontSize: 12 }}>
          <thead>
            <tr style={{ color: "#555", textTransform: "uppercase", fontSize: 10, letterSpacing: "0.8px" }}>
              <th style={{ textAlign: "left", padding: "8px 12px" }}>Chip</th>
              <th style={{ textAlign: "left", padding: "8px 10px" }}>RAM (GB)</th>
              <th style={{ textAlign: "left", padding: "8px 10px" }}>BW (GB/s)</th>
              <th style={{ textAlign: "left", padding: "8px 10px" }}>Max Model</th>
              <th style={{ textAlign: "left", padding: "8px 10px" }}>~tok/s</th>
              <th style={{ textAlign: "left", padding: "8px 10px" }}>GPU Cores</th>
              <th style={{ textAlign: "left", padding: "8px 10px" }}>NE TOPS</th>
              <th style={{ textAlign: "left", padding: "8px 10px" }}>Price Range</th>
              <th style={{ textAlign: "left", padding: "8px 10px" }}>Value</th>
              <th style={{ textAlign: "left", padding: "8px 10px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => {
                // @ts-expect-error
              const col = genColors[c.gen];
              const isBest = c === bestValue;
              return (
                <tr key={i} style={{
                  background: isBest ? "rgba(0,255,136,0.04)" : "rgba(255,255,255,0.015)",
                }}>
                  <td style={{ padding: "10px 12px", fontWeight: 600, borderLeft: `3px solid ${col.accent}` }}>
                    <span style={{ color: col.text }}>{c.gen}</span>
                    <span style={{ color: "#999", marginLeft: 4 }}>{c.tier}</span>
                    {isBest && <span style={{
                      marginLeft: 6,
                      fontSize: 9,
                      background: "rgba(0,255,136,0.15)",
                      color: "#00ff88",
                      padding: "2px 6px",
                      borderRadius: 4,
                      fontWeight: 600,
                    }}>BEST VALUE</span>}
                  </td>
                  <td style={{ padding: "10px" }}>{c.ram}</td>
                  <td style={{ padding: "10px" }}>
                    <span style={{ color: getBwColor(c.bw), fontWeight: 600 }}>{c.bw}</span>
                    <div style={{
                      marginTop: 3,
                      height: 3,
                      borderRadius: 2,
                      background: "#1a1a1a",
                      width: 60,
                    }}>
                      <div style={{
                        height: "100%",
                        borderRadius: 2,
                        width: `${Math.min((c.bw / 820) * 100, 100)}%`,
                        background: getBwColor(c.bw),
                      }} />
                    </div>
                  </td>
                  <td style={{ padding: "10px", color: "#ddd" }}>{c.maxModels}</td>
                  <td style={{ padding: "10px", color: "#bbb" }}>{c.tokS}</td>
                  <td style={{ padding: "10px", color: "#888" }}>{c.gpu}</td>
                  <td style={{ padding: "10px", color: "#888" }}>{c.tops}</td>
                  <td style={{ padding: "10px", color: "#aaa", fontSize: 11 }}>{c.price}</td>
                  <td style={{ padding: "10px" }}>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: parseFloat(getValueScore(c)) > 20 ? "#00ff88" : parseFloat(getValueScore(c)) > 10 ? "#f5d76e" : "#e74c3c",
                    }}>
                      {getValueScore(c)}
                    </span>
                  </td>
                  <td style={{ padding: "10px" }}>
                    <span style={{
                      fontSize: 10,
                      padding: "2px 8px",
                      borderRadius: 4,
                      background: c.available === "New" ? "rgba(0,212,255,0.1)" : "rgba(255,255,255,0.05)",
                      color: c.available === "New" ? "#00d4ff" : "#666",
                      border: `1px solid ${c.available === "New" ? "rgba(0,212,255,0.2)" : "#222"}`,
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

      {/* Key Insights */}
      <div style={{ maxWidth: 1100, margin: "20px auto 0" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 12,
        }}>
          <InsightCard
            title="Best Bang for Buck"
            emoji="💰"
            text="M2 Ultra (used ~$3K) gives 800 GB/s bandwidth and up to 192GB RAM — run 70B+ models at great speed."
            accent="#00ff88"
          />
          <InsightCard
            title="Sweet Spot for Most"
            emoji="⚡"
            text="M4 Pro 48GB ($1,599+) — 273 GB/s, runs 14B–33B Q4 models smoothly. Best new-purchase value."
            accent="#7b68ee"
          />
          <InsightCard
            title="Speed King"
            emoji="🏎️"
            text="M4 Max 128GB ($3,999) — 546 GB/s lets you run 70B models at 35–45 tok/s. Serious local AI."
            accent="#e94560"
          />
          <InsightCard
            title="The Key Metric"
            emoji="📐"
            text="Memory bandwidth (GB/s) determines token generation speed. RAM determines max model size. Both matter."
            accent="#f5a623"
          />
        </div>
      </div>

      {/* Footer */}
      <div style={{ maxWidth: 1100, margin: "20px auto 0", fontSize: 10, color: "#444", lineHeight: 1.6 }}>
        <p>
          <strong style={{ color: "#555" }}>Notes:</strong> Token/s estimates are for the max model size at Q4 quantization using llama.cpp or MLX. Smaller models run faster.
          Value score = (bandwidth / min price) × 100. Prices reflect Feb 2026 new/refurb street prices. M5 Pro/Max/Ultra not yet released.
          ~75% of unified memory is available for GPU by default. The M4 Ultra has not been released.
        </p>
      </div>
    </div>
  );
}

function InsightCard({ title, emoji, text, accent }: { title: string; emoji: string; text: string; accent: string }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.02)",
      border: `1px solid ${accent}22`,
      borderRadius: 10,
      padding: "14px 16px",
      borderLeft: `3px solid ${accent}`,
    }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: accent, marginBottom: 6 }}>
        {emoji} {title}
      </div>
      <div style={{ fontSize: 11, color: "#999", lineHeight: 1.5 }}>{text}</div>
    </div>
  );
}
