import { Committee, ExperiencePillar, GalleryItem } from '../types';

export const COMMITTEES: Committee[] = [
  {
    id: 'ccc',
    title: 'Continuous Crisis Committee',
    abbreviation: 'CCC',
    category: 'Crisis & Satire',
    theme: 'Democracy, Civil Society & Public Protest',
    agenda: 'Deliberation on the role of satirical movements, public protests, and civil society campaigns in shaping democratic accountability while balancing public order and national security.',
    description: 'An fast-paced simulation where ink, satire, and public sentiment collide with national security apparatuses. Delegates handle rapid-fire crisis updates as civil movements shift public opinion in real time.',
    atmosphere: 'Muted Crimson, Sepia & Ink Particles',
    colorScheme: {
      primary: '#93000A',
      accent: '#C9A34E',
      border: 'rgba(147, 0, 10, 0.4)',
      bgGlow: 'rgba(147, 0, 10, 0.15)',
    },
    bgImageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200',
    keyTopics: [
      'Role of political satire and caricature in democratic discourse',
      'Civil disobedience vs. public order legal boundaries',
      'Algorithmic amplification of grassroots dissent',
      'National security protocols during large-scale civil campaigns'
    ],
    executiveBoard: [
      { name: 'Rohan Deshmukh', role: 'Director General' },
      { name: 'Ananya Sharma', role: 'Chairperson' }
    ]
  },
  {
    id: 'jkla',
    title: 'Jammu & Kashmir Legislative Assembly',
    abbreviation: 'JKLA',
    category: 'Regional Security',
    theme: 'Narco-Terrorism & Border Intelligence',
    agenda: 'Cross-Border Drug Trafficking and Emerging Narco-Terrorism Threat in Jammu & Kashmir.',
    description: 'A high-stakes regional assembly analyzing intelligence reports, satellite surveillance, and cross-border security networks to dismantle organized narco-terror channels.',
    atmosphere: 'Blue-Green Military Intelligence & Mountain Topography',
    colorScheme: {
      primary: '#0D47A1',
      accent: '#00E676',
      border: 'rgba(13, 71, 161, 0.4)',
      bgGlow: 'rgba(0, 230, 118, 0.12)',
    },
    bgImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200',
    keyTopics: [
      'Drone-based contraband drop detection systems',
      'Financial tracking of narco-currency channels',
      'Youth rehabilitation and community-level border vigilance',
      'Joint taskforce coordination across state and central agencies'
    ],
    executiveBoard: [
      { name: 'Kabir Varma', role: 'Speaker' },
      { name: 'Dr. Mehul Bhatia', role: 'Chief Advisor' }
    ]
  },
  {
    id: 'un-women',
    title: 'United Nations Entity for Gender Equality (UN Women)',
    abbreviation: 'UN Women',
    category: 'Human Rights',
    theme: 'Public Safety & Fundamental Freedoms',
    agenda: 'Restrictions imposed on women in the name of safety and their impact on equal participation in public life.',
    description: 'Examining global policies where protective legislation turns into restrictive control. Delegates construct progressive legal frameworks guaranteeing both unconditional safety and uninhibited freedom.',
    atmosphere: 'Royal Purple, Warm White & Radiant Glass',
    colorScheme: {
      primary: '#4B2D8A',
      accent: '#E6DEFF',
      border: 'rgba(75, 45, 138, 0.5)',
      bgGlow: 'rgba(75, 45, 138, 0.25)',
    },
    bgImageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200',
    keyTopics: [
      'Paternalistic curfews and public space access restrictions',
      'Economic loss due to gendered mobility barriers',
      'Urban planning and safe nocturnal infrastructure',
      'Re-framing safety from restriction to state obligation'
    ],
    executiveBoard: [
      { name: 'Samyukta Menon', role: 'President' },
      { name: 'Tara Saxena', role: 'Vice President' }
    ]
  },
  {
    id: 'lok-sabha',
    title: 'Lok Sabha (House of the People)',
    abbreviation: 'Lok Sabha',
    category: 'Indian Parliament',
    theme: 'Constitutional Governance & Integrity',
    agenda: 'Addressing Examination Paper Leaks in India and Strengthening the Integrity of Public Recruitment and Competitive Examinations.',
    description: 'Simulating the floor of the Parliament of India under royal teak wood panels and constitutional gravity. Parliamentarians debate legislative reforms, whistleblower protection, and technological auditing of national exams.',
    atmosphere: 'Teak Wood, Constitution Parchment & Crimson Carpet',
    colorScheme: {
      primary: '#8A6743',
      accent: '#C9A34E',
      border: 'rgba(201, 163, 78, 0.4)',
      bgGlow: 'rgba(138, 103, 67, 0.2)',
    },
    bgImageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200',
    keyTopics: [
      'Public Examinations (Prevention of Unfair Means) Bill audits',
      'End-to-end cryptographic exam paper distribution',
      'Whistleblower protection and fast-track investigative tribunals',
      'Restoring public trust in national testing agencies'
    ],
    executiveBoard: [
      { name: 'Hon. Speaker Vikramaditya Roy', role: 'Speaker of Lok Sabha' },
      { name: 'Priya Iyer', role: 'Deputy Speaker' }
    ]
  },
  {
    id: 'unhrc',
    title: 'UN Human Rights Council',
    abbreviation: 'UNHRC',
    category: 'International Law',
    theme: 'Freedom of Expression & Universal Liberty',
    agenda: 'Addressing Restrictions on Freedom of Expression and Their Implications for the Protection of Fundamental Human Rights.',
    description: 'A refined diplomatic summit focusing on international covenants, digital press freedom, arbitrary detention, and protecting dissidents while maintaining cyber governance standardizations.',
    atmosphere: 'Minimalist Ivory, Geneva Glass & Flag Silhouettes',
    colorScheme: {
      primary: '#D9D7D2',
      accent: '#C9A34E',
      border: 'rgba(217, 215, 210, 0.3)',
      bgGlow: 'rgba(217, 215, 210, 0.1)',
    },
    bgImageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200',
    keyTopics: [
      'Digital censorship and state-sponsored internet shutdowns',
      'Protection of investigative journalists and human rights defenders',
      'Extraterritorial enforcement of speech restrictions',
      'Harmonizing hate speech laws with ICCPR Article 19'
    ],
    executiveBoard: [
      { name: 'Marcus Thorne', role: 'High Commissioner' },
      { name: 'Kavita Pillai', role: 'Rapporteur' }
    ]
  },
  {
    id: 'ipl-auction',
    title: 'IPL Mega Auction & Sports Strategy Committee',
    abbreviation: 'IPL Auction',
    category: 'Specialized Simulation',
    theme: 'Game Theory, Valuation & High-Stakes Negotiation',
    agenda: 'Strategic Franchise Portfolio Acquisition, Auction Mechanics & High-Stakes Player Valuation.',
    description: 'An electric, dynamic simulation merging financial modeling, game theory, squad analytics, and live bidding under intense spotlight pressure.',
    atmosphere: 'Electric Spotlights, LED Displays & Digital Bidding',
    colorScheme: {
      primary: '#FFD700',
      accent: '#FF3D00',
      border: 'rgba(255, 215, 0, 0.5)',
      bgGlow: 'rgba(255, 61, 0, 0.2)',
    },
    bgImageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1200',
    keyTopics: [
      'Real-time purse management & dynamic player bidding',
      'RTM (Right to Match) tactical deployments',
      'Squad chemistry and analytical player impact scoring',
      'Sponsorship negotiations and franchise valuation'
    ],
    executiveBoard: [
      { name: 'Siddharth Nair', role: 'Auctioneer General' },
      { name: 'Devansh Kulkarni', role: 'Franchise Auditor' }
    ]
  }
];

