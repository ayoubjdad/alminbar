/**
 * استخراج جدول «ترتيب الدوري المغربي» من HTML صفحة هسبورت
 * (widget: `.rankings.wraped-table` + `table.sport_table.fluid-table.result`).
 * يعمل في Node أو المتصفح دون مكتبة DOM خارجية.
 */

const WIDGET_TITLE = "ترتيب الدوري المغربي";
const HESPORT_ORIGIN = "https://www.hesport.com";

function stripTags(html) {
  return String(html)
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function absolutizeHesportUrl(href) {
  if (!href || typeof href !== "string") return null;
  const h = href.trim();
  if (h.startsWith("http://") || h.startsWith("https://")) return h;
  if (h.startsWith("//")) return `https:${h}`;
  if (h.startsWith("/")) return `${HESPORT_ORIGIN}${h}`;
  return h;
}

/**
 * @param {string} html
 * @returns {{
 *   label: string,
 *   seasonLabel: string | null,
 *   seasonHref: string | null,
 *   rows: Array<{
 *     rank: number,
 *     team: string,
 *     mp: number,
 *     pts: number,
 *     gd: number,
 *     goalsFor: number,
 *     goalsAgainst: number,
 *     logo: string | null,
 *     teamUrl: string | null,
 *   }>
 * }}
 */
export function parseHesportMoroccanLeagueStandingsFromHtml(html) {
  if (typeof html !== "string" || !html.length) {
    return {
      label: WIDGET_TITLE,
      seasonLabel: null,
      seasonHref: null,
      rows: [],
    };
  }

  const titleIdx = html.indexOf(WIDGET_TITLE);
  if (titleIdx === -1) {
    return {
      label: WIDGET_TITLE,
      seasonLabel: null,
      seasonHref: null,
      rows: [],
    };
  }

  /** عنوان الموسم: الـ `href` يقع قبل نص العنوان داخل `<a>`. */
  let seasonHref = null;
  const linkOpen = html.lastIndexOf("<a", titleIdx);
  if (linkOpen !== -1 && titleIdx - linkOpen < 800) {
    const head = html.slice(linkOpen, titleIdx + WIDGET_TITLE.length + 40);
    const hrefM = head.match(/\bhref=['"]([^'"]+)['"]/i);
    seasonHref = hrefM?.[1] ? absolutizeHesportUrl(hrefM[1]) : null;
  }

  const slice = html.slice(titleIdx, titleIdx + 150_000);
  const seasonYears = seasonHref?.match(/(\d{4})-(\d{4})/);
  const seasonLabel = seasonYears
    ? `الموسم ${seasonYears[1]}–${seasonYears[2]}`
    : null;

  const tableMarker = 'class="sport_table fluid-table result"';
  const tableIdx = slice.indexOf(tableMarker);
  if (tableIdx === -1) {
    return {
      label: WIDGET_TITLE,
      seasonLabel,
      seasonHref,
      rows: [],
    };
  }

  const tbodyOpen = slice.indexOf("<tbody>", tableIdx);
  const tbodyClose = slice.indexOf("</tbody>", tbodyOpen);
  if (tbodyOpen === -1 || tbodyClose === -1) {
    return {
      label: WIDGET_TITLE,
      seasonLabel,
      seasonHref,
      rows: [],
    };
  }

  const tbody = slice.slice(tbodyOpen, tbodyClose);
  const rowRe =
    /<tr\s+class="[^"]*team-ranking-info[^"]*"[^>]*>([\s\S]*?)<\/tr>/gi;
  const rows = [];
  let rm;
  while ((rm = rowRe.exec(tbody)) !== null) {
    const rowHtml = rm[1];
    const tdRe = /<td[^>]*>([\s\S]*?)<\/td>/gi;
    const tds = [];
    let tm;
    while ((tm = tdRe.exec(rowHtml)) !== null) {
      tds.push(tm[1]);
    }
    if (tds.length < 6) continue;

    const rank = parseInt(stripTags(tds[0]), 10);
    if (Number.isNaN(rank)) continue;

    const teamCell = tds[1];
    const hrefM = teamCell.match(/<a[^>]+href=["']([^"']+)["']/i);
    const teamUrl = hrefM?.[1] ? absolutizeHesportUrl(hrefM[1]) : null;
    const imgM = teamCell.match(/<img[^>]+src=["']([^"']+)["']/i);
    const logo = imgM?.[1] ?? null;
    const altM = teamCell.match(/\balt=["']([^"']*)["']/i);
    let team = stripTags(
      teamCell
        .replace(/<a[^>]*>/gi, "")
        .replace(/<\/a>/gi, "")
        .replace(/<img[^>]*\/?>/gi, ""),
    );
    if (!team && altM) team = altM[1].trim();

    const mp = parseInt(stripTags(tds[2]), 10);
    const goalsFor = parseInt(stripTags(tds[3]), 10);
    const goalsAgainst = parseInt(stripTags(tds[4]), 10);
    const pts = parseInt(stripTags(tds[5]), 10);
    if (
      Number.isNaN(mp) ||
      Number.isNaN(goalsFor) ||
      Number.isNaN(goalsAgainst) ||
      Number.isNaN(pts)
    ) {
      continue;
    }
    const gd = goalsFor - goalsAgainst;

    rows.push({
      rank,
      team,
      mp,
      pts,
      gd,
      goalsFor,
      goalsAgainst,
      logo,
      teamUrl,
    });
  }

  return {
    label: WIDGET_TITLE,
    seasonLabel,
    seasonHref,
    rows,
  };
}
