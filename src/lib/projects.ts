import { z } from "zod";
import { SITE_CONFIG } from "@/config/site-config";

export const API_BASE = SITE_CONFIG.apiBaseUrl;

export const imageUrl = (path: string | null | undefined): string | null => {
  if (!path || path === "None" || path === "null") return null;
  return path.startsWith("http") ? path : `${API_BASE}${path}`;
};

export const link = (url: string | null | undefined): string | null => {
  if (!url || url === "None" || url === "null") return null;
  return url.startsWith("http") ? url : `https://${url}`;
};

// Raw item schema from API (lenient to tolerate API changes)
export const RawProjectSchema = z.object({
  id: z.union([z.number(), z.string()]),
  title: z.string(),
  description: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  github_link: z.string().nullable().optional(),
  live_link: z.string().nullable().optional(),
  project_type: z.string().nullable().optional(),
  duration: z.string().nullable().optional(),
  end_date: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  created_at: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  // Future-proof optional fields
  tech_stack: z.array(z.string()).nullable().optional(),
  category: z.string().nullable().optional(),
  featured: z.boolean().nullable().optional(),
});

export type RawProject = z.infer<typeof RawProjectSchema>;

export type ProjectPlatform = "Web" | "Mobile";

export interface NormalizedProject {
  id: number | string;
  sourceIds: (number | string)[];
  title: string;
  rawTitle: string;
  icon: string;
  description: string;
  shortDescription: string;
  fullDescriptionFormatted: string;
  image: string | null;
  placeholderBg: string;
  githubLink: string | null;
  liveLink: string | null;
  isGooglePlay: boolean;
  platforms: ProjectPlatform[];
  primaryType: string;
  durationAr: string | null;
  durationEn: string | null;
  endDate: string | null;
  formattedDateAr: string | null;
  formattedDateEn: string | null;
  techStack: string[];
  isFeatured: boolean;
}

// Featured IDs per specification: BillPro SA (12), Souqna (17), Lawyers ERP (21), UMQ (7), Edutic (13), Asas Al-Jawhara (15)
const FEATURED_IDS = new Set([12, 17, 21, 7, 13, 15, "12", "17", "21", "7", "13", "15"]);

// Dictionary of tech keywords to scan in description
const TECH_DICTIONARY: { name: string; regex: RegExp }[] = [
  { name: "Laravel", regex: /\b(laravel)\b/i },
  { name: "Go (Golang)", regex: /\b(go|golang)\b/i },
  { name: "React", regex: /\b(react|reactjs)\b/i },
  { name: "TypeScript", regex: /\b(typescript|ts)\b/i },
  { name: "Multi-Tenant", regex: /(multi-tenant|multi-tenancy|متعدد المستأجرين)/i },
  { name: "RBAC & Permissions", regex: /(rbac|صلاحيات|multi-role)/i },
  { name: "ZATCA", regex: /\b(zatca|الفوترة الإلكترونية|e-invoicing)\b/i },
  { name: "Sanctum & Auth", regex: /\b(sanctum|oauth|jwt|otp)\b/i },
  { name: "REST API", regex: /\b(rest|restful|api|apis)\b/i },
  { name: "Docker", regex: /\b(docker|container)\b/i },
  { name: "PostgreSQL", regex: /\b(postgresql|postgres)\b/i },
  { name: "MySQL", regex: /\b(mysql)\b/i },
  { name: "Redis", regex: /\b(redis|cache|queues)\b/i },
  { name: "Firebase", regex: /\b(firebase|fcm)\b/i },
  { name: "Flutter", regex: /\b(flutter|dart)\b/i },
  { name: "Double-Entry Ledger", regex: /(double-entry|قيد مزدوج|قيود اليومية|ledger)/i },
  { name: "EdfaPay / Payment", regex: /(edfapay|دفع إلكتروني|بوابات الدفع|payment)/i },
  { name: "GPS & Maps", regex: /\b(gps|خرائط|geolocation)\b/i },
  { name: "Aramex / Shipping", regex: /(aramex|smsa|naqel|شحن|توصيل)/i },
  { name: "Webhooks", regex: /\b(webhook|webhooks)\b/i },
  { name: "WhatsApp API", regex: /(whatsapp|واتساب)/i },
];

// Placeholder gradients for projects without an image
const PLACEHOLDER_GRADIENTS = [
  "from-emerald-950 via-teal-900 to-slate-900",
  "from-cyan-950 via-blue-900 to-slate-900",
  "from-violet-950 via-indigo-900 to-slate-900",
  "from-slate-900 via-neutral-800 to-slate-950",
  "from-teal-950 via-emerald-900 to-slate-900",
];