export const EXPERIENCE_PILLARS: ExperiencePillar[] = [
  {
    id: 'parliament',
    title: 'Parliamentary Mastery',
    tagline: 'Step onto the floor of legislative authority.',
    description: 'Experience procedural rigor modeled directly on the Parliament of India. Learn how laws are drafted, scrutinized, amended, and passed.',
    iconName: 'Landmark',
    outcomes: ['Points of Order & Parliamentary Privilege', 'Statutory Amendment Drafting', 'Cross-Floor Debates'],
    metrics: '500+ Hours of Simulated House Debates'
  },
  {
    id: 'un-diplomacy',
    title: 'Global Diplomacy',
    tagline: 'Represent sovereign nations at global tables.',
    description: 'Master foreign policy alignment, bilateral pacts, resolution drafting, and coalition building under real-time geopolitics.',
    iconName: 'Globe',
    outcomes: ['Sovereign Stance Alignment', 'Working Paper & Resolution Drafting', 'Unilateral & Multilateral Caucus'],
    metrics: '80 Sovereign State Positions'
  },
  {
    id: 'leadership',
    title: 'Executive Leadership',
    tagline: 'Command rooms with poise and authority.',
    description: 'Cultivate the emotional intelligence, composure, and strategic presence required of prime ministers, UN ambassadors, and CEOs.',
    iconName: 'Crown',
    outcomes: ['Crisis Management Under Pressure', 'Strategic Consensus Building', 'Delegation & Delegation Management'],
    metrics: '98% Leadership Growth Score'
  },
  {
    id: 'research',
    title: 'Policy & Intelligence Research',
    tagline: 'Transform raw data into geopolitical leverage.',
    description: 'Dive deep into primary constitutional documents, treaty archives, intelligence briefs, and economic indicators.',
    iconName: 'FileSearch',
    outcomes: ['Constitutional & Legal Auditing', 'Geopolitical Intelligence Analysis', 'Policy Position Paper Crafting'],
    metrics: '1,500+ Pages of Vetted Archives'
  },
  {
    id: 'negotiation',
    title: 'High-Stakes Negotiation',
    tagline: 'Find common ground without compromising core values.',
    description: 'Master win-win negotiation frameworks, secret backchannel caucusing, and conflict resolution tactics used by veteran diplomats.',
    iconName: 'Handshake',
    outcomes: ['Backchannel Mediation', 'Strategic Compromise Frameworks', 'Hostage & Crisis Directives'],
    metrics: 'Zero Deadlocks Unresolved'
  },
  {
    id: 'policy',
    title: 'Policy Formulation',
    tagline: 'Draft solutions that outlast political cycles.',
    description: 'Formulate actionable, legally binding legislation and international treaties addressing climate, security, and human rights.',
    iconName: 'Scroll',
    outcomes: ['Preamble & Operative Drafting', 'Budgetary Realism Audits', 'Enforceability Scrutiny'],
    metrics: '40+ Passed Draft Resolutions'
  },
  {
    id: 'oratory',
    title: 'Persuasive Oratory',
    tagline: 'Move hearts and change minds from the podium.',
    description: 'Hone public speaking skills, rhetorical cadence, opening statements, and press conference command before hundreds of peers.',
    iconName: 'Mic',
    outcomes: ['GSL & Moderated Caucus Rhetoric', 'Press Conference Q&A Command', 'Impromptu Crisis Speeches'],
    metrics: '100% Podium Confidence'
  },
  {
    id: 'networking',
    title: 'Elite Youth Network',
    tagline: 'Connect with India’s most ambitious minds.',
    description: 'Join a lifelong network of future parliamentarians, diplomats, founders, legal scholars, and policy analysts across India.',
    iconName: 'Users',
    outcomes: ['Lifelong Institutional Alumni', 'Mentorship from Veteran Chairs', 'Inter-School & College Alliances'],
    metrics: '2,500+ Active Delegate Alumni'
  },
  {
    id: 'ir',
    title: 'International Relations',
    tagline: 'Understand the invisible gears of the world order.',
    description: 'Analyze shift in global power, supply chain geopolitics, non-state actor dynamics, and international court jurisprudence.',
    iconName: 'Compass',
    outcomes: ['International Court Jurisprudence', 'Sanctions & Economic Warfare', 'Customary International Law'],
    metrics: 'Global Geopolitical Map Scope'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'The Grand Assembly Hall',
    category: 'Diplomacy',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=1200',
    caption: 'Delegates standing in solemn unity during the national opening plenary session.',
    year: '2025'
  },
  {
    id: 'g2',
    title: 'Constitutional Scrutiny',
    category: 'Heritage',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200',
    caption: 'Reviewing legislative drafts under warm gallery brass lighting.',
    year: '2025'
  },
  {
    id: 'g3',
    title: 'Crisis Directives at Midnight',
    category: 'Debates',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200',
    caption: 'CCC delegates drafting emergency directives during an unmoderated midnight crisis update.',
    year: '2024'
  },
  {
    id: 'g4',
    title: 'Youth Leadership Plenary',
    category: 'Delegates',
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200',
    caption: 'Young delegates engaging in intense unmoderated caucusing.',
    year: '2025'
  },
  {
    id: 'g5',
    title: 'UN Women Policy Summit',
    category: 'Diplomacy',
    imageUrl: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200',
    caption: 'Delegates passing landmark working paper on gendered public space access.',
    year: '2024'
  },
  {
    id: 'g6',
    title: 'The Royal Gavel Ceremony',
    category: 'Heritage',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200',
    caption: 'The Executive Board presenting the Best Delegate distinction in the main auditorium.',
    year: '2025'
  }
];

