const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const secretKey = "Login-by-admin-csit";
function adminRouter(app, connection) {
  //login
  app.post("/login", (req, res) => {
    const { username, password } = req.body;

    connection.query(
      "SELECT * FROM admin WHERE username = ?",
      username,
      (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
          res.status(401).json({ message: "Invalid credentials" });
        } else {
          const admin = result[0];
          bcrypt.compare(password, admin.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              const token = jwt.sign({ username: admin.username }, secretKey, {
                expiresIn: "1h",
              });
              res.json({ message: "Login successful", token });
            } else {
              res.status(401).json({ message: "Invalid credentials" });
            }
          });
        }
      }
    );
  });

  //auth
  app.post("/auth", (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, secretKey);
      res.json({ message: "Authentication successful", decoded });
    } catch (err) {
      res
        .status(401)
        .json({ message: "Authentication failed", error: err.message });
    }
  });

  // Read all admin records
  app.get("/admins", (req, res) => {
    connection.query("SELECT * FROM admin", (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  // Read a single admin record
  app.get("/admin/:admin_id", (req, res) => {
    const adminID = req.params.admin_id;

    connection.query(
      "SELECT * FROM admin WHERE admin_id = ?",
      adminID,
      (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
          res.status(404).json({ message: "Admin not found" });
        } else {
          res.json(result[0]);
        }
      }
    );
  });

  // Create a new admin record
  app.post("/admins", (req, res) => {
    const { username, password, name } = req.body;

    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) throw err;

      const admin = {
        username,
        password: hashedPassword,
        name,
      };

      connection.query("INSERT INTO admin SET ?", admin, (err, result) => {
        if (err) throw err;
        res
          .status(201)
          .json({ message: "Admin created successfully", id: result.insertId });
      });
    });
  });

  // Update an admin record
  // ...

  // Update an admin record
  app.put("/admin/:admin_id", (req, res) => {
    const adminID = req.params.admin_id;
    const { username, name } = req.body;
  
    // Create an object with the fields to be updated
    const admin = {
      username,
      name,
    };
  
    connection.query(
      "UPDATE admin SET ? WHERE admin_id = ?",
      [admin, adminID],
      (err) => {
        if (err) throw err;
        res.json({ message: "Admin updated successfully" });
      }
    );
  });
  

  // ...

  // Delete an admin record
  app.delete("/admin/:admin_id", (req, res) => {
    const adminID = req.params.admin_id;

    connection.query("DELETE FROM admin WHERE admin_id = ?", adminID, (err) => {
      if (err) throw err;
      res.json({ message: "Admin deleted successfully" });
    });
  });
}

module.exports = adminRouter;
