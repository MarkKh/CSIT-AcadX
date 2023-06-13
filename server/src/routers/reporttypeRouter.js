function reporttypeRouter(app, connection) {
  // Read all records
  app.get("/reporttypes", (req, res) => {
    connection.query("SELECT * FROM reporttype", (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  // Read a single record
  app.get("/reporttype/:rep_type_id", (req, res) => {
    const repTypeId = req.params.rep_type_id;

    connection.query(
      "SELECT * FROM reporttype WHERE rep_type_id = ?",
      repTypeId,
      (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
          res.status(404).json({ message: "Report type not found" });
        } else {
          res.json(result[0]);
        }
      }
    );
  });

  // Create a new record
  app.post("/reporttypes", (req, res) => {
    const { type_name } = req.body;

    const reportType = { type_name };

    connection.query(
      "INSERT INTO reporttype SET ?",
      reportType,
      (err, result) => {
        if (err) throw err;
        res
          .status(201)
          .json({
            message: "Report type created successfully",
            id: result.insertId,
          });
      }
    );
  });

  // Update a record
  app.put("/reporttype/:rep_type_id", (req, res) => {
    const repTypeId = req.params.rep_type_id;
    const { type_name } = req.body;

    const reportType = { type_name };

    connection.query(
      "UPDATE reporttype SET ? WHERE rep_type_id = ?",
      [reportType, repTypeId],
      (err) => {
        if (err) throw err;
        res.json({ message: "Report type updated successfully" });
      }
    );
  });

  // Delete a record
  app.delete("/reporttype/:rep_type_id", (req, res) => {
    const repTypeId = req.params.rep_type_id;

    connection.query(
      "DELETE FROM reporttype WHERE rep_type_id = ?",
      repTypeId,
      (err) => {
        if (err) throw err;
        res.json({ message: "Report type deleted successfully" });
      }
    );
  });
}

module.exports = reporttypeRouter;
