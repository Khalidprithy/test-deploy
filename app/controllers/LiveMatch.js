import prisma from '../../prisma/index.js';

export const createLiveMatch = async (req, res) => {
    console.log('Inside create match');
    const matchData = req.body;
    console.log(matchData);
    const streamingData = [];
    try {
        // Create the match
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
                headers: source?.headers,
                streamKey: source?.streamKey
            });
        });

        console.log('Data inside push array', streamingData);

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

        console.log(createdMatch);

        res.json(createdMatch);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
