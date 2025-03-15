import express from 'express';
import cors from 'cors';
import connectToDatabase from './db.js'; 

const app = express();
const PORT = 5000; // ull see this in the url used to access backend


app.use(cors()); 
app.use(express.json()); 



// we created a backend route see 
app.get('/api/books', async (req, res) => {
  try {
    const pool = await connectToDatabase(); 
    const result = await pool.request().query('SELECT * FROM Books'); 
    res.json(result.recordset); 
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});
app.get('/api/games', async (req, res) => {
  try {
    const pool = await connectToDatabase(); 
    const result = await pool.request().query('SELECT * FROM Games'); 
    res.json(result.recordset); 
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

app.get('/',async(req,res)=>{
try {
 const result = 'HEllo world';
 res.send(result);
} catch (error) {
  console.error("Error Getting Root",error);
  res.status(500).json({error:'Failed to get root'});
}


});


// similarly make for getting all users etc 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});