const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitor_controller');
const multer = require('multer');

// Function to generate the QR code and save it in the database
const generateQrCode = (visitorId) => {
  return new Promise((resolve, reject) => {
    const qrData = `visitor-${visitorId}`;
    qrcode.toDataURL(qrData, (err, qrCodeUrl) => {
      if (err) reject(err);
      resolve(qrCodeUrl);
    });
  });
};

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

/**
 * @swagger
 * /visitor/send-otp:
 *   post:
 *     summary: Send OTP to a mobile number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *     responses:
 *       200:
 *         description: OTP sent successfully
 */
router.post('/send-otp', visitorController.sendOtp);

/**
 * @swagger
 * /visitor/verify-otp:
 *   post:
 *     summary: Verify OTP for a mobile number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               otp:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid or expired OTP
 */
router.post('/verify-otp', visitorController.verifyOtp);

// /**
//  * @swagger
//  * /visitor/submit-details:
//  *   post:
//  *     summary: Submit visitor details after OTP verification
//  *     consumes:
//  *       - multipart/form-data
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               phone:
//  *                 type: string
//  *               first_name:
//  *                 type: string
//  *               last_name:
//  *                 type: string
//  *               email:
//  *                 type: string
//  *               gender:
//  *                 type: string
//  *               company_id:
//  *                 type: integer
//  *               department_id:
//  *                 type: integer
//  *               designation_id:
//  *                 type: integer
//  *               whom_to_meet:
//  *                 type: integer
//  *               purpose:
//  *                 type: string
//  *               aadhar_no:
//  *                 type: string
//  *               address:
//  *                 type: string
//  *               image:
//  *                 type: string
//  *                 format: binary
//  *     responses:
//  *       200:
//  *         description: Visitor data submitted
//  *       403:
//  *         description: Phone not verified
//  */
// router.post('/submit-details', upload.single('image'), visitorController.submitDetails);



/**
 * @swagger
 * /visitor/all-visitors:
 *   get:
 *     summary: Retrieve all visitors
 *     description: Fetches a list of all visitors from the database.
 *     responses:
 *       200:
 *         description: A list of visitors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Data retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The visitor's ID
 *                       first_name:
 *                         type: string
 *                         description: The visitor's first name
 *                       last_name:
 *                         type: string
 *                         description: The visitor's last name
 *                       email:
 *                         type: string
 *                         description: The visitor's email address
 *                       phone:
 *                         type: string
 *                         description: The visitor's phone number
 *                       purpose:
 *                         type: string
 *                         description: The visitor's purpose of visit
 *                       aadhar_no:
 *                         type: string
 *                         description: The visitor's Aadhar number
 *                       address:
 *                         type: string
 *                         description: The visitor's address
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error fetching data
 *                 error:
 *                   type: string
 *                   example: Database error message
 */
router.get('/all-visitors', visitorController.getAllVisitors);

/**
 * @swagger
 * /api/visitor-details:
 *   get:
 *     summary: Retrieve a list of visitor details including visitor name, employee name, check-in time, check-out time, status, and QR code
 *     tags: [Visitors]
 *     responses:
 *       200:
 *         description: List of visitor details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   visitor_id:
 *                     type: integer
 *                   visitor_name:
 *                     type: string
 *                   employee_name:
 *                     type: string
 *                   checkin:
 *                     type: string
 *                     format: date-time
 *                   checkout:
 *                     type: string
 *                     format: date-time
 *                   status:
 *                     type: integer
 *                   qr_code:
 *                     type: string
 *       500:
 *         description: Internal Server Error
 *       404:
 *         description: No visitors found
 */
router.get('/visitor-details', visitorController.getVisitorDetails);

/**
 * @swagger
 * /visitor/submit-details:
 *   post:
 *     summary: Submit visitor details and generate QR code
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
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
 *                 type: integer
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
 *         description: Visitor data submitted and QR code generated
 */
router.post('/submit-details', upload.single('image'), visitorController.submitDetails);

/**
 * @swagger
 * /visitor/qr-scan:
 *   post:
 *     summary: Handle visitor QR code scan (Check-in/Check-out)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               qrCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Visitor check-in/check-out status
 *       404:
 *         description: Visitor not found
 */
router.post('/qr-scan', visitorController.handleQrScan);

module.exports = router;
