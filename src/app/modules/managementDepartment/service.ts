import calculatePagination from '../../../utils/calculatePagination';
import { TGenericRes, TPagination } from '../../../interfaces/common';
import { mD_SearchableFields } from './constant';
import { TMD, TMD_Filters } from './interface';
import { SortOrder } from 'mongoose';
import { mD_Model } from './model';

const createDepartment = async (payload: TMD): Promise<TMD | null> => {
  const result = await mD_Model.create(payload);
  return result;
};

const getSingleDepartment = async (id: string): Promise<TMD | null> => {
  const result = await mD_Model.findById(id);
  return result;
};

const getAllDepartments = async (
  filters: TMD_Filters,
  paginationOptions: TPagination
): Promise<TGenericRes<TMD[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: mD_SearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Filters needs $and to fullfil all the conditions
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Dynamic  Sort needs  field to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await mD_Model
    .find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await mD_Model.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateDepartment = async (
  id: string,
  payload: Partial<TMD>
): Promise<TMD | null> => {
  const result = await mD_Model.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteDepartment = async (id: string): Promise<TMD | null> => {
  const result = await mD_Model.findByIdAndDelete(id);
  return result;
};

export const mD_Service = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
