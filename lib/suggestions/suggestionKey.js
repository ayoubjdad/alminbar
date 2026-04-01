/**
 * مفتاح ثابت لكل صف اقتراح (قبول / رفض).
 * @param {{ source: string; url: string }} row
 */
export function makeSuggestionKey(row) {
  return `${row.source}::${row.url}`;
}
