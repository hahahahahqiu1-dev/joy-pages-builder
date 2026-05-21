export type ToolEngine =
  | "text"
  | "encoder"
  | "generator"
  | "calc"
  | "datetime"
  | "color"
  | "unit";

export type Tool = {
  slug: string;
  title: string;
  description: string;
  category: string;
  engine: ToolEngine;
  config: Record<string, unknown>;
  keywords?: string[];
};

/* ---------------- TEXT TOOLS ---------------- */
const textTools: Tool[] = (
  [
    ["uppercase", "Uppercase Converter", "Convert any text to UPPERCASE in one click.", "uppercase"],
    ["lowercase", "Lowercase Converter", "Convert any text to lowercase instantly.", "lowercase"],
    ["title-case", "Title Case Converter", "Capitalize The First Letter Of Every Word.", "titlecase"],
    ["sentence-case", "Sentence Case Converter", "Format text as proper sentences.", "sentencecase"],
    ["camel-case", "camelCase Converter", "Turn any phrase into camelCase.", "camelcase"],
    ["pascal-case", "PascalCase Converter", "Turn any phrase into PascalCase.", "pascalcase"],
    ["snake-case", "snake_case Converter", "Convert text to snake_case.", "snakecase"],
    ["kebab-case", "kebab-case Converter", "Convert text to kebab-case.", "kebabcase"],
    ["constant-case", "CONSTANT_CASE Converter", "Convert text to CONSTANT_CASE.", "constantcase"],
    ["slugify", "Slugify Text", "Turn any string into a URL-friendly slug.", "slug"],
    ["reverse-text", "Reverse Text", "Reverse the characters of any string.", "reverse"],
    ["reverse-words", "Reverse Words", "Reverse the word order of a sentence.", "reversewords"],
    ["word-counter", "Word Counter", "Count words in a paragraph or article.", "wordcount"],
    ["character-counter", "Character Counter", "Count characters with or without spaces.", "charcount"],
    ["line-counter", "Line Counter", "Count the lines in a block of text.", "linecount"],
    ["paragraph-counter", "Paragraph Counter", "Count paragraphs separated by blank lines.", "paragraphcount"],
    ["remove-extra-spaces", "Remove Extra Spaces", "Collapse multiple spaces into one.", "trimspaces"],
    ["remove-line-breaks", "Remove Line Breaks", "Strip new lines from text.", "removebreaks"],
    ["sort-lines", "Sort Lines Alphabetically", "Sort each line in ascending order.", "sortlines"],
    ["reverse-lines", "Reverse Lines", "Flip the order of lines in your text.", "reverselines"],
    ["shuffle-lines", "Shuffle Lines", "Randomly shuffle the lines.", "shufflelines"],
    ["unique-lines", "Remove Duplicate Lines", "Keep only unique lines from your text.", "uniquelines"],
    ["text-repeater", "Text Repeater", "Repeat any text a chosen number of times.", "repeat"],
    ["strip-html", "Strip HTML Tags", "Remove all HTML tags from text.", "striphtml"],
    ["rot13", "ROT13 Encoder", "Apply the classic ROT13 cipher.", "rot13"],
    ["leetspeak", "Leetspeak Converter", "Translate text into l33tsp34k.", "leet"],
    ["zalgo", "Zalgo Text Generator", "Add glitchy combining marks to text.", "zalgo"],
    ["bold-unicode", "Bold Unicode Text", "Turn plain text into 𝐛𝐨𝐥𝐝 Unicode.", "boldunicode"],
    ["italic-unicode", "Italic Unicode Text", "Turn plain text into 𝑖𝑡𝑎𝑙𝑖𝑐 Unicode.", "italicunicode"],
    ["upside-down", "Upside Down Text", "Flip your text uʍop ǝpᴉsdn.", "upsidedown"],
  ] as const
).map(([slug, title, description, op]) => ({
  slug, title, description, category: "text", engine: "text", config: { op },
}));

