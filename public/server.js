const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

/* ---------- Middleware ---------- */
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

/* ---------- In-memory Data ---------- */
let employees = [];
let nextId = 1;

/* ---------- 1. GET ALL EMPLOYEES ---------- */
app.get("/api/employees", (req, res) => {
  res.status(200).json(employees);
});

/* ---------- 2. GET EMPLOYEE BY ID ---------- */
app.get("/api/employees/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find(emp => emp.id === id);
  res.status(200).json(employee || {});
});

/* ---------- 3. ADD NEW EMPLOYEE ---------- */
app.post("/api/employees", (req, res) => {
  const employee = {
    id: nextId++,
    name: req.body.name,
    age: req.body.age,
    mobile: req.body.mobile,
    city: req.body.city,
    department: req.body.department,
    team: req.body.team,
    salary: req.body.salary
  };

  employees.push(employee);
  res.status(200).json(employee);
});

/* ---------- 4. UPDATE EMPLOYEE ---------- */
app.put("/api/employees/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find(emp => emp.id === id);

  if (employee) {
    Object.assign(employee, req.body);
  }

  res.status(200).json(employee || {});
});

/* ---------- 5. DELETE EMPLOYEE ---------- */
app.delete("/api/employees/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = employees.findIndex(emp => emp.id === id);

  if (index === -1) {
    return res.status(200).json({ message: "Employee not found" });
  }

  employees.splice(index, 1);
  res.status(200).json({ message: "Employee deleted successfully" });
});

/* ---------- 6. GET COMPENSATION ---------- */
app.get("/api/employees/compensation/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const employee = employees.find(emp => emp.id === id);

  res.status(200).json({
    department: employee?.department,
    salary: employee?.salary
  });
});

/* ---------- START SERVER ---------- */
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
