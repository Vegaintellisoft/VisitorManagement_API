const conn = require('../db');
const queries = require('../queries/visitor_queries');
const qrcode = require('qrcode');
const multer = require('multer');
// Generate QR code for visitor
const generateQrCode = (visitorId) => {
  return new Promise((resolve, reject) => {
    const qrData = `visitor-${visitorId}`;
    qrcode.toDataURL(qrData, (err, qrCodeUrl) => {
      if (err) reject(err);
      resolve(qrCodeUrl);
    });
  });
};

const sendOtp = (req, res) => {
  const { phone } = req.body;

  // Generate 4-digit OTP
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  // Set expiry time to 30 seconds from now
  const expiry = new Date(Date.now() + 60 * 1000);

  conn.query(queries.sendOtpQuery, [phone, otp, expiry, otp, expiry], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'OTP sent', otp }); // dev only
  });
};

const verifyOtp = (req, res) => {
  const { phone, otp } = req.body;

  conn.query(queries.selectOtpQuery, [phone], (err, results) => {
    if (err || results.length === 0) return res.status(400).send({ message: 'No record found' });

    const { otp: dbOtp, otp_expiry } = results[0];
    if (dbOtp !== otp || new Date(otp_expiry) < new Date()) {
      return res.status(400).send({ message: 'Invalid or expired OTP' });
    }

    conn.query(queries.verifyOtpQuery, [phone], (err) => {
      if (err) return res.status(500).send(err);

      conn.query('SELECT id FROM temp_visitors WHERE phone = ?', [phone], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: 'OTP verified', temp_visitor_id: result[0].id });
      });
    });
  });
};

// Submit visitor details and generate QR code
const submitDetails = async (req, res) => {
  const data = req.body;
  const imagePath = req.file ? req.file.path : null;

  // Verify OTP and fetch visitor details from temp table
  conn.query(queries.selectTempVisitorByPhone, [data.phone], async (err, results) => {
    if (err || results.length === 0) return res.status(400).send({ message: 'No record found' });

    const temp = results[0];
    if (temp.otp_verified !== 1) {
      return res.status(403).send({ message: 'Phone not verified' });
    }

    // Update temp visitor data
    const updateValues = [
      data.first_name, data.last_name, data.email, data.gender,
      data.company_id, data.department_id, data.designation_id,
      data.whom_to_meet, data.purpose, data.aadhar_no, data.address,
      imagePath, data.phone
    ];

    conn.query(queries.updateTempVisitor, updateValues, (err) => {
      if (err) return res.status(500).send(err);

      // Insert into the main visitor table
      const insertValues = [
        data.first_name, data.last_name, data.email, data.phone, data.gender,
        data.company_id, data.department_id, data.designation_id, data.whom_to_meet,
        data.purpose, data.aadhar_no, data.address, imagePath,
        temp.otp, 1
      ];

      conn.query(queries.insertIntoVisitorMain, insertValues, async (err, result) => {
        if (err) return res.status(500).send(err);

        const visitorId = result.insertId;

        // Generate QR code for the visitor
        const qrCode = await generateQrCode(visitorId);

        // Update the visitor record with the generated QR code
       conn.query('UPDATE visitors SET qr_code = ? WHERE visitor_id = ?', [qrCode, visitorId], (err) => {
          if (err) return res.status(500).send(err);
          res.send({ 
            message: 'Visitor data submitted and QR code generated', 
            visitor_id: visitorId,       
            qr_code: qrCode               
          });
        });
      });
    });
  });
};


// Handle QR scan (Check-in and Check-out)
const handleQrScan = (req, res) => {
  const { qrCode } = req.body;  // The scanned QR code data
  const visitorId = qrCode.split('-')[1]; // Extract visitor ID from the QR code data

  // First, check if visitor exists and get their current status
  conn.query('SELECT * FROM visitors WHERE id = ?', [visitorId], (err, results) => {
    if (err) return res.status(500).send({ message: 'Database error', error: err });
    if (results.length === 0) return res.status(404).send({ message: 'Visitor not found' });

    const visitor = results[0];
    const currentTime = moment();

    // Check if QR is already expired (i.e., check-in was done more than 24 hours ago)
    if (visitor.qr_status === 'checked_in' && moment(visitor.sign_in_time).add(24, 'hours').isBefore(currentTime)) {
      // QR expired after 24 hours, mark as expired
      conn.query('UPDATE visitors SET qr_status = "expired" WHERE id = ?', [visitorId], (err) => {
        if (err) return res.status(500).send({ message: 'Error expiring QR code', error: err });
        return res.send({ message: 'QR code expired after 24 hours' });
      });
      return;
    }

    // Handle first scan (Check-in)
    if (visitor.qr_status === 'active') {
      const signInTime = currentTime.format('YYYY-MM-DD HH:mm:ss');
      conn.query('UPDATE visitors SET qr_status = "checked_in", sign_in_time = ? WHERE id = ?', [signInTime, visitorId], (err) => {
        if (err) return res.status(500).send({ message: 'Error during check-in', error: err });
        return res.send({ message: 'Check-in successful', sign_in_time: signInTime });
      });
    }

    // Handle second scan (Check-out)
    else if (visitor.qr_status === 'checked_in') {
      const signOutTime = currentTime.format('YYYY-MM-DD HH:mm:ss');
      conn.query('UPDATE visitors SET qr_status = "checked_out", sign_out_time = ? WHERE id = ?', [signOutTime, visitorId], (err) => {
        if (err) return res.status(500).send({ message: 'Error during check-out', error: err });
        return res.send({ message: 'Check-out successful', sign_out_time: signOutTime });
      });
    }
  });
};


