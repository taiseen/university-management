/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-dgetAllFacultiesisable @typescript-eslint/no-explicit-any */
import { TGenericRes, TPagination } from '../../../interfaces/common';
import { TFaculty, TFacultyFilters } from './interface';
import { facultySearchableFields } from './constant';
import { userModel } from '../user/model';
import { facultyModel } from './model';
import calculatePagination from '../../../utils/calculatePagination';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../error/ApiError';
import httpStatus from 'http-status';

const getSingleFaculty = async (id: string): Promise<TFaculty | null> => {
  const result = await facultyModel
    .findOne({ id })
    .populate('academicDepartment')
    .populate('academicFaculty');

  return result;
};

const getAllFaculties = async (
  filters: TFacultyFilters,
  paginationOptions: TPagination
): Promise<TGenericRes<TFaculty[]>> => {
  // Extract searchTerm to implement search query
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const andConditions = [];

  // Search needs $or for searching in specified fields
  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Filters needs $and to fullfill all the conditions
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

  const result = await facultyModel
    .find(whereConditions)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await facultyModel.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updateFaculty = async (
  id: string,
  payload: Partial<TFaculty>
): Promise<TFaculty | null> => {
  const isExist = await facultyModel.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const { name, ...facultyData } = payload;
  const updatedFacultyData: Partial<TFaculty> = { ...facultyData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<TFaculty>;
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await facultyModel.findOneAndUpdate(
    { id },
    updatedFacultyData,
    {
      new: true,
    }
  );
  return result;
};

const deleteFaculty = async (id: string): Promise<TFaculty | null> => {
  // check if the faculty is exist
  const isExist = await facultyModel.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //delete faculty first
    const faculty = await facultyModel.findOneAndDelete({ id }, { session });

    if (!faculty) {
      throw new ApiError(404, 'Failed to delete student');
    }

    //delete user
    await userModel.deleteOne({ id });

    session.commitTransaction();
    session.endSession();

    return faculty;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};

export const facultyService = {
  getSingleFaculty,
  getAllFaculties,
  updateFaculty,
  deleteFaculty,
};
