import User from '../models/user.model.js';
import Ticket from '../models/ticket.model.js';

//create User
export const createUser = async (req, res) => {

  const { firstName, lastName, userName, email, password } = req.body;
  try {
    const existingUsername = await User.findOne({ userName });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already in use.\nPlease select a different one.' });
    }

    const existingEmail = await User.findOne({email});
    if (existingEmail) {
      return res.status(400).json({ message: 'This user is already registered' })
    }
    const user = await User.create(req.body);
    res.status(201).json(user);
    

  } catch(error) {
    res.status(500).json({ message: error.message });
  }
};

//get AllUsers
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ email: 1 });
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users: ', error });
  }
};

//get User by ID
export const getUser = async (req, res) => {

  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(`User fetch failed for ID ${req.params.id}`, error);
    res.status(500).json({ message: 'Error fetching user: ', error });

  }
}

// Update a User
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: "Error updating user: " + err.message });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    
    // First, check if user exists
    const userToDelete = await User.findById(userId);
    if (!userToDelete) return res.status(404).json({ message: 'User not found' });
    
    // Delete all tickets associated with this user
    // Ticket restoration to events is handled automatically by Mongoose middleware
    const ticketDeletionResult = await Ticket.deleteMany({ userName: userId });
    console.log(`Deleted ${ticketDeletionResult.deletedCount} ticket entries for user ${userId}`);
    
    // Then delete the user
    const deletedUser = await User.findByIdAndDelete(userId);
    
    res.json({ 
      message: 'User deleted', 
      ticketsDeleted: ticketDeletionResult.deletedCount 
    });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: "Error deleting User by Id." });
  }
};

//User Count
export const usersCount = async (req,res) => {  
  try {
    const count = await User.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}