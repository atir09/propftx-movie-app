
const express = require('express');
const userRouter = express.Router();
const {authenticateUser}=require("../middleware/authMiddleware")
const { createUser,
    getUserById,
    loginUser,
    getUsers,
    updateUser,
    deleteUser,
    add_to_Watchlist,
    remove_from_Watchlist
} = require('../controllers/userController');

// User routes
userRouter.post('/register', createUser);
userRouter.post('/login', loginUser)

// .............................Protected Routes(requires Authentication).........................................
userRouter.get('/', authenticateUser,getUsers);
userRouter.get('/:userId', authenticateUser,getUserById);
userRouter.put('/:userId', authenticateUser,updateUser);
userRouter.delete('/:userId', authenticateUser,deleteUser);
// Add or remove Movie from Watchlist
userRouter.post("/:userId/watchlist", authenticateUser,add_to_Watchlist)
userRouter.delete("/:userId/watchlist", authenticateUser,remove_from_Watchlist)
// ...............................................................................................................


module.exports = { userRouter };