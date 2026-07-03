export interface PreviewTeamMember {
  name: string;
  title: string;
}

export interface PreviewReview {
  author: string;
  text: string;
}

export interface PreviewBusiness {
  id: number;
  name: string;
  categories: string[];
  rating: number;
  reviewCount: number;
  phone: string;
  location: string;
  servingArea: string;
  imageUrl: string;
  rank?: number;
  about: string;
  team: PreviewTeamMember[];
  reviews: PreviewReview[];
}

export const previewBusinesses: PreviewBusiness[] = [
  {
    id: 1,
    name: "Mile High Pediatric Therapy Center",
    categories: ["Pediatric Therapy", "Sensory Integration"],
    rating: 5.0,
    reviewCount: 312,
    phone: "(303) 555-0142",
    location: "Denver, CO",
    servingArea: "Denver, CO · Cherry Creek",
    imageUrl: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=400&h=400&fit=crop&q=80",
    about:
      "a leading occupational therapy practice in Denver specializing in pediatric development, sensory integration, and personalized family-centered care at their Cherry Creek clinic.",
    team: [
      { name: "Dr. Marcus Reyes, OTD", title: "Lead Occupational Therapist · 18 Years Experience" },
      { name: "Priya Nair, OTR/L", title: "Pediatric OT Specialist" },
    ],
    reviews: [
      { author: "Sandra K.", text: "My son's fine motor skills improved dramatically after just a few weeks of sessions. Exceptional care and genuine compassion." },
      { author: "James L.", text: "Finally found a team that took my daughter's sensory needs seriously. Their program changed our quality of life." },
    ],
  },
  {
    id: 2,
    name: "Denver Hand & Upper Extremity Therapy",
    categories: ["Hand Therapy", "Post-Surgical & Orthopedic Rehab"],
    rating: 4.9,
    reviewCount: 287,
    phone: "(303) 555-0388",
    location: "Denver, CO",
    servingArea: "Denver, CO · Capitol Hill",
    imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&q=80",
    rank: 1,
    about:
      "a patient-focused occupational therapy practice offering hand therapy, post-surgical rehabilitation, and personalized recovery plans for patients of all ages.",
    team: [
      { name: "Elena Torres, OTR/L, CHT", title: "Owner & Clinical Director" },
      { name: "David Kim, OTR/L", title: "Hand Therapy Specialist" },
    ],
    reviews: [
      { author: "Michelle P.", text: "They gave me a complete recovery plan after my wrist surgery and finally explained what to expect. My range of motion has improved so much." },
      { author: "Robert A.", text: "Professional, thorough, and genuinely caring. My hand therapy sessions were handled seamlessly." },
    ],
  },
  {
    id: 3,
    name: "Front Range Neuro Rehab Institute",
    categories: ["Neurological Rehabilitation", "Geriatric Care"],
    rating: 4.9,
    reviewCount: 198,
    phone: "(303) 555-0210",
    location: "Denver, CO",
    servingArea: "Denver, CO · Highlands",
    imageUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&q=80",
    rank: 2,
    about:
      "a specialized occupational therapy practice focusing on neurological rehabilitation, stroke recovery, and comprehensive geriatric care for patients of every age.",
    team: [
      { name: "Dr. Amara Osei, OTD", title: "Neurological Rehabilitation Specialist" },
      { name: "Nathan Brooks, OTR/L", title: "Geriatric Care Specialist" },
    ],
    reviews: [
      { author: "Patricia W.", text: "They rebuilt my father's independence after his stroke and got him on the right therapy fast. Life-changing results." },
      { author: "Carlos M.", text: "Outstanding care for my mother's mobility and daily living skills. The team is thorough and truly goes above and beyond." },
    ],
  },
  {
    id: 4,
    name: "Little Hands Pediatric OT",
    categories: ["Pediatric Therapy", "Sensory Integration"],
    rating: 4.8,
    reviewCount: 174,
    phone: "(303) 555-0455",
    location: "Denver, CO",
    servingArea: "Denver, CO · Wash Park",
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&q=80",
    rank: 3,
    about:
      "a pediatric occupational therapy practice dedicated to children with developmental delays, sensory processing needs, and early intervention services — providing compassionate, family-centered care.",
    team: [
      { name: "Sofia Ramirez, OTR/L", title: "Pediatric OT Specialist" },
      { name: "Liam Chen, OTR/L", title: "Sensory Integration Coordinator" },
    ],
    reviews: [
      { author: "Angela T.", text: "They made my 7-year-old feel completely at ease. His sensory processing is so much better managed now." },
      { author: "Derek F.", text: "The pediatric team is phenomenal — patient, kind, and incredibly knowledgeable about sensory integration." },
    ],
  },
];
