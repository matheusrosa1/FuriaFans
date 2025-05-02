import { FanRecord } from "./FanRecord";

export interface FanContextType {
  fans: FanRecord[];
  updateFan: (id: string, updatedFan: Partial<FanRecord>) => void;
  addFan: (newFan: FanRecord) => void;
  toggleFavorite: (fanId: string) => void;
}