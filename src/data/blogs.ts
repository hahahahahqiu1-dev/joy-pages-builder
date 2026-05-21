import { tools, toolsByCategory, type Tool } from "./tools";
import { categories } from "./categories";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  date: string; // ISO
  sections: { heading: string; body: string }[];
  relatedToolSlugs: string[];
};

/* Templated topic generator. Produces ~150 short, useful articles
   each linking to a few related tools in the same category. */

type Topic = { title: string; angle: string; category: string; toolHint?: string };

const seedTopics: Topic[] = [
  // text
  { title: "How to Count Words in Any Text", angle: "writers, students, SEO", category: "text", toolHint: "word-counter" },
  { title: "When to Use Title Case vs Sentence Case", angle: "style guides", category: "text", toolHint: "title-case" },
  { title: "What Is a URL Slug and Why It Matters", angle: "SEO basics", category: "text", toolHint: "slugify" },
  { title: "Quickly Remove Duplicate Lines from a List", angle: "data cleanup", category: "text", toolHint: "unique-lines" },
  { title: "Convert Text Cases Without Retyping", angle: "writing workflow", category: "text", toolHint: "uppercase" },
  { title: "Strip HTML Tags from Pasted Content", angle: "copywriting", category: "text", toolHint: "strip-html" },
  { title: "Reverse Text for Fun and Puzzles", angle: "creative use", category: "text", toolHint: "reverse-text" },
  { title: "Generating Bold and Italic Unicode Text", angle: "social media", category: "text", toolHint: "bold-unicode" },
  { title: "What Is ROT13 and When Is It Used?", angle: "history of ciphers", category: "text", toolHint: "rot13" },
  { title: "Cleaning Up Extra Spaces in Documents", angle: "copyediting", category: "text", toolHint: "remove-extra-spaces" },
  { title: "Sorting Lines Alphabetically in One Click", angle: "data prep", category: "text", toolHint: "sort-lines" },
  { title: "Camel Case vs Snake Case vs Kebab Case", angle: "naming things", category: "text", toolHint: "camel-case" },
  { title: "Building Clean Slugs for Blog URLs", angle: "publishing", category: "text", toolHint: "slugify" },
  { title: "Counting Characters for Twitter and Bio Limits", angle: "social", category: "text", toolHint: "character-counter" },
  { title: "Repeat Text for Mock Data Quickly", angle: "QA", category: "text", toolHint: "text-repeater" },

  // converter
  { title: "Meters to Feet: A Practical Conversion Guide", angle: "everyday", category: "converter", toolHint: "meter-to-foot" },
  { title: "Inches to Centimeters Without the Calculator", angle: "DIY", category: "converter", toolHint: "inch-to-centimeter" },
  { title: "Miles to Kilometers for Travelers", angle: "travel", category: "converter", toolHint: "mile-to-kilometer" },
  { title: "Pounds to Kilograms: Quick Mental Math", angle: "fitness", category: "converter", toolHint: "pound-to-kilogram" },
  { title: "Ounces to Grams in Cooking", angle: "kitchen", category: "converter", toolHint: "ounce-to-gram" },
  { title: "Liters to Gallons for Road Trips", angle: "travel", category: "converter", toolHint: "liter-to-gallon-us" },
  { title: "Celsius to Fahrenheit Made Simple", angle: "weather", category: "converter", toolHint: "celsius-to-fahrenheit" },
  { title: "Square Meters to Square Feet for Renters", angle: "real estate", category: "converter", toolHint: "square-meter-to-square-foot" },
  { title: "Acres to Hectares for Land Buyers", angle: "land", category: "converter", toolHint: "acre-to-hectare" },
  { title: "KMH to MPH on Road Trips Abroad", angle: "driving", category: "converter", toolHint: "kmh-to-mph" },
  { title: "Knots Explained: Speed at Sea and in the Air", angle: "transport", category: "converter", toolHint: "knot-to-kmh" },
  { title: "Megabytes vs Gigabytes vs Terabytes", angle: "tech literacy", category: "converter", toolHint: "megabyte-to-gigabyte" },
  { title: "Seconds, Minutes, Hours: Time Conversions", angle: "time math", category: "converter", toolHint: "second-to-minute" },
  { title: "Pints, Cups and Fluid Ounces for Bakers", angle: "baking", category: "converter", toolHint: "cup-us-to-fluid-ounce-us" },
  { title: "Yards to Meters for Sewing Projects", angle: "crafts", category: "converter", toolHint: "yard-to-meter" },

  // calculator
  { title: "How to Calculate BMI and What It Means", angle: "health", category: "calculator", toolHint: "bmi-calculator" },
  { title: "Splitting Bills and Tipping Fairly", angle: "dining", category: "calculator", toolHint: "tip-calculator" },
  { title: "Working Out Percentages in Real Life", angle: "math basics", category: "calculator", toolHint: "percentage-calculator" },
  { title: "Calculating Discounts Like a Shopper", angle: "shopping", category: "calculator", toolHint: "discount-calculator" },
  { title: "How Compound Interest Actually Works", angle: "finance", category: "calculator", toolHint: "compound-interest" },
  { title: "Estimating Your Loan EMI Before You Sign", angle: "finance", category: "calculator", toolHint: "loan-emi" },
  { title: "Mortgage Math: Monthly Payments Explained", angle: "home buying", category: "calculator", toolHint: "mortgage-calculator" },
  { title: "How Many Calories Do You Actually Need?", angle: "nutrition", category: "calculator", toolHint: "calorie-needs" },
  { title: "BMR vs TDEE: What's the Difference?", angle: "fitness", category: "calculator", toolHint: "bmr-calculator" },
  { title: "Daily Water Intake: How Much Is Enough?", angle: "hydration", category: "calculator", toolHint: "water-intake" },
  { title: "How Much Paint to Buy for a Room", angle: "DIY", category: "calculator", toolHint: "paint-calculator" },
  { title: "Tile Calculator: Plan Before You Buy", angle: "home", category: "calculator", toolHint: "tile-calculator" },
  { title: "Fuel Cost Math for Road Trips", angle: "travel", category: "calculator", toolHint: "fuel-cost" },
  { title: "GPA Math Without the Mystery", angle: "students", category: "calculator", toolHint: "gpa-calculator" },
  { title: "Running Pace and Finish Times", angle: "running", category: "calculator", toolHint: "pace-calculator" },

  // generator
  { title: "Choosing a Strong Password You Can Actually Use", angle: "security", category: "generator", toolHint: "password-generator" },
  { title: "What Is a UUID and When Do You Need One?", angle: "dev basics", category: "generator", toolHint: "uuid-generator" },
  { title: "Using Lorem Ipsum Without Looking Lazy", angle: "design", category: "generator", toolHint: "lorem-ipsum" },
  { title: "Random Numbers for Raffles and Draws", angle: "events", category: "generator", toolHint: "random-number" },
  { title: "Rolling Dice Without Dice", angle: "games", category: "generator", toolHint: "dice-roller" },
  { title: "Heads or Tails: A Coin Flip Online", angle: "decisions", category: "generator", toolHint: "coin-flipper" },
  { title: "Pretty CSS Gradients in Seconds", angle: "design", category: "generator", toolHint: "gradient-generator" },
  { title: "Username Ideas That Aren't Taken Yet", angle: "social", category: "generator", toolHint: "username-generator" },
  { title: "Generating Test Data for Forms", angle: "QA", category: "generator", toolHint: "fake-quote" },
  { title: "Picking Random Emojis for Variety", angle: "fun", category: "generator", toolHint: "random-emoji" },

  // encoder
  { title: "Base64 in Plain English", angle: "dev basics", category: "encoder", toolHint: "base64-encode" },
  { title: "Why URLs Need Encoding", angle: "web", category: "encoder", toolHint: "url-encode" },
  { title: "HTML Entities: When and Why", angle: "web", category: "encoder", toolHint: "html-encode" },
  { title: "Text to Binary: How Computers See Letters", angle: "tech literacy", category: "encoder", toolHint: "binary-encode" },
  { title: "Hex Encoding for Curious Beginners", angle: "tech literacy", category: "encoder", toolHint: "hex-encode" },
  { title: "Morse Code Is Still Useful", angle: "history", category: "encoder", toolHint: "morse-encode" },

  // datetime
  { title: "Calculating Days Between Two Dates", angle: "planning", category: "datetime", toolHint: "date-difference" },
  { title: "What Day of the Week Were You Born?", angle: "trivia", category: "datetime", toolHint: "weekday-finder" },
  { title: "Counting Down to a Big Date", angle: "events", category: "datetime", toolHint: "days-until" },
  { title: "Understanding Unix Timestamps", angle: "dev basics", category: "datetime", toolHint: "timestamp-to-date" },
  { title: "ISO Week Numbers Explained", angle: "planning", category: "datetime", toolHint: "week-number" },
  { title: "Adding Days to a Date the Right Way", angle: "planning", category: "datetime", toolHint: "add-days" },

  // color
  { title: "Hex, RGB and HSL: Picking the Right Format", angle: "design", category: "color", toolHint: "hex-to-rgb" },
  { title: "What WCAG Color Contrast Really Means", angle: "accessibility", category: "color", toolHint: "color-contrast" },
  { title: "Lightening and Darkening Brand Colors", angle: "design", category: "color", toolHint: "color-lighten" },
  { title: "Converting RGB to HSL for Theme Work", angle: "design", category: "color", toolHint: "rgb-to-hsl" },
];

