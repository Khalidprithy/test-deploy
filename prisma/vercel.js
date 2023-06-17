import { PrismaClient } from '@prisma/client';

// Instantiate PrismaClient with the appropriate connection settings
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL // Use the environment variable provided by Vercel
        }
    }
});

export default prisma;
