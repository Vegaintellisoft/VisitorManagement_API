// module.exports = {
//   GET_ALL_COMPANIES: "SELECT * FROM companies",

//   GET_COMPANY_BY_ID: "SELECT * FROM companies WHERE id = ?",

//   CREATE_COMPANY: "INSERT INTO companies (name, status) VALUES (?, ?)",

//   UPDATE_COMPANY: "UPDATE companies SET name = ?, status = ? WHERE id = ?",
// };

// queries/company_query.js

const getAllCompanies = `
  SELECT * FROM companies;
`;

const getCompanyById = `
  SELECT * FROM companies WHERE id = ?;
`;

const createCompany = `
  INSERT INTO companies (name, status) VALUES (?, ?);
`;

const updateCompany = `
  UPDATE companies SET name = ?, status = ? WHERE id = ?;
`;

const deleteCompany = `
  DELETE FROM companies WHERE id = ?;
`;

module.exports = {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany
};

