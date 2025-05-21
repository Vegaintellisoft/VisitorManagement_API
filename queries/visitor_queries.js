module.exports = {
  GET_ALL_VISITORS: "SELECT * FROM visitors",
  GET_VISITOR_BY_ID: "SELECT * FROM visitors WHERE id = ?",
  CREATE_VISITOR: `
    INSERT INTO visitors (
      first_name, last_name, email, phone, gender,
      company_id, department_id, designation_id, whom_to_meet,
      purpose, aadhar_no, address, image
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
  UPDATE_VISITOR_BASE: `
    UPDATE visitors SET
      first_name = ?, last_name = ?, email = ?, phone = ?, gender = ?,
      company_id = ?, department_id = ?, designation_id = ?, whom_to_meet = ?,
      purpose = ?, aadhar_no = ?, address = ?
  `,
  TOGGLE_VISITOR_STATUS: "UPDATE visitors SET status = NOT status WHERE id = ?",
  SIGNOUT_VISITOR: "UPDATE visitors SET status = 0 WHERE id = ?",
};
