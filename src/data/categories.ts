export type Category = {
  slug: string;
  name: string;
  description: string;
  blurb: string;
};

export const categories: Category[] = [
  { slug: "text", name: "Text Tools", description: "Manipulate, format and analyze text instantly.", blurb: "Quick utilities for writers, students and developers." },
  { slug: "converter", name: "Unit Converters", description: "Convert between everyday units of measurement.", blurb: "Length, weight, temperature, volume, area and more." },
  { slug: "calculator", name: "Calculators", description: "Practical calculators for daily life and finance.", blurb: "Loans, health, percentages and household maths." },
  { slug: "generator", name: "Generators", description: "Generate passwords, IDs, colors, lorem ipsum and more.", blurb: "Random data on demand." },
  { slug: "encoder", name: "Encoders & Decoders", description: "Base64, URL, HTML, hex and binary encoders.", blurb: "Two-way conversions between common text encodings." },
  { slug: "datetime", name: "Date & Time", description: "Work with dates, timestamps and durations.", blurb: "Add days, find differences and parse timestamps." },
  { slug: "color", name: "Color Tools", description: "Convert and inspect color values.", blurb: "Hex, RGB, HSL and contrast helpers." },
];

export const categoryMap = Object.fromEntries(categories.map((c) => [c.slug, c]));
