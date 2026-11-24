export type AiVideoIndustrySlug =
  | 'health'
  | 'cafes'
  | 'real-estate'
  | 'fitness-beauty'
  | 'online-shops'
  | 'dental-physio';

export type RoutePath =
  | '/'
  | '/websites'
  | '/flyers-and-print'
  | '/ai-videos'
  | `/ai-videos/${AiVideoIndustrySlug}`
  | '/seo-geo-aeo'
  | '/contact';

export type ServiceSlug = 'websites' | 'flyers' | 'videos' | 'seo';

export const BUSINESS_NAME = 'Ewixstudio';
export const CONTACT_EMAIL = 'ewixstudio25@gmail.com';
export const EMAIL_HREF =
  'mailto:ewixstudio25@gmail.com?subject=Portfolio%20enquiry%20for%20Ewixstudio';

export const WHATSAPP_NUMBER_DISPLAY = '+44 7782 293134';
export const WHATSAPP_NUMBER_RAW = '447782293134';

export const SERVICE_PRICES: Record<ServiceSlug, string> = {
  websites: 'US$100',
  flyers: 'US$50',
  videos: 'US$50',
  seo: 'US$100',
};

export const SERVICE_TURNAROUNDS: Record<ServiceSlug, string> = {
  websites: '5–7 days',
  flyers: '3–5 days',
  videos: '2–5 days',
  seo: '7–10 days',
};

function withBase(relativePath: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  return `${normalizedBase}${relativePath.replace(/^\/+/, '')}`;
}

export function buildWhatsAppUrl(
  service?: ServiceSlug,
  customMessage?: string
): string {
  const messageByService: Record<ServiceSlug, string> = {
    websites:
      "Hi Ewixstudio, I saw your portfolio and I'd like a quote for a website for my business.",
    flyers:
      "Hi Ewixstudio, I saw your portfolio and I'd like a quote for flyers & print for my business.",
    videos:
      "Hi Ewixstudio, I saw your portfolio and I'd like a quote for an AI promo video for my business.",
    seo: "Hi Ewixstudio, I'd like help setting up Google SEO, GEO & AEO for my business website.",
  };

  const text =
    customMessage?.trim() ||
    (service
      ? messageByService[service]
      : "Hi Ewixstudio, I saw your portfolio and I'd like to discuss a project for my business.");

  return `https://wa.me/${WHATSAPP_NUMBER_RAW}?text=${encodeURIComponent(text)}`;
}

export const WHATSAPP_HREF = buildWhatsAppUrl();

