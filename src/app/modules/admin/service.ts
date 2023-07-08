import calculatePagination from '../../../utils/calculatePagination';
import ApiError from '../../../error/ApiError';
import mongoose, { SortOrder } from 'mongoose';
import httpStatus from 'http-status';
import { TGenericRes, TPagination } from '../../../interfaces/common';
import { TAdmin, TAdminFilters } from './interface';
import { adminSearchableFields } from './constant';
import { userModel } from '../user/model';
import { admin_Model } from './model';

const getSingleAdmin = async (id: string): Promise<TAdmin | null> => {
  const result = await admin_Model
    .findOne({ id })
    .populate('managementDepartment');
  return result;
};

const getAllAdmins = async (
  filters: TAdminFilters,
  paginationOptions: TPagination
): Promise<TGenericRes<TAdmin[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: adminSearchableFields.map(field => ({
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

  // Dynamic sort needs  fields to  do sorting
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // If there is no condition , put {} to give all data
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await admin_Model
    .find(whereConditions)
    .populate('managementDepartment')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await admin_Model.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateAdmin = async (
  id: string,
  payload: Partial<TAdmin>
): Promise<TAdmin | null> => {
  const isExist = await admin_Model.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found !');
  }

  const { name, ...adminData } = payload;

  const updatedStudentData: Partial<TAdmin> = { ...adminData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<TAdmin>;
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await admin_Model.findOneAndUpdate(
    { id },
    updatedStudentData,
    {
      new: true,
    }
  );
  return result;
};

const deleteAdmin = async (id: string): Promise<TAdmin | null> => {
  // check if the faculty is exist
  const isExist = await admin_Model.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //delete student first
    const student = await admin_Model.findOneAndDelete({ id }, { session });

    if (!student) {
      throw new ApiError(404, 'Failed to delete student');
    }

    //delete user
    await userModel.deleteOne({ id });

    session.commitTransaction();
    session.endSession();

    return student;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};

export const admin_Service = {
  getSingleAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin,
};
