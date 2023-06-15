import prisma from '../../prisma/index.js';

// Helper
function exclude(user, keys) {
    for (let key of keys) {
        delete user[key];
    }
    return user;
}

// Helper
function excludeMany(users, keys) {
    let allUsers = [];
    users?.map(user => {
        for (let key of keys) {
            delete user[key];
        }
        allUsers.push(user);
    });
    return allUsers;
}

// Find all users
export const findAllUser = async (req, res) => {
    console.log('Inside find all user');
    try {
        const users = await prisma.User.findMany();
        const usersWithoutPassword = excludeMany(users, ['password', 'salt']);
        res.json(usersWithoutPassword);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Find admin by ID
export const findUser = async (req, res) => {
    console.log('Inside find one user');

    const id = req.params.id;
    try {
        const user = await prisma.User.findUnique({
            where: { id: id }
        });
        const userWithoutPassword = exclude(user, ['password', 'salt']);

        if (!user) {
            res.status(404).send("Admin doesn't exists");
        } else {
            res.json(userWithoutPassword);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Update admin profile
export const updateUser = async (req, res) => {
    console.log('Inside update profile');
    const id = req.params.id;
    const updatedUser = req.body;

    try {
        const user = await prisma.User.update({
            where: {
                id: id
            },
            data: {
                name: updatedUser.name,
                email: updatedUser.email,
                image: updatedUser.image
            }
        });
        const { password, hashedPassword, ...userInfo } = user;
        res.json(userInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Update a admin info
export const updateUserAdmin = async (req, res) => {
    console.log('Inside update admin');
    const id = req.params.id;

    const updatedAdmin = req.body;

    console.log('Updated User', updateUser);
    try {
        const admin = await prisma.User.update({
            where: {
                id: id
            },
            data: {
                name: updatedAdmin.name,
                email: updatedAdmin.email,
                image: updatedAdmin.image,
                adminType: updatedAdmin.adminType,
                status: updatedAdmin.status
            }
        });
        const { password, hashedPassword, salt, ...adminInfo } = admin;
        res.json(adminInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Delete a admin
export const deleteUser = async (req, res) => {
    console.log('Inside delete user');
    const id = req.params.id;
    try {
        await prisma.User.delete({
            where: {
                id: id
            }
        });
        res.status(200).json({ Message: 'Admin Deleted Successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
