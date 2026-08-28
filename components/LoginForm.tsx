"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Toast from "@/components/Toast";

// Supabase가 돌려주는 영문 오류 메시지를 한국어로 변환한다.
function toKoreanError(message: string) {
  const normalized = message.toLowerCase();
  if (normalized.includes("invalid login credentials")) {
    return "이메일 또는 비밀번호가 올바르지 않습니다.";
  }
  if (normalized.includes("email not confirmed")) {
    return "이메일 인증이 필요합니다. 메일함을 확인해 주세요.";
  }
  if (normalized.includes("rate limit") || normalized.includes("too many")) {
    return "요청이 많습니다. 잠시 후 다시 시도해 주세요.";
  }
  return "로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.";
}

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = email.trim() !== "" && password !== "" && !isSubmitting;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    setIsSubmitting(true);
    setError("");

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError(toKoreanError(signInError.message));
      setIsSubmitting(false);
      return;
    }

    router.push("/");
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

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-[var(--text)]"
          >
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="비밀번호를 입력하세요"
            className="input-field h-12 rounded-xl px-4 text-[15px]"
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-primary mt-2 flex h-12 items-center justify-center rounded-xl text-[15px] font-bold disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "로그인 중..." : "로그인"}
        </button>
      </form>

      <p className="text-center text-sm text-[var(--text-sub)]">
        아직 계정이 없으신가요?{" "}
        <Link
          href="/signup"
          className="font-medium text-[var(--accent)] hover:opacity-80"
        >
          회원가입
        </Link>
      </p>
    </>
  );
}
