const getAllDepartments = `
  SELECT d.*, c.name as company_name 
  FROM departments d 
  JOIN companies c ON d.company_id = c.id
  WHERE visibility=true;
`;

const getDepartmentByCompany = `
  SELECT d.*
  FROM departments d 
  JOIN companies c ON d.company_id = c.id
  WHERE c.id = ? AND visibility=true;
`

const getDepartmentById = `
  SELECT * FROM departments WHERE department_id = ? AND visibility=true;
`;

const createDepartment = `
  INSERT INTO departments (company_id, depart_name, status) VALUES (?, ?, ?);
`;

const updateDepartment = `
  UPDATE departments SET company_id = ?, name = ?, status = ? WHERE id = ?;
`;

const deleteDepartment = `
  UPDATE departments SET visibility=false WHERE department_id=?;
`;

module.exports = {
  getAllDepartments,
  getDepartmentByCompany,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment
};
