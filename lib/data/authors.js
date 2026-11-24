/** كتّاب الموقع — `/author/[slug]`. أسماء وصور تجريبية: استبدلها بفريقك. */
import { avatar } from "../helpers/images";

export const AUTHORS = [
  {
    slug: "redaction",
    name: "هيئة التحرير",
    role: "فريق المنبر الرياضي",
    avatar: avatar(12),
    bio: "فريق تحرير المنبر الرياضي يتابع على مدار الساعة أخبار البطولة الاحترافية والمنتخب الوطني والمحترفين المغاربة.",
    social: { x: "#", instagram: "#" },
  },
  {
    slug: "nadia-idrissi",
    name: "نادية الإدريسي",
    role: "صحفية رياضية",
    avatar: avatar(5),
    bio: "متخصصة في ملفات المحترفين المغاربة والتكوين، تكتب عن مسارات اللاعبين الشباب نحو الاحتراف.",
    social: { x: "#", linkedin: "#" },
  },
  {
    slug: "sami-benali",
    name: "سامي بنعلي",
    role: "محرر البطولة",
    avatar: avatar(13),
    bio: "يغطي البطولة الاحترافية منذ سنوات، ويتابع كواليس الأندية والمباريات من الملاعب.",
    social: { x: "#", linkedin: "#" },
  },
  {
    slug: "youssef-alaoui",
    name: "يوسف العلوي",
    role: "محلل تكتيكي",
    avatar: avatar(16),
    bio: "يقدّم قراءات تكتيكية للمباريات الكبرى ويهتم بالأرقام والإحصائيات المتقدمة.",
    social: { x: "#" },
  },
  {
    slug: "meryem-fassi",
    name: "مريم الفاسي",
    role: "صحفية — الأخبار الدولية",
    avatar: avatar(44),
    bio: "تتابع الدوريات الأوروبية الكبرى ودوري أبطال أوروبا.",
    social: { instagram: "#", linkedin: "#" },
  },
  {
    slug: "hamza-chergaoui",
    name: "حمزة الشرقاوي",
    role: "صحفي — المنتخب الوطني",
    avatar: avatar(59),
    bio: "مكلّف بتغطية أخبار المنتخب المغربي بمختلف فئاته.",
    social: { x: "#" },
  },
];
