// Insert a new employee
const insertEmployeeQuery = `
  INSERT INTO employees (
    first_name, last_name, email, phone, gender,
    company_id, department_id, designation_id,
    image, password
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

// Update existing employee
const updateEmployeeQuery = `
  UPDATE employees SET
    first_name = ?, last_name = ?, email = ?, phone = ?, gender = ?,
    company_id = ?, department_id = ?, designation_id = ?, image = ?
  WHERE emp_id = ?
`;

const getEmployeeList = `
  SELECT e.emp_id, e.first_name, e.last_name, e.email, e.phone, e.status, c.company_name
  FROM employees e
  LEFT JOIN companies c ON e.company_id = c.company_id;
`

// Get all employees with related names
const getAllEmployeesQuery = `
  SELECT e.*, 
         c.company_name AS company_name,
         d.dept_name AS department_name,
         des.desgnation_name AS designation_name
  FROM employees e
  LEFT JOIN companies c ON e.company_id = c.company_id
  LEFT JOIN departments d ON e.department_id = d.department_id
  LEFT JOIN designations des ON e.designation_id = des.designation_id
  ORDER BY e.emp_id DESC
`;

// Get single employee by ID
const getEmployeeByIdQuery = `
  SELECT * FROM employees WHERE emp_id = ?
`;

// Delete employee by ID
const deleteEmployeeByIdQuery = `
  DELETE FROM employees WHERE emp_id = ?
`;

// Check if email or phone already exists
const checkEmployeeExistsQuery = `
  SELECT * FROM employees WHERE email = ? OR phone = ?
`;

module.exports = {
  insertEmployeeQuery,
  updateEmployeeQuery,
  getAllEmployeesQuery,
  getEmployeeList,
  getEmployeeByIdQuery,
  deleteEmployeeByIdQuery,
  checkEmployeeExistsQuery
};
