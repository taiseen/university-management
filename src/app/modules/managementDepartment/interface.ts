import { Model } from 'mongoose';

export type TMD = {
  title: string;
};

export type TMD_Model = Model<TMD, Record<string, unknown>>;

export type TMD_Filters = {
  searchTerm?: string;
};
