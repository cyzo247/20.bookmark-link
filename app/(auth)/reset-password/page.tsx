import type { Metadata } from "next";
import ResetPasswordForm from "@/components/ResetPasswordForm";

export const metadata: Metadata = {
  title: "비밀번호 재설정",
  description: "새 비밀번호를 설정하세요.",
};

export default function ResetPasswordPage() {
  return (
    <div className="panel flex w-full max-w-sm flex-col gap-6 rounded-2xl p-8">
      <h1 className="text-center text-[22px] font-bold tracking-tight text-[var(--text)]">
        비밀번호 재설정
      </h1>

      <ResetPasswordForm />
    </div>
  );
}
