"use client";

import { useState } from "react";
import ContentCard, { ContentItem } from "@/components/ContentCard";
import CreateModal from "@/components/CreateModal";
import ContentDrawer from "@/components/ContentDrawer";
import { ContentStatus } from "@/components/StatusBadge";

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
    title: "Life Hack ทำงาน Work From Home ให้ได้ผล",
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
    title: "วิธีสร้าง Personal Brand",
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
    title: "5 เครื่องมือฟรีสำหรับ Designer",
    topic: "Design Tools",
    contentType: "reel",
    status: "rejected",
    script: `Hook: "ไม่ต้องจ่ายเงินก็ดีไซน์สวยได้!"\n\nTools: Figma, Canva, Photopea...\n\nCTA: "บุ๊คมาร์คไว้เลย!"`,
    caption: "เครื่องมือ Design ฟรีที่ Designer ทุกคนต้องมี 🎨",
    hashtags: ["Design", "Figma", "Canva", "FreeTools"],
    createdAt: "25 พ.ค.",
  },
];

type Tab = { label: string; status: ContentStatus | "all" };

const TABS: Tab[] = [
  { label: "ทั้งหมด", status: "all" },
  { label: "รอ Approve", status: "pending_review" },
  { label: "Approved", status: "approved" },
  { label: "วิดีโอ", status: "generating" },
  { label: "เสร็จ", status: "done" },
  { label: "Draft", status: "draft" },
  { label: "Rejected", status: "rejected" },
];

const TAB_ACTIVE_CLASS: Partial<Record<ContentStatus | "all", string>> = {
  all: "border-blue-500 text-blue-400",
  pending_review: "border-amber-500 text-amber-400",
  approved: "border-emerald-500 text-emerald-400",
  generating: "border-blue-500 text-blue-400",
  done: "border-purple-500 text-purple-400",
  draft: "border-gray-400 text-gray-300",
  rejected: "border-red-500 text-red-400",
};

export default function Home() {
  const [items, setItems] = useState<ContentItem[]>(MOCK_ITEMS);
  const [activeTab, setActiveTab] = useState<ContentStatus | "all">("all");
  const [showCreate, setShowCreate] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  const handleCreate = (item: ContentItem) => {
    setItems((prev) => [item, ...prev]);
    setActiveTab("pending_review");
  };

  const handleApprove = (id: string) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: "approved" as ContentStatus } : i))
    );
    setSelectedItem((prev) => (prev?.id === id ? { ...prev, status: "approved" } : prev));
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
          i.id === id
            ? { ...i, status: "done" as ContentStatus, videoUrl: "https://example.com/video/" + id }
            : i
        )
      );
    }, 5000);
  };

  const filteredItems =
    activeTab === "all" ? items : items.filter((i) => i.status === activeTab);

  const pendingCount = items.filter((i) => i.status === "pending_review").length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-gray-950/95 backdrop-blur-sm border-b border-gray-800">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-xs font-bold text-white">
              C
            </div>
            <span className="font-semibold text-gray-100 text-sm">Content Studio</span>
          </div>
          <div className="flex items-center gap-2">
            {pendingCount > 0 && (
              <button
                onClick={() => setActiveTab("pending_review")}
                className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-full"
              >
                ⏳ {pendingCount} รอ Approve
              </button>
            )}
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex overflow-x-auto gap-0 px-4 pb-0 scrollbar-hide">
          {TABS.map((tab) => {
            const count =
              tab.status === "all"
                ? items.length
                : items.filter((i) => i.status === tab.status).length;
            const isActive = activeTab === tab.status;
            return (
              <button
                key={tab.status}
                onClick={() => setActiveTab(tab.status)}
                className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-3 text-sm border-b-2 transition-colors shrink-0 ${
                  isActive
                    ? TAB_ACTIVE_CLASS[tab.status] ?? "border-blue-500 text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-300"
                }`}
              >
                {tab.label}
                {count > 0 && (
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-current/10 opacity-80" : "bg-gray-800 text-gray-500"
                    }`}
                    style={isActive ? { backgroundColor: "rgba(255,255,255,0.08)" } : {}}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Content List */}
      <main className="flex-1 px-4 py-4 pb-28 space-y-3">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-4xl mb-3">📭</div>
            <p className="text-gray-500 text-sm">ยังไม่มีรายการ</p>
            <button
              onClick={() => setShowCreate(true)}
              className="mt-4 text-blue-400 text-sm underline underline-offset-2"
            >
              สร้าง Content แรก
            </button>
          </div>
        ) : (
          filteredItems.map((item) => (
            <ContentCard key={item.id} item={item} onOpen={setSelectedItem} />
          ))
        )}
      </main>

      {/* FAB */}
      <div className="fixed bottom-6 right-4 z-30">
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-semibold px-5 py-3.5 rounded-2xl shadow-lg shadow-blue-900/40 transition-all"
        >
          <span className="text-lg leading-none">+</span>
          <span className="text-sm">สร้าง Content</span>
        </button>
      </div>

      {/* Summary bar (bottom safe area) */}
      <div className="fixed bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none" />

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
