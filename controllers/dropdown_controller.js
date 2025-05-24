// controllers/dropdownController.js
const db = require('../db');
const queries = require('../queries/dropdownQueries');

// Controller to get all active companies
exports.getCompanies = (req, res) => {
  db.query(queries.getActiveCompanies, (err, results) => {
    if (err) {
      console.error('Error fetching companies:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};

// Controller to get departments based on company ID
exports.getDepartmentsByCompany = (req, res) => {
  const { companyId } = req.body;  // Accessing companyId from request body

  db.query(queries.getDepartmentsByCompany, [companyId], (err, results) => {
    if (err) {
      console.error('Error fetching departments:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};

// Controller to get designations based on department ID
exports.getDesignationsByDepartment = (req, res) => {
  const { departmentId } = req.body;  // Accessing departmentId from request body

  db.query(queries.getDesignationsByDepartment, [departmentId], (err, results) => {
    if (err) {
      console.error('Error fetching designations:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};

// Controller to get employees based on designation ID
exports.getEmployeesByDesignation = (req, res) => {
  const { designationId } = req.body;  // Accessing designationId from request body

  db.query(queries.getEmployeesByDesignation, [designationId], (err, results) => {
    if (err) {
      console.error('Error fetching employees:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};
