const getAllDepartments = `
  SELECT d.*, c.name as company_name 
  FROM departments d 
  JOIN companies c ON d.company_id = c.id;
`;

const getDepartmentById = `
  SELECT * FROM departments WHERE id = ?;
`;

const createDepartment = `
  INSERT INTO departments (company_id, name, status) VALUES (?, ?, ?);
`;

const updateDepartment = `
  UPDATE departments SET company_id = ?, name = ?, status = ? WHERE id = ?;
`;

const deleteDepartment = `
  DELETE FROM departments WHERE id = ?;
`;

module.exports = {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment
};
