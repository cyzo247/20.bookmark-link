import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "로그인",
  description: "이메일 또는 카카오 계정으로 로그인하세요.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="panel flex w-full max-w-sm flex-col gap-6 rounded-2xl p-8">
      <h1 className="text-center text-[22px] font-bold tracking-tight text-[var(--text)]">
        Bookmark Link
      </h1>

      <LoginForm initialError={error} />
    </div>
  );
}
