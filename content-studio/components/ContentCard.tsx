"use client";

import StatusBadge, { ContentStatus } from "./StatusBadge";

export interface ContentItem {
  id: string;
  title: string;
  topic: string;
  contentType: "short" | "long" | "reel";
  status: ContentStatus;
  script: string;
  caption: string;
  hashtags: string[];
  createdAt: string;
  approvedBy?: string;
  videoUrl?: string;
}

const TYPE_LABEL: Record<ContentItem["contentType"], string> = {
  short: "Short Video",
  long: "Long Form",
  reel: "Reel / TikTok",
};

interface ContentCardProps {
  item: ContentItem;
  onOpen: (item: ContentItem) => void;
}

export default function ContentCard({ item, onOpen }: ContentCardProps) {
  return (
    <div
      onClick={() => onOpen(item)}
      className="bg-gray-900 border border-gray-800 rounded-xl p-4 cursor-pointer hover:border-gray-600 hover:bg-gray-800/80 transition-all group"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <h3 className="text-sm font-semibold text-gray-100 line-clamp-2 leading-snug">{item.title}</h3>
        <span className="text-xs text-gray-500 shrink-0 pt-0.5">{TYPE_LABEL[item.contentType]}</span>
      </div>

      <p className="text-xs text-gray-400 line-clamp-2 mb-3 leading-relaxed">{item.script}</p>

      {item.hashtags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {item.hashtags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs text-blue-400 bg-blue-950/50 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
          {item.hashtags.length > 3 && (
            <span className="text-xs text-gray-500">+{item.hashtags.length - 3}</span>
          )}
        </div>
      )}

      <div className="flex items-center justify-between">
        <StatusBadge status={item.status} />
        <span className="text-xs text-gray-600">{item.createdAt}</span>
      </div>
    </div>
  );
}
