const db = require("../db");
const queries = require("../queries/company_query");

exports.getAll = async () => {
  try {
    const [rows] = await db.promise().query(queries.GET_ALL_COMPANIES);
    return rows;
  } catch (error) {
    throw { status: 500, message: "Failed to fetch companies" };
  }
};

exports.getById = async (id) => {
  try {
    const [rows] = await db.promise().query(queries.GET_COMPANY_BY_ID, [id]);
    if (rows.length === 0) {
      throw { status: 404, message: 'Company not found' };
    }
    return rows[0];
  } catch (error) {
    // Propagate the error with status and message
    throw { status: error.status || 500, message: error.message || 'Internal server error' };
  }
};

exports.create = async (name, status) => {
  try {
    const [result] = await db.promise().query(queries.CREATE_COMPANY, [name, status]);
    return { id: result.insertId, name, status };
  } catch (error) {
    throw { status: 500, message: "Failed to create company" };
  }
};

exports.update = async (id, name, status) => {
  try {
    const [result] = await db.promise().query(queries.UPDATE_COMPANY, [name, status, id]);
    if (result.affectedRows === 0) throw { status: 404, message: "Company not found" };
    return { id, name, status };
  } catch (error) {
    if (error.status) throw error;
    throw { status: 500, message: "Failed to update company" };
  }
};
