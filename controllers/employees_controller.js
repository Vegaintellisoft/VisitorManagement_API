const bcrypt = require('bcrypt');
const db = require('../db'); // adjust path as needed
const {
  insertEmployeeQuery,
  updateEmployeeQuery,
  getAllEmployeesQuery,
  getEmployeeByIdQuery,
  deleteEmployeeByIdQuery,
  checkEmployeeExistsQuery,
  getEmployeeList
} = require('../queries/employees_queries');

// Add new employee
exports.addEmployee = async (req, res) => {
  const {
    first_name, last_name, email, phone, gender,
    company, department, designation, password,role, joining_date,remarks, status
  } = JSON.parse(req.body.jsondata);
  // console.log("add employee controller:",req.file)
  if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

  const image = req.file ? req.file.filename : null;

  try {
    // Check if email or phone already exists
    db.query(checkEmployeeExistsQuery, [email, phone], async (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      if (result.length > 0) {
        return res.status(400).json({ message: 'Email or Phone already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        insertEmployeeQuery,
        [first_name, last_name, email, phone, gender, company, department, designation, image, hashedPassword, role, joining_date, remarks, status],
        (err, result) => {
          // console.log("insertion response",result)
          if (err) return res.status(500).json({ error: err.message });
          res.status(201).json({ message: 'Employee added successfully', emp_id: result.insertId });
        }
      );
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  const emp_id = req.params.id;
  const updates = JSON.parse(req.body.jsondata);
  if (req.file){
      updates["image"] = req.file.filename
  }
  if (!Object.keys(updates).length) {
      return res.status(400).json({ error: 'No fields provided for update' });
    }
  const fields = Object.keys(updates).map((key) => `${key} = ?`).join(', ');
  const values = Object.values(updates);
  try{
    await db.promise().query(`UPDATE employees SET ${fields} WHERE emp_id = ?`, [...values, emp_id]);
    res.status(201).json({ message: 'Employee updated successfully'});
  }catch(error){
      console.error("Database Error:", error.message);
      throw ({ status:500 , message:"Database operation failed"});
  }
};

// Get all employees
exports.getAllEmployees = (req, res) => {
  db.query(getAllEmployeesQuery, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.listEmployees = (req, res) =>{
  db.query(getEmployeeList, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
}

// Get employee by ID
exports.getEmployeeById = (req, res) => {
  const emp_id = req.params.id;
  db.query(getEmployeeByIdQuery, [emp_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(result[0]);
  });
};

// Delete employee
exports.deleteEmployee = (req, res) => {
  const emp_id = req.params.id;
  db.query(deleteEmployeeByIdQuery, [emp_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Employee deleted successfully' });
  });
};
