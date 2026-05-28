"use client";

import { useState } from "react";
import { ContentItem } from "./ContentCard";

interface CreateModalProps {
  onClose: () => void;
  onCreate: (item: ContentItem) => void;
}

const CONTENT_TYPES = [
  { value: "reel", label: "Reel / TikTok", desc: "15-60 วินาที เน้น hook แรง", icon: "▶" },
  { value: "short", label: "Short Video", desc: "1-3 นาที เล่าเรื่องสั้น", icon: "🎬" },
  { value: "long", label: "Long Form", desc: "5+ นาที เนื้อหาลึก", icon: "📺" },
];

const TOPIC_SUGGESTIONS = [
  "เทรนด์ AI ปี 2025", "วิธีเพิ่มยอดขายออนไลน์", "Life Hack ชีวิตประจำวัน",
  "รีวิวผลิตภัณฑ์", "How-to Tutorial", "Behind the scenes"
];

export default function CreateModal({ onClose, onCreate }: CreateModalProps) {
  const [topic, setTopic] = useState("");
  const [contentType, setContentType] = useState<ContentItem["contentType"]>("reel");
  const [tone, setTone] = useState("casual");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);

    // Simulate Claude generating content (2 sec delay for demo)
    await new Promise((r) => setTimeout(r, 2000));

    const mockItem: ContentItem = {
      id: Date.now().toString(),
      title: `${topic} — ${CONTENT_TYPES.find(t => t.value === contentType)?.label}`,
      topic,
      contentType,
      status: "pending_review",
      script: `Hook: "คุณรู้ไหมว่า ${topic} กำลังเปลี่ยนทุกอย่าง?"\n\nBody: เนื้อหาหลักเกี่ยวกับ${topic} ที่น่าสนใจและให้คุณค่ากับผู้ชม โดยเน้น pain point ที่คนส่วนใหญ่เจอ และวิธีแก้ปัญหาที่ได้ผลจริง\n\nCTA: "กด Like ถ้าชอบ และ Follow เพื่อไม่ให้พลาดคอนเทนท์ดีๆ แบบนี้!"`,
      caption: `${topic} เรื่องที่คุณต้องรู้! 🔥 มาดูกันว่าทำไมถึงสำคัญมากในปี 2025`,
      hashtags: ["content", topic.replace(/\s+/g, ""), "viral", "trending", "thailand"],
      createdAt: new Date().toLocaleDateString("th-TH", { day: "2-digit", month: "short" }),
    };

    setIsGenerating(false);
    onCreate(mockItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-lg shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <div>
            <h2 className="text-lg font-semibold text-white">สร้าง Content ใหม่</h2>
            <p className="text-xs text-gray-500 mt-0.5">Claude จะสร้าง script + caption ให้อัตโนมัติ</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300 text-xl leading-none">✕</button>
        </div>

        <div className="p-5 space-y-5">
          {/* Topic */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">หัวข้อ / Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="เช่น วิธีใช้ AI เพื่อเพิ่มยอดขาย..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {TOPIC_SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setTopic(s)}
                  className="text-xs text-gray-400 bg-gray-800 hover:bg-gray-700 border border-gray-700 px-2.5 py-1 rounded-full transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Content Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">รูปแบบ</label>
            <div className="grid grid-cols-3 gap-2">
              {CONTENT_TYPES.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setContentType(type.value as ContentItem["contentType"])}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    contentType === type.value
                      ? "border-blue-500 bg-blue-950/50 text-blue-300"
                      : "border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600"
                  }`}
                >
                  <div className="text-lg mb-1">{type.icon}</div>
                  <div className="text-xs font-medium">{type.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-tight">{type.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Tone */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">โทนเนื้อหา</label>
            <div className="flex gap-2">
              {["casual", "professional", "funny", "educational"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all ${
                    tone === t
                      ? "border-purple-500 bg-purple-950/50 text-purple-300"
                      : "border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-600"
                  }`}
                >
                  {t === "casual" ? "สบายๆ" : t === "professional" ? "มืออาชีพ" : t === "funny" ? "ฮา" : "สอน"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-800 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-700 text-sm text-gray-400 hover:text-gray-200 hover:border-gray-600 transition-colors"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleGenerate}
            disabled={!topic.trim() || isGenerating}
            className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 text-sm font-semibold text-white transition-all flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Claude กำลังสร้าง...
              </>
            ) : (
              <>✨ สร้าง Content</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
