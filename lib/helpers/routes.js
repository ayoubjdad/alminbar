/** مولّدات الروابط — مكان واحد لتغيير بنية الـ URLs. */
export const routes = {
  home: () => "/",
  article: (slug) => `/article/${slug}`,
  category: (slug) => `/category/${slug}`,
  club: (slug) => `/club/${slug}`,
  clubs: () => "/clubs",
  competition: (slug) => `/competition/${slug}`,
  competitions: () => "/competitions",
  author: (slug) => `/author/${slug}`,
  authors: () => "/authors",
  matches: () => "/matches",
  reels: () => "/reels",
  videos: () => "/videos",
  search: (q) => (q ? `/search?q=${encodeURIComponent(q)}` : "/search"),
};
