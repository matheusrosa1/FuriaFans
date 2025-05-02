import { Fan } from "./fan";

export interface DropMessage {
  id: string;
  author: Fan["nickname"] | string;
  content: string;
  timestamp: string;
  likedBy: string[];
  fanId: Fan["id"]
}