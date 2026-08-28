import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="panel flex w-full max-w-sm flex-col gap-6 rounded-2xl p-8">
      <h1 className="text-center text-[22px] font-bold tracking-tight text-[var(--text)]">
        Bookmark Link
      </h1>

      <form className="flex flex-col gap-4">
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
            placeholder="비밀번호를 입력하세요"
            className="input-field h-12 rounded-xl px-4 text-[15px]"
          />
        </div>

        <button
          type="submit"
          className="btn-primary mt-2 flex h-12 items-center justify-center rounded-xl text-[15px] font-bold"
        >
          로그인
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
    </div>
  );
}
