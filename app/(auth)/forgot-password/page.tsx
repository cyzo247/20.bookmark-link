import type { Metadata } from "next";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "비밀번호 찾기",
  description: "가입한 이메일로 비밀번호 재설정 링크를 받으세요.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="panel flex w-full max-w-sm flex-col gap-6 rounded-2xl p-8">
      <h1 className="text-center text-[22px] font-bold tracking-tight text-[var(--text)]">
        비밀번호 찾기
      </h1>

      <ForgotPasswordForm />
    </div>
  );
}
