import prisma from '../../prisma/index.js';

// Get news
export const getNews = async (req, res) => {
    console.log('Inside find all news');
    try {
        const allNews = await prisma.Highlight.findMany();

        return res.status(200).send(allNews);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Failed to find news, Try again' });
    }
};
