"use client";

import { useState } from "react";
import ContentCard, { ContentItem } from "@/components/ContentCard";
import CreateModal from "@/components/CreateModal";
import ContentDrawer from "@/components/ContentDrawer";
import StatusBadge, { ContentStatus } from "@/components/StatusBadge";

const MOCK_ITEMS: ContentItem[] = [
  {
    id: "1",
    title: "5 วิธีใช้ AI เพิ่มยอดขาย — Reel",
    topic: "AI เพิ่มยอดขาย",
    contentType: "reel",
    status: "pending_review",
    script: `Hook: "คุณรู้ไหมว่า AI ช่วยเพิ่มยอดขายได้ 300% จริงๆ?"\n\nBody: วิธีที่ 1 ใช้ AI เขียน caption... วิธีที่ 2 ใช้ AI วิเคราะห์ลูกค้า...\n\nCTA: "กด Save เก็บไว้ใช้เลย!"`,
    caption: "AI เปลี่ยนเกมธุรกิจออนไลน์ได้จริงๆ 🚀 ลองแล้วยอดขายพุ่ง!",
    hashtags: ["AI", "ขายออนไลน์", "เทคโนโลยี", "SME", "Thailand"],
    createdAt: "28 พ.ค.",
  },
  {
    id: "2",
    title: "Life Hack ทำงาน Work From Home ให้ได้ผล — Short",
    topic: "Work From Home",
    contentType: "short",
    status: "approved",
    script: `Hook: "ทำ WFH มา 1 ปีแล้วยังไม่ได้ผล? นี่คือปัญหาของคุณ"\n\nBody: ปัญหาหลักคือ... วิธีแก้คือ...\n\nCTA: "คอมเมนต์บอกว่าคุณทำ WFH ที่ไหน"`,
    caption: "WFH ให้ Productive ต้องทำแบบนี้! ✅",
    hashtags: ["WorkFromHome", "ProductivityTips", "LifeHack"],
    createdAt: "27 พ.ค.",
    approvedBy: "ผู้จัดการ",
  },
  {
    id: "3",
    title: "รีวิว ChatGPT vs Claude — Long Form",
    topic: "เปรียบ AI",
    contentType: "long",
    status: "done",
    script: `Intro: ในปี 2025 มี AI เยอะมาก แต่ตัวไหนดีที่สุด?\n\nComparison: ChatGPT ดีในเรื่อง... Claude ดีในเรื่อง...\n\nConclusion: สรุปแล้วขึ้นอยู่กับ use case ของคุณ`,
    caption: "ChatGPT vs Claude ใครเก่งกว่า? เปรียบแบบตรงๆ 🤖",
    hashtags: ["AI", "ChatGPT", "Claude", "Tech", "Review"],
    createdAt: "26 พ.ค.",
    videoUrl: "https://example.com/video/3",
  },
  {
    id: "4",
    title: "เทรนด์ Social Media 2025 — Reel",
    topic: "Social Media Trends",
    contentType: "reel",
    status: "generating",
    script: `Hook: "เทรนด์ Social Media 2025 มาแล้ว คุณพร้อมยัง?"\n\nTrends: Short form video ยังแรง... AI content กำลังบูม...\n\nCTA: "Follow เพื่อไม่พลาดเทรนด์ล่าสุด"`,
    caption: "เทรนด์ 2025 ที่ทุก Content Creator ต้องรู้! 📱",
    hashtags: ["SocialMedia", "Trends2025", "ContentCreator", "Digital"],
    createdAt: "28 พ.ค.",
  },
  {
    id: "5",
    title: "วิธีสร้าง Personal Brand — Short",
    topic: "Personal Branding",
    contentType: "short",
    status: "draft",
    script: `Hook: "คนที่มี Personal Brand แข็งแกร่งหาเงินได้ง่ายกว่าคนอื่น"\n\nSteps: ขั้นที่ 1 กำหนด niche... ขั้นที่ 2 สร้าง content สม่ำเสมอ...\n\nCTA: "แชร์ให้คนที่อยากสร้าง brand"`,
    caption: "สร้าง Personal Brand ในปี 2025 ทำได้เลย! 💪",
    hashtags: ["PersonalBrand", "Marketing", "Success"],
    createdAt: "28 พ.ค.",
  },
  {
    id: "6",
    title: "5 เครื่องมือฟรีสำหรับ Designer — Reel",
    topic: "Design Tools",
    contentType: "reel",
    status: "rejected",
    script: `Hook: "ไม่ต้องจ่ายเงินก็ดีไซน์สวยได้!"\n\nTools: Figma, Canva, Photopea...\n\nCTA: "บุ๊คมาร์คไว้เลย!"`,
    caption: "เครื่องมือ Design ฟรีที่ Designer ทุกคนต้องมี 🎨",
    hashtags: ["Design", "Figma", "Canva", "FreeTools"],
    createdAt: "25 พ.ค.",
  },
];

