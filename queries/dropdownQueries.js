// queries/dropdownQueries.js
// Get only active companies
const getActiveCompanies = `
  SELECT company_id, company_name 
  FROM companies 
  WHERE status = 'Active'
`;

// Get active departments by active company
const getDepartmentsByCompany = `
  SELECT d.department_id, d.dept_name
  FROM departments d
  JOIN companies c ON d.company_id = c.company_id
  WHERE d.company_id = ? AND c.status = 'Active' AND d.status = 'Active'
`;

// Get active designations by department where company is active
const getDesignationsByDepartment = `
  SELECT des.designation_id, des.desgnation_name
  FROM designations des
  JOIN departments d ON des.department_id = d.department_id
  JOIN companies c ON des.company_id = c.company_id
  WHERE des.department_id = ? AND c.status = 'Active' AND des.status = 'Active' AND d.status = 'Active'
`;

// Get active employees by designation where company is active
const getEmployeesByDesignation = `
  SELECT e.emp_id as emp_id, CONCAT(e.first_name, ' ', e.last_name) as emp_name
  FROM employees e
  JOIN designations des ON e.designation_id = des.designation_id
  JOIN companies c ON e.company_id = c.company_id
  WHERE e.designation_id = ? AND c.status = 'Active' AND e.status = 'Active' AND des.status = 'Active'
`;

module.exports = {
 getEmployeesByDesignation,
 getDesignationsByDepartment,
 getDepartmentsByCompany,
 getActiveCompanies
};
 // Query to fetch all active companies
  // getActiveCompanies: 'SELECT company_id, company_name FROM companies WHERE status = "Active"',
  
  // // Query to fetch departments based on company ID
  // getDepartmentsByCompany: `
  //   SELECT department_id, dept_name 
  //   FROM departments 
  //   WHERE company_id = ? AND status = "Active"
  // `,

  // // Query to fetch designations based on department ID
  // getDesignationsByDepartment: `
  //   SELECT designation_id, desgnation_name 
  //   FROM designations 
  //   WHERE department_id = ? AND status = "Active"
  // `,

  // // Query to fetch employees based on designation ID
  // getEmployeesByDesignation: `
  //   SELECT emp_id, CONCAT(first_name, ' ', last_name) AS emp_name
  //   FROM employees 
  //   WHERE designation_id = ? AND status = "Active"
  // `