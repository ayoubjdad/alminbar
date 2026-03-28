export const DEFAULT_BOTOLA_STANDINGS = {
  label: "البطولة الاحترافية — المغرب (البطولة)",
  seasonLabel: "موسم تجريبي",
  rows: [
    { rank: 1, team: "الوداد الرياضي", mp: 22, pts: 47, gd: 18 },
    { rank: 2, team: "الرجاء الرياضي", mp: 22, pts: 45, gd: 15 },
    { rank: 3, team: "نهضة بركان", mp: 22, pts: 42, gd: 11 },
    { rank: 4, team: "المغرب الفاسي", mp: 22, pts: 38, gd: 6 },
    { rank: 5, team: "الفتح الرباطي", mp: 22, pts: 36, gd: 4 },
    { rank: 6, team: "شباب المحمدية", mp: 22, pts: 34, gd: 2 },
    { rank: 7, team: "اتحاد طنجة", mp: 22, pts: 32, gd: -1 },
    { rank: 8, team: "المغرب التطواني", mp: 22, pts: 30, gd: -3 },
    { rank: 9, team: "المغرب التطواني", mp: 22, pts: 30, gd: -3 },
    { rank: 10, team: "المغرب التطواني", mp: 22, pts: 30, gd: -3 },
    { rank: 11, team: "المغرب التطواني", mp: 22, pts: 30, gd: -3 },
    { rank: 12, team: "المغرب التطواني", mp: 22, pts: 30, gd: -3 },
    { rank: 13, team: "المغرب التطواني", mp: 22, pts: 30, gd: -3 },
    { rank: 14, team: "المغرب التطواني", mp: 22, pts: 30, gd: -3 },
    { rank: 15, team: "المغرب التطواني", mp: 22, pts: 30, gd: -3 },
    { rank: 16, team: "المغرب التطواني", mp: 22, pts: 30, gd: -3 },
  ],
};

const ROWS_BUNDESLIGA = [
  { rank: 1, team: "بايرن ميونخ", mp: 25, pts: 58, gd: 36 },
  { rank: 2, team: "ليفركوزن", mp: 25, pts: 55, gd: 22 },
  { rank: 3, team: "شتوتغارت", mp: 25, pts: 48, gd: 12 },
  { rank: 4, team: "دورتموند", mp: 25, pts: 45, gd: 8 },
  { rank: 5, team: "آينتراخت فرانكفورت", mp: 25, pts: 42, gd: 5 },
];

const ROWS_SERIE_A = [
  { rank: 1, team: "إنتر ميلان", mp: 28, pts: 61, gd: 24 },
  { rank: 2, team: "نابولي", mp: 28, pts: 59, gd: 20 },
  { rank: 3, team: "أتالانتا", mp: 28, pts: 56, gd: 17 },
  { rank: 4, team: "يوفنتوس", mp: 28, pts: 54, gd: 14 },
  { rank: 5, team: "ميلان", mp: 28, pts: 50, gd: 9 },
];

const ROWS_PREMIER = [
  { rank: 1, team: "أرسنال", mp: 28, pts: 64, gd: 35 },
  { rank: 2, team: "مانشستر سيتي", mp: 28, pts: 62, gd: 28 },
  { rank: 3, team: "ليفربول", mp: 28, pts: 60, gd: 22 },
  { rank: 4, team: "تشيلسي", mp: 28, pts: 52, gd: 12 },
  { rank: 5, team: "نيوكاسل", mp: 28, pts: 48, gd: 8 },
];

const ROWS_UCL = [
  { rank: 1, team: "ليفربول", mp: 8, pts: 21, gd: 14 },
  { rank: 2, team: "برشلونة", mp: 8, pts: 19, gd: 11 },
  { rank: 3, team: "أرسنال", mp: 8, pts: 18, gd: 9 },
  { rank: 4, team: "إنتر ميلان", mp: 8, pts: 17, gd: 7 },
  { rank: 5, team: "ريال مدريد", mp: 8, pts: 16, gd: 6 },
];

const ROWS_LA_LIGA = [
  { rank: 1, team: "ريال مدريد", mp: 28, pts: 66, gd: 32 },
  { rank: 2, team: "برشلونة", mp: 28, pts: 63, gd: 29 },
  { rank: 3, team: "أتلتيكو مدريد", mp: 28, pts: 58, gd: 18 },
  { rank: 4, team: "أتلتيك بلباو", mp: 28, pts: 50, gd: 10 },
  { rank: 5, team: "فياريال", mp: 28, pts: 46, gd: 5 },
];

export const DEFAULT_LEAGUE_TABS = [
  {
    id: "bundesliga",
    name: "الدوري الألماني",
    logo: "/leagues/bundesliga.svg",
    kind: "world",
    country: "ألمانيا",
    rows: ROWS_BUNDESLIGA,
  },
  {
    id: "serie-a",
    name: "الدوري الإيطالي",
    logo: "/leagues/serie-a.svg",
    kind: "world",
    country: "إيطاليا",
    rows: ROWS_SERIE_A,
  },
  {
    id: "premier-league",
    name: "الدوري الإنجليزي",
    logo: "/leagues/premier-league.svg",
    kind: "world",
    country: "إنجلترا",
    rows: ROWS_PREMIER,
  },
  {
    id: "champions-league",
    name: "دوري أبطال أوروبا",
    logo: "/leagues/ucl.svg",
    kind: "world",
    country: "أوروبا",
    rows: ROWS_UCL,
  },
  {
    id: "la-liga",
    name: "الدوري الإسباني",
    logo: "/leagues/la-liga.svg",
    kind: "world",
    country: "إسبانيا",
    rows: ROWS_LA_LIGA,
  },
  {
    id: "botola",
    name: "البطولة الاحترافية",
    logo: "/leagues/botola.svg",
    kind: "botola",
    label: DEFAULT_BOTOLA_STANDINGS.label,
    seasonLabel: DEFAULT_BOTOLA_STANDINGS.seasonLabel,
    rows: DEFAULT_BOTOLA_STANDINGS.rows,
  },
];

/** @type {LeagueStandings[]} */
export const DEFAULT_TOP_FIVE_LEAGUES = [
  {
    id: "premier-league",
    name: "الدوري الإنجليزي الممتاز",
    country: "إنجلترا",
    rows: ROWS_PREMIER,
  },
  {
    id: "la-liga",
    name: "الدوري الإسباني",
    country: "إسبانيا",
    rows: ROWS_LA_LIGA,
  },
  {
    id: "serie-a",
    name: "الدوري الإيطالي",
    country: "إيطاليا",
    rows: ROWS_SERIE_A,
  },
  {
    id: "bundesliga",
    name: "الدوري الألماني",
    country: "ألمانيا",
    rows: ROWS_BUNDESLIGA,
  },
  {
    id: "ligue-1",
    name: "الدوري الفرنسي",
    country: "فرنسا",
    rows: [
      { rank: 1, team: "باريس سان جيرمان", mp: 26, pts: 62, gd: 30 },
      { rank: 2, team: "مارسيليا", mp: 26, pts: 52, gd: 14 },
      { rank: 3, team: "موناكو", mp: 26, pts: 50, gd: 11 },
      { rank: 4, team: "ليل", mp: 26, pts: 46, gd: 6 },
      { rank: 5, team: "لنس", mp: 26, pts: 44, gd: 4 },
    ],
  },
];
