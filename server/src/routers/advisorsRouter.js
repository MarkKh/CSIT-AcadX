function advisorsRoutes(app, connection) {
  // Read all records
  app.get("/advisors", (req, res) => {
    connection.query("SELECT * FROM advisors", (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  // Read a single record
  app.get("/advisor/:advisor_id", (req, res) => {
    const advisorId = req.params.advisor_id;

    connection.query(
      "SELECT * FROM advisors WHERE advisor_id = ?",
      advisorId,
      (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
          res.status(404).json({ message: "Advisor not found" });
        } else {
          res.json(result[0]);
        }
      }
    );
  });

  // Create a new record
  app.post("/advisors", (req, res) => {
    const { name } = req.body;
    const advisor = { name };

    connection.query("INSERT INTO advisors SET ?", advisor, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ message: "Advisor created successfully", id: result.insertId });
    });
  });

  // Update a record
  app.put("/advisor/:advisor_id", (req, res) => {
    const advisorId = req.params.advisor_id;
    const { name } = req.body;
    const advisor = { name };

    connection.query(
      "UPDATE advisors SET ? WHERE advisor_id = ?",
      [advisor, advisorId],
      (err) => {
        if (err) throw err;
        res.json({ message: "Advisor updated successfully" });
      }
    );
  });

  // Delete a record
  app.delete("/advisor/:advisor_id", (req, res) => {
    const advisorId = req.params.advisor_id;

    connection.query(
      "DELETE FROM advisors WHERE advisor_id = ?",
      advisorId,
      (err) => {
        if (err) throw err;
        res.json({ message: "Advisor deleted successfully" });
      }
    );
  });
}

module.exports = advisorsRoutes;
