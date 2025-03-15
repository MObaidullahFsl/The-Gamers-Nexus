
import sql from 'mssql'; 
//import 'mssql/msnodesqlv8'; 
const config = {
  server: 'DESKTOP-0ADKTSM\\SQLEXPRESS',
  database: 'TGN', 
  user: 'default', 
  password: '12345678',
  options: {
    encrypt: true,  
    trustServerCertificate: true // For self-signed certificates
  },
   driver: 'tedious'
};


  async function Connecting() {
    try {
        // let pool = await sql.connect(config);

        // // lets check if it works

        // let result = await pool.request().query('Select 1');
        // console.log("Connection Success!",result.recordset);
        //return pool;

        const pool = await sql.connect(config);
        console.log('Connected to the database');
        return pool;

    } catch (error) {
        console.log("Connection failed:",error);
        throw error; 
    }
  }

  export default Connecting;



// const Connection = require('tedious').Connection;
// const Request = require('tedious').Request;

// const config = {
//   server: 'DESKTOP-0ADKTSM\SQLEXPRESS', // Replace with your server name
//   authentication: {
//     type: 'ntlm', // Use Windows Authentication
//     options: {
//    //   domain: 'YOUR_DOMAIN', // Replace with your domain (if applicable)
//       userName: '', // Leave empty for current Windows user
//       password: '' // Leave empty for current Windows user
//     }
//   },
//   options: {
//     encrypt: true, // For Azure or encrypted connections
//     trustServerCertificate: true, // For self-signed certificates
//     database: 'TGN' // Replace with your database name
//   }
// };

// const connection = new Connection(config);

// connection.on('connect', (err) => {
//   if (err) {
//     console.log('Connection failed:', err);
//   } else {
//     console.log('Connected successfully!');
//     executeStatement();
//   }
// });

// function executeStatement() {
//   const request = new Request("SELECT 123, 'hello world'", (err, rowCount) => {
//     if (err) {
//       console.log('Query execution failed:', err);
//     } else {
//       console.log(`${rowCount} rows returned`);
//     }
//     connection.close();
//   });

//   request.on('row', (columns) => {
//     columns.forEach((column) => {
//       if (column.value === null) {
//         console.log('NULL');
//       } else {
//         console.log(column.value);
//       }
//     });
//   });

//   connection.execSql(request);
// }