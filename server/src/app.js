const express = require("express");
const mysql = require("mysql");
const cors = require("cors")
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");


const dbConfig = require("./config/database");
const adminRouter = require("./routers/adminRouter")
const advisorsRoutes = require("./routers/advisorsRouter");
const cooperativeRouter = require("./routers/cooperativeRouter");
const reportsRouter = require("./routers/reportsRouter");
const reporttypeRouter = require('./routers/reporttypeRouter')
const loanRouter = require('./routers/loanRouter')


const app = express();
const port = 3333;
app.use(cors());
app.use(fileUpload());

// Create a MySQL connection
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the MySQL database");
});

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

adminRouter(app, connection);
advisorsRoutes(app, connection);
cooperativeRouter(app, connection);
reportsRouter(app, connection);
reporttypeRouter(app, connection);
loanRouter(app, connection)



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
