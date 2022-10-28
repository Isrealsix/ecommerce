import asyncHandler from 'express-async-handler';
import User from '../models/userModel';

/**
 * @desc 	Auth user & get token
 * @route POST /api/users/login
 * @access Public
 */
const authUser = asyncHandler(async (req, res) => {
	
});