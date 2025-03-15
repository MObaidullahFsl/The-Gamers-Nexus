
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
        const pool = await sql.connect(config);
        console.log('Connected to the database');
        return pool;

    } catch (error) {
        console.log("Connection failed:",error);
        throw error; 
    }
  }

  export default Connecting;

