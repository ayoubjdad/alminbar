/**
 * دمج قائمة البذرة مع مقالات المستخدم (نفس الـ slug يُستبدل بالكامل من المستخدم).
 */
export function mergeArticleLists(seed, user) {
  const map = new Map(seed.map((a) => [a.slug, { ...a }]));
  for (const a of user) {
    if (!a?.slug) continue;
    const prev = map.get(a.slug);
    map.set(a.slug, prev ? { ...prev, ...a } : { ...a });
  }
  return [...map.values()];
}
