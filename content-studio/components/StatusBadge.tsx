"use client";

export type ContentStatus = "draft" | "pending_review" | "approved" | "generating" | "done" | "rejected";

const STATUS_CONFIG: Record<ContentStatus, { label: string; className: string; dot: string }> = {
  draft: {
    label: "Draft",
    className: "bg-gray-800 text-gray-300 border border-gray-700",
    dot: "bg-gray-400",
  },
  pending_review: {
    label: "รอ Approve",
    className: "bg-amber-900/40 text-amber-300 border border-amber-700/50",
    dot: "bg-amber-400",
  },
  approved: {
    label: "Approved",
    className: "bg-emerald-900/40 text-emerald-300 border border-emerald-700/50",
    dot: "bg-emerald-400",
  },
  generating: {
    label: "กำลังสร้างวิดีโอ",
    className: "bg-blue-900/40 text-blue-300 border border-blue-700/50",
    dot: "bg-blue-400 animate-pulse",
  },
  done: {
    label: "เสร็จแล้ว",
    className: "bg-purple-900/40 text-purple-300 border border-purple-700/50",
    dot: "bg-purple-400",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-900/40 text-red-300 border border-red-700/50",
    dot: "bg-red-400",
  },
};

export default function StatusBadge({ status }: { status: ContentStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
