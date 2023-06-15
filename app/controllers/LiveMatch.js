import prisma from '../../prisma/index.js';

// Add match data
export const createLiveMatch = async (req, res) => {
    console.log('Inside create match');
    const matchData = req.body;

    let streamingData = [];

    console.log('Streaming data', streamingData);

    try {
        // Check headers
        matchData?.streamingSources?.map(source => {
            streamingData.push({
                streamTitle: source?.streamTitle,
                streamType: source?.streamType,
                resulation: source?.resulation,
                platform: source?.platform,
                isPremium: source?.isPremium,
                portraitWatermark: source?.portraitWatermark,
                landscapeWatermark: source?.landscapeWatermark,
                streamUrl: source?.streamUrl,
                streamKey: source?.streamKey,
                headers: source?.streamType === 'Restricted' ? source?.headers : ''
            });
        });

        // Create Match
        const createdMatch = await prisma.Match.create({
            data: {
                matchTime: matchData?.matchTime,
                matchTitle: matchData?.matchTitle,
                teamOneName: matchData?.teamOneName,
                teamOneImage: matchData?.teamOneImage,
                teamTwoName: matchData?.teamTwoName,
                teamTwoImage: matchData?.teamTwoImage,
                matchStatus: matchData?.matchStatus,
                streamingSources: {
                    createMany: {
                        data: streamingData
                    }
                }
            }
        });

        res.json(createdMatch);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update match data
export const updateMatch = async (req, res) => {
    console.log('Inside update match');
    const id = req.params.id;
    const updatedMatchData = req.body;
    try {
        const updatedMatch = await prisma.Match.update({
            where: { id: id },
            data: {
                matchTime: updatedMatchData.matchTime,
                matchTitle: updatedMatchData.matchTitle,
                teamOneName: updatedMatchData.teamOneName,
                teamOneImage: updatedMatchData.teamOneImage,
                teamTwoName: updatedMatchData.teamTwoName,
                teamTwoImage: updatedMatchData.teamTwoImage,
                matchStatus: updatedMatchData.matchStatus,
                streamingSources: {
                    updateMany: updatedMatchData.streamingSources.map(streamingData => ({
                        where: {
                            id: streamingData.id
                        },

                        data: {
                            streamTitle: streamingData?.streamTitle,
                            streamType: streamingData?.streamType,
                            resulation: streamingData?.resulation,
                            platform: streamingData?.platform,
                            isPremium: streamingData?.isPremium,
                            portraitWatermark: streamingData?.portraitWatermark,
                            landscapeWatermark: streamingData?.landscapeWatermark,
                            streamUrl: streamingData?.streamUrl,
                            headers: streamingData?.headers,
                            streamKey: streamingData?.streamKey
                            // headers: streamingData?.streamType === 'Restricted' ? handleRestrictedStreamingData(streamingData) : ''
                        }
                    }))
                }
            }
        });

        return res.status(200).send(updatedMatch);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Failed to fetch matchs, Try again' });
    }
};

// Get all matches
export const getAllMatches = async (req, res) => {
    try {
        const matches = await prisma.Match.findMany();
        return res.status(200).send(matches);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Failed to fetch matchs, Try again' });
    }
};

// Get all streams
export const getAllStreams = async (req, res) => {
    try {
        const streams = await prisma.Stream.findMany();
        return res.status(200).send(streams);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Failed to fetch stream, Try again' });
    }
};

// Find one stream
export const getOneStream = async (req, res) => {
    const id = req.params.id;
    try {
        const stream = await prisma.Stream.findUnique({
            where: {
                id: id
            }
        });
        return res.status(200).send(stream);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Failed to fetch stream, Try again' });
    }
};

// Get single match by ID
export const getSingleMatche = async (req, res) => {
    const id = req.params.id;
    try {
        const matche = await prisma.Match.findUnique({
            where: {
                id: id
            },
            include: {
                streamingSources: true
            }
        });
        return res.status(200).send(matche);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Failed to fetch match, Try again' });
    }
};

// Delete single match by ID
export const deleteOneMatche = async (req, res) => {
    const id = req.params.id;
    try {
        const matche = await prisma.Match.delete({
            where: {
                id: id
            }
        });
        return res.status(200).send(matche);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Failed to fetch match, Try again' });
    }
};
