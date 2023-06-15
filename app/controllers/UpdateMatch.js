const UpdateMatch = async updatedMatchInfo => {
    const { updatedMatchData, id } = updatedMatchInfo;

    try {
        const matchStreamingData = await prisma.match.findUnique({
            where: {
                id: id
            },
            include: {
                streamingSources: true
            }
        });
        const dbRestrictedData = matchStreamingData?.streamingSources;

        const handleRestrictedStreamingData = updatedStreamingData => {
            const streamId = updatedStreamingData?.id;
            const streamArray = updatedStreamingData?.streamRestrictedData;
            let finalStr = [];
            dbRestrictedData?.map(streamingFinalData => {
                if (streamingFinalData.id === streamId) {
                    if (streamingFinalData && streamingFinalData.streamType === 'Restricted') {
                        let restrictedJsonData = JSON.parse(streamingFinalData?.streamRestrictedData);

                        const bigLength = restrictedJsonData.length > streamArray.length ? restrictedJsonData.length : streamArray.length;

                        for (let i = 0; i < bigLength; i++) {
                            if (restrictedJsonData[i]?.id === streamArray[i]?.id) {
                                restrictedJsonData[i].name = streamArray[i].name;
                            } else {
                                const matchIndex = restrictedJsonData.findIndex(el => el.id === streamArray[i]?.id);
                                if (matchIndex !== -1) {
                                    restrictedJsonData[matchIndex].name = streamArray[i].name;
                                } else {
                                    restrictedJsonData.push(streamArray[i]);
                                }
                            }
                        }

                        finalStr = restrictedJsonData.filter(singleData => {
                            if (singleData?.id >= 0) {
                                return singleData;
                            }
                        });
                    }
                }
            });
            //console.log("finalStr", finalStr);
            return JSON.stringify(finalStr);
        };

        const updatedMatch = await prisma.Match.update({
            where: { id: id }, // Provide the match ID you want to update
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
                            //   headers: streamingData?.headers,
                            streamKey: streamingData?.streamKey,
                            headers: streamingData?.streamType === 'Restricted' ? handleRestrictedStreamingData(streamingData) : ''
                        }
                    }))
                }
            }
        });

        return FormateData(updatedMatch);
    } catch (error) {
        console.error(error);
        throw new APIError('Failed to update match!', error);
    }
};
