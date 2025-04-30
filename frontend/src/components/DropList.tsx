"use client";

import { useState } from "react";
import { useDrops } from "@/contexts/DropsContext";
import { GrLike } from "react-icons/gr";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";
import { useFanProfile } from "@/contexts/FanProfileContext";

interface DropListProps {
  onlyByFanId?: string;
}

export default function DropList({ onlyByFanId }: DropListProps) {
  const { messages, toggleLike, editMessage, deleteMessage } = useDrops();
  const { fanProfile } = useFanProfile();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState<string>("");

  const filtered = onlyByFanId
    ? messages.filter((msg) => msg.fanId === onlyByFanId)
    : messages;

  return (
    <ul className="space-y-4 mt-6 w-full">
      {filtered.map((msg) => {
        const isOwnDrop = fanProfile?.id === msg.fanId;
        const hasLiked =
          fanProfile &&
          Array.isArray(msg.likedBy) &&
          msg.likedBy.includes(fanProfile.id);

        const isEditing = editingId === msg.id;

        return (
          <li key={msg.id} className="bg-white rounded-lg p-4 shadow relative">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold">{msg.author}</span>
              <span className="text-xs text-gray-400">{msg.timestamp}</span>
            </div>

            {isEditing ? (
              <div className="flex flex-col gap-2 mt-2">
                <textarea
                  className="w-full border rounded px-3 py-2 text-sm"
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      editMessage(msg.id, editInput);
                      setEditingId(null);
                    }}
                    className="text-sm px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-sm px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-800 text-sm mb-2">{msg.content}</p>
            )}

            <div className="flex items-center gap-4 mt-2">
              {/* Curtir */}
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

              {/* Ações do autor */}
              {isOwnDrop && !isEditing && (
                <div className="flex gap-2 ml-auto">
                  <button
                    onClick={() => {
                      setEditingId(msg.id);
                      setEditInput(msg.content);
                    }}
                    title="Editar"
                    className="text-gray-500 hover:text-blue-600"
                  >
                    <CiEdit size={20} />
                  </button>
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    title="Excluir"
                    className="text-gray-500 hover:text-red-600"
                  >
                    <FaRegTrashCan size={18} />
                  </button>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
