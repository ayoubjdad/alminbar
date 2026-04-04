/** دوريات ومسابقات — للربط في المقالات (انظر `fullLeagues.js`) */
export { STATIC_LEAGUES as RELATED_LEAGUES } from "./fullLeagues";

/** تصنيفات تحريرية للمقال (حقل `category` في الاستعلامات) */
export const EDITORIAL_CATEGORIES = [
  { value: "botola", label: "البطولة / محلي" },
  { value: "national-team", label: "منتخب" },
  { value: "caf", label: "إفريقيا" },
  { value: "morocco-sports", label: "رياضة مغربية عامة" },
  { value: "club", label: "نادي" },
  { value: "arab-world", label: "عالمي / عربي" },
  { value: "variety", label: "منوعات" },
  { value: "trending", label: "ترند" },
];
