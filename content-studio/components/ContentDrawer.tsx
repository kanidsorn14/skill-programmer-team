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
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="w-full max-w-xl bg-gray-900 border-l border-gray-800 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-gray-800 shrink-0">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <StatusBadge status={item.status} />
              <span className="text-xs text-gray-500">{item.createdAt}</span>
            </div>
            <h2 className="text-base font-semibold text-white leading-snug">{item.title}</h2>
          </div>
          <button onClick={onClose} className="ml-3 text-gray-500 hover:text-gray-300 text-xl shrink-0">✕</button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Script */}
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Script</h3>
            <div className="bg-gray-800 rounded-xl p-4 text-sm text-gray-200 leading-relaxed whitespace-pre-line font-mono">
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

          {/* Video (if done) */}
          {item.status === "done" && item.videoUrl && (
            <section>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">วิดีโอ</h3>
              <div className="bg-gray-800 rounded-xl aspect-video flex items-center justify-center border border-gray-700">
                <div className="text-center text-gray-500">
                  <div className="text-3xl mb-2">🎬</div>
                  <p className="text-sm">วิดีโอพร้อมแล้ว</p>
                </div>
              </div>
            </section>
          )}

          {/* Generating state */}
          {item.status === "generating" && (
            <div className="bg-blue-950/30 border border-blue-800/50 rounded-xl p-4 flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-300">กำลังสร้างวิดีโอ...</p>
                <p className="text-xs text-blue-400/60 mt-0.5">ใช้เวลาประมาณ 3-5 นาที</p>
              </div>
            </div>
          )}

          {/* Rejected */}
          {item.status === "rejected" && (
            <div className="bg-red-950/30 border border-red-800/50 rounded-xl p-4">
              <p className="text-sm text-red-300">Content ถูก Reject — สามารถแก้ไขและส่งใหม่ได้</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-5 border-t border-gray-800 shrink-0">
          {item.status === "pending_review" && (
            <div className="flex gap-3">
              <button
                onClick={() => onReject(item.id)}
                className="flex-1 py-2.5 rounded-xl border border-red-800/60 text-red-400 hover:bg-red-950/30 text-sm font-medium transition-colors"
              >
                Reject
              </button>
              <button
                onClick={() => onApprove(item.id)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
              >
                Approve ✓
              </button>
            </div>
          )}
          {item.status === "approved" && (
            <button
              onClick={() => onGenerateVideo(item.id)}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2"
            >
              🎬 สร้างวิดีโอเต็ม
            </button>
          )}
          {item.status === "draft" && (
            <button
              onClick={() => onApprove(item.id)}
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold transition-colors"
            >
              ส่ง Review
            </button>
          )}
          {(item.status === "done" || item.status === "generating") && (
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl border border-gray-700 text-gray-400 hover:text-gray-200 text-sm transition-colors"
            >
              ปิด
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
