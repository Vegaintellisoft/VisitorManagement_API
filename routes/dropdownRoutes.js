const express = require('express');
const router = express.Router();
const dropdownController = require('../controllers/dropdown_controller');

/**
 * @swagger
 * tags:
 *   name: Dropdowns
 *   description: APIs for dropdown population
 */

/**
 * @swagger
 * /dropdown/companies:
 *   get:
 *     summary: Get list of active companies
 *     tags: [Dropdowns]
 *     responses:
 *       200:
 *         description: A list of active companies
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
 * /dropdown/departments/{cid}:
 *   get:
 *     summary: Get active departments by company
 *     tags: [Dropdowns]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of active departments for a given company
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
 */
router.get('/departments/:cid', dropdownController.getDepartmentsByCompany);

/**
 * @swagger
 * /dropdown/designations/{did}:
 *   get:
 *     summary: Get active designations by department
 *     tags: [Dropdowns]
 *     parameters:
 *       - in: path
 *         name: did
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of active designations
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
router.get('/designations/:did', dropdownController.getDesignationsByDepartment);


/**
 * @swagger
 * /dropdown/employees/{did}:
 *   get:
 *     summary: Get active employees by designation
 *     tags: [Dropdowns]
 *     parameters:
 *       - in: path
 *         name: did
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of active employees for a given designation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   employee_id:
 *                     type: integer
 *                   first_name:
 *                     type: string
 *                   last_name:
 *                     type: string
 */
router.get('/employees/:did', dropdownController.getEmployeesByDesignation);

/**
 * @swagger
 * /dropdown/purposes:
 *   get:
 *     summary: Get list of active purposes
 *     tags: [Dropdowns]
 *     responses:
 *       200:
 *         description: A list of purposes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   purpose_id:
 *                     type: integer
 *                   purpose:
 *                     type: string
 */
router.get('/purposes', dropdownController.getAllPurposes);


module.exports = router;