const getAllVisitors = (req, res) => {
  // Execute the query to get all visitors
  conn.query(queries.getAllVisitorsQuery, (err, results) => {
    if (err) {
      // Handle the error and send a 500 response
      return res.status(500).send({ message: 'Error fetching data', error: err });
    }

    // Return the result if the query is successful
    res.json({ message: 'Data retrieved successfully', data: results });
  });
};


const getVisitorDetails = (req, res) => {
  const query = queries.getVisitorDetailsQuery;

  conn.query(query, (err, results) => {
    if (err) {
      console.error('DB Error in getVisitorDetails:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'No visitor details found' });
    }

    res.json({ message: 'Visitor details retrieved successfully', data: results });
  });
};

const updateVisitorStatusController = (req, res) => {
  const visitorId = req.params.id;
  const { status } = req.body;

  const query = queries.updateVisitorStatusQuery;  // get the query string

  conn.query(query, [status, visitorId], (err, result) => {
    if (err) {
      console.error('DB Error in updateVisitorStatus:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Visitor not found or status not updated' });
    }

    res.json({ message: 'Status updated successfully' });
  });
};

const getVisitorQrCode = (req, res) => {
  const visitor_id = parseInt(req.body.visitor_id, 10);

  if (isNaN(visitor_id)) {
    return res.status(400).json({ error: 'Invalid visitor ID' });
  }

  conn.query(queries.getVisitorQrCodeById, [visitor_id], (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Visitor not found or QR code not active' });
    }

    const row = results[0];
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const imageUrl = row.image ? `${baseUrl}/uploads/${row.image}` : null;
    res.json({
      qr_code: row.qr_code,
      visitor_ID:row.visitor_id,
      first_name: row.visitor_first_name,
      last_name: row.visitor_last_name,
     purpose: row.purpose_text,
      email: row.email,
      image: imageUrl ,
      phone: row.phone,
      whom_to_meet: {
        employee_id: row.emp_id,
        first_name: row.employee_first_name,
        last_name: row.employee_last_name
      }
    });
  });
};

const submitDetailsWithoutOtp = async (req, res) => {
  try {
    const data = req.body;
    const imagePath = req.file ? req.file.path : null;

    // Validate required fields
    const requiredFields = [
      'first_name', 'last_name', 'email', 'phone', 'gender',
      'company_id', 'department_id', 'designation_id',
      'whom_to_meet', 'purpose', 'aadhar_no', 'address'
    ];

    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
    }

    const insertValues = [
      data.first_name, data.last_name, data.email, data.phone, data.gender,
      data.company_id, data.department_id, data.designation_id, data.whom_to_meet,
      data.purpose, data.aadhar_no, data.address, imagePath,
      null, 1 // otp is null, otp_verified is 1
    ];

    conn.query(queries.insertIntoVisitorOtp, insertValues, async (err, result) => {
      if (err) {
        console.error('DB Insert Error:', err);
        return res.status(500).json({ error: 'Failed to insert visitor data' });
      }

      const visitorId = result.insertId;
      const qrCode = await generateQrCode(visitorId);

      conn.query(queries.updateVisitorQrCode, [qrCode, visitorId], (err) => {
        if (err) {
          console.error('DB Update QR Error:', err);
          return res.status(500).json({ error: 'Failed to update QR code' });
        }

        res.json({
          message: 'Visitor data submitted successfully without OTP verification',
          visitor_id: visitorId,
          qr_code: qrCode
        });
      });
    });
  } catch (error) {
    console.error('Unexpected Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateVisitor = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const data = req.body;
    const imagePath = req.file ? req.file.path : null;

    if (!data || !data.visitor_id) {
      return res.status(400).json({ error: 'visitor_id is required' });
    }

    const requiredFields = [
      'first_name', 'last_name', 'email', 'phone', 'gender',
      'aadhar_no', 'address', 'company_id', 'department_id',
      'designation_id', 'whom_to_meet', 'purpose'
    ];

    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({ error: `Missing required fields: ${missingFields.join(', ')}` });
    }

    let updateQuery = `
      UPDATE visitors SET
        first_name = ?, last_name = ?, email = ?, phone = ?, gender = ?, 
        aadhar_no = ?, address = ?, company_id = ?, department_id = ?, 
        designation_id = ?, whom_to_meet = ?, purpose = ?
    `;
    const params = [
      data.first_name, data.last_name, data.email, data.phone, data.gender,
      data.aadhar_no, data.address, data.company_id, data.department_id,
      data.designation_id, data.whom_to_meet, data.purpose
    ];

    if (imagePath) {
      updateQuery += `, image = ?`;
      params.push(imagePath);
    }

    updateQuery += ` WHERE visitor_id = ?`;
    params.push(data.visitor_id);

    conn.query(updateQuery, params, (err, result) => {
      if (err) {
        console.error('DB Update Error:', err);
        return res.status(500).json({ error: 'Failed to update visitor' });
      }

      res.json({ message: 'Visitor updated successfully' });
    });

  } catch (error) {
    console.error('Unexpected Error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

const getVisitorById = async (req, res) => {
  const { visitor_id } = req.body;

  try {
    const [rows] = await conn.promise().query(
      'SELECT * FROM visitors WHERE visitor_id = ?', [visitor_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Visitor not found' });
    }

    res.json({ message: 'Visitor fetched successfully', data: rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch visitor', details: err.message || err });
  }
};




module.exports = {
  getVisitorById,
  updateVisitor,
   getVisitorQrCode,
  updateVisitorStatusController,
  getVisitorDetails,
  getAllVisitors,
  sendOtp,
  verifyOtp,
  submitDetails,
  handleQrScan,
  submitDetailsWithoutOtp
};
