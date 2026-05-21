import { useMemo, useState } from "react";
import type { Tool } from "@/data/tools";

function Box(props: React.PropsWithChildren<{ className?: string }>) {
  return <div className={`rounded-xl border border-border bg-card p-4 ${props.className ?? ""}`}>{props.children}</div>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-1 block text-xs font-medium text-muted-foreground">{children}</label>;
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full min-h-[140px] resize-y rounded-md border border-input bg-background p-3 text-sm outline-none focus:border-primary ${props.className ?? ""}`}
    />
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary ${props.className ?? ""}`}
    />
  );
}

function Button({ children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 ${rest.className ?? ""}`}
    >
      {children}
    </button>
  );
}

/* ---------------- TEXT ---------------- */
function textOp(op: string, text: string): string {
  const words = (s: string) => s.split(/\s+/).filter(Boolean);
  switch (op) {
    case "uppercase": return text.toUpperCase();
    case "lowercase": return text.toLowerCase();
    case "titlecase": return text.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    case "sentencecase": return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
    case "camelcase": {
      const w = words(text.replace(/[^a-zA-Z0-9\s]/g, " "));
      return w.map((x, i) => i === 0 ? x.toLowerCase() : x[0].toUpperCase() + x.slice(1).toLowerCase()).join("");
    }
    case "pascalcase": {
      const w = words(text.replace(/[^a-zA-Z0-9\s]/g, " "));
      return w.map((x) => x[0].toUpperCase() + x.slice(1).toLowerCase()).join("");
    }
    case "snakecase": return words(text.replace(/[^a-zA-Z0-9\s]/g, " ")).join("_").toLowerCase();
    case "kebabcase": return words(text.replace(/[^a-zA-Z0-9\s]/g, " ")).join("-").toLowerCase();
    case "constantcase": return words(text.replace(/[^a-zA-Z0-9\s]/g, " ")).join("_").toUpperCase();
    case "slug": return text.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    case "reverse": return [...text].reverse().join("");
    case "reversewords": return words(text).reverse().join(" ");
    case "wordcount": return `${words(text).length} words`;
    case "charcount": return `${text.length} characters (${text.replace(/\s/g, "").length} without spaces)`;
    case "linecount": return `${text.split(/\r?\n/).length} lines`;
    case "paragraphcount": return `${text.split(/\n\s*\n/).filter(Boolean).length} paragraphs`;
    case "trimspaces": return text.replace(/[ \t]+/g, " ").replace(/ ?\n ?/g, "\n").trim();
    case "removebreaks": return text.replace(/\r?\n+/g, " ");
    case "sortlines": return text.split(/\r?\n/).sort((a, b) => a.localeCompare(b)).join("\n");
    case "reverselines": return text.split(/\r?\n/).reverse().join("\n");
    case "shufflelines": {
      const a = text.split(/\r?\n/);
      for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
      return a.join("\n");
    }
    case "uniquelines": return Array.from(new Set(text.split(/\r?\n/))).join("\n");
    case "repeat": return text.repeat(3);
    case "striphtml": return text.replace(/<[^>]*>/g, "");
    case "rot13": return text.replace(/[a-zA-Z]/g, (c) => {
      const base = c <= "Z" ? 65 : 97;
      return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
    });
    case "leet": {
      const map: Record<string, string> = { a: "4", b: "8", e: "3", g: "6", i: "1", l: "1", o: "0", s: "5", t: "7", z: "2" };
      return text.toLowerCase().split("").map((c) => map[c] ?? c).join("");
    }
    case "zalgo": {
      const marks = ["\u0301", "\u0300", "\u0303", "\u0306", "\u030a", "\u0325", "\u0331"];
      return text.split("").map((c) => c + marks[Math.floor(Math.random() * marks.length)] + marks[Math.floor(Math.random() * marks.length)]).join("");
    }
    case "boldunicode": {
      const off = (c: string, baseU: string, baseB: number) => {
        if (c >= "A" && c <= "Z") return String.fromCodePoint(baseB + c.charCodeAt(0) - 65);
        if (c >= "a" && c <= "z") return String.fromCodePoint(baseB + 26 + c.charCodeAt(0) - 97);
        return c;
      };
      return text.split("").map((c) => off(c, "A", 0x1d400)).join("");
    }
    case "italicunicode": {
      return text.split("").map((c) => {
        if (c >= "A" && c <= "Z") return String.fromCodePoint(0x1d434 + c.charCodeAt(0) - 65);
        if (c >= "a" && c <= "z") return c === "h" ? "ℎ" : String.fromCodePoint(0x1d44e + c.charCodeAt(0) - 97);
        return c;
      }).join("");
    }
    case "upsidedown": {
      const map: Record<string, string> = { a: "ɐ", b: "q", c: "ɔ", d: "p", e: "ǝ", f: "ɟ", g: "ƃ", h: "ɥ", i: "ᴉ", j: "ɾ", k: "ʞ", l: "l", m: "ɯ", n: "u", o: "o", p: "d", q: "b", r: "ɹ", s: "s", t: "ʇ", u: "n", v: "ʌ", w: "ʍ", x: "x", y: "ʎ", z: "z", ".": "˙", ",": "'", "?": "¿", "!": "¡" };
      return text.toLowerCase().split("").map((c) => map[c] ?? c).reverse().join("");
    }
    default: return text;
  }
}

function TextEngine({ tool }: { tool: Tool }) {
  const [input, setInput] = useState("");
  const op = (tool.config as any).op as string;
  const output = useMemo(() => textOp(op, input), [op, input]);
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Box>
        <Label>Input</Label>
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste your text here…" />
      </Box>
      <Box>
        <Label>Output</Label>
        <Textarea value={output} readOnly placeholder="Result will appear here…" />
        <div className="mt-3 flex gap-2">
          <Button onClick={() => navigator.clipboard?.writeText(output)}>Copy</Button>
          <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80" onClick={() => setInput("")}>Clear</Button>
        </div>
      </Box>
    </div>
  );
}

/* ---------------- ENCODER ---------------- */
const MORSE: Record<string, string> = { a: ".-", b: "-...", c: "-.-.", d: "-..", e: ".", f: "..-.", g: "--.", h: "....", i: "..", j: ".---", k: "-.-", l: ".-..", m: "--", n: "-.", o: "---", p: ".--.", q: "--.-", r: ".-.", s: "...", t: "-", u: "..-", v: "...-", w: ".--", x: "-..-", y: "-.--", z: "--..", "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----." };
const MORSE_REV = Object.fromEntries(Object.entries(MORSE).map(([k, v]) => [v, k]));

function encoderOp(kind: string, mode: string, text: string): string {
  try {
    if (kind === "base64") return mode === "encode" ? btoa(unescape(encodeURIComponent(text))) : decodeURIComponent(escape(atob(text)));
    if (kind === "url") return mode === "encode" ? encodeURIComponent(text) : decodeURIComponent(text);
    if (kind === "html") return mode === "encode"
      ? text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!))
      : text.replace(/&(amp|lt|gt|quot|#39);/g, (m) => ({ "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" } as any)[m]);
    if (kind === "hex") return mode === "encode"
      ? Array.from(text).map((c) => c.charCodeAt(0).toString(16).padStart(2, "0")).join(" ")
      : text.split(/\s+/).filter(Boolean).map((h) => String.fromCharCode(parseInt(h, 16))).join("");
    if (kind === "binary") return mode === "encode"
      ? Array.from(text).map((c) => c.charCodeAt(0).toString(2).padStart(8, "0")).join(" ")
      : text.split(/\s+/).filter(Boolean).map((b) => String.fromCharCode(parseInt(b, 2))).join("");
    if (kind === "morse") return mode === "encode"
      ? text.toLowerCase().split("").map((c) => MORSE[c] ?? (c === " " ? "/" : "")).filter(Boolean).join(" ")
      : text.split(" ").map((c) => c === "/" ? " " : (MORSE_REV[c] ?? "")).join("");
  } catch {
    return "Invalid input for this encoding.";
  }
  return text;
}

function EncoderEngine({ tool }: { tool: Tool }) {
  const [input, setInput] = useState("");
  const { kind, mode } = tool.config as any;
  const output = useMemo(() => encoderOp(kind, mode, input), [kind, mode, input]);
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Box>
        <Label>Input</Label>
        <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === "encode" ? "Text to encode…" : "Text to decode…"} />
      </Box>
      <Box>
        <Label>Output</Label>
        <Textarea value={output} readOnly />
        <Button className="mt-3" onClick={() => navigator.clipboard?.writeText(output)}>Copy</Button>
      </Box>
    </div>
  );
}

/* ---------------- UNIT ---------------- */
function tempConvert(from: string, to: string, v: number): number {
  let c: number;
  if (from === "celsius") c = v;
  else if (from === "fahrenheit") c = (v - 32) * 5 / 9;
  else c = v - 273.15;
  if (to === "celsius") return c;
  if (to === "fahrenheit") return c * 9 / 5 + 32;
  return c + 273.15;
}

function UnitEngine({ tool }: { tool: Tool }) {
  const cfg = tool.config as any;
  const [val, setVal] = useState("1");
  const num = parseFloat(val);
  const result = useMemo(() => {
    if (isNaN(num)) return "";
    if (cfg.family === "temperature") return tempConvert(cfg.from, cfg.to, num).toFixed(4).replace(/\.?0+$/, "");
    const base = num * cfg.fromFactor;
    return (base / cfg.toFactor).toLocaleString(undefined, { maximumFractionDigits: 10 });
  }, [num, cfg]);
  return (
    <Box>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>{cfg.fromLabel ?? cfg.from}</Label>
          <Input type="number" value={val} onChange={(e) => setVal(e.target.value)} />
        </div>
        <div>
          <Label>{cfg.toLabel ?? cfg.to}</Label>
          <Input value={result} readOnly />
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Conversion family: {cfg.family}.</p>
    </Box>
  );
}

/* ---------------- GENERATOR ---------------- */
function genOutput(kind: string, opts: any): string {
  const rand = (n: number) => Math.floor(Math.random() * n);
  if (kind === "password") {
    const len = opts.length ?? 16;
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    return Array.from({ length: len }, () => chars[rand(chars.length)]).join("");
  }
  if (kind === "uuid") return crypto.randomUUID();
  if (kind === "lorem") {
    const words = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua".split(" ");
    return Array.from({ length: 60 }, () => words[rand(words.length)]).join(" ");
  }
  if (kind === "number") {
    const min = opts.min ?? 1, max = opts.max ?? 100;
    return String(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  if (kind === "letter") return String.fromCharCode(65 + rand(26));
  if (kind === "dice") return String(1 + rand(6));
  if (kind === "coin") return Math.random() < 0.5 ? "Heads" : "Tails";
  if (kind === "color") return "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
  if (kind === "gradient") {
    const c1 = "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
    const c2 = "#" + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0");
    return `linear-gradient(${rand(360)}deg, ${c1}, ${c2})`;
  }
  if (kind === "username") {
    const a = ["happy", "swift", "calm", "brave", "lucky", "silent", "wild", "tiny", "bright", "cosmic"];
    const b = ["fox", "otter", "wave", "panda", "atom", "river", "moon", "comet", "pixel", "leaf"];
    return a[rand(a.length)] + "-" + b[rand(b.length)] + "-" + rand(1000);
  }
  if (kind === "shortslug") {
    return Math.random().toString(36).slice(2, 10);
  }
  if (kind === "pin") {
    const len = opts.length ?? 4;
    return Array.from({ length: len }, () => rand(10)).join("");
  }
  if (kind === "quote") {
    const qs = ["Simplicity is the ultimate sophistication.", "Make it work, make it right, make it fast.", "The best way out is always through.", "Done is better than perfect.", "Small steps, every day."];
    return qs[rand(qs.length)];
  }
  if (kind === "emoji") {
    const es = ["😀","🎉","🚀","🌈","⭐","🍀","🔥","💡","🎯","🧠","🌸","🪐","🦊","🐼","🍕"];
    return es[rand(es.length)];
  }
  if (kind === "date") {
    const start = new Date(2000, 0, 1).getTime();
    const end = new Date(2030, 11, 31).getTime();
    return new Date(start + Math.random() * (end - start)).toISOString().slice(0, 10);
  }
  return "";
}

function GeneratorEngine({ tool }: { tool: Tool }) {
  const { kind } = tool.config as any;
  const [val, setVal] = useState(() => genOutput(kind, {}));
  const isGradient = kind === "gradient";
  const isColor = kind === "color";
  return (
    <Box>
      <div className="flex flex-col gap-3">
        <Input value={val} readOnly />
        {isGradient && <div className="h-24 rounded-md" style={{ backgroundImage: val }} />}
        {isColor && <div className="h-24 rounded-md" style={{ backgroundColor: val }} />}
        <div className="flex gap-2">
          <Button onClick={() => setVal(genOutput(kind, {}))}>Generate</Button>
          <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/80" onClick={() => navigator.clipboard?.writeText(val)}>Copy</Button>
        </div>
      </div>
    </Box>
  );
}

/* ---------------- DATETIME ---------------- */
function DatetimeEngine({ tool }: { tool: Tool }) {
  const { op } = tool.config as any;
  const [a, setA] = useState(new Date().toISOString().slice(0, 10));
  const [b, setB] = useState(new Date().toISOString().slice(0, 10));
  const [n, setN] = useState("30");
  const [ts, setTs] = useState(String(Math.floor(Date.now() / 1000)));

  let result = "";
  try {
    if (op === "diff") {
      const d = (new Date(b).getTime() - new Date(a).getTime()) / 86400000;
      result = `${Math.round(d)} days`;
    } else if (op === "add" || op === "sub") {
      const d = new Date(a); d.setDate(d.getDate() + (op === "add" ? 1 : -1) * parseInt(n));
      result = d.toISOString().slice(0, 10);
    } else if (op === "until") {
      const d = Math.ceil((new Date(a).getTime() - Date.now()) / 86400000);
      result = `${d} days from today`;
    } else if (op === "weekday") {
      result = new Date(a).toLocaleDateString(undefined, { weekday: "long" });
    } else if (op === "week") {
      const d = new Date(a); d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() + 4 - (d.getDay() || 7));
      const week = Math.ceil(((d.getTime() - new Date(d.getFullYear(), 0, 1).getTime()) / 86400000 + 1) / 7);
      result = `Week ${week}`;
    } else if (op === "tstodate") {
      result = new Date(parseInt(ts) * 1000).toISOString();
    } else if (op === "datetots") {
      result = String(Math.floor(new Date(a).getTime() / 1000));
    } else if (op === "agedays") {
      result = `${Math.floor((Date.now() - new Date(a).getTime()) / 86400000)} days old`;
    } else if (op === "since") {
      const d = Math.floor((Date.now() - new Date(a).getTime()) / 86400000);
      result = `${d} days ago`;
    }
  } catch { result = ""; }

  return (
    <Box>
      <div className="grid gap-3">
        {(op === "diff" || op === "add" || op === "sub" || op === "until" || op === "weekday" || op === "datetots" || op === "agedays" || op === "since" || op === "week") && (
          <div>
            <Label>{op === "diff" ? "Start date" : "Date"}</Label>
            <Input type="date" value={a} onChange={(e) => setA(e.target.value)} />
          </div>
        )}
        {op === "diff" && (
          <div>
            <Label>End date</Label>
            <Input type="date" value={b} onChange={(e) => setB(e.target.value)} />
          </div>
        )}
        {(op === "add" || op === "sub") && (
          <div>
            <Label>Number of days</Label>
            <Input type="number" value={n} onChange={(e) => setN(e.target.value)} />
          </div>
        )}
        {op === "tstodate" && (
          <div>
            <Label>Unix timestamp (seconds)</Label>
            <Input type="number" value={ts} onChange={(e) => setTs(e.target.value)} />
          </div>
        )}
        <div>
          <Label>Result</Label>
          <Input value={result} readOnly />
        </div>
      </div>
    </Box>
  );
}

/* ---------------- COLOR ---------------- */
function hexToRgb(hex: string) {
  const m = hex.replace("#", "").match(/^([0-9a-f]{6})$/i);
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((v) => Math.max(0, Math.min(255, v | 0)).toString(16).padStart(2, "0")).join("");
}
function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}
function hslToRgb(h: number, s: number, l: number) {
  h /= 360; s /= 100; l /= 100;
  if (s === 0) { const v = Math.round(l * 255); return { r: v, g: v, b: v }; }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1; if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return { r: Math.round(hue2rgb(p, q, h + 1 / 3) * 255), g: Math.round(hue2rgb(p, q, h) * 255), b: Math.round(hue2rgb(p, q, h - 1 / 3) * 255) };
}
function luminance({ r, g, b }: { r: number; g: number; b: number }) {
  const a = [r, g, b].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function ColorEngine({ tool }: { tool: Tool }) {
  const { op } = tool.config as any;
  const [hex, setHex] = useState("#2dd4a8");
  const [hex2, setHex2] = useState("#0d1b2a");
  const [pct, setPct] = useState("20");
  const rgb = hexToRgb(hex);
  let result = "";
  let preview = hex;
  if (rgb) {
    if (op === "hex2rgb") result = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    else if (op === "rgb2hex") result = rgbToHex(rgb.r, rgb.g, rgb.b);
    else if (op === "hex2hsl" || op === "rgb2hsl") { const h = rgbToHsl(rgb.r, rgb.g, rgb.b); result = `hsl(${h.h}, ${h.s}%, ${h.l}%)`; }
    else if (op === "hsl2hex" || op === "hsl2rgb") {
      const h = rgbToHsl(rgb.r, rgb.g, rgb.b);
      const rr = hslToRgb(h.h, h.s, h.l);
      result = op === "hsl2hex" ? rgbToHex(rr.r, rr.g, rr.b) : `rgb(${rr.r}, ${rr.g}, ${rr.b})`;
    } else if (op === "lighten" || op === "darken") {
      const h = rgbToHsl(rgb.r, rgb.g, rgb.b);
      const delta = parseInt(pct) || 0;
      const nl = Math.max(0, Math.min(100, h.l + (op === "lighten" ? delta : -delta)));
      const r2 = hslToRgb(h.h, h.s, nl);
      result = rgbToHex(r2.r, r2.g, r2.b);
      preview = result;
    } else if (op === "contrast") {
      const rgb2 = hexToRgb(hex2);
      if (rgb2) {
        const l1 = luminance(rgb), l2 = luminance(rgb2);
        const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
        const grade = ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA Large" : "Fail";
        result = `${ratio.toFixed(2)}:1 (${grade})`;
      }
    }
  }
  return (
    <Box>
      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <Label>Color 1</Label>
          <Input value={hex} onChange={(e) => setHex(e.target.value)} />
        </div>
        {op === "contrast" && (
          <div>
            <Label>Color 2</Label>
            <Input value={hex2} onChange={(e) => setHex2(e.target.value)} />
          </div>
        )}
        {(op === "lighten" || op === "darken") && (
          <div>
            <Label>Percent</Label>
            <Input type="number" value={pct} onChange={(e) => setPct(e.target.value)} />
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <div className="h-12 w-12 rounded-md border border-border" style={{ backgroundColor: preview }} />
        {op === "contrast" && <div className="h-12 w-12 rounded-md border border-border" style={{ backgroundColor: hex2 }} />}
        <div className="text-sm">{result}</div>
      </div>
    </Box>
  );
}

/* ---------------- CALC ---------------- */
type CalcDef = {
  inputs: { name: string; label: string; default: string; type?: string }[];
  compute: (v: Record<string, number>) => string;
};

const calcs: Record<string, CalcDef> = {
  "bmi-calculator": {
    inputs: [{ name: "h", label: "Height (cm)", default: "170" }, { name: "w", label: "Weight (kg)", default: "65" }],
    compute: ({ h, w }) => {
      const bmi = w / (h / 100) ** 2;
      const cat = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obese";
      return `${bmi.toFixed(1)} (${cat})`;
    },
  },
  "age-calculator": {
    inputs: [{ name: "year", label: "Birth year", default: "1995" }, { name: "month", label: "Birth month (1-12)", default: "1" }, { name: "day", label: "Birth day", default: "1" }],
    compute: ({ year, month, day }) => {
      const b = new Date(year, month - 1, day);
      const t = new Date();
      let age = t.getFullYear() - b.getFullYear();
      const m = t.getMonth() - b.getMonth();
      if (m < 0 || (m === 0 && t.getDate() < b.getDate())) age--;
      return `${age} years`;
    },
  },
  "tip-calculator": {
    inputs: [{ name: "bill", label: "Bill amount", default: "50" }, { name: "pct", label: "Tip %", default: "15" }, { name: "people", label: "People", default: "2" }],
    compute: ({ bill, pct, people }) => {
      const tip = bill * pct / 100;
      const total = bill + tip;
      return `Tip: ${tip.toFixed(2)} · Total: ${total.toFixed(2)} · Per person: ${(total / Math.max(1, people)).toFixed(2)}`;
    },
  },
  "percentage-calculator": {
    inputs: [{ name: "pct", label: "Percent", default: "20" }, { name: "of", label: "Of", default: "150" }],
    compute: ({ pct, of }) => `${(pct * of / 100).toFixed(2)}`,
  },
  "percent-change": {
    inputs: [{ name: "from", label: "From", default: "100" }, { name: "to", label: "To", default: "120" }],
    compute: ({ from, to }) => `${((to - from) / from * 100).toFixed(2)}%`,
  },
  "discount-calculator": {
    inputs: [{ name: "price", label: "Original price", default: "120" }, { name: "pct", label: "Discount %", default: "25" }],
    compute: ({ price, pct }) => `Final: ${(price * (1 - pct / 100)).toFixed(2)} (saved ${(price * pct / 100).toFixed(2)})`,
  },
  "sales-tax-calculator": {
    inputs: [{ name: "subtotal", label: "Subtotal", default: "100" }, { name: "rate", label: "Tax rate %", default: "8" }],
    compute: ({ subtotal, rate }) => `Total: ${(subtotal * (1 + rate / 100)).toFixed(2)} (tax ${(subtotal * rate / 100).toFixed(2)})`,
  },
  "simple-interest": {
    inputs: [{ name: "p", label: "Principal", default: "1000" }, { name: "r", label: "Annual rate %", default: "5" }, { name: "t", label: "Years", default: "3" }],
    compute: ({ p, r, t }) => `Interest: ${(p * r * t / 100).toFixed(2)} · Total: ${(p + p * r * t / 100).toFixed(2)}`,
  },
  "compound-interest": {
    inputs: [{ name: "p", label: "Principal", default: "1000" }, { name: "r", label: "Annual rate %", default: "5" }, { name: "t", label: "Years", default: "10" }, { name: "n", label: "Compounds / year", default: "12" }],
    compute: ({ p, r, t, n }) => `Final value: ${(p * Math.pow(1 + r / 100 / n, n * t)).toFixed(2)}`,
  },
  "loan-emi": {
    inputs: [{ name: "p", label: "Loan amount", default: "200000" }, { name: "r", label: "Annual rate %", default: "8" }, { name: "y", label: "Years", default: "20" }],
    compute: ({ p, r, y }) => {
      const n = y * 12; const i = r / 100 / 12;
      const emi = p * i * Math.pow(1 + i, n) / (Math.pow(1 + i, n) - 1);
      return `Monthly EMI: ${emi.toFixed(2)}`;
    },
  },
  "mortgage-calculator": {
    inputs: [{ name: "p", label: "Loan amount", default: "300000" }, { name: "r", label: "Annual rate %", default: "6" }, { name: "y", label: "Years", default: "30" }],
    compute: ({ p, r, y }) => {
      const n = y * 12; const i = r / 100 / 12;
      const emi = p * i * Math.pow(1 + i, n) / (Math.pow(1 + i, n) - 1);
      return `Monthly payment: ${emi.toFixed(2)} · Total paid: ${(emi * n).toFixed(2)}`;
    },
  },
  "savings-goal": {
    inputs: [{ name: "goal", label: "Goal amount", default: "10000" }, { name: "months", label: "Months", default: "24" }, { name: "have", label: "Already saved", default: "1000" }],
    compute: ({ goal, months, have }) => `Save ${((goal - have) / Math.max(1, months)).toFixed(2)} per month`,
  },
  "calorie-needs": {
    inputs: [{ name: "weight", label: "Weight (kg)", default: "65" }, { name: "activity", label: "Activity (1.2-1.9)", default: "1.4" }],
    compute: ({ weight, activity }) => `${Math.round(weight * 24 * activity)} kcal / day`,
  },
  "bmr-calculator": {
    inputs: [{ name: "weight", label: "Weight (kg)", default: "65" }, { name: "height", label: "Height (cm)", default: "170" }, { name: "age", label: "Age", default: "30" }],
    compute: ({ weight, height, age }) => `${Math.round(10 * weight + 6.25 * height - 5 * age + 5)} kcal (Mifflin-St Jeor, male)`,
  },
  "ideal-weight": {
    inputs: [{ name: "height", label: "Height (cm)", default: "170" }],
    compute: ({ height }) => `${(22 * (height / 100) ** 2).toFixed(1)} kg (BMI 22 target)`,
  },
  "water-intake": {
    inputs: [{ name: "weight", label: "Weight (kg)", default: "65" }],
    compute: ({ weight }) => `${(weight * 0.033).toFixed(2)} litres / day`,
  },
  "body-fat": {
    inputs: [{ name: "waist", label: "Waist (cm)", default: "80" }, { name: "neck", label: "Neck (cm)", default: "37" }, { name: "height", label: "Height (cm)", default: "170" }],
    compute: ({ waist, neck, height }) => {
      const bf = 495 / (1.0324 - 0.19077 * Math.log10(Math.max(1, waist - neck)) + 0.15456 * Math.log10(Math.max(1, height))) - 450;
      return `${bf.toFixed(1)}% body fat`;
    },
  },
  "pace-calculator": {
    inputs: [{ name: "distance", label: "Distance (km)", default: "10" }, { name: "minutes", label: "Time (minutes)", default: "55" }],
    compute: ({ distance, minutes }) => {
      const pace = minutes / distance;
      const m = Math.floor(pace); const s = Math.round((pace - m) * 60);
      return `${m}:${s.toString().padStart(2, "0")} per km`;
    },
  },
  "speed-calculator": {
    inputs: [{ name: "distance", label: "Distance (km)", default: "120" }, { name: "hours", label: "Time (hours)", default: "2" }],
    compute: ({ distance, hours }) => `${(distance / Math.max(0.0001, hours)).toFixed(2)} km/h`,
  },
  "fuel-cost": {
    inputs: [{ name: "distance", label: "Distance (km)", default: "500" }, { name: "consumption", label: "L / 100 km", default: "7" }, { name: "price", label: "Price per L", default: "1.6" }],
    compute: ({ distance, consumption, price }) => `${(distance / 100 * consumption * price).toFixed(2)} total`,
  },
  "electricity-cost": {
    inputs: [{ name: "watts", label: "Watts", default: "1000" }, { name: "hours", label: "Hours / day", default: "5" }, { name: "rate", label: "Price per kWh", default: "0.30" }, { name: "days", label: "Days", default: "30" }],
    compute: ({ watts, hours, rate, days }) => `${(watts / 1000 * hours * rate * days).toFixed(2)} total`,
  },
  "paint-calculator": {
    inputs: [{ name: "walls", label: "Wall area (m²)", default: "60" }, { name: "coverage", label: "Coverage m² / L", default: "10" }, { name: "coats", label: "Coats", default: "2" }],
    compute: ({ walls, coverage, coats }) => `${(walls * coats / coverage).toFixed(2)} litres`,
  },
  "tile-calculator": {
    inputs: [{ name: "area", label: "Floor area (m²)", default: "20" }, { name: "tile", label: "Tile size (m²)", default: "0.25" }, { name: "waste", label: "Waste %", default: "10" }],
    compute: ({ area, tile, waste }) => `${Math.ceil(area / tile * (1 + waste / 100))} tiles`,
  },
  "gpa-calculator": {
    inputs: [{ name: "g1", label: "Grade 1 (0-4)", default: "3.5" }, { name: "g2", label: "Grade 2", default: "3.7" }, { name: "g3", label: "Grade 3", default: "3.2" }, { name: "g4", label: "Grade 4", default: "3.9" }],
    compute: ({ g1, g2, g3, g4 }) => `${((g1 + g2 + g3 + g4) / 4).toFixed(2)} GPA`,
  },
  "grade-needed": {
    inputs: [{ name: "current", label: "Current grade %", default: "78" }, { name: "weight", label: "Final exam weight %", default: "30" }, { name: "target", label: "Target grade %", default: "85" }],
    compute: ({ current, weight, target }) => `${((target - current * (1 - weight / 100)) / (weight / 100)).toFixed(2)}%`,
  },
  "ratio-calculator": {
    inputs: [{ name: "a", label: "A", default: "3" }, { name: "b", label: "B", default: "4" }, { name: "x", label: "Scale A to", default: "9" }],
    compute: ({ a, b, x }) => `B becomes ${(b * x / a).toFixed(2)}`,
  },
  "mean-median-mode": {
    inputs: [{ name: "a", label: "n1", default: "4" }, { name: "b", label: "n2", default: "8" }, { name: "c", label: "n3", default: "8" }, { name: "d", label: "n4", default: "15" }, { name: "e", label: "n5", default: "16" }],
    compute: (v) => {
      const arr = [v.a, v.b, v.c, v.d, v.e].sort((a, b) => a - b);
      const mean = arr.reduce((s, x) => s + x, 0) / arr.length;
      const median = arr[Math.floor(arr.length / 2)];
      const counts: Record<string, number> = {};
      arr.forEach((n) => { counts[n] = (counts[n] ?? 0) + 1; });
      const mode = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
      return `Mean: ${mean.toFixed(2)} · Median: ${median} · Mode: ${mode}`;
    },
  },
  "fraction-to-decimal": {
    inputs: [{ name: "n", label: "Numerator", default: "3" }, { name: "d", label: "Denominator", default: "8" }],
    compute: ({ n, d }) => `${(n / d).toString()}`,
  },
  "decimal-to-fraction": {
    inputs: [{ name: "v", label: "Decimal", default: "0.375" }],
    compute: ({ v }) => {
      const tol = 1e-6;
      let h1 = 1, h2 = 0, k1 = 0, k2 = 1, b = v;
      do { const a = Math.floor(b); let aux = h1; h1 = a * h1 + h2; h2 = aux; aux = k1; k1 = a * k1 + k2; k2 = aux; b = 1 / (b - a); } while (Math.abs(v - h1 / k1) > v * tol);
      return `${h1}/${k1}`;
    },
  },
  "roman-numerals": {
    inputs: [{ name: "n", label: "Number (1-3999)", default: "1987" }],
    compute: ({ n }) => {
      const map: [number, string][] = [[1000,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]];
      let x = Math.max(0, Math.min(3999, Math.floor(n))); let out = "";
      for (const [v, s] of map) { while (x >= v) { out += s; x -= v; } }
      return out;
    },
  },
};

function CalcEngine({ tool }: { tool: Tool }) {
  const id = (tool.config as any).calcId as string;
  const def = calcs[id];
  const [vals, setVals] = useState<Record<string, string>>(() =>
    Object.fromEntries((def?.inputs ?? []).map((i) => [i.name, i.default]))
  );
  if (!def) return <Box>Calculator coming soon.</Box>;
  const numbers: Record<string, number> = Object.fromEntries(
    Object.entries(vals).map(([k, v]) => [k, parseFloat(v) || 0])
  );
  let result = "";
  try { result = def.compute(numbers); } catch { result = "Check inputs"; }
  return (
    <Box>
      <div className="grid gap-3 sm:grid-cols-2">
        {def.inputs.map((i) => (
          <div key={i.name}>
            <Label>{i.label}</Label>
            <Input
              type="number"
              value={vals[i.name]}
              onChange={(e) => setVals({ ...vals, [i.name]: e.target.value })}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-lg border border-primary/40 bg-primary/10 p-4 text-sm">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">Result</span>
        <div className="mt-1 text-base font-semibold text-primary">{result}</div>
      </div>
    </Box>
  );
}

/* ---------------- Dispatcher ---------------- */
export function ToolRunner({ tool }: { tool: Tool }) {
  switch (tool.engine) {
    case "text": return <TextEngine tool={tool} />;
    case "encoder": return <EncoderEngine tool={tool} />;
    case "unit": return <UnitEngine tool={tool} />;
    case "generator": return <GeneratorEngine tool={tool} />;
    case "datetime": return <DatetimeEngine tool={tool} />;
    case "color": return <ColorEngine tool={tool} />;
    case "calc": return <CalcEngine tool={tool} />;
    default: return <Box>Tool engine not implemented.</Box>;
  }
}
