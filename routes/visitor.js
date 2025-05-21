const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const visitorController = require('../controllers/visitorController');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

/**
 * @swagger
 * tags:
 *   name: Visitors
 *   description: Visitor management
 */

/**
 * @swagger
 * /api/visitors:
 *   get:
 *     summary: Get all visitors
 *     tags: [Visitors]
 *     responses:
 *       200:
 *         description: List of visitors
 */
router.get('/', visitorController.getAllVisitors);

/**
 * @swagger
 * /api/visitors/{id}:
 *   get:
 *     summary: Get a visitor by ID
 *     tags: [Visitors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Visitor ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Visitor data
 */
router.get('/:id', visitorController.getVisitorById);

/**
 * @swagger
 * /api/visitors:
 *   post:
 *     summary: Create a new visitor
 *     tags: [Visitors]
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
 *               whom_to_meet:
 *                 type: string
 *               purpose:
 *                 type: string
 *               aadhar_no:
 *                 type: string
 *               address:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Visitor created and QR generated
 */
router.post('/', upload.single('image'), visitorController.createVisitor);

/**
 * @swagger
 * /api/visitors/{id}:
 *   put:
 *     summary: Update a visitor
 *     tags: [Visitors]
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
 *               whom_to_meet:
 *                 type: string
 *               purpose:
 *                 type: string
 *               aadhar_no:
 *                 type: string
 *               address:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Visitor updated
 */
router.put('/:id', upload.single('image'), visitorController.updateVisitor);

/**
 * @swagger
 * /api/visitors/{id}/status:
 *   put:
 *     summary: Toggle visitor status
 *     tags: [Visitors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Visitor status toggled
 */
router.put('/:id/status', visitorController.toggleVisitorStatus);

/**
 * @swagger
 * /api/visitors/{id}/card:
 *   get:
 *     summary: Generate QR code for visitor card
 *     tags: [Visitors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: QR code generated
 */
router.get('/:id/card', visitorController.generateVisitorCard);

/**
 * @swagger
 * /api/visitors/signout/{id}:
 *   get:
 *     summary: Sign out a visitor via QR code
 *     tags: [Visitors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Visitor signed out
 */
router.get('/signout/:id', visitorController.signoutVisitor);

module.exports = router;
