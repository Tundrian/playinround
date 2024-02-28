import express from 'express';
const router = express.Router()
import {authUser,registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,} from '../controllers/userController.js';

// uses the express router, adds a post request to '/auth' that calls the authUser controller function that is imported
router.post('/', registerUser)
router.post('/auth', authUser)
router.post('/logout', logoutUser)
router.route('/profile').get(getUserProfile).put(updateUserProfile)

// exports the entire router with all added methods/routes

export default router;
