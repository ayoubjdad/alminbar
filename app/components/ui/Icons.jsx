/* أيقونات SVG مضمّنة (بدون مكتبات). */

export const Icon = ({ children, size = 16, ...p }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...p}
  >
    {children}
  </svg>
);

export const IcBolt = (p) => (
  <Icon {...p} fill="currentColor" stroke="none">
    <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
  </Icon>
);
export const IcClock = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Icon>
);
export const IcSearch = (p) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Icon>
);
export const IcBell = (p) => (
  <Icon {...p}>
    <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </Icon>
);
export const IcUser = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
  </Icon>
);
export const IcGrid = (p) => (
  <Icon {...p} fill="currentColor" stroke="none">
    {[4, 10.5, 17].flatMap((y) =>
      [4, 10.5, 17].map((x) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="3" height="3" rx="0.6" />
      )),
    )}
  </Icon>
);
export const IcChevronLeft = (p) => (
  <Icon {...p}>
    <path d="m15 6-6 6 6 6" />
  </Icon>
);
export const IcChevronRight = (p) => (
  <Icon {...p}>
    <path d="m9 6 6 6-6 6" />
  </Icon>
);
export const IcArrowLeft = (p) => (
  <Icon {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Icon>
);
export const IcPlay = (p) => (
  <Icon {...p} fill="currentColor" stroke="none">
    <path d="M8 5v14l11-7z" />
  </Icon>
);
export const IcPlayRtl = (p) => (
  <Icon {...p} fill="currentColor" stroke="none">
    <path d="M16 5v14L5 12z" />
  </Icon>
);
export const IcEye = (p) => (
  <Icon {...p}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </Icon>
);
export const IcCalendar = (p) => (
  <Icon {...p}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M16 3v4M8 3v4M3 10h18" />
  </Icon>
);
export const IcLinkedin = (p) => (
  <Icon {...p} fill="currentColor" stroke="none">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21H9z" />
  </Icon>
);
export const IcX = (p) => (
  <Icon {...p} fill="currentColor" stroke="none">
    <path d="M18.9 3H22l-7.2 8.2L23 21h-6.6l-5.2-6.7L5.3 21H2.2l7.7-8.8L2 3h6.8l4.7 6.2zm-1.2 16.2h1.7L7.4 4.7H5.6z" />
  </Icon>
);
export const IcFacebook = (p) => (
  <Icon {...p} fill="currentColor" stroke="none">
    <path d="M14 8h3V4h-3c-2.8 0-4 1.8-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5z" />
  </Icon>
);
export const IcInstagram = (p) => (
  <Icon {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </Icon>
);

export const IcMenu = (p) => (
  <Icon {...p}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </Icon>
);
export const IcClose = (p) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);
export const IcWhatsapp = (p) => (
  <Icon {...p} fill="currentColor" stroke="none">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.3-.5 0-1 .2-3.2-.7-2.7-1.1-4.4-3.9-4.5-4.1-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.4z" />
  </Icon>
);
export const IcLink = (p) => (
  <Icon {...p}>
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
    <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
  </Icon>
);
export const IcYoutube = (p) => (
  <Icon {...p} fill="currentColor" stroke="none">
    <path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4A3 3 0 0 0 1 7.5 31 31 0 0 0 .6 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.4a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-4.5 31 31 0 0 0-.4-4.5zM9.8 15V9l5.2 3z" />
  </Icon>
);
export const IcMapPin = (p) => (
  <Icon {...p}>
    <path d="M12 21s-7-6.3-7-12a7 7 0 0 1 14 0c0 5.7-7 12-7 12z" />
    <circle cx="12" cy="9" r="2.5" />
  </Icon>
);
export const IcStadium = (p) => (
  <Icon {...p}>
    <ellipse cx="12" cy="8" rx="9" ry="3" />
    <path d="M3 8v8c0 1.7 4 3 9 3s9-1.3 9-3V8" />
  </Icon>
);
export const IcTrophy = (p) => (
  <Icon {...p}>
    <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z" />
    <path d="M17 6h3a3 3 0 0 1-3 4M7 6H4a3 3 0 0 0 3 4" />
  </Icon>
);
