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

  app.get("/reports/count", (req, res) => {
    connection.query(
      "SELECT year, COUNT(CASE WHEN rep_type_id = 1 THEN 1 END) AS UG, COUNT(CASE WHEN rep_type_id = 2 THEN 1 END) AS COOP FROM reports GROUP BY year",
      (err, results) => {
        if (err) throw err;
        res.json(results);
      }
    );
  });
}

module.exports = reportsRouter;
