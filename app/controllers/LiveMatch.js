import prisma from '../../prisma/index.js';

export const createLiveMatch = async (req, res) => {
    console.log('Inside create match');
    const matchData = req.body;

    const streamingData = [];
    const streamRestricted= [];

    try {

        // Check Restricted
        matchData?.streamingSources?.map(source => {

            if(source?.streamType === 'Restricted'){
                source?.streamRestrictedData?.map(data =>{
                    streamRestricted.push({
                        name: data.name,
                        value: data.value
                    })
                })
            }

            streamingData.push({
                streamTitle: source?.streamTitle,
                streamType: source?.streamType,
                resulation: source?.resulation,
                platform: source?.platform,
                isPremium: source?.isPremium,
                portraitWatermark: source?.portraitWatermark,
                landscapeWatermark: source?.landscapeWatermark,
                streamUrl: source?.streamUrl,
                headers: source?.headers,
                streamKey: source?.streamKey,
                streamRestrictedData: source?.streamType === "Restricted" ? JSON.stringify(streamRestricted) : ""
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

// Get all matches

export const getAllMatches = async (req, res) => {
    try {
        const matches = await prisma.Match.findMany();
        return res.status(200).send(matches);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Failed to fetch matchs, Try again' });
    }
}

// Get all streams
export const getAllStreams = async (req, res) => {
    try {
        const streams = await prisma.Stream.findMany();
        return res.status(200).send(streams);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Failed to fetch stream, Try again' });
    }
}

// Get single match by ID
export const getSingleMatche = async (req, res) => {

    const id = req.params.id;
    try {
        const matche = await prisma.Match.findUnique({
            where: {
              id: id,
            },
          })
        return res.status(200).send(matche);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Failed to fetch match, Try again' });
    }
}


