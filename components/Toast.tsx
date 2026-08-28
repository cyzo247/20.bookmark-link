"use client";

import { useEffect } from "react";

export default function Toast({
  message,
  onDismiss,
  duration = 3000,
}: {
  message: string;
  onDismiss: () => void;
  duration?: number;
}) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onDismiss]);

  return (
    <div
      role="alert"
      className="toast panel fixed left-1/2 top-6 z-50 max-w-[calc(100%-2rem)] rounded-xl px-4 py-3 text-sm font-medium text-[var(--error)]"
    >
      {message}
    </div>
  );
}