const COLUMNS: { status: ContentStatus; color: string }[] = [
  { status: "draft", color: "border-gray-700" },
  { status: "pending_review", color: "border-amber-700/50" },
  { status: "approved", color: "border-emerald-700/50" },
  { status: "generating", color: "border-blue-700/50" },
  { status: "done", color: "border-purple-700/50" },
  { status: "rejected", color: "border-red-900/50" },
];

export default function Home() {
  const [items, setItems] = useState<ContentItem[]>(MOCK_ITEMS);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  const handleCreate = (item: ContentItem) => {
    setItems((prev) => [item, ...prev]);
  };

  const handleApprove = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "approved" as ContentStatus } : i))
    );
    setSelectedItem((prev) => (prev && prev.id === id ? { ...prev, status: "approved" } : prev));
  };

  const handleReject = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "rejected" as ContentStatus } : i))
    );
    setSelectedItem(null);
  };

  const handleGenerateVideo = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "generating" as ContentStatus } : i))
    );
    setSelectedItem(null);

    setTimeout(() => {
      setItems((prev) =>
        prev.map((i) =>
          i.id === id ? { ...i, status: "done" as ContentStatus, videoUrl: "https://example.com/video/" + id } : i
        )
      );
    }, 5000);
  };

  const pendingCount = items.filter((i) => i.status === "pending_review").length;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Topbar */}
      <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm font-bold text-white">
              C
            </div>
            <span className="font-semibold text-gray-100">Content Studio</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3 text-sm">
              <span className="text-gray-500">{items.length} รายการ</span>
              {pendingCount > 0 && (
                <span className="bg-amber-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                  {pendingCount} รอ Approve
                </span>
              )}
            </div>
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
            >
              + สร้าง Content
            </button>
          </div>
        </div>
      </header>

      {/* Kanban Board */}
      <main className="flex-1 overflow-x-auto p-5">
        <div className="flex gap-4 min-w-max h-full pb-4">
          {COLUMNS.map((col) => {
            const colItems = items.filter((i) => i.status === col.status);
            return (
              <div key={col.status} className="w-72 flex-shrink-0 flex flex-col">
                <div className={`flex items-center justify-between mb-3 pb-3 border-b ${col.color}`}>
                  <StatusBadge status={col.status} />
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">
                    {colItems.length}
                  </span>
                </div>
                <div className="space-y-3 flex-1">
                  {colItems.length === 0 ? (
                    <div className="text-center py-10 text-gray-700 text-sm border border-dashed border-gray-800 rounded-xl">
                      ว่างอยู่
                    </div>
                  ) : (
                    colItems.map((item) => (
                      <ContentCard key={item.id} item={item} onOpen={setSelectedItem} />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {showCreate && (
        <CreateModal onClose={() => setShowCreate(false)} onCreate={handleCreate} />
      )}
      {selectedItem && (
        <ContentDrawer
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onApprove={handleApprove}
          onReject={handleReject}
          onGenerateVideo={handleGenerateVideo}
        />
      )}
    </div>
  );
}
