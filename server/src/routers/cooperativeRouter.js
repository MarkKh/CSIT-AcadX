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
        res
          .status(201)
          .json({
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
}

module.exports = cooperativeRouter;
