import shiva from "@/assets/sculpture-shiva.jpg";
import ganesha from "@/assets/sculpture-ganesha.jpg";
import saraswati from "@/assets/sculpture-saraswati.jpg";
import krishna from "@/assets/sculpture-krishna.jpg";
import wip1 from "@/assets/wip-stage1.jpg";
import wip2 from "@/assets/wip-stage2.jpg";
import artisan1 from "@/assets/artisan-1.jpg";
import artisan2 from "@/assets/artisan-2.jpg";
import heritageHoysala from "@/assets/heritage-hoysala.jpg";
import heritageDravidian from "@/assets/heritage-dravidian.jpg";
import heritageShivarapatna from "@/assets/heritage-shivarapatna.jpg";

export type SculptureStatus = "completed" | "in-progress";

export interface TimelineStage {
  stage: string;
  date: string;
  image: string;
  description: string;
}

export interface Sculpture {
  id: string;
  title: string;
  image: string;
  style: string;
  material: string;
  dimensions: string;
  weight: string;
  status: SculptureStatus;
  completion: number;
  estimatedCompletion?: string;
  artisanId: string;
  category: "Idols" | "Statues" | "Architectural" | "Custom";
  description: string;
  caption: string;
  uploadDate: string;
  timeline?: TimelineStage[];
}

export interface Artisan {
  id: string;
  name: string;
  image: string;
  location: string;
  experienceYears: number;
  specialty: string;
  bio: string;
  awards: string[];
  signature: string;
}

export interface HeritageStory {
  id: string;
  title: string;
  image: string;
  era: string;
  origin: string;
  excerpt: string;
  paragraphs: string[];
  characteristics: string[];
  famousExamples: string[];
}

export const artisans: Artisan[] = [
  {
    id: "ramachandra-shilpi",
    name: "Ramachandra Shilpi",
    image: artisan1,
    location: "Shivarapatna, Karnataka",
    experienceYears: 42,
    specialty: "Hoysala Stone Carving",
    bio: "Born into a seventh-generation family of stone sculptors in Shivarapatna, Ramachandra learned to read the grain of granite before he could read letters. His chisel has shaped deities for temples across South India for over four decades.",
    awards: ["Karnataka State Shilpa Award, 2016", "National Master Craftsman, 2019"],
    signature: "Recognized for impossibly delicate jewellery carved into solid black granite.",
  },
  {
    id: "venkatesh-acharya",
    name: "Venkatesh Acharya",
    image: artisan2,
    location: "Karkala, Karnataka",
    experienceYears: 28,
    specialty: "Rosewood Idol Carving",
    bio: "Venkatesh works in fragrant rosewood and sandalwood, coaxing fluid, almost breathing figures out of dense grain. His Krishnas are commissioned by collectors from Mumbai to Melbourne.",
    awards: ["UNESCO Seal of Excellence, 2021"],
    signature: "Soft, lifelike modelling of fabric folds in hardwood — a near-impossible craft.",
  },
];

export const sculptures: Sculpture[] = [
  {
    id: "SK-001",
    title: "Nataraja — Dancing Shiva",
    image: shiva,
    style: "Hoysala",
    material: "Black Granite",
    dimensions: "3 ft × 2 ft × 1.5 ft",
    weight: "150 kg",
    status: "completed",
    completion: 100,
    artisanId: "ramachandra-shilpi",
    category: "Idols",
    description:
      "A meditation in motion. The cosmic dancer is rendered inside a flaming prabhavali, every flame chiselled by hand from a single granite block. Eight months of work.",
    caption: "Front view, completed February 2026",
    uploadDate: "2026-02-12",
  },
  {
    id: "SK-002",
    title: "Vinayaka — Seated Ganesha",
    image: ganesha,
    style: "Dravidian",
    material: "Black Granite",
    dimensions: "2.5 ft × 1.8 ft × 1.2 ft",
    weight: "95 kg",
    status: "completed",
    completion: 100,
    artisanId: "ramachandra-shilpi",
    category: "Idols",
    description:
      "A traditional seated Ganesha with intricate prabhavali. The trunk curls left — auspicious for household worship — and the lotus base bears micro-carved petals.",
    caption: "Centered, gold-leaf accented base",
    uploadDate: "2026-01-20",
  },
  {
    id: "SK-003",
    title: "Saraswati on Lotus",
    image: saraswati,
    style: "Pallava",
    material: "Sandstone",
    dimensions: "2.8 ft × 1.6 ft × 1.4 ft",
    weight: "70 kg",
    status: "in-progress",
    completion: 72,
    estimatedCompletion: "June 2026",
    artisanId: "ramachandra-shilpi",
    category: "Idols",
    description:
      "The goddess of wisdom seated on a fully-bloomed lotus, playing the veena. Currently in the detail-finishing stage — facial features and fingers being refined.",
    caption: "Stage four of six",
    uploadDate: "2026-04-02",
    timeline: [
      { stage: "Raw Granite Block", date: "Jan 8, 2026", image: wip1, description: "Block selected from the quarry, edges squared and consecrated." },
      { stage: "Rough Form", date: "Feb 14, 2026", image: wip2, description: "Silhouette and seated posture established. Lotus base roughed out." },
      { stage: "Detail Carving", date: "Apr 2, 2026", image: saraswati, description: "Veena, ornaments and lotus petals being refined. 72% complete." },
    ],
  },
  {
    id: "SK-004",
    title: "Venugopala Krishna",
    image: krishna,
    style: "Mysore Wood",
    material: "Rosewood",
    dimensions: "1.8 ft × 0.6 ft × 0.5 ft",
    weight: "8 kg",
    status: "completed",
    completion: 100,
    artisanId: "venkatesh-acharya",
    category: "Idols",
    description:
      "A standing Krishna playing the flute, carved from a single piece of aged rosewood. The flute is hollow and structurally integral — no joins.",
    caption: "Hand-finished with natural beeswax",
    uploadDate: "2026-03-11",
  },
];

