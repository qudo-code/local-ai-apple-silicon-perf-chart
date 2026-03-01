"use client";
import { useState, useMemo } from "react";

const chips = [
  { gen: "M1", tier: "Base", ram: "8–16", bw: 68, price: "$428–999", priceMin: 428, maxModels: "7B", tokS: "~14", gpu: 8, tops: 11, year: 2020, available: "Used/Refurb" },
  { gen: "M1", tier: "Pro", ram: "16–32", bw: 200, price: "$800–1200", priceMin: 800, maxModels: "13B", tokS: "~20–30", gpu: 16, tops: 11, year: 2021, available: "Used/Refurb" },
  { gen: "M1", tier: "Max", ram: "32–64", bw: 400, price: "$1200–2000", priceMin: 1200, maxModels: "30B–33B", tokS: "~25–35", gpu: 32, tops: 11, year: 2021, available: "Used/Refurb" },
  { gen: "M1", tier: "Ultra", ram: "64–128", bw: 800, price: "$2000–3500", priceMin: 2000, maxModels: "65B–70B", tokS: "~8–12", gpu: 64, tops: 22, year: 2022, available: "Used/Refurb" },
  { gen: "M2", tier: "Base", ram: "8–24", bw: 100, price: "$670–899", priceMin: 670, maxModels: "7B–8B", tokS: "~16", gpu: 10, tops: 15.8, year: 2022, available: "Used/Refurb" },
  { gen: "M2", tier: "Pro", ram: "16–32", bw: 200, price: "$1000–1500", priceMin: 1000, maxModels: "13B", tokS: "~22–32", gpu: 19, tops: 15.8, year: 2023, available: "Used/Refurb" },
  { gen: "M2", tier: "Max", ram: "32–96", bw: 400, price: "$1500–2500", priceMin: 1500, maxModels: "30B–65B", tokS: "~28–38", gpu: 38, tops: 15.8, year: 2023, available: "Used/Refurb" },
  { gen: "M2", tier: "Ultra", ram: "64–192", bw: 800, price: "$3000–5000", priceMin: 3000, maxModels: "70B–120B", tokS: "~10–15", gpu: 76, tops: 31.6, year: 2023, available: "Used/Refurb" },
  { gen: "M3", tier: "Base", ram: "8–24", bw: 100, price: "$839–1099", priceMin: 839, maxModels: "7B–8B", tokS: "~18", gpu: 10, tops: 18, year: 2023, available: "New/Refurb" },
  { gen: "M3", tier: "Pro", ram: "18–36", bw: 150, price: "$1200–1800", priceMin: 1200, maxModels: "13B–14B", tokS: "~24–30", gpu: 18, tops: 18, year: 2023, available: "New/Refurb" },
  { gen: "M3", tier: "Max", ram: "36–128", bw: 400, price: "$2000–3500", priceMin: 2000, maxModels: "30B–70B", tokS: "~30–40", gpu: 40, tops: 18, year: 2023, available: "New/Refurb" },
  { gen: "M3", tier: "Ultra", ram: "96–192", bw: 819, price: "$3999+", priceMin: 3999, maxModels: "70B–120B", tokS: "~12–18", gpu: 80, tops: 36, year: 2025, available: "New" },
  { gen: "M4", tier: "Base", ram: "16–32", bw: 120, price: "$599–1299", priceMin: 599, maxModels: "8B–14B", tokS: "~20", gpu: 10, tops: 38, year: 2024, available: "New" },
  { gen: "M4", tier: "Pro", ram: "24–64", bw: 273, price: "$1399–2199", priceMin: 1399, maxModels: "14B–33B", tokS: "~30–38", gpu: 20, tops: 38, year: 2024, available: "New" },
  { gen: "M4", tier: "Max", ram: "36–128", bw: 546, price: "$2499–3999", priceMin: 2499, maxModels: "33B–70B", tokS: "~35–45", gpu: 40, tops: 38, year: 2024, available: "New" },
  { gen: "M5", tier: "Base", ram: "16–32", bw: 154, price: "$1399–1799", priceMin: 1399, maxModels: "8B–14B", tokS: "~25", gpu: 10, tops: 45, year: 2025, available: "New" },
] as const;