// Extract leading emoji from title and clean string
export function splitEmojiTitle(rawTitle: string): { icon: string; cleanTitle: string } {
  // Common emoji detection regex at start of string
  const emojiRegex =
    /^([\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}]+)\s*(.*)$/u;
  const match = rawTitle.trim().match(emojiRegex);
  if (match && match[1] && match[2]) {
    return {
      icon: match[1].trim(),
      cleanTitle: match[2].trim(),
    };
  }
  // Fallback icon based on keywords
  let icon = "💻";
  if (/mobile|app|تطبيق/i.test(rawTitle)) icon = "📱";
  if (/shop|store|متجر|تجارة/i.test(rawTitle)) icon = "🛒";
  if (/law|legal|محام/i.test(rawTitle)) icon = "⚖️";
  if (/jewel|مجوهر/i.test(rawTitle)) icon = "💎";
  if (/sea|dive|بحر|غوص/i.test(rawTitle)) icon = "🌊";
  return { icon, cleanTitle: rawTitle.trim() };
}

// Clean markdown, LaTeX, and messy strings from description
export function cleanDescription(raw: string | null | undefined): {
  cleanText: string;
  shortText: string;
  formattedText: string;
} {
  if (!raw || raw === "None" || raw === "null") {
    return { cleanText: "", shortText: "", formattedText: "" };
  }

  // 1. Replace LaTeX $\rightarrow$ with arrow
  let text = raw.replace(/\$\\rightarrow\$/g, "←");
  text = text.replace(/\\text\{([^}]+)\}/g, "$1");
  text = text.replace(/\$([^$]+)\$/g, "$1");

  // 2. Normalize line breaks
  text = text.replace(/\r\n/g, "\n");

  // Plain text version (strips markdown bold, lists, etc)
  const plainText = text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\* /g, "• ")
    .replace(/#{1,6}\s+/g, "")
    .trim();

  // Short snippet max 140 chars
  let short = plainText.replace(/\n+/g, " ");
  if (short.length > 140) {
    short = short.slice(0, 137).trim() + "...";
  }

  return {
    cleanText: plainText,
    shortText: short,
    formattedText: text,
  };
}

// Standardize duration strings
export function normalizeDuration(rawDuration: string | null | undefined): {
  ar: string | null;
  en: string | null;
} {
  if (!rawDuration || rawDuration === "None" || rawDuration === "null") {
    return { ar: null, en: null };
  }

  const trimmed = rawDuration.trim();
  // Numbers like "3" or "4"
  if (/^\d+$/.test(trimmed)) {
    const n = parseInt(trimmed, 10);
    return {
      ar: `${n} أشهر`,
      en: `${n} months`,
    };
  }

  // Decimal numbers like "2.5 months"
  const monthMatch = trimmed.match(/([\d.]+)\s*(?:months?|اشهر|أشهر)/i);
  if (monthMatch && monthMatch[1]) {
    const n = monthMatch[1];
    return {
      ar: `${n} أشهر`,
      en: `${n} months`,
    };
  }

  return {
    ar: trimmed,
    en: trimmed,
  };
}

// Validate and clean live link
export function sanitizeLiveLink(url: string | null | undefined): {
  link: string | null;
  isPlayStore: boolean;
} {
  if (!url || url === "None" || url === "null") {
    return { link: null, isPlayStore: false };
  }
  let cleaned = url.trim();

  // Ignore invalid generic Google Play links without package id
  if (cleaned.includes("play.google.com/store/games") && !cleaned.includes("id=")) {
    return { link: null, isPlayStore: false };
  }

  if (!cleaned.startsWith("http://") && !cleaned.startsWith("https://")) {
    cleaned = `https://${cleaned}`;
  }

  const isPlayStore = cleaned.includes("play.google.com/store/apps/details");
  return { link: cleaned, isPlayStore };
}

// Extract tech stack
export function extractTechStack(desc: string, existing?: string[] | null): string[] {
  if (existing && existing.length > 0) return existing;
  const found: string[] = [];
  for (const { name, regex } of TECH_DICTIONARY) {
    if (regex.test(desc)) {
      found.push(name);
    }
  }
  // Ensure primary core backend/frontend are highlighted if relevant
  return found;
}

