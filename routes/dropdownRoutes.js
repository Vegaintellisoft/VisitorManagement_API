const express = require('express');
const router = express.Router();
const dropdownController = require('../controllers/dropdown_controller');

/**
 * @swagger
 * tags:
 *   name: DropDowns
 *   description: Dropdown API endpoints for companies, departments, designations, and employees
 */

/**
 * @swagger
 * /api/companies:
 *   get:
 *     summary: Retrieve all active companies
 *     tags: [DropDowns]
 *     responses:
 *       200:
 *         description: List of active companies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   company_id:
 *                     type: integer
 *                   company_name:
 *                     type: string
 */
router.get('/companies', dropdownController.getCompanies);

/**
 * @swagger
 * /api/departments:
 *   post:
 *     summary: Retrieve active departments for a specific company
 *     tags: [DropDowns]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - companyId
 *             properties:
 *               companyId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: List of active departments for the company
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   department_id:
 *                     type: integer
 *                   dept_name:
 *                     type: string
 *       500:
 *         description: Database error
 */
router.post('/departments', dropdownController.getDepartmentsByCompany);

/**
 * @swagger
 * /api/designations:
 *   post:
 *     summary: Retrieve active designations for a specific department
 *     tags: [DropDowns]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               departmentId:
 *                 type: integer
 *                 description: The ID of the department
 *                 example: 1
 *     responses:
 *       200:
 *         description: List of active designations for the department
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   designation_id:
 *                     type: integer
 *                   desgnation_name:
 *                     type: string
 */
router.post('/designations', dropdownController.getDesignationsByDepartment);

/**
 * @swagger
 * /api/get_employees:
 *   post:
 *     summary: Retrieve active employees for a specific designation
 *     tags: [DropDowns]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - designationId
 *             properties:
 *               designationId:
 *                 type: integer
 *                 description: The ID of the designation
 *                 example: 1
 *     responses:
 *       200:
 *         description: List of active employees for the designation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   emp_id:
 *                     type: integer
 *                   emp_name:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.post('/get_employees', dropdownController.getEmployeesByDesignation);

module.exports = router;