export const heritageStories: HeritageStory[] = [
  {
    id: "hoysala",
    title: "The Hoysala Tradition",
    image: heritageHoysala,
    era: "11th – 14th century CE",
    origin: "Karnataka",
    excerpt: "Star-shaped plinths, soapstone friezes, and sculpture so fine it appears to breathe.",
    paragraphs: [
      "The Hoysala dynasty patronised a school of architecture and sculpture that prized obsessive ornament. Working in chloritic schist — soft when quarried, hardening with exposure — sculptors produced reliefs of dancers, deities and processions that today look almost machine-precise.",
      "What makes Hoysala work singular is not just detail but movement. Figures lean, pivot, glance — the stone refuses to stand still. The masters of Shivarapatna trace their lineage directly to this tradition.",
    ],
    characteristics: ["Star-shaped temple plans", "Soapstone with high relief", "Signed sculptures — rare in ancient India", "Multi-tiered ornamental friezes"],
    famousExamples: ["Chennakeshava Temple, Belur", "Hoysaleswara Temple, Halebidu", "Keshava Temple, Somanathapura"],
  },
  {
    id: "dravidian",
    title: "Dravidian Temple Sculpture",
    image: heritageDravidian,
    era: "7th century CE – present",
    origin: "Tamil Nadu & South India",
    excerpt: "Soaring gopurams populated by an entire cosmos of carved figures.",
    paragraphs: [
      "The Dravidian style gave the world the gopuram — the towering, pyramidal gateway densely populated with sculpted deities, demons, and dancers. Each tier is a stone storybook.",
      "Living artisans still cut granite for temple commissions using methods passed down from the Pallava and Chola masters. The forms are codified by the Shilpa Shastras, ancient treatises that fix proportion, posture and ornament.",
    ],
    characteristics: ["Pyramidal gopurams", "Granite as primary medium", "Iconographic precision per Shilpa Shastras", "Polychrome painting on stone"],
    famousExamples: ["Brihadeeswara Temple, Thanjavur", "Meenakshi Temple, Madurai", "Shore Temple, Mahabalipuram"],
  },
  {
    id: "shivarapatna",
    title: "The Shilpis of Shivarapatna",
    image: heritageShivarapatna,
    era: "Living tradition",
    origin: "Kolar, Karnataka",
    excerpt: "A village where almost every household carves stone gods.",
    paragraphs: [
      "Shivarapatna is small. Two hundred families, give or take. Nearly every one of them is engaged in the craft of stone sculpture. They are the modern inheritors of the Hoysala tradition — and their idols stand in temples from Tirupati to Toronto.",
      "Younger generations are leaving. Without modern markets, the craft risks falling silent within thirty years. Shilpa-Kala exists to turn the world's attention back to these workshops before the chisels stop ringing.",
    ],
    characteristics: ["Generational families of sculptors", "Black granite specialisation", "Commissions for major South Indian temples", "Endangered living tradition"],
    famousExamples: ["Idols at Tirumala Venkateswara Temple", "Commissions for diaspora temples worldwide"],
  },
];

export const getSculpture = (id: string) => sculptures.find((s) => s.id === id);
export const getArtisan = (id: string) => artisans.find((a) => a.id === id);
export const getHeritage = (id: string) => heritageStories.find((h) => h.id === id);
export const sculpturesByArtisan = (id: string) => sculptures.filter((s) => s.artisanId === id);

/**
 * Build a WhatsApp deep link with pre-filled inquiry message.
 * Phone is configurable — leave blank to open WhatsApp without a recipient.
 */
export const WHATSAPP_NUMBER = ""; // e.g. "919876543210" (country code, no +)

export function buildInquiryLink(sculpture: Sculpture, artisan: Artisan, customMessage = "") {
  const lines = [
    `Hello, I'm interested in the *${sculpture.title}* by ${artisan.name}.`,
    ``,
    `Product ID: ${sculpture.id}`,
    `Style: ${sculpture.style}`,
    `Material: ${sculpture.material}`,
    `Dimensions: ${sculpture.dimensions}`,
    ``,
    `I would like to know more about:`,
    `• Pricing and customisation options`,
    `• Delivery timeline`,
    `• Material specifications`,
  ];
  if (customMessage.trim()) {
    lines.push("", customMessage.trim());
  }
  const text = encodeURIComponent(lines.join("\n"));
  const base = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}`
    : `https://wa.me/`;
  return `${base}?text=${text}`;
}