// Normalization & Deduplication Pipeline
export function normalizeProjects(rawItems: unknown[]): NormalizedProject[] {
  const validItems: RawProject[] = [];

  for (const item of rawItems) {
    const parsed = RawProjectSchema.safeParse(item);
    if (parsed.success) {
      validItems.push(parsed.data);
    }
  }

  // Deduplication map: key = canonical cleaned title
  const map = new Map<string, RawProject[]>();

  for (const item of validItems) {
    const { cleanTitle } = splitEmojiTitle(item.title);
    // Key simplification: normalize spaces & lower case
    const key = cleanTitle.toLowerCase().replace(/\s+/g, " ").trim();
    const list = map.get(key) ?? [];
    list.push(item);
    map.set(key, list);
  }

  const result: NormalizedProject[] = [];
  let index = 0;

  for (const [, group] of map.entries()) {
    // Pick primary item: prefer item with duration, end_date, valid image, or web
    const primary =
      group.find((g) => g.end_date && g.image) ?? group.find((g) => g.image) ?? group[0];

    const sourceIds = group.map((g) => g.id);
    const isFeatured = group.some((g) => FEATURED_IDS.has(g.id) || g.featured === true);

    const { icon, cleanTitle } = splitEmojiTitle(primary.title);

    // Merge platforms
    const platformSet = new Set<ProjectPlatform>();
    for (const g of group) {
      const typeStr = (g.project_type || "").toLowerCase();
      if (typeStr.includes("mobile") || typeStr.includes("app") || typeStr.includes("تطبيق")) {
        platformSet.add("Mobile");
      }
      if (
        typeStr.includes("web") ||
        typeStr.includes("ويب") ||
        typeStr.includes("saas") ||
        typeStr.includes("موقع")
      ) {
        platformSet.add("Web");
      }
    }
    if (platformSet.size === 0) {
      platformSet.add("Web");
    }
    const platforms = Array.from(platformSet);

    // Best description
    const bestDescItem = group.reduce((prev, curr) =>
      (curr.description?.length ?? 0) > (prev.description?.length ?? 0) ? curr : prev,
    );
    const { shortText, cleanText, formattedText } = cleanDescription(bestDescItem.description);

    // Best image
    const imgItem = group.find((g) => g.image && g.image !== "None" && g.image !== "null");
    let image: string | null = null;
    if (imgItem?.image) {
      image = imgItem.image.startsWith("http") ? imgItem.image : `${API_BASE}${imgItem.image}`;
    }

    // Best live link & play store
    let liveLink: string | null = null;
    let isGooglePlay = false;
    for (const g of group) {
      const sanitized = sanitizeLiveLink(g.live_link);
      if (sanitized.link) {
        liveLink = sanitized.link;
        isGooglePlay = sanitized.isPlayStore;
        break;
      }
    }

    // Best github link
    let githubLink: string | null = null;
    for (const g of group) {
      if (
        g.github_link &&
        g.github_link.trim() !== "" &&
        g.github_link !== "None" &&
        g.github_link !== "null"
      ) {
        githubLink = g.github_link.trim();
        if (!githubLink.startsWith("http")) githubLink = `https://${githubLink}`;
        break;
      }
    }

    // Duration & dates
    const dateItem = group.find(
      (g) => g.end_date && g.end_date !== "None" && g.end_date !== "null",
    );
    const endDate = dateItem?.end_date ?? null;

    let formattedDateAr: string | null = null;
    let formattedDateEn: string | null = null;
    if (endDate) {
      try {
        const d = new Date(endDate);
        formattedDateAr = d.toLocaleDateString("ar-EG", { year: "numeric", month: "long" });
        formattedDateEn = d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
      } catch {
        // ignore invalid date
      }
    }

    const durationItem = group.find(
      (g) => g.duration && g.duration !== "None" && g.duration !== "null",
    );
    const { ar: durationAr, en: durationEn } = normalizeDuration(durationItem?.duration);

    // Tech stack
    const techStack = extractTechStack(cleanText, primary.tech_stack);

    const placeholderBg = PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length];
    index++;

    result.push({
      id: primary.id,
      sourceIds,
      title: cleanTitle,
      rawTitle: primary.title,
      icon,
      description: cleanText,
      shortDescription: shortText,
      fullDescriptionFormatted: formattedText,
      image,
      placeholderBg,
      githubLink,
      liveLink,
      isGooglePlay,
      platforms,
      primaryType: platforms.join(" & "),
      durationAr,
      durationEn,
      endDate,
      formattedDateAr,
      formattedDateEn,
      techStack,
      isFeatured,
    });
  }

  // Sort: Featured first, then by endDate (newest first, null at the end)
  result.sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;

    if (a.endDate && b.endDate) {
      return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
    }
    if (a.endDate && !b.endDate) return -1;
    if (!a.endDate && b.endDate) return 1;
    return 0;
  });

  return result;
}

const LOCAL_STORAGE_KEY = "cached_projects_v2";

// Fetch with localStorage fallback
export async function fetchProjects(): Promise<NormalizedProject[]> {
  try {
    const res = await fetch(`${API_BASE}/api/projects`, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
    const data = await res.json();
    const list = Array.isArray(data) ? data : (data?.data ?? []);
    const normalized = normalizeProjects(list);

    try {
      if (typeof window !== "undefined" && normalized.length > 0) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(normalized));
      }
    } catch {
      // ignore localStorage quota errors
    }

    return normalized;
  } catch (err) {
    console.warn("fetchProjects failed, trying localStorage fallback:", err);
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        }
      } catch {
        // ignore
      }
    }
    throw err;
  }
}

export const projectsQueryOptions = {
  queryKey: ["projects"],
  queryFn: fetchProjects,
  staleTime: 5 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
  retry: 2,
};
