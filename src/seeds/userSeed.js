import { config } from 'dotenv'
import { DB } from '../utils/index.js'
import Usermodel from '../modules/User.js'
import bcrypt from 'bcrypt'

config()
async function password(password) {
	const salt = await bcrypt.genSalt(10)
	const hash = await bcrypt.hash(password, salt)
	return String(hash)
}

const seedUsers = [
	{
		email: 'test@test.com',
		name: 'Никита',
		passwordHash: await password('qweqwe'),
		UserID: '12',
	},
	{
		email: 'olivia.miller@example.com',
		name: 'Olivia',
		surname: 'Miller',
		passwordHash: await password('123456'),
		UserID: '123',
	},
	{
		email: 'sophia.davis@example.com',
		name: 'Sophia',
		surname: 'Davis',
		passwordHash: await password('123456'),
		UserID: '1234',
	},
	{
		email: 'ava.wilson@example.com',
		name: 'Ava',
		passwordHash: await password('123456'),
		UserID: '12345',
	},
	{
		email: 'isabella.brown@example.com',
		name: 'Isabella',
		surname: 'Brown',
		passwordHash: await password('123456'),
		UserID: '123456',
	},
	{
		email: 'amelia.garcia@example.com',
		name: 'Amelia',
		surname: 'Garcia',
		passwordHash: await password('123456'),
		UserID: '1234567',
	},

	{
		email: 'james.anderson@example.com',
		name: 'James',
		passwordHash: await password('123456'),
		UserID: '12345678',
	},
	{
		email: 'william.clark@example.com',
		name: 'William',
		surname: 'Clark',
		passwordHash: await password('123456'),
		UserID: '123456789',
	},
	{
		email: 'benjamin.taylor@example.com',
		name: 'Benjamin',
		surname: 'Taylor',
		passwordHash: '123456',
		UserID: '12345678910',
	},
	{
		email: 'lucas.moore@example.com',
		name: 'Lucas',
		surname: 'Moore',
		passwordHash: await password('123456'),
		UserID: '1234567891011',
	},
	{
		email: 'henry.jackson@example.com',
		name: 'Henry',
		surname: 'Jackson',
		passwordHash: await password('123456'),
		UserID: '123456789101112',
	},
	{
		email: 'alexander.martin@example.com',
		name: 'Alexander',
		surname: 'Martin',
		passwordHash: await password('123456'),
		UserID: '12345678910111213',
	},
]

const seedDatabase = async () => {
	try {
		await DB.connectDB()

		await Usermodel.insertMany(seedUsers)
		console.log('Database seeded successfully')
	} catch (error) {
		console.error('Error seeding database:', error)
	}
}

// Call the function
seedDatabase()
