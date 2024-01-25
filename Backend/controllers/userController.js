
const { User } = require('../models/User');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const JWT_SECRET=process.env.JWT_SECRET


// CRUD operations for User

// Controller for registering new user
const createUser = async (req, res) => {
    const { username, email, password }=req.body
    try {
        // Check if the email is already in use
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).send({ message: 'Email already in use' });
        }

        //Hashing the password using "bcrypt" NPM Package 
        const hashedPassword = await bcrypt.hash(password, 4);

        // Creating a new user
        const user = new User({ username, email, password: hashedPassword })
        await user.save()

        // Creating and sending a JWT token for authentication
        const token = jwt.sign({ username: user.username, email: user.email, userId: user._id }, JWT_SECRET);
        return res.status(201).send({ message:"User Registration Successful",token })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


// Controller function to log in an existing user and obtain a token
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by username and password
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).send({ message: 'User not found, Kindly register.' });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).send({ message: 'Incorrect Password.' });
        }
        // Create and send a JWT token for authentication
        const token = jwt.sign({ username: user.username, email: user.email, userId: user._id }, JWT_SECRET);
        res.status(200).send({message:"Login Successfull", token, username: user.username, email: user.email, userId: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
};


// Retrieving User information and their Movie in Watchlist
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('watchlist');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Users
const getUsers = async (req, res) => {
    try {
      const users = await User.find().populate('watchlist');
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

//   Update User
  const updateUser = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).send({message:"User Updated Succesfully",user});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
//   Delete a User
  const deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Add to Watchlist functionality
const add_to_Watchlist = async (req, res) => {
  try {
    const {movieId}=req.body
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { watchlist: movieId } },
      { new: true }
    ).populate('watchlist');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).send({message:"Movie Added to Watchlist",user});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove from Watchlist functionality
const remove_from_Watchlist = async (req, res) => {
  try {
    const {movieId}=req.body
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { watchlist: movieId } },
      { new: true }
    ).populate('watchlist');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).send({message:"Movie removed from Watchlist",user});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    createUser,
    getUserById,
    loginUser,
    getUsers,
    updateUser,
    deleteUser,
    add_to_Watchlist,
    remove_from_Watchlist
};