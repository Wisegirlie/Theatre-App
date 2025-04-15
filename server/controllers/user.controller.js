import User from '../models/user.model.js';

//create User
export const createUser = async (req, res) => {

  const { name, email, password } = req.body;
  try {
    const existingUsername = await User.findOne({ name });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const existingEmail = await User.findOne({email});
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' })
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
    const users = await User.find({});
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

    res.status(500).json({ message: 'Error fetching user', error });
  }
}

// Update a User
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found." });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: "Error updating user: " + err.message });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    // res.json({acknowledged: deletedProduct.acknowledged, deletedCount: deletedProduct.deletedCount});
    res.json({ message: 'User deleted.' });
  } catch (err) {
    res.status(500).json({ error: "Error deleting product by Id." });
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