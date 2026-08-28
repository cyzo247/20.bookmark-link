"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import Toast from "@/components/Toast";

function toKoreanError(message: string) {
  const normalized = message.toLowerCase();
  if (normalized.includes("unable to validate email address")) {
    return "이메일 형식이 올바르지 않습니다.";
  }
  if (normalized.includes("rate limit") || normalized.includes("too many")) {
    return "요청이 많습니다. 잠시 후 다시 시도해 주세요.";
  }
  return "링크 발송에 실패했습니다. 잠시 후 다시 시도해 주세요.";
}

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = email.trim() !== "" && !isSubmitting;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    setError("");

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      { redirectTo: `${window.location.origin}/reset-password` },
    );

    if (resetError) {
      setError(toKoreanError(resetError.message));
      setIsSubmitting(false);
      return;
    }

    setIsSent(true);
    setIsSubmitting(false);
  }

  if (isSent) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-[15px] leading-relaxed text-[var(--text-sub)]">
          <span className="font-medium text-[var(--text)]">{email.trim()}</span>{" "}
          주소로 비밀번호 재설정 링크를 보냈습니다. 메일함을 확인해 주세요.
        </p>
        <Link
          href="/login"
          className="btn-secondary flex h-12 items-center justify-center rounded-xl text-[15px] font-bold"
        >
          로그인으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <>
      {error && <Toast message={error} onDismiss={() => setError("")} />}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-sm font-medium text-[var(--text)]"
          >
            이메일
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="input-field h-12 rounded-xl px-4 text-[15px]"
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-primary mt-2 flex h-12 items-center justify-center rounded-xl text-[15px] font-bold disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "발송 중..." : "비밀번호 재설정 링크 발송"}
        </button>
      </form>

      <p className="text-center text-sm text-[var(--text-sub)]">
        <Link
          href="/login"
          className="font-medium text-[var(--accent)] hover:opacity-80"
        >
          로그인으로 돌아가기
        </Link>
      </p>
    </>
  );
}