export const BRAND_LOGOS = {
  aastitva: "https://lh3.googleusercontent.com/aida-public/AB6AXuAH8cr7PgN3uwhoP46uHZns9ztes6ysiK8Ne5Zjgu3cdqnXU3QXrdKBrntBAt2q4NcrQr4Q_TXyZd9ZLHJi0HomJwQ7NZH-SOxnHZcOLWQyOnfEyvDoNEEbjD-yM-3se_u_V1NY0OdByf07xxBv_wGK64_29K-z8B0XGXDKSGcse8Nw08HgE9v06L5tjdrFFP_4cjkYOtw8DhdkLC67sXkykyA1lT-iPsUGCTKeiHU_1OlHiEnCNClzzWC7dx7-uHECRw",
  aequitas: "https://lh3.googleusercontent.com/aida-public/AB6AXuBLP3rNRtQvXm98NMmooPtB0P7u_S5AIhlFJyi27uotJqKQetYflPMpfliLWTsNuqckwhUdHmAdmBGM39Yh6xHiAHbQEDZkvT1320hZpphw3K0l0lcQEbjOoD6sdLblL5axsZ41kJjjZ6F-zT-wr7CRCbe6CGV2EY4zHpuMOeo3jZyT4OyOtSBQ7iN9HYY5xLq34-IBO4paZBdKV4WSX2BUX98UKbGefLKdj0JnkDXDzgHzU_dqAAHsA65XpDPYkX7crg"
};
