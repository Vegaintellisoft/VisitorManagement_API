// routes/dropdownRoutes.js
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
 *                   id:
 *                     type: integer
 *                   name:
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
 *             properties:
 *               companyId:
 *                 type: integer
 *                 description: The ID of the company
 *                 example: 1
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
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
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
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
router.post('/designations', dropdownController.getDesignationsByDepartment);

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Retrieve active employees for a specific designation
 *     tags: [DropDowns]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
router.post('/employees', dropdownController.getEmployeesByDesignation);

module.exports = router;
