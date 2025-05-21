const db = require('../db');
const QRCode = require('qrcode');
const queries = require('../queries/visitorQueries');

exports.getAllVisitors = (req, res) => {
  db.query(queries.GET_ALL_VISITORS, (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

exports.getVisitorById = (req, res) => {
  db.query(queries.GET_VISITOR_BY_ID, [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result[0]);
  });
};

exports.createVisitor = async (req, res) => {
  const {
    first_name, last_name, email, phone, gender,
    company_id, department_id, designation_id, whom_to_meet,
    purpose, aadhar_no, address
  } = req.body;

  const image = req.file?.filename || null;

  const values = [
    first_name, last_name, email, phone, gender,
    company_id, department_id, designation_id, whom_to_meet,
    purpose, aadhar_no, address, image
  ];

  db.query(queries.CREATE_VISITOR, values, async (err, result) => {
    if (err) return res.status(500).send(err);
    const visitorId = result.insertId;
    const qrText = `http://localhost:3001/api/visitors/signout/${visitorId}`;
    const qr = await QRCode.toDataURL(qrText);
    res.json({ visitorId, qr });
  });
};

exports.updateVisitor = (req, res) => {
  const { id } = req.params;
  const {
    first_name, last_name, email, phone, gender,
    company_id, department_id, designation_id, whom_to_meet,
    purpose, aadhar_no, address
  } = req.body;

  const image = req.file?.filename;
  let sql = queries.UPDATE_VISITOR_BASE;
  const values = [
    first_name, last_name, email, phone, gender,
    company_id, department_id, designation_id, whom_to_meet,
    purpose, aadhar_no, address
  ];

  if (image) {
    sql += `, image = ?`;
    values.push(image);
  }

  sql += ` WHERE id = ?`;
  values.push(id);

  db.query(sql, values, (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Visitor updated successfully' });
  });
};

exports.toggleVisitorStatus = (req, res) => {
  db.query(queries.TOGGLE_VISITOR_STATUS, [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Status toggled' });
  });
};

exports.generateVisitorCard = (req, res) => {
  const qrText = `http://localhost:3001/api/visitors/signout/${req.params.id}`;
  QRCode.toDataURL(qrText, (err, qr) => {
    if (err) return res.status(500).send(err);
    res.json({ qr });
  });
};

exports.signoutVisitor = (req, res) => {
  db.query(queries.SIGNOUT_VISITOR, [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send(`<h2>Visitor ID ${req.params.id} signed out successfully. QR is now invalid.</h2>`);
  });
};
