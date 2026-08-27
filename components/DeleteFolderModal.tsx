"use client";

export default function DeleteFolderModal({
  folderName,
  isDeleting = false,
  onClose,
  onConfirm,
}: {
  folderName: string;
  isDeleting?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="panel flex w-full max-w-sm flex-col gap-5 rounded-2xl p-6">
        <div className="flex flex-col gap-1.5">
          <h2 className="text-[20px] font-bold text-[var(--text)]">
            폴더 삭제
          </h2>
          <p className="text-sm text-[var(--text-sub)]">
            &apos;{folderName}&apos; 폴더를 삭제하시겠습니까? 이 작업은
            되돌릴 수 없습니다.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="btn-secondary flex h-12 flex-1 items-center justify-center rounded-xl text-[15px] font-bold disabled:opacity-50"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="btn-danger flex h-12 flex-1 items-center justify-center rounded-xl text-[15px] font-bold disabled:opacity-50"
          >
            {isDeleting ? "삭제 중..." : "삭제"}
          </button>
        </div>
      </div>
    </div>
  );
}
