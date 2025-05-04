
import express from 'express';
import cors from 'cors';
import connectToDatabase from './db.js'; 
import bcrypt from 'bcrypt'
import session from 'express-session'
import sql from 'mssql';
import { createClient } from 'redis';
import { RedisStore } from 'connect-redis';


const app = express();
const PORT = 5000; // ull see this in the url used to access backend

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  exposedHeaders: ['set-cookie'] // Ensure cookies can be set
}));


const redisClient = createClient({
  url: 'redis://localhost:6379'
});

await redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient,
  prefix: 'session:'
});


//session config
app.use(session({
  store: redisStore,
  secret: "hello world", 
  resave: false,
  saveUninitialized: false,
   cookie: {
    secure: false,
    httpOnly: true,
    sameSite:"lax",
    maxAge: 1000 * 60 * 60 * 24 
  }

}));

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
app.post('/api/signup', async (req, res) => {
  try {
    const user = { username: req.body.username, password: req.body.password };

    if (!user.username || !user.password) {
      return res.status(400).json({ result: "fail", message: "Username and password are required" });
    }

    const pool = await connectToDatabase();

    
    const existingUser = await pool.request()
      .input('username', sql.VarChar, user.username)
      .query("SELECT * FROM Users WHERE username = @username");

    if (existingUser.recordset.length > 0) {
      return res.status(400).json({ result: "fail", message: "Username already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);

    // Insert new user
    const result = await pool.request()
      .input('username', sql.VarChar, user.username)
      .input('password', sql.VarChar, hashedPassword)
      .query(`INSERT INTO Users (username, password) OUTPUT INSERTED.id, INSERTED.username VALUES (@username, @password)`);

    if (!result.recordset || result.recordset.length === 0) {
      return res.status(400).json({ result: "fail", message: "Registration failed" });
    }

    const newUser = result.recordset[0];

    req.session.user = {
      id: newUser.id,
      username: newUser.username
    };

    res.status(201).json({ result: "success", message: "User created!", user: newUser });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ result: "error", message: error.message, err: error.stack });
  }
});

app.post('/api/signin',async(req,res)=>{


  try {
    
    const requser = {username:req.body.username, password: req.body.password}

    if(!requser.username || !requser.password){
      return res.status(400).json({result:"fail", message:"username and password are required"})
    }
      const pool =await connectToDatabase();
      
      const result = await pool.request()
      .input('username',sql.VarChar,requser.username)
      .query( "SELECT * FROM Users WHERE username = @username")

      if(!result.recordset || result.recordset.length  === 0){
        return res.status(401).json({result:"fail",message:"No user with this username found"})
      }

      const user = result.recordset[0];

      const match = await bcrypt.compare(req.body.password,user.password);

      if(!match){
        return res.status(401).json({result:"fail",message:"Invalid password"});
      }

      req.session.user={
        id:user.id,
        username:user.username
      }

      res.json({message:"successful Login!"});

  } catch (error) {
      console.error('Login error: ',error, req.body);
      res.status(500).json({result:"error",message:`${error,error.message}`,req:req.body,err:error.stack})
  }

});


function isLoggedIn (req, res, next){
  
if(req.session.user){
  return res.json({user:req.session.user});
}
res.status(401).json({message:"unauthorized"});
}

app.get('/api/auth',isLoggedIn,(req,res)=>{
  console.log(`Welcome ,${req.session.user.username} !`)
  res.json({
      user:req.session.user
  });
})

app.get('/api/test-session', (req, res) => {
  req.session.test = 'working';
  res.json({ session: req.session });
});

// app.all('/secret',(req,res)=>{
//   console.log("Accessing the Secret Page...");
// })


// similarly make for getting all users etc 


// remaining apis 


//get user lib

app.get('/api/library', async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request()
      .input('userId', sql.Int, req.session.user.id)
      .query(`
        SELECT * FROM Games WHERE id IN (
          SELECT game_id FROM Purchases WHERE user_id = @userId
        )
      `);
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching library:', error);
    res.status(500).json({ error: `Failed to fetch user library ${req.session.user }`});
  }
});


// search 

app.get('/api/games/search', async (req, res) => {
  try {
    const searchTerm = `%${req.query.title}%`;
    const pool = await connectToDatabase();
    const result = await pool.request()
      .input('title', sql.VarChar, searchTerm)
      .query('SELECT * FROM Games WHERE title LIKE @title');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error searching games:', error);
    res.status(500).json({ error: 'Failed to search games' });
  }
});

app.get('/api/users/search', async (req, res) => {
  try {
    const searchTerm = `%${req.query.title}%`;
    const pool = await connectToDatabase();
    const result = await pool.request()
      .input('title', sql.VarChar, searchTerm)
      .query('SELECT * FROM Users WHERE username LIKE @title');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ error: 'Failed to search users' });
  }
});


// Filter Games by Most Sold
app.get('/api/games/most-sold', async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query(`
      SELECT Games.id, COUNT(Purchases.id) AS sales 
      FROM Games
      LEFT JOIN Purchases ON Games.id = Purchases.game_id
      GROUP BY Games.id
      ORDER BY sales DESC
    `);
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching most sold games:', error);
    res.status(500).json({ error: 'Failed to fetch most sold games' });
  }
});

// by name

