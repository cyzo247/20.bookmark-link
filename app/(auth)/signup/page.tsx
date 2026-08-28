import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
  return (
    <div className="panel flex w-full max-w-sm flex-col gap-6 rounded-2xl p-8">
      <h1 className="text-center text-[22px] font-bold tracking-tight text-[var(--text)]">
        Bookmark Link
      </h1>

      <SignupForm />
    </div>
  );
}
