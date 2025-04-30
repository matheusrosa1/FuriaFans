"use client";

import { useDrops } from "@/contexts/DropsContext";
import { GrLike } from "react-icons/gr";
import { useFanProfile } from "@/contexts/FanProfileContext";

interface DropListProps {
  onlyByFanId?: string;
}

export default function DropList({ onlyByFanId }: DropListProps) {
  const { messages, toggleLike } = useDrops();
  const { fanProfile } = useFanProfile();

  const filtered = onlyByFanId
    ? messages.filter((msg) => msg.fanId === onlyByFanId)
    : messages;

  return (
    <ul className="space-y-4 mt-6">
      {filtered.map((msg) => {
        const hasLiked =
          fanProfile &&
          Array.isArray(msg.likedBy) &&
          msg.likedBy.includes(fanProfile.id);

        return (
          <li key={msg.id} className="bg-white rounded-lg p-4 shadow">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold">{msg.author}</span>
              <span className="text-xs text-gray-400">{msg.timestamp}</span>
            </div>
            <p className="text-gray-800 text-sm mb-2">{msg.content}</p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => fanProfile && toggleLike(msg.id, fanProfile.id)}
                disabled={!fanProfile}
                className={`flex items-center gap-1 text-sm font-medium transition ${
                  hasLiked ? "text-purple-600" : "text-gray-500"
                } hover:text-purple-700`}
                aria-label="Curtir mensagem"
              >
                <GrLike className="text-lg" />
                <span>{Array.isArray(msg.likedBy) ? msg.likedBy.length : 0}</span>
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