function slugify(t: string) {
  return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function pickRelatedTools(category: string, hint?: string): string[] {
  const inCat = toolsByCategory(category);
  const others: Tool[] = [];
  if (hint) {
    const hinted = inCat.find((t) => t.slug === hint);
    if (hinted) others.push(hinted);
  }
  for (const t of inCat) {
    if (others.length >= 5) break;
    if (!others.find((x) => x.slug === t.slug)) others.push(t);
  }
  return others.map((t) => t.slug);
}

function buildSections(topic: Topic, related: Tool[]): { heading: string; body: string }[] {
  const main = related[0]?.title ?? topic.title;
  return [
    {
      heading: "Why this matters",
      body: `${topic.title} comes up more often than you'd think — especially for anyone working with ${topic.angle}. A few minutes spent learning the basics saves a surprising amount of time over a year of small tasks.`,
    },
    {
      heading: "The fastest way to do it",
      body: `The simplest path is to use a dedicated tool. Our ${main} runs entirely in your browser, so there's nothing to install and nothing leaves your device. Paste the text or numbers, get the answer, copy it back. That's it.`,
    },
    {
      heading: "A short worked example",
      body: `Take a simple case from ${topic.angle}: you have a value you need to transform, share or measure. Open the tool, drop the value in, and read off the result. If you do this often, bookmark the tool and you'll cut the round trip from minutes to seconds.`,
    },
    {
      heading: "Common mistakes to avoid",
      body: `Most errors come from mixing up units, formats or input order. Double-check which side is the source and which is the target before you copy the result. When in doubt, run the same value through twice and confirm you get the same answer.`,
    },
    {
      heading: "Related tools you'll like",
      body: related.map((t) => `• ${t.title} — ${t.description}`).join("\n"),
    },
  ];
}

function makeBlog(topic: Topic, idx: number): BlogPost {
  const related = pickRelatedTools(topic.category, topic.toolHint);
  const relatedFull = related.map((s) => tools.find((t) => t.slug === s)!).filter(Boolean);
  const date = new Date(2025, 0, 1 + idx * 2).toISOString().slice(0, 10);
  return {
    slug: slugify(topic.title),
    title: topic.title,
    excerpt: `${topic.title}: a short, practical guide for ${topic.angle}.`,
    category: topic.category,
    readMinutes: 3,
    date,
    sections: buildSections(topic, relatedFull),
    relatedToolSlugs: related,
  };
}

// Expand seeds into ~150 posts by adding angle variants per category
const variants = [
  "in everyday life",
  "for students",
  "for small teams",
  "for content creators",
  "for freelancers",
  "you can do offline",
  "without a spreadsheet",
];

const posts: BlogPost[] = [];
const seenSlugs = new Set<string>();

for (const t of seedTopics) {
  const post = makeBlog(t, posts.length);
  if (!seenSlugs.has(post.slug)) {
    posts.push(post);
    seenSlugs.add(post.slug);
  }
}

// Fill remaining to reach 150 by combining categories with variants
let i = 0;
while (posts.length < 150) {
  const cat = categories[i % categories.length];
  const variant = variants[Math.floor(i / categories.length) % variants.length];
  const title = `${cat.name} ${variant}`;
  const slug = slugify(`${title}-${posts.length}`);
  const catTools = toolsByCategory(cat.slug).slice(0, 5);
  posts.push({
    slug,
    title,
    excerpt: `${cat.name} ${variant}: practical picks and quick wins.`,
    category: cat.slug,
    readMinutes: 3,
    date: new Date(2025, 0, 1 + posts.length * 2).toISOString().slice(0, 10),
    sections: buildSections({ title, angle: variant, category: cat.slug }, catTools),
    relatedToolSlugs: catTools.map((t) => t.slug),
  });
  i++;
}

export const blogs: BlogPost[] = posts;
export const blogMap: Record<string, BlogPost> = Object.fromEntries(blogs.map((b) => [b.slug, b]));
export function blogsByCategory(cat: string): BlogPost[] {
  return blogs.filter((b) => b.category === cat);
}
export function relatedBlogs(slug: string, limit = 4): BlogPost[] {
  const b = blogMap[slug];
  if (!b) return [];
  return blogs.filter((x) => x.category === b.category && x.slug !== slug).slice(0, limit);
}
export function blogsLinkingTool(toolSlug: string, limit = 4): BlogPost[] {
  return blogs.filter((b) => b.relatedToolSlugs.includes(toolSlug)).slice(0, limit);
}
