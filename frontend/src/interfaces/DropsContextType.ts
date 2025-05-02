import { DropMessage } from "./DropMessage";

export interface DropsContextType {
  messages: DropMessage[];
  addMessage: (message: { content: string }) => void;
  toggleLike: (messageId: string, userId: string) => void;
  editMessage: (messageId: string, newContent: string) => void;
  deleteMessage: (messageId: string) => void;
}