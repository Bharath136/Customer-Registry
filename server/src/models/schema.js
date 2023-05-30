// Import required modules
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({ 
    firstname: { type: String, required: true }, 
    lastname: { type: String, required: true }, 
    username: { type: String, required: true }, 
    phone: { type: String, required: true }, 
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true }, 
});

const complaintSchema = new mongoose.Schema({ 
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true }, 
    complaintDetails: { type: String, required: true }, 
    status: { type: String, default: 'pending' }, 
    createdAt: { type: Date, default: new Date() } 
});

const agentSchema = new mongoose.Schema({ 
    name: { type: String, required: true }, 
});

const communicationSchema = new mongoose.Schema({ 
    sender: { type: mongoose.Schema.Types.ObjectId, required: true }, 
    receiver: { type: mongoose.Schema.Types.ObjectId, required: true }, 
    message: { type: String, required: true }, 
    createdAt: { type: Date, default: new Date() } 
});

const analyticsSchema = new mongoose.Schema({ /* Fields for generating reports and analytics */ });


// Define models using the schemas
const Customer = mongoose.model('Customer', customerSchema);
const Complaint = mongoose.model('Complaint', complaintSchema);
const Agent = mongoose.model('Agent', agentSchema);
const Communication = mongoose.model('Communication', communicationSchema);
const Analytics = mongoose.model('Analytics', analyticsSchema);

// Export the models
module.exports = {
    Customer,
    Complaint,
    Agent,
    Communication,
    Analytics
};
