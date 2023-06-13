function loanRouter(app, connection) {
  // Read all records
  app.get("/loans", (req, res) => {
    connection.query("SELECT * FROM loan", (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });

  // Read a single record
  app.get("/loan/:loan_id", (req, res) => {
    const loanId = req.params.loan_id;

    connection.query(
      "SELECT * FROM loan WHERE loan_id = ?",
      loanId,
      (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
          res.status(404).json({ message: "Loan not found" });
        } else {
          res.json(result[0]);
        }
      }
    );
  });

  // Create a new record
  app.post("/loans", (req, res) => {
    const {
      rep_code,
      borrower_id,
      borrower_name,
      major,
      start_date,
      end_date,
      status,
    } = req.body;

    const loan = {
      rep_code,
      borrower_id,
      borrower_name,
      major,
      start_date,
      end_date,
      status,
    };

    connection.query("INSERT INTO loan SET ?", loan, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ message: "Loan created successfully", id: result.insertId });
    });
  });

  // Update a record
  app.put("/loan/:loan_id", (req, res) => {
    const loanId = req.params.loan_id;
    const {
      rep_code,
      borrower_id,
      borrower_name,
      major,
      start_date,
      end_date,
      status,
    } = req.body;

    const loan = {
      rep_code,
      borrower_id,
      borrower_name,
      major,
      start_date,
      end_date,
      status,
    };

    connection.query(
      "UPDATE loan SET ? WHERE loan_id = ?",
      [loan, loanId],
      (err) => {
        if (err) throw err;
        res.json({ message: "Loan updated successfully" });
      }
    );
  });

  // Delete a record
  app.delete("/loan/:loan_id", (req, res) => {
    const loanId = req.params.loan_id;

    connection.query("DELETE FROM loan WHERE loan_id = ?", loanId, (err) => {
      if (err) throw err;
      res.json({ message: "Loan deleted successfully" });
    });
  });
}

module.exports = loanRouter;
