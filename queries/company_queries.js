module.exports = {
  GET_ALL_COMPANIES: "SELECT * FROM companies",

  GET_COMPANY_BY_ID: "SELECT * FROM companies WHERE id = ?",

  CREATE_COMPANY: "INSERT INTO companies (name, status) VALUES (?, ?)",

  UPDATE_COMPANY: "UPDATE companies SET name = ?, status = ? WHERE id = ?",
};