/* ---------------- ENCODER TOOLS ---------------- */
const encoderTools: Tool[] = (
  [
    ["base64-encode", "Base64 Encoder", "Encode plain text to Base64.", "base64", "encode"],
    ["base64-decode", "Base64 Decoder", "Decode Base64 back to plain text.", "base64", "decode"],
    ["url-encode", "URL Encoder", "Percent-encode strings for use in URLs.", "url", "encode"],
    ["url-decode", "URL Decoder", "Decode percent-encoded URL strings.", "url", "decode"],
    ["html-encode", "HTML Entity Encoder", "Escape HTML special characters.", "html", "encode"],
    ["html-decode", "HTML Entity Decoder", "Decode HTML entities back to characters.", "html", "decode"],
    ["hex-encode", "Hex Encoder", "Encode text into hexadecimal bytes.", "hex", "encode"],
    ["hex-decode", "Hex Decoder", "Decode hex bytes back into text.", "hex", "decode"],
    ["binary-encode", "Binary Encoder", "Convert text to its binary representation.", "binary", "encode"],
    ["binary-decode", "Binary Decoder", "Decode binary back to plain text.", "binary", "decode"],
    ["morse-encode", "Morse Code Encoder", "Translate text into Morse code.", "morse", "encode"],
    ["morse-decode", "Morse Code Decoder", "Translate Morse code back into text.", "morse", "decode"],
  ] as const
).map(([slug, title, description, kind, mode]) => ({
  slug, title, description, category: "encoder", engine: "encoder", config: { kind, mode },
}));

/* ---------------- GENERATORS ---------------- */
const generatorTools: Tool[] = (
  [
    ["password-generator", "Password Generator", "Create strong random passwords.", "password"],
    ["uuid-generator", "UUID Generator", "Generate v4 universally unique identifiers.", "uuid"],
    ["lorem-ipsum", "Lorem Ipsum Generator", "Generate placeholder paragraphs of Latin text.", "lorem"],
    ["random-number", "Random Number Generator", "Pick a random integer in any range.", "number"],
    ["random-letter", "Random Letter Picker", "Pick one or more random letters.", "letter"],
    ["dice-roller", "Dice Roller", "Roll one or more virtual dice.", "dice"],
    ["coin-flipper", "Coin Flipper", "Flip a virtual coin: heads or tails.", "coin"],
    ["random-color", "Random Color Generator", "Generate random hex colors.", "color"],
    ["gradient-generator", "CSS Gradient Generator", "Create random CSS linear gradients.", "gradient"],
    ["username-generator", "Username Generator", "Get random readable usernames.", "username"],
    ["slug-generator", "Random Slug Generator", "Generate short readable URL slugs.", "shortslug"],
    ["password-pin", "PIN Code Generator", "Generate numeric PIN codes.", "pin"],
    ["fake-quote", "Random Quote Generator", "Get a random inspirational quote.", "quote"],
    ["random-emoji", "Random Emoji Picker", "Pick a random emoji.", "emoji"],
    ["random-date", "Random Date Generator", "Pick a random date in a range.", "date"],
  ] as const
).map(([slug, title, description, kind]) => ({
  slug, title, description, category: "generator", engine: "generator", config: { kind },
}));

/* ---------------- CALCULATORS ---------------- */
const calculatorTools: Tool[] = (
  [
    ["bmi-calculator", "BMI Calculator", "Compute your body mass index from height and weight."],
    ["age-calculator", "Age Calculator", "Find your exact age from a birth date."],
    ["tip-calculator", "Tip Calculator", "Work out the right tip and split the bill."],
    ["percentage-calculator", "Percentage Calculator", "Find percentages of any number."],
    ["percent-change", "Percent Change Calculator", "Calculate increase or decrease between two numbers."],
    ["discount-calculator", "Discount Calculator", "See the final price after a discount."],
    ["sales-tax-calculator", "Sales Tax Calculator", "Add sales tax to any subtotal."],
    ["simple-interest", "Simple Interest Calculator", "Calculate simple interest on a principal."],
    ["compound-interest", "Compound Interest Calculator", "See how money grows with compounding."],
    ["loan-emi", "Loan EMI Calculator", "Estimate the monthly EMI on any loan."],
    ["mortgage-calculator", "Mortgage Calculator", "Estimate monthly mortgage payments."],
    ["savings-goal", "Savings Goal Calculator", "Know how much to save each month."],
    ["calorie-needs", "Calorie Needs Calculator", "Estimate your daily calorie requirement."],
    ["bmr-calculator", "BMR Calculator", "Calculate basal metabolic rate."],
    ["ideal-weight", "Ideal Weight Calculator", "Estimate ideal body weight for your height."],
    ["water-intake", "Water Intake Calculator", "Estimate daily water needs."],
    ["body-fat", "Body Fat Calculator", "Estimate body fat percentage."],
    ["pace-calculator", "Pace Calculator", "Find your running pace per kilometre or mile."],
    ["speed-calculator", "Speed, Distance, Time", "Solve speed, distance or time problems."],
    ["fuel-cost", "Fuel Cost Calculator", "Estimate the cost of a road trip."],
    ["electricity-cost", "Electricity Cost Calculator", "Estimate the cost of running an appliance."],
    ["paint-calculator", "Paint Calculator", "How much paint you need for a room."],
    ["tile-calculator", "Tile Calculator", "How many tiles to cover a floor."],
    ["gpa-calculator", "GPA Calculator", "Compute a simple grade point average."],
    ["grade-needed", "Final Grade Calculator", "Find what you need on the final exam."],
    ["ratio-calculator", "Ratio Calculator", "Scale a ratio or compare two ratios."],
    ["mean-median-mode", "Mean / Median / Mode", "Quick statistics for a list of numbers."],
    ["fraction-to-decimal", "Fraction to Decimal", "Convert a fraction to a decimal value."],
    ["decimal-to-fraction", "Decimal to Fraction", "Convert a decimal to a simple fraction."],
    ["roman-numerals", "Roman Numeral Converter", "Convert between integers and Roman numerals."],
  ] as const
).map(([slug, title, description]) => ({
  slug, title, description, category: "calculator", engine: "calc", config: { calcId: slug },
}));

