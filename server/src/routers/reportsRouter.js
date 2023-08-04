const fileUpload = require("express-fileupload");

function reportsRouter(app, connection) {
  // Read all records
  app.get("/reports", (req, res) => {
    connection.query("SELECT * FROM reports", (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  // Read a single record
  app.get("/report/:rep_code", (req, res) => {
    const repCode = req.params.rep_code;

    connection.query(
      "SELECT * FROM reports WHERE rep_code = ?",
      repCode,
      (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
          res.status(404).json({ message: "Report not found" });
        } else {
          res.json(result[0]);
        }
      }
    );
  });

  // Create a new record
  app.post("/reports", (req, res) => {
    const {
      rep_code,
      title,
      rep_type_id,
      "1st_student_id": firstStudentId,
      "1st_student_name": firstStudentName,
      "2nd_student_id": secondStudentId,
      "2nd_student_name": secondStudentName,
      year,
      "1stAdvisor_id": firstAdvisorId,
      status,
      prominence,
      keyword,
      abstract,
    } = req.body;

    const report = {
      rep_code,
      title,
      rep_type_id,
      "1st_student_id": firstStudentId,
      "1st_student_name": firstStudentName,
      "2nd_student_id": secondStudentId,
      "2nd_student_name": secondStudentName,
      year,
      "1stAdvisor_id": firstAdvisorId,
      status,
      prominence,
      keyword,
      abstract,
    };

    connection.query("INSERT INTO reports SET ?", report, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ message: "Report created successfully", id: result.insertId });
    });
  });

  // Update a record
  app.put("/report/:rep_code", (req, res) => {
    const repCode = req.params.rep_code;
    const {
      rep_code,
      title,
      rep_type_id,
      "1st_student_id": firstStudentId,
      "1st_student_name": firstStudentName,
      "2nd_student_id": secondStudentId,
      "2nd_student_name": secondStudentName,
      year,
      "1stAdvisor_id": firstAdvisorId,
      status,
      prominence,
      keyword,
      abstract,
    } = req.body;

    const report = {
      rep_code,
      title,
      rep_type_id,
      "1st_student_id": firstStudentId,
      "1st_student_name": firstStudentName,
      "2nd_student_id": secondStudentId,
      "2nd_student_name": secondStudentName,
      year,
      "1stAdvisor_id": firstAdvisorId,
      status,
      prominence,
      keyword,
      abstract,
    };

    connection.query(
      "UPDATE reports SET ? WHERE rep_code = ?",
      [report, repCode],
      (err) => {
        if (err) throw err;
        res.json({ message: "Report updated successfully" });
      }
    );
  });

  // Delete a record
  app.delete("/report/:rep_code", (req, res) => {
    const repCode = req.params.rep_code;

    connection.query(
      "DELETE FROM reports WHERE rep_code = ?",
      repCode,
      (err) => {
        if (err) throw err;
        res.json({ message: "Report deleted successfully" });
      }
    );
  });

  app.post("/report/upload", (req, res) => {
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
      const report = {
        rep_code: columns[0],
        title: columns[1],
        rep_type_id: columns[2],
        "1st_student_id": columns[3],
        "1st_student_name": columns[4],
        "2nd_student_id": columns[5],
        "2nd_student_name": columns[6],
        year: columns[7],
        "1stAdvisor_id": columns[8],
        status: columns[9],
        prominence: columns[10],
        keyword: columns[11],
        abstract: columns[12],
      };

      return Object.values(report);
    });

    // Insert the data into the database
    const sql =
      "INSERT IGNORE INTO reports (rep_code, title, rep_type_id, 1st_student_id, 1st_student_name, 2nd_student_id, 2nd_student_name, year, 1stAdvisor_id, status, prominence, keyword, abstract) VALUES ?";

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

  app.get("/reports/count", (req, res) => {
    connection.query(
      "SELECT year, COUNT(CASE WHEN rep_type_id = 1 THEN 1 END) AS UG, COUNT(CASE WHEN rep_type_id = 2 THEN 1 END) AS COOP FROM reports GROUP BY year",
      (err, results) => {
        if (err) throw err;
        res.json(results);
      }
    );
  });

  app.put("/loanReport/:rep_code", (req, res) => {
    const repCode = req.params.rep_code;
    const { status } = req.body; // Assuming the updated status is sent in the request body

    const updateData = {
      status: status,
    };

    connection.query(
      "UPDATE reports SET ? WHERE rep_code = ?",
      [updateData, repCode],
      (err) => {
        if (err) {
          console.error("Error updating report:", err);
          return res
            .status(500)
            .json({ error: "An error occurred while updating the report." });
        }

        res.json({ message: "Report status updated successfully" });
      }
    );
  });

  app.get("/reports/count2", (req, res) => {
    connection.query(
      `SELECT
      adv.name AS Advisor,
      r.year,
      COUNT(CASE WHEN r.rep_type_id = 1 THEN 1 END) AS UG,
      COUNT(CASE WHEN r.rep_type_id = 2 THEN 1 END) AS COOP
  FROM
      reports r
  JOIN
      advisors adv ON r.1stAdvisor_id = adv.advisor_id
  GROUP BY
      Advisor,
      year
  ORDER BY
      Advisor,
      year;
  `,
      (err, results) => {
        if (err) throw err;
        res.json(results);
      }
    );
  });
}

module.exports = reportsRouter;
