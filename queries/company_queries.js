const getAllCompanies = `
  SELECT * FROM companies where visibility = true;
`;

const getActiveCompanies = `
  SELECT * FROM companies WHERE status = 'Active' AND visibility = true;
`;

const getCompanyById = `
 SELECT * FROM companies WHERE company_id = ? AND status = 'Active' AND visibility = true;
`;

const createCompany = `
  INSERT INTO companies (company_name, status) VALUES (?, ?);
`;

const updateCompany = `
  UPDATE companies SET company_name = ?, status = ? WHERE company_id = ?;
`;

const deleteCompany = `
  UPDATE companies SET visibility = false WHERE company_id = ?;
`;

module.exports = {
  getAllCompanies,
  getActiveCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany
};

