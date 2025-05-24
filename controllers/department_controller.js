const db = require("../db");
const queries = require("../queries/department_queries");

exports.getAll = async () => {
  try {
    const [rows] = await db.promise().query(queries.getAllDepartments);
    return rows;
  } catch (error) {
    throw { status: 500, message: "Failed to fetch departments" };
  }
};

exports.getById = async (id) => {
  try {
    const [rows] = await db.promise().query(queries.getDepartmentById, [id]);
    if (rows.length === 0) throw { status: 404, message: "Department not found" };
    return rows[0];
  } catch (error) {
    throw { status: error.status || 500, message: error.message || "Internal server error" };
  }
};

exports.create = async (company_id, name, status) => {
  try {
    const [result] = await db.promise().query(queries.createDepartment, [company_id, name, status]);
    return { id: result.insertId, company_id, name, status };
  } catch (error) {
    throw { status: 500, message: "Failed to create department" };
  }
};

exports.update = async (id, company_id, name, status) => {
  try {
    const [result] = await db.promise().query(queries.updateDepartment, [company_id, name, status, id]);
    if (result.affectedRows === 0) throw { status: 404, message: "Department not found" };
    return { id, company_id, name, status };
  } catch (error) {
    throw { status: error.status || 500, message: error.message || "Failed to update department" };
  }
};

exports.delete = async (id) => {
  try {
    const [result] = await db.promise().query(queries.deleteDepartment, [id]);
    if (result.affectedRows === 0) throw { status: 404, message: "Department not found" };
    return { message: "Department deleted" };
  } catch (error) {
    throw { status: error.status || 500, message: error.message || "Failed to delete department" };
  }
};
