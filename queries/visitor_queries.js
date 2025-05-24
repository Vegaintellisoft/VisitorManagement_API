const sendOtpQuery = `
  INSERT INTO temp_visitors (phone, otp, otp_expiry, otp_verified)
  VALUES (?, ?, ?, 0)
  ON DUPLICATE KEY UPDATE otp = ?, otp_expiry = ?, otp_verified = 0
`;


const selectOtpQuery = 'SELECT otp, otp_expiry FROM temp_visitors WHERE phone = ? ORDER BY otp_expiry DESC LIMIT 1';
const verifyOtpQuery = 'UPDATE temp_visitors SET otp_verified = 1 WHERE phone = ?';

const checkVerificationQuery = 'SELECT otp_verified FROM temp_visitors WHERE phone = ?';

const submitVisitorQuery = `
  UPDATE temp_visitors SET
    first_name = ?, last_name = ?, email = ?, gender = ?, company_id = ?, department_id = ?, 
    designation_id = ?, whom_to_meet = ?, purpose = ?, aadhar_no = ?, address = ?, image = ?
  WHERE phone = ?
`;
const selectTempVisitorByPhone = 'SELECT * FROM temp_visitors WHERE phone = ?';

const updateTempVisitor = `
  UPDATE temp_visitors SET
    first_name = ?, last_name = ?, email = ?, gender = ?, company_id = ?, department_id = ?, 
    designation_id = ?, whom_to_meet = ?, purpose = ?, aadhar_no = ?, address = ?, image = ?
  WHERE phone = ?
`;

const insertIntoVisitorMain = `
  INSERT INTO visitors (
    first_name, last_name, email, phone, gender,
    company_id, department_id, designation_id, whom_to_meet,
    purpose, aadhar_no, address, image,
    otp, otp_verified, qr_status
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')
`;
const getAllVisitorsQuery = 'SELECT * FROM visitors';

const getVisitorDetailsQuery = `
    SELECT
        v.id AS visitor_id,
        CONCAT(v.first_name, ' ', v.last_name) AS visitor_name,
        CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
        v.sign_in_time AS checkin,
        v.sign_out_time AS checkout,
        v.status,
        v.qr_code
    FROM visitors v
    LEFT JOIN employees e ON v.whom_to_meet = e.id
    ORDER BY v.sign_in_time DESC;
`;

// Query to select temp visitor by phone number
// const selectTempVisitorByPhone = 'SELECT * FROM temp_visitors WHERE phone = ?';

// // Query to update temp visitor details
// const updateTempVisitor = 'UPDATE temp_visitors SET first_name = ?, last_name = ?, email = ?, gender = ?, company_id = ?, department_id = ?, designation_id = ?, whom_to_meet = ?, purpose = ?, aadhar_no = ?, address = ?, image_path = ?, phone = ? WHERE phone = ?';

// // Query to insert into main visitor table
// const insertIntoVisitorMain = 'INSERT INTO visitors (first_name, last_name, email, phone, gender, company_id, department_id, designation_id, whom_to_meet, purpose, aadhar_no, address, image_path, otp, otp_verified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

// // Query to get visitor details for check-in and check-out
// const getVisitorDetailsQuery = 'SELECT * FROM visitors WHERE id = ?';
  
module.exports = {
  getAllVisitorsQuery,
  sendOtpQuery,
  selectOtpQuery,
  verifyOtpQuery,
  checkVerificationQuery,
  submitVisitorQuery,
    selectTempVisitorByPhone,
  updateTempVisitor,
  insertIntoVisitorMain,
  getVisitorDetailsQuery
};
