const db = require('../db');
const queries = require('../queries/dropdownQueries');

// Get all active companies
exports.getCompanies = (req, res) => {
  db.query(queries.getActiveCompanies, (err, results) => {
    if (err) {
      console.error('Error fetching companies:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};

// Get active departments for active company
exports.getDepartmentsByCompany = (req, res) => {
  const { companyId } = req.body;
  db.query(queries.getDepartmentsByCompany, [companyId], (err, results) => {
    if (err) {
      console.error('Error fetching departments:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};

// Get active designations where company and department active
exports.getDesignationsByDepartment = (req, res) => {
  const { departmentId } = req.body;
  db.query(queries.getDesignationsByDepartment, [departmentId], (err, results) => {
    if (err) {
      console.error('Error fetching designations:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};

// Get active employees where company and designation active
exports.getEmployeesByDesignation = (req, res) => {
  const { designationId } = req.body;
  db.query(queries.getEmployeesByDesignation, [designationId], (err, results) => {
    if (err) {
      console.error('Error fetching employees:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};

exports.getAllPurposes = (req, res) => {
  db.query(queries.getAllPurposes, (err, results) => {
    if (err) {
      console.error('Error fetching purposes:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};


