const getAppointmentsQuery = `
  SELECT 
    CONCAT(v.first_name, ' ', v.last_name) AS visitor_name,
    v.email AS email_id,
    v.phone AS mobile_no,
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
    a.appointment_date AS expected_date,
    a.appointment_time AS expected_time
  FROM 
    appointment_scheduling a
  JOIN 
    visitors v ON a.visitor_id = v.visitor_id
  JOIN 
    employees e ON a.whom_to_meet = e.emp_id
  ORDER BY 
    a.appointment_date DESC, a.appointment_time DESC
`;

module.exports = {
  getAppointmentsQuery
};
