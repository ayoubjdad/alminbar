import type { Metadata } from "next";
import { SITE } from "../lib/data/site";
import SiteLayout from "./layouts/SiteLayout";
import "./globals.css";
import "./styles/main.scss";

export const metadata: Metadata = {
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  description: SITE.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
