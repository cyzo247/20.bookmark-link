"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Toast from "@/components/Toast";

// Supabase가 돌려주는 영문 오류 메시지를 한국어로 변환한다.
function toKoreanError(message: string) {
  const normalized = message.toLowerCase();
  if (normalized.includes("already registered")) {
    return "이미 가입된 이메일입니다.";
  }
  if (normalized.includes("password should be at least")) {
    return "비밀번호는 최소 6자 이상이어야 합니다.";
  }
  if (normalized.includes("unable to validate email address")) {
    return "이메일 형식이 올바르지 않습니다.";
  }
  if (normalized.includes("valid password")) {
    return "비밀번호를 입력해 주세요.";
  }
  if (normalized.includes("rate limit") || normalized.includes("too many")) {
    return "요청이 많습니다. 잠시 후 다시 시도해 주세요.";
  }
  return "회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.";
}

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const canSubmit =
    email.trim() !== "" &&
    password !== "" &&
    passwordConfirm !== "" &&
    !isSubmitting;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    if (signUpError) {
      setError(toKoreanError(signUpError.message));
      setIsSubmitting(false);
      return;
    }

    // 이메일 확인이 켜진 프로젝트에서는 이미 가입된 이메일도 성공처럼 응답하되
    // identities 배열이 비어 있다. 이를 중복 가입으로 처리한다.
    if (data.user && data.user.identities && data.user.identities.length === 0) {
      setError("이미 가입된 이메일입니다.");
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

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password-confirm"
            className="text-sm font-medium text-[var(--text)]"
          >
            비밀번호 확인
          </label>
          <input
            id="password-confirm"
            type="password"
            value={passwordConfirm}
            onChange={(event) => setPasswordConfirm(event.target.value)}
            placeholder="비밀번호를 다시 입력하세요"
            className="input-field h-12 rounded-xl px-4 text-[15px]"
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-primary mt-2 flex h-12 items-center justify-center rounded-xl text-[15px] font-bold disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "가입 중..." : "회원가입"}
        </button>
      </form>

      <p className="text-center text-sm text-[var(--text-sub)]">
        이미 계정이 있으신가요?{" "}
        <Link
          href="/login"
          className="font-medium text-[var(--accent)] hover:opacity-80"
        >
          로그인
        </Link>
      </p>

      <p className="text-center text-xs text-[var(--text-sub)]">
        <Link href="/privacy" className="hover:underline">
          개인정보 처리방침
        </Link>
      </p>
    </>
  );
}
