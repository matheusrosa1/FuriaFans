import { Fan } from "./fan";

export interface FanContextType {
  fans: Fan[];
  updateFan: (id: string, updatedFan: Partial<Fan>) => void;
  addFan: (newFan: Fan) => void;
}