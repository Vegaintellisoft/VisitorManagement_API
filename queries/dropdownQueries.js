// queries/dropdownQueries.js

module.exports = {
  // Query to fetch all active companies
  getActiveCompanies: 'SELECT id, name FROM companies WHERE status = "Active"',
  
  // Query to fetch departments based on company ID
  getDepartmentsByCompany: `
    SELECT id, name 
    FROM departments 
    WHERE company_id = ? AND status = "Active"
  `,

  // Query to fetch designations based on department ID
  getDesignationsByDepartment: `
    SELECT id, name 
    FROM designations 
    WHERE department_id = ? AND status = "Active"
  `,

  // Query to fetch employees based on designation ID
  getEmployeesByDesignation: `
    SELECT id, CONCAT(first_name, ' ', last_name) AS name
    FROM employees 
    WHERE designation_id = ? AND status = "Active"
  `
};
