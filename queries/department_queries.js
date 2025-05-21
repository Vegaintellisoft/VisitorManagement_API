module.exports = {
  GET_ALL_DEPARTMENTS: `
    SELECT d.*, c.name as company_name
    FROM departments d
    JOIN companies c ON d.company_id = c.id
  `,

  GET_DEPARTMENT_BY_ID: "SELECT * FROM departments WHERE id = ?",

  CREATE_DEPARTMENT: "INSERT INTO departments (company_id, name, status) VALUES (?, ?, ?)",

  UPDATE_DEPARTMENT: "UPDATE departments SET company_id = ?, name = ?, status = ? WHERE id = ?",
};
