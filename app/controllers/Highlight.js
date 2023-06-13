import prisma from '../../prisma/index.js';

// Create highlight
export const createHighlight = async (req, res) => {
    console.log('Inside create highlight');
    const highlightData = req.body;
    try {
        const createdHighlight = await prisma.Highlight.create({
            data: {
                title: highlightData?.title,
                shortDescription: highlightData?.shortDescription,
                status: highlightData?.status,
                youtubeUrl: highlightData?.youtubeUrl,
                youtubeThumbnail: highlightData?.youtubeThumbnail,
                videoType: highlightData?.videoType,
                thumbnailType: highlightData?.thumbnailType,
                imageUrl: highlightData?.imageUrl,
                imageFile: highlightData?.imageFile
            }
        });

        return res.status(200).send(createdHighlight);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Failed to create highlight, Try again' });
    }
};

// Get all highlights
export const getAllHighlight = async (req, res) => {
    try {
        const highlights = await prisma.Highlight.findMany();
        return res.status(200).send(highlights);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Failed to fetch highlights, Try again' });
    }
};

// Find single highlight
export const getSingleHighlight = async (req, res) => {
    const id = req.params.id;
    try {
        const highlight = await prisma.Highlight.findUnique({
            where: {
                id: id
            }
        });
        return res.status(200).send(highlight);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Failed to fetch highlight, Try again' });
    }
};

// Update a highlight
export const updateHighlight = async (req, res) => {
    console.log('Inside update highlight');
    const id = req.params.id;
    const updatedHighlightData = req.body;
    try {
        const updatedHighlight = await prisma.Highlight.update({
            where: { id: id },
            data: {
                title: updatedHighlightData?.title,
                shortDescription: updatedHighlightData?.shortDescription,
                status: updatedHighlightData?.status,
                youtubeUrl: updatedHighlightData?.youtubeUrl,
                youtubeThumbnail: updatedHighlightData?.youtubeThumbnail,
                videoType: updatedHighlightData?.videoType,
                thumbnailType: updatedHighlightData?.thumbnailType,
                imageUrl: updatedHighlightData?.imageUrl,
                imageFile: updatedHighlightData?.imageFile
            }
        });
        return res.status(200).send(updatedHighlight);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Failed to update highlight, Try again' });
    }
};

// Delete a highlight
export const deleteHighlight = async (req, res) => {
    console.log('Inside delete highlight');
    const id = req.params.id;
    try {
        await prisma.Highlight.delete({
            where: {
                id: id
            }
        });
        return res.status(200).send({ message: 'Highlight deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Failed to update highlight, Try again' });
    }
};
