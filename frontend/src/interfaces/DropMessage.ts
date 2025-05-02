import { FanRecord } from "./FanRecord";

export interface DropMessage {
  id: string;
  author: FanRecord["nickname"] | string;
  content: string;
  timestamp: string;
  likedBy: string[];
  fanId: FanRecord["id"]
}