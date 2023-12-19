import express from 'express';
import { userLogin, userLogout, userRegister, userProfile, getUserById} from '../controllers/user.js';
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

router.get('/:id',getUserById);

export default router;