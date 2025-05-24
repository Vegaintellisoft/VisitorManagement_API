
const getAllCompanies = `
  SELECT * FROM companies WHERE status = 'active';
`;

const getCompanyById = `
 SELECT * FROM companies WHERE id = ? AND status = 'active';
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

