import { IcInstagram, IcLinkedin, IcX } from "../ui/Icons";

const ICONS = {
  linkedin: { Icon: IcLinkedin, label: "LinkedIn", cls: "is-linkedin" },
  x: { Icon: IcX, label: "X", cls: "" },
  instagram: { Icon: IcInstagram, label: "Instagram", cls: "is-ig" },
};

/** روابط حسابات الكاتب. */
export default function AuthorSocials({ author }) {
  const entries = Object.entries(author.social ?? {});
  if (!entries.length) return null;
  return (
    <div className="rv-writers__social">
      {entries.map(([key, href]) => {
        const it = ICONS[key];
        if (!it) return null;
        const { Icon } = it;
        return (
          <a key={key} href={href} className={it.cls} aria-label={`${it.label} — ${author.name}`}>
            <Icon size={13} />
          </a>
        );
      })}
    </div>
  );
}
