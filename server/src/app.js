const express = require("express");
const bcrypt = require('bcrypt')
const app = express();
const cors = require('cors')
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5100;
const mongoose = require('mongoose');
const { MONGO_URI } = require('./db/connect');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const models = require("./models/schema");
const multer = require('multer');


app.use(cors());



// user schema
app.post('/register', async (req, res) => {
    try {
        const { firstname, lastname, username, phone,type, email, password } = req.body;
        const user = await models.Customer.findOne({ email });

        if (user) {
            return res.status(400).send('User already exists');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user object
        const newUser = new models.Customer({
            firstname,
            lastname,
            username,
            phone,
            type,
            email,
            password: hashedPassword
        });

        // Save the new user to the database
        const userCreated = await newUser.save();
        console.log(userCreated, 'user created');
        return res.status(201).send('Successfully Registered');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server Error');
    }
});


app.post('/login', async (req, res) => {
    const {email, password } = req.body;
    const user = await models.Customer.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isAdmin = email == 'virat@gmail.com' && password == 'virat@1234';
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    if(!isAdmin && user.type === 'agent'){
        const agentToken = jwt.sign( {userId: user._id}, 'agenttoken');
        res.json({ user, agentToken });
    }else if (!isAdmin && user.type === 'user') {
        const token = jwt.sign({ userId: user._id }, 'mysecretkey1');
        res.json({ user, token });
    }else if (user.type === 'admin'){
        const jwtToken = jwt.sign({ userId: user._id }, 'mysecretkey2');
        res.json({ user, jwtToken });
    }
});


app.get('/users', async (req, res) => {
    try {
        const users = await models.Customer.find();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server Error');
    }
});



app.post('/complaints', async (req, res) => {
    try {
        // Extract the customer and complaint details from the request body
        const { customer, complaintDetails } = req.body;

        // Create a new complaint instance
        const newComplaint = new models.Complaint({
            customer,
            complaintDetails,
            createdAt: new Date()
        });

        // Save the new complaint to the database
        const savedComplaint = await newComplaint.save();

        res.status(201).json(savedComplaint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.put('/complaints/:id/update-status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        // Find the complaint by ID
        const complaint = await models.Complaint.findById(id);

        if (!complaint) {
            return res.status(404).json({ error: 'Complaint not found' });
        }

        // Update the status of the complaint
        complaint.status = status;

        // Save the updated complaint to the database
        const updatedComplaint = await complaint.save();

        res.status(200).json(updatedComplaint);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



app.get('/complaints', async (req, res) => {
    try {
        // Retrieve all complaints from the database
        const complaints = await models.Complaint.find();

        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/complaints/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Retrieve complaints for the specified userId from the database
        const complaints = await models.Complaint.find({ customer: userId });

        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Create a new agent
app.post('/agents', async (req, res) => {
    try {
      const { name } = req.body;
  
      // Create a new agent object
      const newAgent = new models.Agent({
        name
      });
  
      // Save the new agent to the database
      const agentCreated = await newAgent.save();
      console.log(agentCreated, 'agent created');
      return res.status(201).json(agentCreated);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Server Error' });
    }
  });


app.get('/agents', async (req, res) => {
    try {
      const users = await models.Agent.find();
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server Error');
    }
  });
  




app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


module.exports = app;