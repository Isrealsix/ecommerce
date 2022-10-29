import bcrypt from 'bcryptjs'
const users = [
	{
		name: 'Admin Himself',
		email: 'adhim@mern.com',
		password: bcrypt.hashSync('1234', 10),
		isAdmin: true
	},
	{
		name: 'Bella perry',
		email: 'bella@gmail.com',
		password: bcrypt.hashSync('1234', 10),
	},
	{
		name: 'Lizza Chelovek',
		email: 'Lizza@gmail.com',
		password: bcrypt.hashSync('1234', 10),
	}
]

export default users