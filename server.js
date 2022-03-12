
const cTable = require('console.table');
const mysql = require('mysql2');
const inquire = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({extended: false }));
app.use(express.json());

//Use apiRoutes
//app.use('/api', apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });

// app.get('/api/employee', (req, res) => {
//     const sql = `SELECT * FROM employee`;
  
//     db.query(sql, (err, rows) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: 'success',
//         data: rows
//       });
//     });
//   });

