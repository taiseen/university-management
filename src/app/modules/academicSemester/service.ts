import { TGenericRes, TPagination } from '../../../interfaces/common';
import { aS_SearchableFields, aS_TitleMapper } from './constants';
import { TAS, TAS_Filter } from './interface';
import { SortOrder } from 'mongoose';
import { aS_Model } from './model';
import calculatePagination from '../../../utils/calculatePagination';
import ApiError from '../../../error/ApiError';
import httpStatus from 'http-status';

// 🟨🟨🟨🟨🟨🟨🟨🟨🟨
// academicSemester == aS
// 🟨🟨🟨🟨🟨🟨🟨🟨🟨

// create new semester
// ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
// ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
// ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
const createSemester = async (payload: TAS): Promise<TAS> => {
  //
  // checking for valid semester creating value send or not...
  if (aS_TitleMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }

  const result = await aS_Model.create(payload);

  return result;
};

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
const getSingleSemester = async (id: string): Promise<TAS | null> => {
  const result = await aS_Model.findById(id);

  return result;
};

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

const updateSemester = async (
  id: string,
  payload: Partial<TAS>
): Promise<TAS | null> => {
  // checking for valid semester creating value send or not...
  if (
    payload.title &&
    payload.code &&
    aS_TitleMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }
  const result = await aS_Model.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
const deleteSemester = async (id: string): Promise<TAS | null> => {
  const result = await aS_Model.findByIdAndDelete(id);

  return result;
};

// get documents with pagination support...
// 🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍
// 🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍
// 🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍
const getAllSemester = async (
  filters: TAS_Filter,
  paginationOption: TPagination
): Promise<TGenericRes<TAS[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  // Dynamic Searching... for [partial] match by url query
  if (searchTerm) {
    andCondition.push({
      $or: aS_SearchableFields.map(field => ({
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

  const result = await aS_Model
    .find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await aS_Model.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result, // return [array of {objects}]
  };
};

export const aS_Service = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