type Chip = typeof chips[number];
type Gen = Chip["gen"];

// Tailwind Standard Color Map
const GC: Record<Gen, { text: string; bg: string; border: string; activeBg: string; activeBorder: string; hex: string }> = {
  M1: { text: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/25", activeBg: "bg-red-400/20", activeBorder: "border-red-400/50", hex: "#f87171" },
  M2: { text: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/25", activeBg: "bg-orange-400/20", activeBorder: "border-orange-400/50", hex: "#fb923c" },
  M3: { text: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/25", activeBg: "bg-yellow-400/20", activeBorder: "border-yellow-400/50", hex: "#facc15" },
  M4: { text: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/25", activeBg: "bg-green-400/20", activeBorder: "border-green-400/50", hex: "#4ade80" },
  M5: { text: "text-sky-400", bg: "bg-sky-400/10", border: "border-sky-400/25", activeBg: "bg-sky-400/20", activeBorder: "border-sky-400/50", hex: "#38bdf8" },
};

const TIER_ORDER: Record<string, number> = { Base: 0, Pro: 1, Max: 2, Ultra: 3 };
const MAX_BW = 819;

const modelGuide = [
  { size: "3B–7B", ram: "8 GB", example: "Llama 3.2 3B, Phi-3 Mini, Gemma 2B", use: "Fast chat, code completion" },
  { size: "8B", ram: "8–16 GB", example: "Llama 3.1 8B, Mistral 7B, Qwen2 7B", use: "General assistant, coding" },
  { size: "13B–14B", ram: "16–24 GB", example: "Llama 2 13B, Qwen2 14B", use: "Better reasoning, longer ctx" },
  { size: "30B–33B", ram: "24–48 GB", example: "Qwen 30B MoE, CodeLlama 34B", use: "Near-GPT-3.5 quality" },
  { size: "65B–70B", ram: "48–96 GB", example: "Llama 3.1 70B, Qwen2 72B", use: "Near-GPT-4 quality" },
  { size: "120B+", ram: "128–192 GB", example: "Llama 3.1 405B (Q), Falcon 180B", use: "Frontier-class, research" },
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
      `}</style>

      <div className="bg-black min-h-screen text-zinc-100 font-mono text-[13px] overflow-hidden">
        {/* Grid texture */}
        <div
          className="fixed inset-0 pointer-events-none z-0 bg-[length:48px_48px]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-20">

          {/* ── HEADER ─────────────────────────────────── */}
          <div className="anim-up mb-11" style={{ animationDelay: "0s" }}>
            <div className="flex justify-between items-start flex-wrap gap-6">
              <div>
                <div className="text-[11px] tracking-[0.22em] text-zinc-400 uppercase mb-2.5 flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-[pulse-dot_2.5s_ease-in-out_infinite]" />
                  Local AI Reference · Feb 2026
                </div>
                <h1 className="m-0 text-[clamp(2rem,5.5vw,3.75rem)] font-extrabold tracking-tighter leading-none text-white font-syne">
                   Silicon AI Perf
                </h1>
                <p className="text-[13px] text-zinc-400 mt-3.5 tracking-wide leading-relaxed">
                  Bandwidth (GB/s) determines inference speed · RAM determines max model size · Assumes Q4 quantization
                </p>
              </div>

              {/* Key stats */}
              <div className="flex gap-2 flex-wrap items-start">
                {[
                  { label: "Chips", value: "16", sub: "across 5 gens" },
                  { label: "Max BW", value: "819 GB/s", sub: "M3 Ultra" },
                  { label: "Max RAM", value: "192 GB", sub: "M2/M3 Ultra" },
                  { label: "Latest", value: "M5", sub: "2025" },
                ].map(s => (
                  <div key={s.label} className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl min-w-[90px]">
                    <div className="text-[11px] text-zinc-400 tracking-[0.15em] uppercase mb-1">{s.label}</div>
                    <div className="text-lg font-bold text-white tracking-tight">{s.value}</div>
                    <div className="text-[11px] text-zinc-500 mt-0.5">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── IPHONE CHIPS ───────────────────────────── */}
          <div className="anim-up mb-8" style={{ animationDelay: "0.04s" }}>
            <h2 className="text-lg font-bold text-white mb-4 tracking-tight flex items-center gap-2 font-syne">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
              iPhone Local AI Capabilities
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-3">
              {[
                { chip: "A16 Bionic", ram: "6 GB", phones: "iPhone 14 Pro, 15", maxModel: "1B–2B (Q4)", example: "TinyLlama, Qwen2.5 1.5B" },
                { chip: "A17 Pro", ram: "8 GB", phones: "iPhone 15 Pro", maxModel: "3B–4B (Q4)", example: "Llama 3.2 3B, Phi-3 Mini" },
                { chip: "A18 / A18 Pro", ram: "8 GB", phones: "iPhone 16 Series", maxModel: "3B–4B (Q4)", example: "Llama 3.2 3B (Faster T/s)" },
              ].map(ip => (
                <div key={ip.chip} className="p-4 bg-white/5 border border-white/10 rounded-xl transition-colors duration-200 hover:bg-white/10 group">
                  <div className="flex justify-between items-start mb-1.5">
                    <div className="text-base font-bold text-white">{ip.chip}</div>
                    <div className="text-xs font-bold text-zinc-400 bg-white/5 px-2 py-0.5 rounded-md border border-white/5 group-hover:border-white/10">
                      {ip.ram} RAM
                    </div>
                  </div>
                  <div className="text-[13px] text-zinc-400 mb-3">{ip.phones}</div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-extrabold text-green-400 bg-green-400/15 px-1.5 py-0.5 rounded-md tracking-[0.05em] border border-green-400/20">
                        MAX MODEL
                      </span>
                      <span className="text-[13px] text-zinc-200 font-semibold">
                        {ip.maxModel}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-400 mt-0.5">
                      e.g., {ip.example}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CONTROLS ───────────────────────────────── */}
          <div className="anim-up mb-4" style={{ animationDelay: "0.08s" }}>
            <div className="flex gap-2 flex-wrap items-center p-2.5 px-3.5 bg-white/5 border border-white/10 rounded-xl">
              {(["All", "M1", "M2", "M3", "M4", "M5"] as const).map(g => {
                const isAll = g === "All";
                const active = filterGen === g;
                const gc = isAll ? null : GC[g as Gen];

                return (
                  <button
                    key={g}
                    onClick={() => setFilterGen(g)}
                    className={`
                      px-3 py-1 rounded-md text-[13px] font-semibold tracking-wide border transition-all duration-150
                      ${active
                        ? (isAll ? "bg-white/10 border-white/20 text-white" : `${gc?.text} ${gc?.activeBg} ${gc?.activeBorder}`)
                        : "text-zinc-400 border-transparent bg-transparent hover:text-white hover:bg-white/5"
                      }
                    `}
                  >
                    {g}
                  </button>
                );
              })}

              <div className="flex-1" />

              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-2.5 py-1.5 rounded-md border border-white/10 bg-white/5 text-zinc-200 text-[13px] cursor-pointer outline-none hover:border-white/20 transition-colors"
              >
                <option value="default">Sort: Generation</option>
                <option value="bandwidth">Sort: Bandwidth ↓</option>
                <option value="price">Sort: Price ↑</option>
                <option value="value">Sort: Value Score ↓</option>
              </select>

              <button
                onClick={() => setShowGuide(!showGuide)}
                className={`
                  px-3 py-1.5 rounded-md text-[13px] border transition-all duration-150
                  ${showGuide
                    ? "bg-white/10 border-white/20 text-white"
                    : "bg-transparent border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 hover:border-white/20"
                  }
                `}
              >
                {showGuide ? "Hide" : "Model"} Guide
              </button>
            </div>
          </div>

          {/* ── MODEL GUIDE ────────────────────────────── */}
          {showGuide && (
            <div className="anim-up mb-4" style={{ animationDelay: "0s" }}>
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="text-[11px] tracking-[0.18em] text-zinc-400 uppercase mb-3">
                  Model Size → RAM Required (4-bit quantized)
                </div>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(175px,1fr))] gap-2">
                  {modelGuide.map((m, i) => (
                    <div key={i} className="px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg">
                      <div className="text-sm font-bold text-white">{m.size}</div>
                      <div className="text-xs text-green-400 my-1">~{m.ram}</div>
                      <div className="text-xs text-zinc-200 mt-1 leading-relaxed">{m.example}</div>
                      <div className="text-[11px] text-zinc-400 mt-0.5 italic">{m.use}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── TABLE ──────────────────────────────────── */}
          <div className="anim-up mb-5" style={{ animationDelay: "0.16s" }}>
            <div className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.02]">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      {["Chip", "RAM (GB)", "Bandwidth (GB/s)", "Max Model", "tok/s", "GPU", "TOPS", "Price", "Value", "Status"].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold tracking-[0.14em] uppercase text-zinc-400 whitespace-nowrap">
                          {h}
                        </th>
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
                          className={`
                            border-b border-white/5 transition-colors duration-100 hover:bg-white/10
                            ${isBest ? "!bg-green-400/10 hover:!bg-green-400/20" : (i % 2 === 1 ? "bg-white/[0.01]" : "bg-transparent")}
                          `}
                        >
                          {/* Chip name */}
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-[3px] h-8 rounded-sm shrink-0 ${gc.bg.replace('/10', '')} bg-opacity-100`} style={{ backgroundColor: gc.hex }} />
                              <div>
                                <div className="flex items-center gap-2 flex-nowrap">
                                  <span className={`text-[11px] font-extrabold tracking-wide ${gc.text} ${gc.bg} border ${gc.border} px-2 py-0.5 rounded-md`}>
                                    {c.gen}
                                  </span>
                                  <span className="font-semibold text-white text-[13px]">{c.tier}</span>
                                  {isBest && (
                                    <span className="text-[10px] font-extrabold tracking-widest text-green-400 bg-green-400/15 border border-green-400/40 px-1.5 py-0.5 rounded-md">
                                      BEST VALUE
                                    </span>
                                  )}
                                </div>
                                <div className="text-[11px] text-zinc-500 mt-1">{c.year}</div>
                              </div>
                            </div>
                          </td>

                          {/* RAM */}
                          <td className="px-4 py-3 text-zinc-200 font-medium">{c.ram}</td>

                          {/* Bandwidth visual */}
                          <td className="px-4 py-3 min-w-[160px]">
                            <div className="flex items-center gap-2.5">
                              <div className="flex-1 h-1 bg-white/10 rounded-sm overflow-hidden">
                                <div
                                  className="bw-bar h-full rounded-sm"
                                  style={{
                                    width: `${bwPct}%`,
                                    background: `linear-gradient(90deg, ${gc.hex}, ${gc.hex}88)`,
                                    animationDelay: `${0.18 + i * 0.035}s`,
                                  }}
                                />
                              </div>
                              <span className={`font-bold ${gc.text} text-[13px] min-w-[36px] text-right`}>
                                {c.bw}
                              </span>
                            </div>
                          </td>

                          {/* Max Model */}
                          <td className="px-4 py-3 text-zinc-200">{c.maxModels}</td>

                          {/* tok/s */}
                          <td className="px-4 py-3 text-zinc-200">{c.tokS}</td>

                          {/* GPU */}
                          <td className="px-4 py-3 text-zinc-400">{c.gpu}</td>

                          {/* TOPS */}
                          <td className="px-4 py-3 text-zinc-400">{c.tops}</td>

                          {/* Price */}
                          <td className="px-4 py-3 text-white font-medium whitespace-nowrap">{c.price}</td>

                          {/* Value score */}
                          <td className="px-4 py-3">
                            <span className={`
                              font-extrabold text-[13px]
                              ${valScore > 20 ? "text-green-400" : valScore > 10 ? "text-yellow-400" : "text-red-400"}
                            `}>
                              {score(c)}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="px-4 py-3">
                            <span className={`
                              text-[11px] px-2 py-1 rounded-md whitespace-nowrap font-semibold border
                              ${c.available === "New"
                                ? "bg-sky-400/15 text-sky-400 border-sky-400/30"
                                : c.available === "New/Refurb"
                                  ? "bg-orange-400/15 text-orange-400 border-orange-400/30"
                                  : "bg-white/5 text-zinc-400 border-white/10"
                              }
                            `}>
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
          <div className="anim-up grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3 mb-9" style={{ animationDelay: "0.24s" }}>
            {[
              { tag: "VALUE", color: "text-green-400", border: "border-t-green-400", bg: "bg-green-400/10", borderTag: "border-green-400/30", title: "Best Bang for Buck", body: "M2 Ultra (used ~$3K) gives 800 GB/s and up to 192GB RAM — run 70B+ models at great speed." },
              { tag: "PICK", color: "text-sky-400", border: "border-t-sky-400", bg: "bg-sky-400/10", borderTag: "border-sky-400/30", title: "Sweet Spot Buy", body: "M4 Pro 48GB ($1,599+) — 273 GB/s, runs 14B–33B Q4 models smoothly. Best new-purchase value." },
              { tag: "SPEED", color: "text-red-400", border: "border-t-red-400", bg: "bg-red-400/10", borderTag: "border-red-400/30", title: "Speed King", body: "M4 Max 128GB ($3,999) — 546 GB/s, runs 70B models at 35–45 tok/s. Serious local AI." },
              { tag: "THEORY", color: "text-yellow-400", border: "border-t-yellow-400", bg: "bg-yellow-400/10", borderTag: "border-yellow-400/30", title: "The Key Metric", body: "Bandwidth (GB/s) = token generation speed. RAM = max model size. Bigger isn't always faster." },
            ].map((ins, i) => (
              <div key={i} className={`p-4 bg-white/5 border border-white/10 border-t-[3px] ${ins.border} rounded-xl`}>
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className={`text-[10px] font-extrabold tracking-[0.12em] ${ins.color} ${ins.bg} border ${ins.borderTag} px-2 py-0.5 rounded-md`}>
                    {ins.tag}
                  </span>
                  <span className="text-[13px] font-bold text-white">{ins.title}</span>
                </div>
                <p className="m-0 text-[13px] text-zinc-300 leading-relaxed">{ins.body}</p>
              </div>
            ))}
          </div>

          {/* ── FOOTER ─────────────────────────────────── */}
          <div className="border-t border-white/10 pt-5 text-[11px] text-zinc-500 leading-relaxed">
            tok/s estimates at max model size via llama.cpp or MLX. Smaller models run proportionally faster.
            Value score = (BW / min price) × 100. Prices reflect Feb 2026 new/refurb street prices.
            ~75% of unified memory available for GPU by default. M4 Ultra &amp; M5 Pro/Max/Ultra not yet released.
            <div className="mt-3 pt-3 border-t border-white/5 text-zinc-400 font-medium">
              ⚠ Data aggregated via web search. Do your own research before purchasing — specs, pricing, and availability change frequently.
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
