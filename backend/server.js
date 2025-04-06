import express from 'express';
import cors from 'cors';
import connectToDatabase from './db.js'; 
import bcrypt from 'bcrypt'
import session from 'express-session'

const app = express();
const PORT = 5000; // ull see this in the url used to access backend


app.use(cors()); 
app.use(express.json()); 


// we created a backend route see 
app.get('/api/users', async (req, res) => {
  try {
    const pool = await connectToDatabase(); 
    const result = await pool.request().query('SELECT * FROM Users'); 
    res.json(result.recordset); 
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users.' });
  } 
});
app.get('/api/games', async (req, res) => {
  try {
    const pool = await connectToDatabase(); 
    const result =  pool.request().query('SELECT * FROM Games', (err,results)=>{

      if(err)throw err ; 

      if(results.length>0)
      console.log(results);
      else
      console.error("Nothing matched Query!");
    }); 
    res.json(result.recordset); 
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

app.get('/',async(req,res)=>{
try {
 const result = 'HEllo world';
 const pool = await connectToDatabase(); 
 res.send(result);
} catch (error) {
  console.error("Error Getting Root",error);
  res.status(500).json({error:'Failed to get root'});
}

});

// all login logic, mw goes here

app.post('/login',async (req,res)=>{
try {

  const user = {name:req.body.name, password: req.body.password, email: req.body.email}
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(user.password,salt);
  console.log(salt, hashedPassword);
  const pool = await connectToDatabase();

  console.log(user);
  const result = await pool.query(
    `insert into Users (username,password,email) values
    ( '${user.name}', '${hashedPassword}', '${user.email}');
    `);

    try {
      if(result){
        res.status(201).send("Entered values successfully");
      }
    } catch (error) {
      res.status(400).send("Entered values failed",error.message);
    }
  //   if(result){
  //     res.status(201).send("Entered values successfully");
  //   }
  // else
  //   res.status(400).send("Entered values failed",error.message);
} catch (error) {
  console.log("Error inputting",error, error.message);
  res.status(418).send("didnt work");
}
})

app.post('/users/verify',async(req,res)=>{
const currentPassword = req.body.password;
const pool = await connectToDatabase();

const user = await pool.query(`select * from Users where Users.username = '${req.body.name}' ` 
  , function(error, res){

    if (error) throw error; 
    console.log("found: ",user);
  });
  // user found 

try {
    if (await bcrypt.compare(req.body.password,user.password)){

      res.send("Success... Redirecting");
    }else {

      res.send("Denied ... Login again");

    }

} catch (error) {
  console.log("Error comparing",error, error.message);
    res.status(500).send("Failed to cmp passwords");
}
})

function isLoggedIn (req, res, next){
if(req.session && req.session.user){
  return next();
}
res.status(401).send("unauthorized");
}

app.get('api/home',isLoggedIn,(req,res)=>{
  console.log(`Welcome ,${req.session.user.username} !`)
  res.json(req.session.user);
})

app.all('/secret',(req,res)=>{
  console.log("Accessing the Secret Page...");
})




// similarly make for getting all users etc 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});