app.get('/api/games/name', async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query(`
      SELECT * FROM Games 
      ORDER BY title ASC
    `);
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching games alphabetically:', error);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

// Fetch All Friends
app.get('/api/friends', async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request()
      .input('userId', sql.Int, req.session.user.id)
      .query(`
        SELECT Users.* FROM Users
        JOIN Friends ON Users.id = Friends.friend_id
        WHERE Friends.user_id = @userId
      `);
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching friends:', error);
    res.status(500).json({ error: 'Failed to fetch friends list' });
  }
});


// Get Comments for a Game
app.get('/api/games/:gameId/comments', async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const result = await pool.request()
      .input('gameId', sql.Int, req.params.gameId)
      .query('SELECT * FROM Comments WHERE game_id = @gameId');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching game comments:', error);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});


app.post('/api/friends/add', async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    
    if (!userId || !friendId) {
      return res.status(400).json({ result: "fail", message: "Both userId and friendId are required." });
    }

    
    if (userId === friendId) {
      return res.status(400).json({ result: "fail", message: "You cannot add yourself as a friend." });
    }

    const pool = await connectToDatabase();

    
    const existingFriendship = await pool.request()
      .input('userId', sql.VarChar, userId)
      .input('friendId', sql.VarChar, friendId)
      .query(`
        SELECT * FROM Friends WHERE user_id = @userId AND friend_id = @friendId
      `);

    if (existingFriendship.recordset.length > 0) {
      return res.status(400).json({ result: "fail", message: "Friendship already exists." });
    }

    
    await pool.request()
      .input('userId', sql.VarChar, userId)
      .input('friendId', sql.VarChar, friendId)
      .query(`
        INSERT INTO Friends (user_id, friend_id) VALUES (@userId, @friendId);
      `);

    await pool.request()
      .input('userId', sql.VarChar, friendId)
      .input('friendId', sql.VarChar, userId)
      .query(`
        INSERT INTO Friends (user_id, friend_id) VALUES (@userId, @friendId);
      `);

    res.status(201).json({ result: "success", message: "Friend added successfully!" });

  } catch (error) {
    console.error("Error adding friend:", error);
    res.status(500).json({ result: "error", message: error.message, err: error.stack });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to log out" });
    }
    res.clearCookie('connect.sid'); // Clear session cookie
    res.status(200).json({ message: "Logged out successfully" });
  });
});


// Get Common Games Between Friends
app.get('/api/users/:userId/common-games/:friendId', async (req, res) => {
  try {
    const { userId, friendId } = req.params;
    const pool = await connectToDatabase();

    // First verify they are mutual friends
    const friendshipCheck = await pool.request()
      .input('userId', sql.Int, userId)
      .input('friendId', sql.Int, friendId)
      .query(`
        SELECT 1 FROM Friends 
        WHERE (user_id = @userId AND friend_id = @friendId)
        AND EXISTS (
          SELECT 1 FROM Friends 
          WHERE user_id = @friendId AND friend_id = @userId
        )
      `);

    if (friendshipCheck.recordset.length === 0) {
      return res.status(400).json({ 
        result: "fail", 
        message: "Users are not mutual friends or friendship doesn't exist" 
      });
    }

    const result = await pool.request()
      .input('userId', sql.Int, userId)
      .input('friendId', sql.Int, friendId)
      .query(`
        SELECT Games.* FROM Games
        JOIN Purchases AS p1 ON Games.id = p1.game_id
        JOIN Purchases AS p2 ON Games.id = p2.game_id
        WHERE p1.user_id = @userId AND p2.user_id = @friendId
      `);

    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching common games:", error);
    res.status(500).json({ error: "Failed to fetch common games" });
  }
});

app.get('/api/comments/user/:userId', async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const userId = req.params.userId;

    const result = await pool.request()
      .input('userId', sql.Int, userId)
      .query(`
        SELECT * FROM Comments WHERE user_id = @userId
      `);

    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching user comments:", error);
    res.status(500).json({ error: "Failed to fetch user comments" });
  }
});


app.get('/api/games/publisher/:publisherId', async (req, res) => {
  try {
    const pool = await connectToDatabase();
    const publisherId = req.params.publisherId;

    const result = await pool.request()
      .input('publisherId', sql.VarChar, publisherId)
      .query(`
        SELECT Games.*, Publishers.*
        FROM Games
        FULL OUTER JOIN Publishers ON Games.publisher = Publishers.id
        WHERE Publishers.id = @publisherId
      `);

    res.json(result.recordset);
  } catch (error) {
    console.error("Error fetching games by publisher:", error);
    res.status(500).json({ error: "Failed to fetch games by publisher" });
  }
});

app.get('api/games/:gameId',async(req,res)=>{
  try {
    const pool = await connectToDatabase();
    const gameId = req.params.gameId
    const result = await pool.request()
    .input('gameId',sql.VarChar,gameId)
    .query(`
      select * 
      from Games
      Where Games.id = @gameId

      `)
      res.json(result.recordset);
  } catch (error) {
    console.log({message:error})
  }
})



// home apis 

app.get('/api/home/recommended', async(req,res)=>{
  try {
    const pool = await connectToDatabase();
    const result = await pool.request().query(`
      SELECT TOP 6 *
      FROM Games
      ORDER BY NEWID();
      `)

      if (result.recordset.length===0){
        return res.status(404).json({ message: 'No games found' });
      }

      res.status(200).json(result.recordset);

  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch recommended games',
      details: error.message
    });
  }
})


// trending 



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});