/**
 * ريلز «المنبر الرياضي» — بيانات ثابتة.
 * `cover`: صورة الغلاف (تُقصّ تلقائيًا إلى 9:16).
 * `video`: اختياري — رابط mp4 يُشغَّل صامتًا عند تمرير الفأرة.
 * `href`: رابط الريل على إنستغرام / تيك توك / يوتيوب شورتس.
 * ⚠️ المشاهدات والمدة قيم تجريبية.
 */
import { SOCIAL_LINKS } from "./site";
import { img } from "../helpers/images";

export const REELS = [
  {
    id: "saibari-bayern",
    title: "إسماعيل الصيباري يثير إعجاب كومباني بسرعة تأقلمه مع بايرن ميونخ",
    category: "محترفون",
    cover: "/reels/saibari-bayern.webp",
    duration: "0:42",
    views: "128K",
    href: SOCIAL_LINKS.instagram,
  },
  {
    id: "zayat-raja",
    title: "جواد الزيات: بناء فريق قوي لا يعتمد فقط على التعاقد مع النجوم",
    category: "البطولة",
    cover: "/reels/zayat-raja.webp",
    duration: "1:05",
    views: "86K",
    href: SOCIAL_LINKS.instagram,
  },
  {
    id: "ucl-debut",
    title: "دوري أبطال أوروبا يعتمد شارة خاصة للاعبين الذين يخوضون ظهورهم الأول",
    category: "أخبار دولية",
    cover: "/reels/ucl-debut.webp",
    duration: "0:31",
    views: "54K",
    href: SOCIAL_LINKS.instagram,
  },
  {
    id: "derby-atmosphere",
    title: "أجواء الديربي: المدرجات تشتعل قبل صافرة البداية",
    category: "البطولة",
    cover: img("football-ultras-tifo", 540, 960),
    duration: "0:58",
    views: "203K",
    href: SOCIAL_LINKS.instagram,
  },
  {
    id: "atlas-lions-training",
    title: "لقطات من تداريب أسود الأطلس",
    category: "المنتخب",
    cover: img("football-training-reel", 540, 960),
    duration: "0:37",
    views: "97K",
    href: SOCIAL_LINKS.instagram,
  },
  {
    id: "goal-of-the-week",
    title: "هدف الأسبوع في البطولة الاحترافية",
    category: "البطولة",
    cover: img("football-goal-reel", 540, 960),
    duration: "0:24",
    views: "145K",
    href: SOCIAL_LINKS.instagram,
  },
];
