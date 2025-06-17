const getVisitorsQuery = `
  SELECT 
    v.visitor_id,
    CONCAT(v.first_name, ' ', v.last_name) AS name,
    v.email,
    v.phone,
    CONCAT(e.first_name, ' ', e.last_name) AS whom_to_meet,
    v.sign_in_time,
    v.sign_out_time
  FROM 
    visitors v
  LEFT JOIN 
    employees e ON v.whom_to_meet = e.emp_id
  ORDER BY 
    v.sign_in_time DESC
`;


module.exports = {
  getVisitorsQuery
};