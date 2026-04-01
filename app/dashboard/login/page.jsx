import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "تسجيل الدخول — لوحة التحرير",
  robots: "noindex, nofollow",
};

function LoginFallback() {
  return (
    <div
      style={{
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      جاري التحميل…
    </div>
  );
}

export default function DashboardLoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}