/* ---------------- DATE / TIME ---------------- */
const datetimeTools: Tool[] = (
  [
    ["date-difference", "Date Difference Calculator", "Count days between two dates.", "diff"],
    ["add-days", "Add Days to a Date", "Add a number of days to any date.", "add"],
    ["subtract-days", "Subtract Days from a Date", "Subtract days from any date.", "sub"],
    ["days-until", "Days Until a Date", "Countdown days from today to a date.", "until"],
    ["weekday-finder", "Day of the Week Finder", "What day of the week was/is a date?", "weekday"],
    ["week-number", "Week Number Finder", "Find the ISO week number of a date.", "week"],
    ["timestamp-to-date", "Unix Timestamp to Date", "Convert a Unix timestamp to a date.", "tstodate"],
    ["date-to-timestamp", "Date to Unix Timestamp", "Convert a date to a Unix timestamp.", "datetots"],
    ["age-in-days", "Age in Days", "Show your age in total days.", "agedays"],
    ["time-since", "Time Since Calculator", "How long ago was a date?", "since"],
  ] as const
).map(([slug, title, description, op]) => ({
  slug, title, description, category: "datetime", engine: "datetime", config: { op },
}));

/* ---------------- COLOR ---------------- */
const colorTools: Tool[] = (
  [
    ["hex-to-rgb", "Hex to RGB Converter", "Convert a hex color into RGB.", "hex2rgb"],
    ["rgb-to-hex", "RGB to Hex Converter", "Convert RGB values into a hex color.", "rgb2hex"],
    ["hex-to-hsl", "Hex to HSL Converter", "Convert a hex color into HSL.", "hex2hsl"],
    ["hsl-to-hex", "HSL to Hex Converter", "Convert HSL values into a hex color.", "hsl2hex"],
    ["rgb-to-hsl", "RGB to HSL Converter", "Convert RGB values into HSL.", "rgb2hsl"],
    ["hsl-to-rgb", "HSL to RGB Converter", "Convert HSL values into RGB.", "hsl2rgb"],
    ["color-contrast", "Color Contrast Checker", "Check WCAG contrast between two colors.", "contrast"],
    ["color-lighten", "Color Lightener", "Lighten any color by a percentage.", "lighten"],
    ["color-darken", "Color Darkener", "Darken any color by a percentage.", "darken"],
  ] as const
).map(([slug, title, description, op]) => ({
  slug, title, description, category: "color", engine: "color", config: { op },
}));

/* ---------------- UNIT CONVERTERS ---------------- */
type UnitDef = { id: string; label: string; factor: number; offset?: number };
type UnitFamily = { name: string; units: UnitDef[] };

