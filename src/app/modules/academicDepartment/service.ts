import calculatePagination from '../../../utils/calculatePagination';
import { TGenericRes, TPagination } from '../../../interfaces/common';
import { aD_SearchableFields } from './constants';
import { TAD, TAD_Filter } from './interface';
import { SortOrder } from 'mongoose';
import { aD_Model } from './model';

// 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨
// academicDepartment == aD
// 🟨🟨🟨🟨🟨🟨🟨🟨🟨🟨

// create new Department
// ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
// ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
// ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
const createDepartment = async (payload: TAD): Promise<TAD> => {
  const result = (await aD_Model.create(payload)).populate('academicFaculty');

  return result;
};

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
const getSingleDepartment = async (id: string): Promise<TAD | null> => {
  const result = await aD_Model.findById(id).populate('academicFaculty');

  return result;
};

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

const updateDepartment = async (
  id: string,
  payload: Partial<TAD>
): Promise<TAD | null> => {
  const result = await aD_Model
    .findOneAndUpdate({ _id: id }, payload, {
      new: true,
    })
    .populate('academicFaculty');
  return result;
};

// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
// 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
const deleteDepartment = async (id: string): Promise<TAD | null> => {
  const result = await aD_Model.findByIdAndDelete(id);

  return result;
};

// get documents with pagination support...
// 🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍
// 🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍
// 🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔎🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍🔍
const getAllDepartment = async (
  filters: TAD_Filter,
  paginationOption: TPagination
): Promise<TGenericRes<TAD[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];

  // Dynamic Searching... for [partial] match by url query
  if (searchTerm) {
    andCondition.push({
      $or: aD_SearchableFields.map(field => ({
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

  const result = await aD_Model
    .find(whereCondition)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await aD_Model.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result, // return [array of {objects}]
  };
};

export const aD_Service = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
