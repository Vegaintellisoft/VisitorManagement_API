const departmentQueries = require('../queries/department_queries');
const db = require("../db");

const getAll = async () => {
  try {
    return await departmentQueries.getAllDepartments();
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  try {
    const department = await departmentQueries.getDepartmentById(id);
    if (!department) {
      const error = new Error('Department not found');
      error.status = 404;
      throw error;
    }
    return department;
  } catch (error) {
    throw error;
  }
};

const create = async (company_id, name, status) => {
  try {
    const id = await departmentQueries.createDepartment(company_id, name, status);
    return { id };
  } catch (error) {
    throw error;
  }
};

const update = async (id, company_id, name, status) => {
  try {
    await departmentQueries.updateDepartment(id, company_id, name, status);
    return { message: 'Department updated' };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
