export { parseHesportMoroccanLeagueStandingsFromHtml } from "./parseHesportMoroccanLeagueStandings.js";

/**
 * ترتيب افتراضي مستخرج من لقطة HTML هسبورت (`ترتيب الدوري المغربي`).
 * لتحديثه: الصق HTML الصفحة ثم `parseHesportMoroccanLeagueStandingsFromHtml(html)`.
 */
export const DEFAULT_BOTOLA_STANDINGS = {
  label: "ترتيب الدوري المغربي",
  seasonLabel: "الموسم 2022–2023",
  seasonHref:
    "https://www.hesport.com/season/الدوري-المغربي-الممتاز-2022-2023-maroc",
  sourceLabel: "هسبورت",
  sourceUrl: "https://www.hesport.com/",
  rows: [
    {
      rank: 1,
      team: "الرجاء الرياضي",
      mp: 15,
      pts: 30,
      gd: 13,
      goalsFor: 17,
      goalsAgainst: 4,
      logo: "https://is.hespress.com/teams/3473.png",
      teamUrl:
        "https://www.hesport.com/team/%d8%a7%d9%84%d8%b1%d8%ac%d8%a7%d8%a1-%d8%a7%d9%84%d8%b1%d9%8a%d8%a7%d8%b6%d9%8a-3473",
    },
    {
      rank: 2,
      team: "الجيش الملكي",
      mp: 13,
      pts: 29,
      gd: 18,
      goalsFor: 23,
      goalsAgainst: 5,
      logo: "https://is.hespress.com/teams/3463.png",
      teamUrl:
        "https://www.hesport.com/team/%d8%a7%d9%84%d8%ac%d9%8a%d8%b4-%d8%a7%d9%84%d9%85%d9%84%d9%83%d9%8a-3463",
    },
    {
      rank: 3,
      team: "الوداد الرياضي",
      mp: 13,
      pts: 29,
      gd: 14,
      goalsFor: 25,
      goalsAgainst: 11,
      logo: "https://is.hespress.com/teams/3476.png",
      teamUrl:
        "https://www.hesport.com/team/%d8%a7%d9%84%d9%88%d8%af%d8%a7%d8%af-%d8%a7%d9%84%d8%b1%d9%8a%d8%a7%d8%b6%d9%8a-3476",
    },
    {
      rank: 4,
      team: "المغرب الفاسي",
      mp: 13,
      pts: 27,
      gd: 14,
      goalsFor: 20,
      goalsAgainst: 6,
      logo: "https://is.hespress.com/teams/3469.png",
      teamUrl:
        "https://www.hesport.com/team/%d8%a7%d9%84%d9%85%d8%ba%d8%b1%d8%a8-%d8%a7%d9%84%d9%81%d8%a7%d8%b3%d9%8a-3469",
    },
    {
      rank: 5,
      team: "النادي المكناسي",
      mp: 15,
      pts: 26,
      gd: 1,
      goalsFor: 12,
      goalsAgainst: 11,
      logo:
        "https://secure.cache.images.core.optasports.com/soccer/teams/150x150/3462.png",
      teamUrl:
        "https://www.hesport.com/team/%d8%a7%d9%84%d9%86%d8%a7%d8%af%d9%8a-%d8%a7%d9%84%d9%85%d9%83%d9%86%d8%a7%d8%b3%d9%8a-3462",
    },
    {
      rank: 6,
      team: "نهضة بركان",
      mp: 13,
      pts: 25,
      gd: 9,
      goalsFor: 22,
      goalsAgainst: 13,
      logo: "https://is.hespress.com/teams/7512.png",
      teamUrl:
        "https://www.hesport.com/team/%d9%86%d9%87%d8%b6%d8%a9-%d8%a8%d8%b1%d9%83%d8%a7%d9%86-7512",
    },
    {
      rank: 7,
      team: "الدفاع الحسني الجديدي",
      mp: 14,
      pts: 20,
      gd: -3,
      goalsFor: 11,
      goalsAgainst: 14,
      logo: "https://is.hespress.com/teams/5555.png",
      teamUrl:
        "https://www.hesport.com/team/%d8%a7%d9%84%d8%af%d9%81%d8%a7%d8%b9-%d8%a7%d9%84%d8%ad%d8%b3%d9%86%d9%8a-%d8%a7%d9%84%d8%ac%d8%af%d9%8a%d8%af%d9%8a-5555",
    },
    {
      rank: 8,
      team: "الفتح الرياضي",
      mp: 15,
      pts: 18,
      gd: -2,
      goalsFor: 18,
      goalsAgainst: 20,
      logo: "https://is.hespress.com/teams/7511.png",
      teamUrl:
        "https://www.hesport.com/team/%d8%a7%d9%84%d9%81%d8%aa%d8%ad-%d8%a7%d9%84%d8%b1%d8%a8%d8%a7%d8%b7%d9%8a-7511",
    },
    {
      rank: 9,
      team: "Olympique Dcheïra",
      mp: 15,
      pts: 16,
      gd: -9,
      goalsFor: 13,
      goalsAgainst: 22,
      logo: "https://banners.hespress.com/images/1758274192-3454.png",
      teamUrl: "https://www.hesport.com/sports/team/olympique-dcheira-601295",
    },
    {
      rank: 10,
      team: "الكوكب المراكشي",
      mp: 14,
      pts: 15,
      gd: 0,
      goalsFor: 13,
      goalsAgainst: 13,
      logo: "https://is.hespress.com/teams/3468.png",
      teamUrl:
        "https://www.hesport.com/team/%d8%a7%d9%84%d9%83%d9%88%d9%83%d8%a8-%d8%a7%d9%84%d9%85%d8%b1%d8%a7%d9%83%d8%b4%d9%8a-3468",
    },
    {
      rank: 11,
      team: "حسنية أكادير",
      mp: 15,
      pts: 15,
      gd: -7,
      goalsFor: 12,
      goalsAgainst: 19,
      logo: "https://is.hespress.com/teams/3464.png",
      teamUrl:
        "https://www.hesport.com/team/%d8%ad%d8%b3%d9%86%d9%8a%d8%a9-%d8%a3%d9%83%d8%a7%d8%af%d9%8a%d8%b1-3464",
    },
    {
      rank: 12,
      team: "اتحاد طنجة",
      mp: 15,
      pts: 13,
      gd: -8,
      goalsFor: 11,
      goalsAgainst: 19,
      logo: "https://is.hespress.com/teams/3466.png",
      teamUrl:
        "https://www.hesport.com/team/%d8%a7%d8%aa%d8%ad%d8%a7%d8%af-%d8%b7%d9%86%d8%ac%d8%a9-3466",
    },
    {
      rank: 13,
      team: "نادي نهضة الزمامرة",
      mp: 14,
      pts: 13,
      gd: -9,
      goalsFor: 10,
      goalsAgainst: 19,
      logo:
        "https://secure.cache.images.core.optasports.com/soccer/teams/150x150/39043.png",
      teamUrl:
        "https://www.hesport.com/team/%d9%86%d8%a7%d8%af%d9%8a-%d9%86%d9%87%d8%b6%d8%a9-%d8%a7%d9%84%d8%b2%d9%85%d8%a7%d9%85%d8%b1%d8%a9-39043",
    },
    {
      rank: 14,
      team: "اتحاد تواركة",
      mp: 15,
      pts: 9,
      gd: -9,
      goalsFor: 14,
      goalsAgainst: 23,
      logo: "https://is.hespress.com/teams/3475.png",
      teamUrl:
        "https://www.hesport.com/team/%d8%a7%d8%aa%d8%ad%d8%a7%d8%af-%d8%aa%d9%88%d8%a7%d8%b1%d9%83%d8%a9-3475",
    },
    {
      rank: 15,
      team: "أولمبيك آسفي",
      mp: 13,
      pts: 8,
      gd: -12,
      goalsFor: 8,
      goalsAgainst: 20,
      logo: "https://is.hespress.com/teams/3472.png",
      teamUrl:
        "https://www.hesport.com/team/%d8%a3%d9%88%d9%84%d9%85%d8%a8%d9%8a%d9%83-%d8%a2%d8%b3%d9%81%d9%8a-3472",
    },
    {
      rank: 16,
      team: "Yacoub El Mansour",
      mp: 14,
      pts: 7,
      gd: -10,
      goalsFor: 12,
      goalsAgainst: 22,
      logo: "https://banners.hespress.com/images/1758274143-25058.png",
      teamUrl: "https://www.hesport.com/sports/team/yacoub-el-mansour-601957",
    },
  ],
};
