
import sql from 'mssql';


const config = {
    server: 'DESKTOP-0ADKTSM\SQLEXPRESS', // write ur own db name here 
    database: 'TGN',
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
    integratedSecurity: true, 
  };

  async function Connecting() {
    try {
        let pool = await sql.connect(config);

        // lets check if it works

        let result = await pool.request().query('Select 1');
        console.log("Connection Success!",result.recordset);

        return pool;
    } catch (error) {
        console.log("Connection failed:",error);
    }
  }

  export default Connecting;