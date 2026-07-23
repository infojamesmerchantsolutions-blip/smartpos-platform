import { LoginForm } from "@/features/auth/components/login-form";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <LoginForm />
    </main>
  );
}
