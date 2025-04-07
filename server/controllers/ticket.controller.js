import Ticket from '../models/ticket.model.js'; 
import User from '../models/user.model.js';
import Event from '../models/event.model.js';
import mongoose from 'mongoose';

// Create Ticket
export const createTicket = async (req, res) => {
    const { userName, eventTitle, numberTickets } = req.body;
    
    try {
      
      const user = await User.findOne({ name: userName });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      
      const event = await Event.findById(eventTitle);
      if (!event) {
        return res.status(400).json({ message: 'Event not found' });
      }
  
      
      const ticket = await Ticket.create({ userName: user._id, eventTitle, numberTickets });
      res.status(201).json(ticket);
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  
// Delete Ticket by ID
export const deleteTicketById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const ticket = await Ticket.findByIdAndDelete(id);
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
      res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
// Get All Tickets
export const getAllTickets = async (req, res) => {
    try {
      const tickets = await Ticket.find().populate('userName').populate('eventTitle');
      res.status(200).json(tickets);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Update Ticket by ID
export const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { numberTickets } = req.body;
  
  try {
    
    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { numberTickets },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json(ticket);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Ticket Count
export const ticketCount = async (req,res) =>{
  try {
    const count = await Ticket.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const getUserEventsAndTickets = async (req, res) => {
  const userId = req.params.userId;


  try {
    const userEventsAndTickets = await Ticket.aggregate([
      {
        $match: { userName: mongoose.Types.ObjectId.createFromHexString(userId) }
      },
      {
        $lookup: {
          from: 'events',
          localField: 'eventTitle',
          foreignField: '_id',
          as: 'eventDetails'
        }
      },
      {
        $unwind: '$eventDetails'
      },
      {
        $project: {
          _id: 0,
          eventTitle: '$eventDetails.title',
          numberTickets: '$numberTickets'
        }
      }
    ]);



    res.status(200).json(userEventsAndTickets);
  } catch (error) {

    res.status(500).json({ message: 'Error retrieving user events and tickets' });
  }
};


// Create Ticket for User Purchase
export const createTicketForUser = async (req, res) => {
  const { userId, eventTitle, numberTickets } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const event = await Event.findById(eventTitle);
    if (!event) {
      return res.status(400).json({ message: 'Event not found' });
    }

    const ticket = await Ticket.create({ userName: user._id, eventTitle, numberTickets });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
