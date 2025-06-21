const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employees_controller');
const upload = require('../utils/upload'); // multer middleware
const authenticateToken = require('../utils/authenticateToken') // authentication middleware
// const express = require('express');
// const router = express.Router();
// const employeeController = require('../controllers/employees_controller');
// const upload = require('../utils/upload'); // multer middleware

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Employee management APIs
 */

/**
 * @swagger
 * /employees/add_employee:
 *   post:
 *     summary: Add a new employee
 *     tags: [Employees]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               gender:
 *                 type: string
 *               company_id:
 *                 type: integer
 *               department_id:
 *                 type: integer
 *               designation_id:
 *                 type: integer
 *               password:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Employee added successfully
 *       400:
 *         description: Email or phone already exists
 *       500:
 *         description: Server error
 */
router.post('/add_employee', authenticateToken, upload.single('image'), employeeController.addEmployee);

/**
 * @swagger
 * /employees/update_employee/{id}:
 *   put:
 *     summary: Update an employee by ID
 *     tags: [Employees]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               gender:
 *                 type: string
 *               company_id:
 *                 type: integer
 *               department_id:
 *                 type: integer
 *               designation_id:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       500:
 *         description: Server error
 */
router.patch('/update_employee/:id', authenticateToken, upload.single('image'), employeeController.updateEmployee);

/**
 * @swagger
 * /employees/get_all_employee:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: List of employees
 *       500:
 *         description: Server error
 */
router.get('/get_all_employee', authenticateToken, employeeController.getAllEmployees);

/**
 * @swagger
 * /list_employees:
 *   get:
 *     summary: Get the list of all employees with their company name
 *     tags:
 *       - Employees
 *     responses:
 *       200:
 *         description: List of employees retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   emp_id:
 *                     type: integer
 *                     example: 101
 *                   first_name:
 *                     type: string
 *                     example: John
 *                   last_name:
 *                     type: string
 *                     example: Doe
 *                   email:
 *                     type: string
 *                     example: john.doe@example.com
 *                   phone:
 *                     type: string
 *                     example: "+1-555-1234"
 *                   status:
 *                     type: string
 *                     example: Active
 *                   company_name:
 *                     type: string
 *                     example: ABC Corp
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

router.get('/list_employees',authenticateToken, employeeController.listEmployees);


/**
 * @swagger
 * /employees/get_emp_id/{id}:
 *   get:
 *     summary: Get employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee data
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Server error
 */
router.get('/get_emp_id/:id',authenticateToken, employeeController.getEmployeeById);

/**
 * @swagger
 * /employees/delete_emp_id/{id}:
 *   delete:
 *     summary: Delete employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       500:
 *         description: Server error
 */
router.delete('/delete_emp_id/:id', authenticateToken, employeeController.deleteEmployee);

module.exports = router;
