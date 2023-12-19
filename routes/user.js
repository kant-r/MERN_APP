import express from 'express';
import { userLogin, userLogout, userRegister, userProfile} from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';
const router = express.Router();


// User Register Route
router.post('/register', userRegister)

// User Login Route
router.post('/login', userLogin)

// User Logout Route
router.get('/logout', userLogout)

// User Profile Route
router.get('/myprofile', isAuthenticated, userProfile)

export default router;