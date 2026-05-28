"use client";

import { ContentItem } from "./ContentCard";
import StatusBadge from "./StatusBadge";

interface ContentDrawerProps {
  item: ContentItem;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onGenerateVideo: (id: string) => void;
}

export default function ContentDrawer({ item, onClose, onApprove, onReject, onGenerateVideo }: ContentDrawerProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end sm:flex-row sm:justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet — bottom on mobile, right panel on desktop */}
      <div className="relative z-10 w-full sm:w-[480px] sm:h-full bg-gray-900 border-t sm:border-t-0 sm:border-l border-gray-800 rounded-t-2xl sm:rounded-none flex flex-col max-h-[90vh] sm:max-h-full">
        {/* Handle bar (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 bg-gray-700 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between px-5 pt-3 pb-4 border-b border-gray-800 shrink-0">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <StatusBadge status={item.status} />
              <span className="text-xs text-gray-500">{item.createdAt}</span>
            </div>
            <h2 className="text-base font-semibold text-white leading-snug pr-4">{item.title}</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300 text-xl shrink-0 hidden sm:block">
            ✕
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Script */}
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Script</h3>
            <div className="bg-gray-800 rounded-xl p-4 text-sm text-gray-200 leading-relaxed whitespace-pre-line">
              {item.script}
            </div>
          </section>

          {/* Caption */}
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Caption</h3>
            <div className="bg-gray-800 rounded-xl p-4 text-sm text-gray-200 leading-relaxed">
              {item.caption}
            </div>
          </section>

          {/* Hashtags */}
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Hashtags</h3>
            <div className="flex flex-wrap gap-2">
              {item.hashtags.map((tag) => (
                <span key={tag} className="text-sm text-blue-400 bg-blue-950/50 border border-blue-800/50 px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </section>

          {/* Generating indicator */}
          {item.status === "generating" && (
            <div className="bg-blue-950/30 border border-blue-800/50 rounded-xl p-4 flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-300">กำลังสร้างวิดีโอ...</p>
                <p className="text-xs text-blue-400/60 mt-0.5">ใช้เวลาประมาณ 3-5 นาที</p>
              </div>
            </div>
          )}

          {item.status === "rejected" && (
            <div className="bg-red-950/30 border border-red-800/50 rounded-xl p-4">
              <p className="text-sm text-red-300">Content ถูก Reject — แก้ไขและส่งใหม่ได้</p>
            </div>
          )}

          {item.status === "done" && (
            <div className="bg-purple-950/30 border border-purple-800/50 rounded-xl p-4 flex items-center gap-3">
              <span className="text-2xl">🎬</span>
              <div>
                <p className="text-sm font-medium text-purple-300">วิดีโอพร้อมแล้ว!</p>
                <p className="text-xs text-purple-400/60 mt-0.5">แตะเพื่อดาวน์โหลดหรือแชร์</p>
              </div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="px-5 py-4 border-t border-gray-800 shrink-0 pb-safe">
          {item.status === "pending_review" && (
            <div className="flex gap-3">
              <button
                onClick={() => onReject(item.id)}
                className="flex-1 py-3 rounded-xl border border-red-800/60 text-red-400 hover:bg-red-950/30 text-sm font-medium transition-colors active:scale-95"
              >
                Reject
              </button>
              <button
                onClick={() => onApprove(item.id)}
                className="flex-2 flex-grow-[2] py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors active:scale-95"
              >
                ✓ Approve
              </button>
            </div>
          )}
          {item.status === "approved" && (
            <button
              onClick={() => onGenerateVideo(item.id)}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-colors active:scale-95 flex items-center justify-center gap-2"
            >
              🎬 สร้างวิดีโอเต็ม
            </button>
          )}
          {item.status === "draft" && (
            <button
              onClick={() => onApprove(item.id)}
              className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold transition-colors active:scale-95"
            >
              ส่ง Review
            </button>
          )}
          {(item.status === "done" || item.status === "generating" || item.status === "rejected") && (
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl border border-gray-700 text-gray-400 text-sm transition-colors active:scale-95"
            >
              ปิด
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
