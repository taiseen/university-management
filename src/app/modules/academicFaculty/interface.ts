import { Model } from 'mongoose';

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// Type == T
// Academic Faculty == AF
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

export type TAF = { title: string };

export type TAF_Filter = { searchTerm?: string };

// 🟢🟢🟢 Create a new Model 🟢🟢🟢
export type TAF_Model = Model<TAF, Record<string, unknown>>;
