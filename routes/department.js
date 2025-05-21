const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/department_controller');

/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: Department management APIs
 */

/**
 * @swagger
 * /api/departments:
 *   get:
 *     summary: Get all departments with company name
 *     tags: [Departments]
 *     responses:
 *       200:
 *         description: List of departments with company name
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   company_id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   status:
 *                     type: string
 *                   company_name:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
  try {
    const departments = await departmentController.getAll();
    res.status(200).json(departments);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/departments/{id}:
 *   get:
 *     summary: Get department by ID
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Department ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Department object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 company_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 status:
 *                   type: string
 *       404:
 *         description: Department not found
 *       500:
 *         description: Server error
 */
router.get('/:id', async (req, res) => {
  try {
    const department = await departmentController.getById(req.params.id);
    res.status(200).json(department);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/departments:
 *   post:
 *     summary: Add a new department
 *     tags: [Departments]
 *     requestBody:
 *       description: Department data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company_id
 *               - name
 *               - status
 *             properties:
 *               company_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Active, Inactive]
 *     responses:
 *       200:
 *         description: Department created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *       500:
 *         description: Server error
 */
router.post('/', async (req, res) => {
  try {
    const { company_id, name, status } = req.body;
    const newDepartment = await departmentController.create(company_id, name, status);
    res.status(200).json(newDepartment);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/departments/{id}:
 *   put:
 *     summary: Update department
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Department ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Updated department data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company_id
 *               - name
 *               - status
 *             properties:
 *               company_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Active, Inactive]
 *     responses:
 *       200:
 *         description: Department updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 */
router.put('/:id', async (req, res) => {
  try {
    const { company_id, name, status } = req.body;
    const result = await departmentController.update(req.params.id, company_id, name, status);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

module.exports = router;
