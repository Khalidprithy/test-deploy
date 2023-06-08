import prisma from '../../prisma/index.js';

export const createTest = async (req, res) => {
    console.log('Inside find all user');
    try {
        const users = await prisma.User.create();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
