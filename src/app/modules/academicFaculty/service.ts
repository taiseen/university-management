import { TGenericRes, TPagination } from '../../../interfaces/common';
import { aF_SearchableFields } from './constants';
import { TAF, TAF_Filter } from './interface';
import { SortOrder } from 'mongoose';
import { aF_Model } from './model';
import calculatePagination from '../../../utils/calculatePagination';

// 🟨🟨🟨🟨🟨🟨🟨🟨🟨
// academicFaculty == aF
// 🟨🟨🟨🟨🟨🟨🟨🟨🟨

// create new Faculty
// ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
// ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
// ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
const createFaculty = async (payload: TAF): Promise<TAF> => {
  const result = await aF_Model.create(payload);

  return result;
};

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
const getSingleFaculty = async (id: string): Promise<TAF | null> => {
  const result = await aF_Model.findById(id);

  return result;
};

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

const updateFaculty = async (
  id: string,
  payload: Partial<TAF>
): Promise<TAF | null> => {
  const result = await aF_Model.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
const deleteFaculty = async (id: string): Promise<TAF | null> => {
  const result = await aF_Model.findByIdAndDelete(id);

  return result;
};

// get documents with pagination support...
// 🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍
// 🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍
// 🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍
const getAllFaculty = async (
  filters: TAF_Filter,
  paginationOption: TPagination
): Promise<TGenericRes<TAF[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  // Dynamic Searching... for [partial] match by url query
  if (searchTerm) {
    andCondition.push({
      $or: aF_SearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Dynamic Filtering... for [exact] match by url query
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([key, value]) => ({
        [key]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOption);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // with filter or without filtering data passing check...
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await aF_Model
    .find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await aF_Model.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result, // return [array of {objects}]
  };
};

export const aF_Service = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
