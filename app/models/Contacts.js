const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fullname: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  subject: { 
    type: String, 
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  }
}, { timestamps: true });

// Check if the model is already compiled
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

module.exports = Contact;