const families: UnitFamily[] = [
  { name: "length", units: [
    { id: "meter", label: "Meters", factor: 1 },
    { id: "centimeter", label: "Centimeters", factor: 0.01 },
    { id: "millimeter", label: "Millimeters", factor: 0.001 },
    { id: "kilometer", label: "Kilometers", factor: 1000 },
    { id: "inch", label: "Inches", factor: 0.0254 },
    { id: "foot", label: "Feet", factor: 0.3048 },
    { id: "yard", label: "Yards", factor: 0.9144 },
    { id: "mile", label: "Miles", factor: 1609.344 },
  ]},
  { name: "weight", units: [
    { id: "kilogram", label: "Kilograms", factor: 1 },
    { id: "gram", label: "Grams", factor: 0.001 },
    { id: "milligram", label: "Milligrams", factor: 0.000001 },
    { id: "pound", label: "Pounds", factor: 0.45359237 },
    { id: "ounce", label: "Ounces", factor: 0.02834952 },
    { id: "ton", label: "Metric Tons", factor: 1000 },
  ]},
  { name: "volume", units: [
    { id: "liter", label: "Liters", factor: 1 },
    { id: "milliliter", label: "Milliliters", factor: 0.001 },
    { id: "gallon-us", label: "US Gallons", factor: 3.785411784 },
    { id: "quart-us", label: "US Quarts", factor: 0.946352946 },
    { id: "pint-us", label: "US Pints", factor: 0.473176473 },
    { id: "cup-us", label: "US Cups", factor: 0.2365882365 },
    { id: "fluid-ounce-us", label: "US Fluid Ounces", factor: 0.0295735296 },
  ]},
  { name: "area", units: [
    { id: "square-meter", label: "Square Meters", factor: 1 },
    { id: "square-foot", label: "Square Feet", factor: 0.09290304 },
    { id: "square-yard", label: "Square Yards", factor: 0.83612736 },
    { id: "acre", label: "Acres", factor: 4046.8564224 },
    { id: "hectare", label: "Hectares", factor: 10000 },
  ]},
  { name: "speed", units: [
    { id: "kmh", label: "Kilometers / hour", factor: 1 },
    { id: "mph", label: "Miles / hour", factor: 1.609344 },
    { id: "ms", label: "Meters / second", factor: 3.6 },
    { id: "knot", label: "Knots", factor: 1.852 },
  ]},
  { name: "time", units: [
    { id: "second", label: "Seconds", factor: 1 },
    { id: "minute", label: "Minutes", factor: 60 },
    { id: "hour", label: "Hours", factor: 3600 },
    { id: "day", label: "Days", factor: 86400 },
    { id: "week", label: "Weeks", factor: 604800 },
  ]},
  { name: "data", units: [
    { id: "byte", label: "Bytes", factor: 1 },
    { id: "kilobyte", label: "Kilobytes", factor: 1024 },
    { id: "megabyte", label: "Megabytes", factor: 1024 ** 2 },
    { id: "gigabyte", label: "Gigabytes", factor: 1024 ** 3 },
    { id: "terabyte", label: "Terabytes", factor: 1024 ** 4 },
  ]},
];

const unitTools: Tool[] = [];
for (const family of families) {
  for (const from of family.units) {
    for (const to of family.units) {
      if (from.id === to.id) continue;
      unitTools.push({
        slug: `${from.id}-to-${to.id}`,
        title: `${from.label} to ${to.label}`,
        description: `Convert ${from.label.toLowerCase()} to ${to.label.toLowerCase()} instantly.`,
        category: "converter",
        engine: "unit",
        config: { family: family.name, from: from.id, to: to.id, fromFactor: from.factor, toFactor: to.factor, fromLabel: from.label, toLabel: to.label },
      });
    }
  }
}

// Temperature handled specially (linear with offset)
const tempPairs: Array<[string, string, string, string]> = [
  ["celsius", "Celsius", "fahrenheit", "Fahrenheit"],
  ["fahrenheit", "Fahrenheit", "celsius", "Celsius"],
  ["celsius", "Celsius", "kelvin", "Kelvin"],
  ["kelvin", "Kelvin", "celsius", "Celsius"],
  ["fahrenheit", "Fahrenheit", "kelvin", "Kelvin"],
  ["kelvin", "Kelvin", "fahrenheit", "Fahrenheit"],
];
for (const [fromId, fromLabel, toId, toLabel] of tempPairs) {
  unitTools.push({
    slug: `${fromId}-to-${toId}`,
    title: `${fromLabel} to ${toLabel}`,
    description: `Convert ${fromLabel} to ${toLabel} temperatures.`,
    category: "converter",
    engine: "unit",
    config: { family: "temperature", from: fromId, to: toId },
  });
}

// Cap converters so total tool count lands ~150
const cappedUnitTools = unitTools.slice(0, 150 - (textTools.length + encoderTools.length + generatorTools.length + calculatorTools.length + datetimeTools.length + colorTools.length));

export const tools: Tool[] = [
  ...textTools,
  ...encoderTools,
  ...generatorTools,
  ...calculatorTools,
  ...datetimeTools,
  ...colorTools,
  ...cappedUnitTools,
];

export const toolMap: Record<string, Tool> = Object.fromEntries(tools.map((t) => [t.slug, t]));

export function toolsByCategory(cat: string): Tool[] {
  return tools.filter((t) => t.category === cat);
}

export function relatedTools(slug: string, limit = 6): Tool[] {
  const t = toolMap[slug];
  if (!t) return [];
  return tools.filter((x) => x.category === t.category && x.slug !== slug).slice(0, limit);
}
