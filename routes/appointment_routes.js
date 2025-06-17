const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment_controller');

/**
 * @swagger
 * /api/appointments/send-otp:
 *   post:
 *     summary: Send OTP to visitor via email or phone
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contact:
 *                 type: string
 *                 description: Email or phone number
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OTP generated and sent
 *       400:
 *         description: Phone number or email is required
 *       404:
 *         description: No visitor found with this contact
 *       500:
 *         description: Database error
 */
router.post('/send-otp', appointmentController.sendOtp);

/**
 * @swagger
 * /api/appointments/verify-otp:
 *   post:
 *     summary: Verify OTP and fetch visitor appointment info
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contact:
 *                 type: string
 *                 description: Email or phone number
 *                 example: user@example.com
 *               otp:
 *                 type: string
 *                 description: OTP received
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: Appointment and visitor data returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 visitor_name:
 *                   type: string
 *                   example: John Doe
 *                 appointment_id:
 *                   type: integer
 *                   example: 101
 *                 image:
 *                   type: string
 *                   example: https://example.com/image.jpg
 *                 whom_to_meet:
 *                   type: string
 *                   example: Jane Smith
 *                 purpose:
 *                   type: string
 *                   example: Business Meeting
 *                 qr_code:
 *                   type: string
 *                   example: qr-code-string
 *       400:
 *         description: Contact and OTP are required
 *       401:
 *         description: Invalid or expired OTP
 *       404:
 *         description: OTP not found or no appointment found
 *       500:
 *         description: Database error
 */
router.post('/verify-otp', appointmentController.verifyOtp);

/**
 * @swagger
 * /api/appointments/create:
 *   post:
 *     summary: Create visitor and appointment, generate QR
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
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
 *               aadhar_no:
 *                 type: string
 *               address:
 *                 type: string
 *               image:
 *                 type: string
 *               purpose_of_visit:
 *                 type: string
 *               appointment_date:
 *                 type: string
 *               appointment_time:
 *                 type: string
 *               duration:
 *                 type: integer
 *               company_id:
 *                 type: integer
 *               department_id:
 *                 type: integer
 *               designation_id:
 *                 type: integer
 *               whom_to_meet:
 *                 type: integer
 *               reminder:
 *                 type: boolean
 *               remarks:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Server error
 */
router.post('/create', appointmentController.createAppointment);

/**
 * @swagger
 * /api/appointments/{id}:
 *   put:
 *     summary: Update an existing appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Appointment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               visitor_id:
 *                 type: integer
 *               appointment_date:
 *                 type: string
 *                 format: date
 *               appointment_time:
 *                 type: string
 *                 format: time
 *               duration:
 *                 type: integer
 *               purpose_of_visit:
 *                 type: string
 *               company_id:
 *                 type: integer
 *               department_id:
 *                 type: integer
 *               designation_id:
 *                 type: integer
 *               whom_to_meet:
 *                 type: integer
 *               reminder:
 *                 type: boolean
 *               remarks:
 *                 type: string
 *     responses:
 *       200:
 *         description: Appointment updated
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Server error
 */
router.put('/:id', appointmentController.updateAppointment);

/**
 * @swagger
 * /api/appointments/fetch_appointment:
 *   post:
 *     summary: Fetch appointment details by appointment ID
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 123
 *     responses:
 *       200:
 *         description: Appointment details
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Server error
 */
router.post('/fetch_appointment', appointmentController.getAppointmentById);

/**
 * @swagger
 * /api/appointments/table-data:
 *   get:
 *     summary: Get appointment table data
 *     description: Returns a list of visitor appointments with name, email, phone, date, purpose, and remarks.
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: A list of appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Appointments fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       visitor_name:
 *                         type: string
 *                         example: John Doe
 *                       email:
 *                         type: string
 *                         example: john@example.com
 *                       phone:
 *                         type: string
 *                         example: 1234567890
 *                       appointment_date:
 *                         type: string
 *                         format: date
 *                         example: 2025-06-01
 *                       purpose:
 *                         type: string
 *                         example: Business Meeting
 *                       remarks:
 *                         type: string
 *                         example: First-time visitor
 *       500:
 *         description: Internal server error
 */
router.get('/table-data', appointmentController.getAppointmentsTableData);

/**
 * @swagger
 * /api/appointments/fetch_remarks:
 *   post:
 *     summary: Get remarks by appointment ID
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - appointment_id
 *             properties:
 *               appointment_id:
 *                 type: integer
 *                 example: 123
 *     responses:
 *       200:
 *         description: Remarks retrieved successfully
 *       400:
 *         description: Bad request, missing appointment_id
 *       404:
 *         description: Remarks not found
 *       500:
 *         description: Server error
 */
router.post('/fetch_remarks', appointmentController.postRemarksByAppointmentId);

module.exports = router;