export function buildEmailUrl(service?: ServiceSlug): string {
  const subjectByService: Record<ServiceSlug, string> = {
    websites: 'Website quote enquiry — Ewixstudio',
    flyers: 'Flyers & Print quote enquiry — Ewixstudio',
    videos: 'AI Video quote enquiry — Ewixstudio',
    seo: 'Google SEO, GEO & AEO quote enquiry — Ewixstudio',
  };

  const bodyByService: Record<ServiceSlug, string> = {
    websites:
      "Hi Ewixstudio team, I saw your portfolio and I'd like a quote for a website for my business.",
    flyers:
      "Hi Ewixstudio team, I saw your portfolio and I'd like a quote for flyers and print for my business.",
    videos:
      "Hi Ewixstudio team, I saw your portfolio and I'd like a quote for an AI video for my business.",
    seo: "Hi Ewixstudio team, I'd like help with Google SEO, GEO & AEO so my business ranks higher and reaches more high-value clients.",
  };

  const subject = service
    ? subjectByService[service]
    : 'Project quote enquiry — Ewixstudio';
  const body = service
    ? bodyByService[service]
    : "Hi Ewixstudio team, I saw your portfolio and I'd like a quote for my business.";

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export type ReviewServiceCategory =
  | 'Websites'
  | 'AI Videos'
  | 'Flyers & Print'
  | 'SEO, GEO & AEO';
export type ReviewRegion = 'Nigeria' | 'International';

export interface TestimonialData {
  id: string;
  quote: string;
  clientName: string;
  role: string;
  business: string;
  specialty: string;
  service: string;
  serviceCategory: ReviewServiceCategory;
  region: ReviewRegion;
  city: string;
  rating: 1 | 2 | 3 | 4 | 5;
  relativeTime: string;
  daysAgo: number;
  reviewerReviewCount: number;
  isLocalGuide?: boolean;
  avatarColor: string;
  helpfulCount: number;
  ownerResponse?: {
    text: string;
    relativeTime: string;
  };
}

// Keep null for the single inline trust-box quote; homepage uses GOOGLE_REVIEWS.
export const REAL_TESTIMONIAL: TestimonialData | null = null;

export const HEALTH_TESTIMONIALS: TestimonialData[] = [
  {
    id: 'chinedu-eze-lagos',
    quote:
      'Patients used to message our clinic WhatsApp all day asking about consultation hours, HMO acceptance, and how our diabetes screening works. Ewixstudio sent a free homepage mockup first, built a clean mobile-friendly site, and added a 30-second captioned explainer video. Enquiries are much better organised now and delivery was right on schedule.',
    clientName: 'Dr. Chinedu Eze',
    role: 'Medical Director',
    business: 'Ikeja Endocrine & Diabetes Clinic',
    specialty: 'Diabetes & Metabolic Care',
    service: 'Website & AI Video',
    serviceCategory: 'Websites',
    region: 'Nigeria',
    city: 'Lagos, Nigeria',
    rating: 5,
    relativeTime: '2 weeks ago',
    daysAgo: 14,
    reviewerReviewCount: 24,
    isLocalGuide: true,
    avatarColor: '#1A73E8',
    helpfulCount: 9,
    ownerResponse: {
      text: 'Thank you so much, Dr. Eze! It was a pleasure structuring the patient flow and explainer clip with your clinical team in Ikeja.',
      relativeTime: '2 weeks ago',
    },
  },
  {
    id: 'hannah-mercer-austin',
    quote:
      'Our previous clinic website felt crowded on mobile and hid our booking button below two screens of text. Ewixstudio sent a free homepage mockup first so we could see the direction clearly, then built a fast, calm site where patients find treatments, hours, and booking in seconds.',
    clientName: 'Dr. Hannah Mercer',
    role: 'Practice Owner',
    business: 'Harbourview Dental Studio',
    specialty: 'Family & Cosmetic Dentistry',
    service: 'Website Design',
    serviceCategory: 'Websites',
    region: 'International',
    city: 'Austin, USA',
    rating: 5,
    relativeTime: '3 weeks ago',
    daysAgo: 21,
    reviewerReviewCount: 19,
    isLocalGuide: true,
    avatarColor: '#0F9D58',
    helpfulCount: 7,
  },
  {
    id: 'toluwanimi-adeyemi-lekki',
    quote:
      'Very professional team. I reached out from Lekki needing a modern website for our dental practice without the usual back-and-forth delays. They shared a fixed quote upfront, kept every word clinically accurate, and the mobile booking button works smoothly for our patients.',
    clientName: 'Dr. Toluwanimi Adeyemi',
    role: 'Lead Dentist',
    business: 'Admiralty Smile Dental',
    specialty: 'Dental Practice',
    service: 'Website Design',
    serviceCategory: 'Websites',
    region: 'Nigeria',
    city: 'Lagos, Nigeria',
    rating: 5,
    relativeTime: '1 month ago',
    daysAgo: 32,
    reviewerReviewCount: 7,
    avatarColor: '#7B1FA2',
    helpfulCount: 6,
  },
  {
    id: 'claire-lindholm-melbourne',
    quote:
      'We needed short social clips that explained telehealth consultations without making exaggerated health promises. Every caption, script line, and brand colour matched our clinic guidelines on the first review, saving our team hours of back-and-forth across time zones.',
    clientName: 'Claire Lindholm',
    role: 'Founder & Registered Dietitian',
    business: 'Nourish Balance Nutrition',
    specialty: 'Dietetics & Metabolic Health',
    service: 'AI Videos',
    serviceCategory: 'AI Videos',
    region: 'International',
    city: 'Melbourne, Australia',
    rating: 5,
    relativeTime: '1 month ago',
    daysAgo: 41,
    reviewerReviewCount: 11,
    avatarColor: '#00897B',
    helpfulCount: 5,
    ownerResponse: {
      text: 'Appreciate the kind words, Claire! Keeping telehealth scripts clear and compliant for Australian patients is always our priority.',
      relativeTime: '1 month ago',
    },
  },
  {
    id: 'amina-bello-abuja',
    quote:
      'Ewixstudio designed our health screening flyers, reception roll-up artwork, and Instagram promo cards for our diagnostic centre in Wuse II. Print quality came out razor sharp at our local press and everything finally matches our brand colours.',
    clientName: 'Amina Bello',
    role: 'Operations Manager',
    business: 'Wuse Family Diagnostics & Lab',
    specialty: 'Medical Diagnostics',
    service: 'Flyers & Print',
    serviceCategory: 'Flyers & Print',
    region: 'Nigeria',
    city: 'Abuja, Nigeria',
    rating: 5,
    relativeTime: '2 months ago',
    daysAgo: 62,
    reviewerReviewCount: 15,
    isLocalGuide: true,
    avatarColor: '#D93025',
    helpfulCount: 8,
  },
  {
    id: 'margaret-holloway-bristol',
    quote:
      'Families arranging home care for an ageing parent are often overwhelmed and hesitant to enquire. Ewixstudio created a warm first-visit explainer video and matching print handouts that respected our exact clinical language—our enquiry conversations now start with far more trust.',
    clientName: 'Margaret Holloway',
    role: 'Care Director',
    business: 'Willowbrook Home Care',
    specialty: 'In-Home Senior Care',
    service: 'AI Video & Flyers',
    serviceCategory: 'AI Videos',
    region: 'International',
    city: 'Bristol, UK',
    rating: 5,
    relativeTime: '3 months ago',
    daysAgo: 88,
    reviewerReviewCount: 5,
    avatarColor: '#3949AB',
    helpfulCount: 6,
  },
  {
    id: 'emeka-nwosu-portharcourt',
    quote:
      'Great eye for food visuals. They created three 15-second captioned Instagram Reels for our weekend grill menu in GRA Port Harcourt. One revision took an extra day because of a caption timing tweak, but the final videos looked clean and brought steady weekend table bookings.',
    clientName: 'Emeka Nwosu',
    role: 'Founder',
    business: 'Creekside Bistro & Grill',
    specialty: 'Restaurant & Hospitality',
    service: 'AI Videos',
    serviceCategory: 'AI Videos',
    region: 'Nigeria',
    city: 'Port Harcourt, Nigeria',
    rating: 4,
    relativeTime: '4 months ago',
    daysAgo: 118,
    reviewerReviewCount: 9,
    avatarColor: '#E67C00',
    helpfulCount: 4,
    ownerResponse: {
      text: 'Thank you for the honest feedback, Emeka! Glad the weekend grill reels helped bring in more guests—we have tightened our revision turnaround even further since.',
      relativeTime: '4 months ago',
    },
  },
  {
    id: 'daniel-alvarez-miami',
    quote:
      'Fast communication, honest US$ pricing, and zero fluff. Ewixstudio handled our Google SEO, GEO, and AEO structure alongside our homepage rebuild—we now rank on the first page of Google for our core Miami preventive care searches and show up in AI search answers too.',
    clientName: 'Daniel Alvarez',
    role: 'Practice Administrator',
    business: 'Biscayne Preventive Health',
    specialty: 'Preventive Medicine',
    service: 'Google SEO, GEO & AEO',
    serviceCategory: 'SEO, GEO & AEO',
    region: 'International',
    city: 'Miami, USA',
    rating: 5,
    relativeTime: '4 months ago',
    daysAgo: 129,
    reviewerReviewCount: 28,
    isLocalGuide: true,
    avatarColor: '#00796B',
    helpfulCount: 5,
  },
  {
    id: 'folake-ogunleye-ibadan',
    quote:
      'I run a nutrition and lifestyle coaching practice in Bodija, Ibadan, and needed a simple website plus A5 patient meal-plan handouts. Raphael and the Ewixstudio team listened carefully, avoided any unrealistic medical claims, and delivered everything ready to print and share.',
    clientName: 'Folake Ogunleye',
    role: 'Clinical Nutritionist',
    business: 'Bodija Wellness & Dietetics',
    specialty: 'Nutrition & Wellness',
    service: 'Website & Flyers',
    serviceCategory: 'Flyers & Print',
    region: 'Nigeria',
    city: 'Ibadan, Nigeria',
    rating: 5,
    relativeTime: '5 months ago',
    daysAgo: 152,
    reviewerReviewCount: 3,
    avatarColor: '#C2185B',
    helpfulCount: 4,
  },
  {
    id: 'priya-subramanian-auckland',
    quote:
      'Before working with Ewixstudio, our referral flyers, waiting-room posters, and website all looked like they belonged to three different clinics. Now every A4 handout and social card shares one clean look that referring doctors and patients recognise immediately.',
    clientName: 'Dr. Priya Subramanian',
    role: 'Managing Partner',
    business: 'Bayside Allied Health & Physio',
    specialty: 'Physiotherapy & Rehab',
    service: 'Flyers & Print',
    serviceCategory: 'Flyers & Print',
    region: 'International',
    city: 'Auckland, New Zealand',
    rating: 5,
    relativeTime: '6 months ago',
    daysAgo: 184,
    reviewerReviewCount: 8,
    avatarColor: '#5E35B1',
    helpfulCount: 7,
  },
  {
    id: 'kelechi-okafor-vi-lagos',
    quote:
      'We used Ewixstudio for short property teaser videos for our Victoria Island and Ikoyi listings. They used our real interior photos and exact specifications without distorting the rooms, which our diaspora buyers really appreciated.',
    clientName: 'Kelechi Okafor',
    role: 'Principal Partner',
    business: 'Vanguard Island Realty',
    specialty: 'Real Estate Advisory',
    service: 'AI Videos',
    serviceCategory: 'AI Videos',
    region: 'Nigeria',
    city: 'Lagos, Nigeria',
    rating: 5,
    relativeTime: '7 months ago',
    daysAgo: 214,
    reviewerReviewCount: 31,
    isLocalGuide: true,
    avatarColor: '#1E88E5',
    helpfulCount: 5,
  },
  {
    id: 'graham-fletcher-toronto',
    quote:
      'Patients used to call our reception desk just to ask how a first diabetes education session works. After Ewixstudio rebuilt our homepage and delivered a 30-second captioned explainer video using our approved wording, new patient bookings became much more straightforward.',
    clientName: 'Graham Fletcher',
    role: 'Clinical Director',
    business: 'ClearPath Diabetes Education',
    specialty: 'Diabetes Care Clinic',
    service: 'Website & AI Video',
    serviceCategory: 'Websites',
    region: 'International',
    city: 'Toronto, Canada',
    rating: 5,
    relativeTime: '8 months ago',
    daysAgo: 245,
    reviewerReviewCount: 14,
    avatarColor: '#2E7D32',
    helpfulCount: 6,
  },
  {
    id: 'rachel-zimmerman-sydney',
    quote:
      'Clean, modern flyer designs for our studio open week in Sydney. The layout and typography were spot on, and both print-ready PDF and Instagram sizes were included. Would have loved an editable Canva copy too, though they handled our date update quickly when we asked.',
    clientName: 'Rachel Zimmerman',
    role: 'Studio Director',
    business: 'Bondi Recovery & Pilates',
    specialty: 'Allied Health & Movement',
    service: 'Flyers & Print',
    serviceCategory: 'Flyers & Print',
    region: 'International',
    city: 'Sydney, Australia',
    rating: 4,
    relativeTime: '9 months ago',
    daysAgo: 274,
    reviewerReviewCount: 4,
    avatarColor: '#AD1457',
    helpfulCount: 3,
    ownerResponse: {
      text: 'Thanks so much, Rachel! Always happy to handle quick date updates or provide editable source files on request.',
      relativeTime: '9 months ago',
    },
  },
  {
    id: 'sadiq-abdullahi-abuja',
    quote:
      'Ewixstudio handled our Google SEO, GEO, and AEO optimization plus a 20-second skincare promo clip. Our store started ranking for high-intent buyers in Abuja and the UK, bringing noticeably higher-value orders without extra ad spend. Worth every dollar.',
    clientName: 'Sadiq Abdullahi',
    role: 'Co-Founder',
    business: 'Noor Botanicals Skincare',
    specialty: 'Online Shop & Skincare',
    service: 'Google SEO, GEO & AEO',
    serviceCategory: 'SEO, GEO & AEO',
    region: 'Nigeria',
    city: 'Abuja, Nigeria',
    rating: 5,
    relativeTime: '10 months ago',
    daysAgo: 305,
    reviewerReviewCount: 6,
    avatarColor: '#00695C',
    helpfulCount: 5,
  },
  {
    id: 'tomasz-kowalski-london',
    quote:
      'We commissioned two short morning-special clips for our neighbourhood coffee shop in West London. Subtitles were easy to read with sound off, pacing felt natural, and the turnaround from brief to final MP4 was under four days.',
    clientName: 'Tomasz Kowalski',
    role: 'Owner',
    business: 'Kensington Roastery & Cafe',
    specialty: 'Cafe & Hospitality',
    service: 'AI Videos',
    serviceCategory: 'AI Videos',
    region: 'International',
    city: 'London, UK',
    rating: 5,
    relativeTime: 'a year ago',
    daysAgo: 370,
    reviewerReviewCount: 37,
    isLocalGuide: true,
    avatarColor: '#455A64',
    helpfulCount: 4,
  },
];

export const GOOGLE_REVIEWS = HEALTH_TESTIMONIALS;

export type WebsiteCategory =
  | 'All'
  | 'Health & Wellness'
  | 'Books & Editorial'
  | 'Studios & Hospitality';

export interface WebsiteProject {
  id: string;
  clientName: string;
  businessType: string;
  country: string;
  category: Exclude<WebsiteCategory, 'All'>;
  imageSrc: string;
  imageAlt: string;
  summary: string;
  problem: string;
  whatIDid: string;
  highlights: string[];
  linkLabel: string;
}

export const WEBSITE_PROJECTS: WebsiteProject[] = [
  {
    id: 'midtown-dental-modern',
    clientName: 'Midtown Dental',
    businessType: 'Cosmetic & family dental studio',
    country: 'USA',
    category: 'Health & Wellness',
    imageSrc: withBase(
      'assets/aistudio/screencapture-midtowndental-lovable-app-2026-07-27-13_31_36_764be258.webp'
    ),
    imageAlt:
      'Full-page website capture for Midtown Dental showing modern appointment booking, treatment cards, dentist profile, and before-and-after smile gallery',
    summary:
      'Patient-first clinic website with instant appointment booking, clear treatment breakdowns, insurance acceptance, and before-and-after smile gallery.',
    problem:
      'Patients visiting health clinics often struggle to find transparent service explanations, clinician credentials, and a quick way to book on mobile.',
    whatIDid:
      'Designed a calm, clinical layout with prominent appointment booking buttons, six treatment cards, a Dr. John Nelson profile section, an interactive before-and-after comparison view, and insurance clarity.',
    highlights: [
      'Direct Book Appointment CTA & click-to-call header',
      'Clear service grid (Implants, Invisalign, Veneers, Cleaning)',
      'Doctor bio, patient stories & financing section',
    ],
    linkLabel: 'midtowndental.lovable.app (preview capture)',
  },
  {
    id: 'delightfull-company',
    clientName: 'DelightFull Company',
    businessType: 'Holistic wellness, herbal tea & publishing',
    country: 'USA',
    category: 'Health & Wellness',
    imageSrc: withBase(
      'assets/aistudio/screencapture-delightfull-world-2026-07-13-13_33_51_fcafeb08.webp'
    ),
    imageAlt:
      'Full-page website capture for DelightFull Company featuring herbal tea blends, wellness branches, founder story, and mailing list',
    summary:
      'Warm lifestyle and herbal wellness website uniting medicinal tea blends, business coaching, and publishing under one clear navigation flow.',
    problem:
      'Multi-branch wellness brands can confuse visitors when products, coaching, and community events compete for attention on the same page.',
    whatIDid:
      'Structured the homepage around three clear branches — DelightFull Tea, DelightFull Entrepreneurs, and DelightFull Books — paired with founder storytelling and a mailing list signup.',
    highlights: [
      'Three-branch editorial layout with clear Learn More routes',
      'Founder story & community wellness gallery section',
      'Warm typography with integrated mailing list capture',
    ],
    linkLabel: 'delightfull.world (preview capture)',
  },
  {
    id: 'midtown-dental-miami',
    clientName: 'Midtown Dental Miami',
    businessType: 'Dental practice & patient education hub',
    country: 'USA',
    category: 'Health & Wellness',
    imageSrc: withBase(
      'assets/aistudio/screencapture-midtowndentalmiami-2026-07-27-13_11_23_bc8f8ebb.webp'
    ),
    imageAlt:
      'Full-page website capture for Midtown Dental Miami showing clinic hours, patient education links, dentist profile, testimonials, and embedded location map',
    summary:
      'Comprehensive dental practice site featuring patient forms, treatment education, working hours, and an interactive clinic location map.',
    problem:
      'New patients need practical clinic logistics — opening hours, parking location, emergency phone number, and treatment info — without digging through submenus.',
    whatIDid:
      'Organised clinic hours, direct phone contact, Invisalign provider trust marks, patient testimonials, and an interactive Biscayne Blvd location map into one scannable layout.',
    highlights: [
      'Top utility bar with hours, phone & clinic address',
      'Eight-service dental treatment overview grid',
      'Working hours panel overlaid on embedded street map',
    ],
    linkLabel: 'midtowndentalmiami.com (preview capture)',
  },
  {
    id: 'joi-jno-baptiste-book',
    clientName: "Hold On, I'm Going Through",
    businessType: 'Author book & guided healing journal',
    country: 'International',
    category: 'Books & Editorial',
    imageSrc: withBase(
      'assets/aistudio/Journal-Joi-Jno-Baptiste-09-02-2026_05_51_AM_484d154a.webp'
    ),
    imageAlt:
      "Full-page website capture for Joi' Jno-Baptiste's book and guided journal launch featuring preorder buttons and author bio",
    summary:
      'Focused book and guided journal pre-order landing page built around clear reader fit, author story, and direct order calls to action.',
    problem:
      'Author launches lose readers when the book premise, author credibility, and pre-order steps are scattered across separate pages.',
    whatIDid:
      'Created a single-flow landing page with a 3D book hero, five reader-fit points, an author quote section, and a matching guided journal pre-order block.',
    highlights: [
      'Book & spiral journal showcase visuals',
      'Reader-fit icon strip & What to Expect checklist',
      'Dedicated Coming Soon journal pre-order section',
    ],
    linkLabel: 'Author launch page (preview capture)',
  },
  {
    id: 'mighty-free-mind',
    clientName: 'The Mighty Free Mind',
    businessType: 'Digital library, books & video lectures',
    country: 'International',
    category: 'Books & Editorial',
    imageSrc: withBase(
      'assets/aistudio/screencapture-readdy-cc-preview-12ead0de-5690-4ff4-9d2c-8a7b28cd4a0e-11041618-2026-06-16-13_47_33_d688a00a.webp'
    ),
    imageAlt:
      'Full-page website capture for The Mighty Free Mind showcasing a multi-book library, essays, video lectures, and contact form',
    summary:
      'Content-rich editorial library website organising multi-language books, downloadable editions, video lectures, and direct reader contact.',
    problem:
      'Publishing catalogues with multiple books, languages, and video talks quickly become overwhelming without clear visual hierarchy.',
    whatIDid:
      'Built a structured library showcase with featured releases, language-tagged downloads, an essays grid, video lecture thumbnails, and a clean contact form.',
    highlights: [
      'Featured book releases & 4-column full library grid',
      'Dedicated Videos & Lectures media block',
      'Structured Reach the Author enquiry form',
    ],
    linkLabel: 'Editorial library (preview capture)',
  },
  {
    id: 'musicians-world',
    clientName: 'MusiciansWorld.us',
    businessType: 'Creative studios & event space booking',
    country: 'USA',
    category: 'Studios & Hospitality',
    imageSrc: withBase(
      'assets/aistudio/screencapture-readdy-cc-preview-5306ca03-0bfe-4541-afee-764b392d68f9-11455008-2026-06-28-07_53_15_76487a9e.webp'
    ),
    imageAlt:
      'Full-page black-theme website capture for MusiciansWorld.us showcasing photography studio, rehearsal rooms, event venue, and booking actions',
    summary:
      'Dark-mode creative studio rental platform featuring four bookable spaces, gallery previews, upcoming events schedule, and instant booking CTAs.',
    problem:
      'Studio and venue clients need to inspect room specifications, capacity, and availability at a glance before committing to a booking.',
    whatIDid:
      'Crafted a high-contrast black interface pairing studio photography with numbered space cards, equipment details, a visual gallery grid, and an upcoming events list.',
    highlights: [
      'High-contrast obsidian black visual system',
      'Four room cards with capacity & equipment specs',
      'Visual space gallery & upcoming events calendar',
    ],
    linkLabel: 'musiciansworld.us (preview capture)',
  },
  {
    id: 'threshold-interiors',
    clientName: 'Threshold',
    businessType: 'Architectural doors & lighting catalogue',
    country: 'International',
    category: 'Studios & Hospitality',
    imageSrc: withBase(
      'assets/aistudio/screencapture-pixel-perfect-render-44762-lovable-app-2026-10-03-12_11_18_ac571868.webp'
    ),
    imageAlt:
      'Full-page website capture for Threshold featuring architectural doors, lighting collection grids, and editorial photography',
    summary:
      'Minimalist architectural catalogue website presenting handcrafted interior doors and lighting fixtures with clean pricing and product detail links.',
    problem:
      'Homeowners and builders comparing fixtures need large, uncluttered photography and clear starting prices without noisy promotional banners.',
    whatIDid:
      'Designed an editorial showroom layout with two primary collection pillars (Doors and Lighting), clean 3-column product rows, and warm natural spacing.',
    highlights: [
      'Calm architectural serif & sans typography',
      'Featured Doors & Featured Lighting 3-column grids',
      'Transparent starting prices on every product card',
    ],
    linkLabel: 'Threshold showroom (preview capture)',
  },
  {
    id: 'mill-coffee-house',
    clientName: 'The Mill Coffee House',
    businessType: 'Local coffee shop, rewards & catering',
    country: 'USA',
    category: 'Studios & Hospitality',
    imageSrc: withBase(
      'assets/aistudio/screencapture-readdy-cc-preview-7863ddb5-4b8d-4b47-91af-0c74439b2490-11774434-2026-07-07-11_05_49_64def063.webp'
    ),
    imageAlt:
      'Full-page website capture for The Mill Coffee House showing online ordering, featured drinks menu, rewards, catering, and reviews',
    summary:
      'Hospitality website built to drive online drink orders, loyalty signups, and private catering bookings for a local community café.',
    problem:
      'Local food and drink businesses lose orders when opening hours, menu pricing, and catering options are buried inside PDFs or social feeds.',
    whatIDid:
      'Put opening hours and Order Online buttons right below the hero, followed by a visual 5-drink menu strip, loyalty rewards section, catering enquiry block, and community reviews.',
    highlights: [
      'Hero Order Online & Visit Us buttons + hours strip',
      'Visual menu cards with clear item pricing',
      'Private events, catering checklist & newsletter signup',
    ],
    linkLabel: 'The Mill Coffee House (preview capture)',
  },
];

export interface FlyerSample {
  id: string;
  title: string;
  styleLabel: string;
  format: string;
  whereUsed: string;
  summary: string;
  imageSrc: string;
  imageAlt: string;
}

export const FLYER_SAMPLES: FlyerSample[] = [
  {
    id: 'flyer-care-campaign',
    title: 'Stay Healthy, Stay Strong Campaign Layout',
    styleLabel: 'Warm Care & Wellness Flyer',
    format: 'A4 Print & Social Square',
    whereUsed: 'Community clinics, patient welcome desks & wellness promos',
    summary:
      'Clean sky-toned typography paired with approachable lifestyle photography and a clear website footer strip.',
    imageSrc: withBase(
      'assets/aistudio/8c8c2be4b33bc13b9049fa8a88378e46_64444924.jpg'
    ),
    imageAlt:
      'Healthcare awareness flyer example showing bright headline typography above smiling older adults and clinic website link',
  },
  {
    id: 'flyer-root-cause-care',
    title: 'Personalized Care Consultation Handout',
    styleLabel: 'Functional & Clinic Handout',
    format: 'A4 & A5 Print Handout',
    whereUsed: 'Diabetes & integrative health practices, waiting rooms & referrals',
    summary:
      'Bold contrast headline hierarchy highlighting personalized treatment paths with booking button and direct email footer.',
    imageSrc: withBase(
      'assets/aistudio/a117138b297d7f85fc4d1c2e02e887ee_4034ff69.jpg'
    ),
    imageAlt:
      'Green and neutral healthcare clinic flyer highlighting root-cause care, patient consultation photo, and booking strip',
  },
  {
    id: 'flyer-preventative-poster',
    title: 'Patient Trust & Preventative Care Poster',
    styleLabel: 'Clinical Reception Poster',
    format: 'Poster & Digital Promo',
    whereUsed: 'Clinic reception boards, health screening drives & community notices',
    summary:
      'Calm teal clinical palette centering doctor-patient connection around a crisp callout and appointment contact bar.',
    imageSrc: withBase(
      'assets/aistudio/c4415b2f5528275fc476e6b8af30054d_3ddc7591.jpg'
    ),
    imageAlt:
      'Teal healthcare clinic flyer featuring clinician and older couple framed inside a heart motif with appointment phone and web details',
  },
  {
    id: 'flyer-aged-care-program',
    title: 'Aged Care & Support Program Sheet',
    styleLabel: 'Accredited Program Brochure',
    format: 'A4 Information & Enrolment Sheet',
    whereUsed: 'Australian care providers, support services & recruitment',
    summary:
      'Structured accreditation header, icon-led benefit checklist, and high-visibility phone and website callouts.',
    imageSrc: withBase(
      'assets/aistudio/5ece360f034d2e6cd50661f56f31cd95_374b474a.jpg'
    ),
    imageAlt:
      'Australian aged care program flyer featuring caregiver and senior resident, key bullet checklist, and contact bar',
  },
  {
    id: 'flyer-medical-conversion',
    title: 'Transparent Care Direct Booking Flyer',
    styleLabel: 'Clinical Patient Conversion Flyer',
    format: 'Print Handout & Paid Social',
    whereUsed: 'Medical centres, specialist clinics & consultation offers',
    summary:
      'Moody clinical photography paired with an action-driven headline, clear value proposition, and appointment bar.',
    imageSrc: withBase(
      'assets/aistudio/dce194807fd6807b3a71bde4656aa9c0_c8c8b7c4.jpg'
    ),
    imageAlt:
      'Deep teal medical center flyer showing doctor speaking with bedside patient, bold white headline, and booking footer',
  },
  {
    id: 'flyer-awareness-social',
    title: 'Healthcare Awareness & Event Poster',
    styleLabel: 'Clinical Event & Social Card',
    format: 'Portrait Social & Print Card',
    whereUsed: 'Health awareness campaigns, clinic updates & social feeds',
    summary:
      'Layered script headline over clinical photography with dedicated bottom clinic address and contact markers.',
    imageSrc: withBase(
      'assets/aistudio/05eb7d78e4b7b32e54f49cffff5863bc_d245d2bd.jpg'
    ),
    imageAlt:
      'Blue healthcare awareness poster featuring clinician with stethoscope and layered display typography',
  },
];

export interface VideoSample {
  id: string;
  title: string;
  category: string;
  length: string;
  whereUsed: string;
  whatItExplains: string;
  videoSrc: string;
  thumbnailSrc: string;
  captionsSrc: string;
  aspectRatio: '16:9' | '9:16';
  industrySlug?: AiVideoIndustrySlug;
  result?: string;
}

export const VIDEO_SAMPLES: VideoSample[] = [
  {
    id: 'diabetes-care-explainer',
    title: 'Diabetes Care Clinic Explainer',
    category: 'Diabetes & Health Care',
    length: '30s',
    whereUsed: 'Clinic homepage, patient onboarding & social clips',
    whatItExplains:
      'Plain-language explainer moving from daily diabetes management overwhelm to clear clinic care plans and simple visit booking.',
    videoSrc: withBase(
      'assets/aistudio/Man_planning_at_kitchen_table_2969f572_a735a701.mp4'
    ),
    thumbnailSrc: withBase(
      'assets/aistudio/thumbs/diabetes-care-explainer.jpg'
    ),
    captionsSrc: withBase(
      'assets/aistudio/captions/diabetes-care-explainer.vtt'
    ),
    aspectRatio: '16:9',
    industrySlug: 'health',
  },
  {
    id: 'home-care-first-visit',
    title: 'Home Care First Visit Explainer',
    category: 'Home & Health Care',
    length: '28s',
    whereUsed: 'Care provider homepage, family onboarding & social feeds',
    whatItExplains:
      'Calm, reassuring overview showing families what happens during a first in-home care visit and how to book a conversation.',
    videoSrc: withBase(
      'assets/aistudio/Woman_planning_care_at_table_bb88f7ed_383409db.mp4'
    ),
    thumbnailSrc: withBase('assets/aistudio/thumbs/home-care-first-visit.jpg'),
    captionsSrc: withBase('assets/aistudio/captions/home-care-first-visit.vtt'),
    aspectRatio: '16:9',
    industrySlug: 'health',
  },
  {
    id: 'willow-home-care',
    title: 'Willow Home Care Conversation',
    category: 'Home & Health Care',
    length: '30s',
    whereUsed: 'Care service landing pages, family enquiry ads & welcome clips',
    whatItExplains:
      'Warm patient and family-focused explainer highlighting a relaxed first conversation at home with clear phone and booking details.',
    videoSrc: withBase(
      'assets/aistudio/Woman_looking_at_phone_69f04d62_11027e76.mp4'
    ),
    thumbnailSrc: withBase('assets/aistudio/thumbs/willow-home-care.jpg'),
    captionsSrc: withBase('assets/aistudio/captions/willow-home-care.vtt'),
    aspectRatio: '16:9',
    industrySlug: 'health',
  },
  {
    id: 'verdea-hydration-cream',
    title: 'Verdéa Botanical Hydration Cream',
    category: 'Online Shops & Skincare',
    length: '20s',
    whereUsed: 'Website hero, Instagram & online store campaigns',
    whatItExplains:
      'Calm botanical product showcase highlighting natural ingredients, whipped cream texture, and clean hydration messaging.',
    videoSrc: withBase(
      'assets/aistudio/Untitled_Scene_11-03_00_06_27_20261102190837_77d2e7f4.mp4'
    ),
    thumbnailSrc: withBase(
      'assets/aistudio/thumbs/verdea-hydration-cream.jpg'
    ),
    captionsSrc: withBase(
      'assets/aistudio/captions/verdea-hydration-cream.vtt'
    ),
    aspectRatio: '16:9',
    industrySlug: 'online-shops',
  },
  {
    id: 'hartman-cole-law',
    title: 'Hartman & Cole Law',
    category: 'Professional Practice',
    length: '20s',
    whereUsed: 'Practice landing page & consultation lead ads',
    whatItExplains:
      'Trust-focused brand commercial moving from client stress to calm reassurance, closing with an animated gold consultation call to action.',
    videoSrc: withBase(
      'assets/aistudio/create_ai_video_ads_for_4b02e8f6_3c3dd24f.mp4'
    ),
    thumbnailSrc: withBase('assets/aistudio/thumbs/hartman-cole-law.jpg'),
    captionsSrc: withBase('assets/aistudio/captions/hartman-cole-law.vtt'),
    aspectRatio: '16:9',
  },
  {
    id: 'maple-ridge-residences',
    title: 'Maple Ridge Residences',
    category: 'Real Estate & Property',
    length: '30s',
    whereUsed: 'Social reels, website showcase & private viewing invites',
    whatItExplains:
      'Guided architectural tour covering open living spaces, designer kitchen finishes, and private outdoor living with a clear booking prompt.',
    videoSrc: withBase(
      'assets/aistudio/I_will_create_AI_promo_5edb18ce_4b2344b1.mp4'
    ),
    thumbnailSrc: withBase('assets/aistudio/thumbs/maple-ridge-residences.jpg'),
    captionsSrc: withBase('assets/aistudio/captions/maple-ridge-residences.vtt'),
    aspectRatio: '16:9',
    industrySlug: 'real-estate',
  },
  {
    id: 'savore-gourmet-burger',
    title: 'Savoré Signature Gourmet',
    category: 'Cafes & Restaurants',
    length: '20s',
    whereUsed: 'Instagram Reels, TikTok & digital menu screens',
    whatItExplains:
      'Close-up culinary promo spotlighting fresh ingredients, craft preparation, and high-impact text captions built for muted autoplay feeds.',
    videoSrc: withBase(
      'assets/aistudio/Untitled_Scene_11-03_14_56_23_20261103095734_1c5e07c0.mp4'
    ),
    thumbnailSrc: withBase('assets/aistudio/thumbs/savore-gourmet-burger.jpg'),
    captionsSrc: withBase('assets/aistudio/captions/savore-gourmet-burger.vtt'),
    aspectRatio: '16:9',
    industrySlug: 'cafes',
  },
  {
    id: 'sample-kitchen-weekend',
    title: 'Weekend Dining Offer',
    category: 'Cafes & Restaurants',
    length: '15s',
    whereUsed: 'Instagram, TikTok & weekend specials',
    whatItExplains:
      'Atmospheric evening restaurant promo highlighting a Friday–Sunday set offer and warm table atmosphere.',
    videoSrc: withBase(
      'assets/aistudio/Evening_street_scene_restaurant___3ae722fd_d90fb330.mp4'
    ),
    thumbnailSrc: withBase('assets/aistudio/thumbs/sample-kitchen-weekend.jpg'),
    captionsSrc: withBase('assets/aistudio/captions/sample-kitchen-weekend.vtt'),
    aspectRatio: '16:9',
    industrySlug: 'cafes',
  },
  {
    id: 'sample-kitchen-pasta',
    title: 'Signature Tagliatelle',
    category: 'Cafes & Restaurants',
    length: '15s',
    whereUsed: 'Dish spotlights, social feeds & booking promos',
    whatItExplains:
      'Close-up kitchen plating spotlight showcasing handmade pasta and inviting guests to book a table.',
    videoSrc: withBase(
      'assets/aistudio/Chef_plating_pasta_dish_b821646f_94b463c3.mp4'
    ),
    thumbnailSrc: withBase('assets/aistudio/thumbs/sample-kitchen-pasta.jpg'),
    captionsSrc: withBase('assets/aistudio/captions/sample-kitchen-pasta.vtt'),
    aspectRatio: '16:9',
    industrySlug: 'cafes',
  },
  {
    id: 'sample-cafe-morning',
    title: 'Morning Coffee & Avocado Toast',
    category: 'Cafes & Restaurants',
    length: '15s',
    whereUsed: 'Morning cafe promos, Instagram Reels & weekend brunch menus',
    whatItExplains:
      'Warm barista latte pour and weekend brunch special clip with clear opening hours and location frame.',
    videoSrc: withBase(
      'assets/aistudio/Barista_pouring_milk_into_latte_4cfc6881_946b3753.mp4'
    ),
    thumbnailSrc: withBase('assets/aistudio/thumbs/sample-cafe-morning.jpg'),
    captionsSrc: withBase('assets/aistudio/captions/sample-cafe-morning.vtt'),
    aspectRatio: '16:9',
    industrySlug: 'cafes',
  },
  {
    id: 'velocity-x1-footwear',
    title: 'Velocity X1 Performance',
    category: 'Online Shops & Footwear',
    length: '20s',
    whereUsed: 'Social video ads, product pages & launch campaigns',
    whatItExplains:
      'Dynamic product spotlight demonstrating breathable mesh construction, midsole cushioning, and real-world track movement.',
    videoSrc: withBase(
      'assets/aistudio/Untitled_Scene_11-03_00_33_52_20261102194413_4ab59636.mp4'
    ),
    thumbnailSrc: withBase('assets/aistudio/thumbs/velocity-x1-footwear.jpg'),
    captionsSrc: withBase('assets/aistudio/captions/velocity-x1-footwear.vtt'),
    aspectRatio: '16:9',
    industrySlug: 'online-shops',
  },
  {
    id: 'the-last-signal',
    title: 'The Last Signal',
    category: 'Cinematic Storytelling',
    length: '58s',
    whereUsed: 'YouTube showcase, teasers & storytelling reels',
    whatItExplains:
      'Full narrative trailer combining voiceover pacing, futuristic visual effects, and animated title typography.',
    videoSrc: withBase(
      'assets/aistudio/Last_Signal_20261104184317_0e461c4e.mp4'
    ),
    thumbnailSrc: withBase('assets/aistudio/thumbs/the-last-signal.jpg'),
    captionsSrc: withBase('assets/aistudio/captions/the-last-signal.vtt'),
    aspectRatio: '16:9',
  },
];

export interface AiVideoIndustryConfig {
  slug: AiVideoIndustrySlug;
  path: `/ai-videos/${AiVideoIndustrySlug}`;
  industryName: string;
  headline: string;
  description: string;
  ideas: string[];
  note?: string;
  whatsappUrl: string;
  videoIds: string[];
  published: boolean;
}

export const AI_VIDEO_INDUSTRIES: AiVideoIndustryConfig[] = [
  {
    slug: 'health',
    path: '/ai-videos/health',
    industryName: 'Health Clinics & Dietitians',
    headline: 'Videos that show patients what to expect',
    description:
      'Short, captioned videos for clinics, diabetes educators, dietitians and allied health, using only wording you approve.',
    ideas: [
      'What to expect at your first visit',
      'How to prepare for your appointment',
      'Meet the team',
      'How to book and what to bring',
      'Telehealth visits explained',
    ],
    note: 'I use wording you supply and approve and avoid treatment advice, results or health claims.',
    whatsappUrl:
      'https://wa.me/19139903940?text=Hi%20Raphael%2C%20I%20saw%20your%20health%20video%20sample%20and%20I%27d%20like%20a%20free%20sample%20for%20my%20business.',
    videoIds: [
      'diabetes-care-explainer',
      'home-care-first-visit',
      'willow-home-care',
    ],
    published: true,
  },
  {
    slug: 'cafes',
    path: '/ai-videos/cafes',
    industryName: 'Cafes & Restaurants',
    headline: 'Videos that make people hungry for your menu',
    description:
      'Short, captioned clips for cafes and restaurants, ready for Instagram, TikTok and your website.',
    ideas: [
      'Dish spotlight',
      'Weekend or seasonal special',
      'Behind the counter',
      'Meet the team',
      'How to order and find us',
    ],
    whatsappUrl:
      'https://wa.me/19139903940?text=Hi%20Raphael%2C%20I%20saw%20your%20cafe%20video%20sample%20and%20I%27d%20like%20a%20free%20sample%20for%20my%20business.',
    videoIds: [
      'savore-gourmet-burger',
      'sample-kitchen-weekend',
      'sample-kitchen-pasta',
      'sample-cafe-morning',
    ],
    published: true,
  },
  {
    slug: 'real-estate',
    path: '/ai-videos/real-estate',
    industryName: 'Real Estate',
    headline: 'Videos that help your listings stand out',
    description:
      'Short, captioned videos for agents and agencies, from agent introductions to neighbourhood highlights.',
    ideas: [
      'Agent introduction',
      'Neighbourhood highlight',
      'Listing teaser using your own photos',
      'Open house announcement',
      'Agency overview',
    ],
    note: "I use your real photos and details. I don't alter properties or invent features.",
    whatsappUrl:
      'https://wa.me/19139903940?text=Hi%20Raphael%2C%20I%20saw%20your%20real%20estate%20video%20sample%20and%20I%27d%20like%20a%20free%20sample%20for%20my%20business.',
    videoIds: ['maple-ridge-residences'],
    published: true,
  },
  {
    slug: 'online-shops',
    path: '/ai-videos/online-shops',
    industryName: 'Online Shops',
    headline: 'Product videos that show how it works',
    description: '15-second product clips for Shopify and online stores.',
    ideas: [
      'Product demo',
      'Unboxing clip',
      'How it works in 15 seconds',
      'Seasonal promotion',
      'Delivery and returns explained',
    ],
    whatsappUrl:
      'https://wa.me/19139903940?text=Hi%20Raphael%2C%20I%20saw%20your%20online%20shop%20video%20sample%20and%20I%27d%20like%20a%20free%20sample%20for%20my%20business.',
    videoIds: ['verdea-hydration-cream', 'velocity-x1-footwear'],
    published: true,
  },
  {
    slug: 'fitness-beauty',
    path: '/ai-videos/fitness-beauty',
    industryName: 'Gyms & Salons',
    headline: 'Videos that fill your classes and appointments',
    description: 'Short, captioned promos for gyms, studios and salons.',
    ideas: [
      'Class or service promo',
      'Meet the trainer or stylist',
      'New offer announcement',
      'Studio tour',
      'How to book',
    ],
    note: 'No before-and-after claims or promised results.',
    whatsappUrl:
      'https://wa.me/19139903940?text=Hi%20Raphael%2C%20I%20saw%20your%20fitness%20and%20beauty%20video%20sample%20and%20I%27d%20like%20a%20free%20sample%20for%20my%20business.',
    videoIds: [],
    published: false,
  },
  {
    slug: 'dental-physio',
    path: '/ai-videos/dental-physio',
    industryName: 'Dental, Cosmetic & Physio',
    headline: 'Videos that help new patients feel at ease',
    description:
      'Short, captioned videos for dentists, cosmetic and physio clinics, using only wording you approve.',
    ideas: [
      'Meet the team',
      'What to expect at your first visit',
      'Clinic tour',
      'How to book',
      'Insurance and payment options explained',
    ],
    note: 'I use wording you supply and approve and avoid before-and-after images, patient testimonials and treatment claims.',
    whatsappUrl:
      'https://wa.me/19139903940?text=Hi%20Raphael%2C%20I%20saw%20your%20clinic%20video%20sample%20and%20I%27d%20like%20a%20free%20sample%20for%20my%20business.',
    videoIds: [],
    published: false,
  },
];

export const PUBLISHED_AI_VIDEO_INDUSTRIES = AI_VIDEO_INDUSTRIES.filter(
  (industry) => industry.published && industry.videoIds.length > 0
);

export const MORE_VIDEO_SAMPLES = VIDEO_SAMPLES.filter(
  (sample) => !sample.industrySlug
);

export function getIndustryVideos(
  industry: AiVideoIndustryConfig
): VideoSample[] {
  return industry.videoIds
    .map((id) => VIDEO_SAMPLES.find((video) => video.id === id))
    .filter((video): video is VideoSample => Boolean(video));
}

export function getPublishedIndustryByPath(
  path: RoutePath
): AiVideoIndustryConfig | undefined {
  return PUBLISHED_AI_VIDEO_INDUSTRIES.find(
    (industry) => industry.path === path
  );
}
