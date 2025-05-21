const verifyUser = "SELECT id,role_id,first_name,email,password FROM employees WHERE email = ?"
const updateRefreshToken = "INSERT INTO refresh_tokens (employee_id, token) VALUES (?, ?)"
const deleteRefreshToken = "DELETE FROM refresh_tokens WHERE token = ?"
const getRefreshToken = "SELECT * FROM refresh_tokens WHERE token = ?"
module.exports = {verifyUser, updateRefreshToken, getRefreshToken, deleteRefreshToken}