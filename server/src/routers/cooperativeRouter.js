const fileUpload = require("express-fileupload");

function cooperativeRouter(app, connection) {
  // Read all records
  app.get("/cooperatives", (req, res) => {
    connection.query("SELECT * FROM cooperative", (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  // Read a single record
  app.get("/cooperative/:coop_id", (req, res) => {
    const coopId = req.params.coop_id;

    connection.query(
      "SELECT * FROM cooperative WHERE coop_id = ?",
      coopId,
      (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
          res.status(404).json({ message: "Cooperative not found" });
        } else {
          res.json(result[0]);
        }
      }
    );
  });

  // Create a new record
  app.post("/cooperatives", (req, res) => {
    const {
      student_id,
      major,
      company,
      student_name,
      province,
      advisor_id,
      semester,
      year,
    } = req.body;

    const cooperative = {
      student_id,
      major,
      company,
      student_name,
      province,
      advisor_id,
      semester,
      year,
    };

    connection.query(
      "INSERT INTO cooperative SET ?",
      cooperative,
      (err, result) => {
        if (err) throw err;
        res.status(201).json({
          message: "Cooperative created successfully",
          id: result.insertId,
        });
      }
    );
  });

  // Update a record
  app.put("/cooperative/:coop_id", (req, res) => {
    const coopId = req.params.coop_id;
    const {
      student_id,
      major,
      company,
      student_name,
      province,
      advisor_id,
      semester,
      year,
    } = req.body;

    const cooperative = {
      student_id,
      major,
      company,
      student_name,
      province,
      advisor_id,
      semester,
      year,
    };

    connection.query(
      "UPDATE cooperative SET ? WHERE coop_id = ?",
      [cooperative, coopId],
      (err) => {
        if (err) throw err;
        res.json({ message: "Cooperative updated successfully" });
      }
    );
  });

  // Delete a record
  app.delete("/cooperative/:coop_id", (req, res) => {
    const coopId = req.params.coop_id;

    connection.query(
      "DELETE FROM cooperative WHERE coop_id = ?",
      coopId,
      (err) => {
        if (err) throw err;
        res.json({ message: "Cooperative deleted successfully" });
      }
    );
  });

  app.post("/coop/upload", (req, res) => {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "No CSV file uploaded" });
    }

    const file = req.files.file;

    // Assuming the CSV has a header row, remove it before inserting into the database
    const dataRows = file.data.toString().trim().split("\n").slice(1);

    // Prepare the data for insertion into the database
    const values = dataRows.map((row) => {
      const columns = row.split(",");

      // Create an object with the correct property names and values
      const coop = {
        student_id: columns[0],
        major: columns[1],
        company: columns[2],
        student_name: columns[3],
        province: columns[4],
        advisor_id: columns[5],
        semester: columns[6],
        year: columns[7],
      };

      return Object.values(coop);
    });

    // Insert the data into the database
    const sql =
      "INSERT IGNORE INTO cooperative (student_id, major, company, student_name, province, advisor_id, semester, year) VALUES ?";

    connection.query(sql, [values], (err) => {
      if (err) {
        console.error("Error inserting data into the database:", err);
        return res
          .status(500)
          .json({ error: "Failed to insert data into the database" });
      }

      return res
        .status(200)
        .json({ message: "Data uploaded and inserted successfully" });
    });
  });
}

module.exports = cooperativeRouter;
