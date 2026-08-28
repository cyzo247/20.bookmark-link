"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Toast from "@/components/Toast";

function toKoreanError(message: string) {
  const normalized = message.toLowerCase();
  if (normalized.includes("should be different")) {
    return "새 비밀번호는 기존 비밀번호와 달라야 합니다.";
  }
  if (normalized.includes("password should be at least")) {
    return "비밀번호는 최소 6자 이상이어야 합니다.";
  }
  if (normalized.includes("session") || normalized.includes("token")) {
    return "재설정 링크가 만료되었거나 유효하지 않습니다. 다시 시도해 주세요.";
  }
  if (normalized.includes("rate limit") || normalized.includes("too many")) {
    return "요청이 많습니다. 잠시 후 다시 시도해 주세요.";
  }
  return "비밀번호 재설정에 실패했습니다. 잠시 후 다시 시도해 주세요.";
}

type Status = "checking" | "ready" | "invalid";

export default function ResetPasswordForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("checking");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const supabase = createClient();

    // 이메일 링크로 들어오면 SDK가 URL의 복구 토큰을 세션으로 교환한다.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setStatus("ready");
      } else if (event === "INITIAL_SESSION") {
        setStatus("invalid");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const canSubmit =
    password !== "" && passwordConfirm !== "" && !isSubmitting;

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
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(toKoreanError(updateError.message));
      setIsSubmitting(false);
      return;
    }

    setIsDone(true);
    setIsSubmitting(false);
  }

  if (status === "checking") {
    return (
      <p className="text-center text-sm text-[var(--text-sub)]">확인 중...</p>
    );
  }

  if (status === "invalid" && !isDone) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-[15px] leading-relaxed text-[var(--text-sub)]">
          재설정 링크가 만료되었거나 유효하지 않습니다. 비밀번호 찾기를 다시
          진행해 주세요.
        </p>
        <Link
          href="/forgot-password"
          className="btn-secondary flex h-12 items-center justify-center rounded-xl text-[15px] font-bold"
        >
          비밀번호 찾기로 이동
        </Link>
      </div>
    );
  }

  if (isDone) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-[15px] leading-relaxed text-[var(--text-sub)]">
          비밀번호가 변경되었습니다. 새 비밀번호로 다시 로그인해 주세요.
        </p>
        <button
          type="button"
          onClick={async () => {
            const supabase = createClient();
            await supabase.auth.signOut();
            router.replace("/login");
            router.refresh();
          }}
          className="btn-primary flex h-12 items-center justify-center rounded-xl text-[15px] font-bold"
        >
          로그인하러 가기
        </button>
      </div>
    );
  }

  return (
    <>
      {error && <Toast message={error} onDismiss={() => setError("")} />}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-[var(--text)]"
          >
            새 비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="새 비밀번호를 입력하세요"
            className="input-field h-12 rounded-xl px-4 text-[15px]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password-confirm"
            className="text-sm font-medium text-[var(--text)]"
          >
            새 비밀번호 확인
          </label>
          <input
            id="password-confirm"
            type="password"
            value={passwordConfirm}
            onChange={(event) => setPasswordConfirm(event.target.value)}
            placeholder="새 비밀번호를 다시 입력하세요"
            className="input-field h-12 rounded-xl px-4 text-[15px]"
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="btn-primary mt-2 flex h-12 items-center justify-center rounded-xl text-[15px] font-bold disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "변경 중..." : "비밀번호 변경"}
        </button>
      </form>
    </>
  );
}
