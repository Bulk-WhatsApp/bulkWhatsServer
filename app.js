// Import required modules
const http = require('http');
const path = require('path');
const express = require('express');
var cron = require('node-cron');
const { sendMessage } = require('./controller/cronController');
const { clientArray, intializeClient } = require('./controller/webWhatsController');
const userRouter = require('./router/userRouters');
const apiRouter = require('./router/apiRouter');
const socketIO = require('socket.io');
const { authSocket } = require('./middleware/auth');
const date = require('date-and-time');



// Load environment variables from the .env file
require('dotenv').config();

// Set the port for the server
const port = process.env.PORT || 3001;

// Create an Express application
const app = express();

const server = http.createServer(app);

const io = socketIO(server);


// Enable JSON parsing for incoming requests
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// Middleware to log HTTP requests
app.use((req, res, next) => {
    //console.log("HTTP Request - " + req.method + "     URL - " + req.url);
    next();
});

// Routes
app.use('/users', userRouter);
app.use('/api', apiRouter);

// Root endpoint
app.get('/', (req, res) => {
    res.send("Welcome to Bulk Whats App Application.");
});

// Schedule cron expression


  
// Socket.IO event handling
io.on('connection', (socket) => {

    const authToken = socket.handshake.auth.token;
    /**
     * Get The request from the user of get the request connect the socket
     * It's a long-running operation, so we use Socket for real-time updates.
     * @createdBy: Sourabh
     * @createdOn: 20 Aug 2023
    */
    var user = authSocket(authToken)

    
    
    if(user)
    {
        socket.on('WhatsApp', (userId) => {
            intializeClient(userId,user,io)
          });
    
        
    }
    else {
        // Authentication failed, disconnect the client
        socket.disconnect(true);
      }

      // Handle disconnection
      socket.on('disconnect', () => {
        //console.log('A client disconnected');
    });

    
});



// Start the server
server.listen(port, () => {
    console.log("Server started on port " + port);
});

const cronExpression1 = '*/1 9-19 * * *';

clientArray()

//sendMessage()

cron.schedule('*/1 9-19 * * *', () => {
   // const now = new Date();
//console.log(date.format(now, 'YYYY-MM-DD HH:mm:ss'));
   sendMessage()
  
  });
