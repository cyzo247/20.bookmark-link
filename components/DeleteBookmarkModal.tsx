"use client";

export default function DeleteBookmarkModal({
  bookmarkTitle,
  onClose,
  onConfirm,
}: {
  bookmarkTitle: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="panel flex w-full max-w-sm flex-col gap-5 rounded-2xl p-6">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-[20px] font-bold text-[var(--text)]">
            링크 삭제
          </h2>
          <p className="text-sm text-[var(--text-sub)]">
            &apos;{bookmarkTitle}&apos; 링크를 삭제하시겠습니까? 이 작업은
            되돌릴 수 없습니다.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary flex h-12 flex-1 items-center justify-center rounded-xl text-[15px] font-bold"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="btn-danger flex h-12 flex-1 items-center justify-center rounded-xl text-[15px] font-bold"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
