/** ترتيب المقالات حسب الأحدث (publishedAt) */
export function sortArticlesByDateDesc(articles) {
  return [...articles].sort((a, b) => {
    const ta = getSortTime(a);
    const tb = getSortTime(b);
    return tb - ta;
  });
}

function getSortTime(a) {
  if (a.publishedAt) {
    const t = new Date(a.publishedAt).getTime();
    if (!Number.isNaN(t)) return t;
  }
  return 0;
}
