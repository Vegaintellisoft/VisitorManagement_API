const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const db = require("./db");

dotenv.config();
const app = express();

app.use(cors());
// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "VMS API",
      version: "1.0.0",
      description: "Company API documentation",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "refreshToken",
        },
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        cookieAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const companyRoutes = require("./routes/company");
const departmentRoutes = require("./routes/department");
const designationRoutes = require("./routes/designation");
const employeeRoutes = require("./routes/employees_routes");
//const employesroutes = require("./routes/employees")
const uploadRoutes = require("./routes/upload");
const roleRoutes = require("./routes/role_routes");
const authRoutes = require("./routes/auth_routes");
const dropdownRoutes = require('./routes/dropdownRoutes');
const visitorRoutes = require('./routes/visitor');
const path = require('path');
const appointmentRoutes = require('./routes/appointment_routes');
const selectRoutes = require('./routes/select_routes');
const visitorreportRoutes = require('./routes/visitor_reports_routes')
const appointmentreportRoutes = require('./routes/appointment_report_routes')
// const dropdownRoutes = require('./routes/');

// app.use('/api', dropdownRoutes);
app.use('/api', appointmentreportRoutes);
app.use('/api', visitorreportRoutes);
// Serve images from 'uploads' directory at /uploads URL
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/appointments', appointmentRoutes);
app.use(express.json());
app.use('/api/selects', selectRoutes);
app.use('/visitor', visitorRoutes);
app.use('/api', dropdownRoutes);
app.use('/api', companyRoutes);
app.use("/employees", employeeRoutes);
//app.use("/api/employees", employesroutes);
app.use("/api/designations", designationRoutes);
app.use("/companies", companyRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api", uploadRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/auth", authRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("VMS API is running");
});

// Start server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);

});
