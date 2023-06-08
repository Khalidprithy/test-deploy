import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../prisma/index.js';

export const createUser = async (req, res) => {
    console.log('Inside create user');
    try {
        const { email, password, adminType } = req.body;
        console.log(req.body);
        const existingUser = await prisma.User.findUnique({
            where: {
                email: email
            }
        });

        if (existingUser) {
            return res.status(409).send({ message: 'Email already in use' });
        }

        // Generate salt
        const salt = await bcrypt.genSalt(10);

        // Hash password
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.User.create({
            data: {
                email,
                password: hashedPassword,
                adminType
            }
        });

        const token = jwt.sign(
            { email: user.email, adminType: user.adminType },
            process.env.SECRET_TOKEN,
            { expiresIn: '1h' }
        );

        return res
            .status(201)
            .send({ message: 'Admin created successful', token });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .send({ message: 'Failed to create admin, Try again' });
    }
};

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.User.findUnique({ where: { email: email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const match = await bcrypt.compare(password, user.password);

        if (user && match) {
            const token = jwt.sign(
                { email: user.email, adminType: user.adminType },
                process.env.SECRET_TOKEN,
                { expiresIn: '1h' }
            );
            res.json({ message: 'Login successful', token });
        } else {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
