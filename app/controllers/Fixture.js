export const getFixture = async (req, res) => {
    const { api_key } = req.query;
    const { dateData } = req.params;

    const newUrl = `https://soccer.sportmonks.com/api/v2.0/fixtures/date/${dateData}?api_token=${api_key}&include=localTeam.country,visitorTeam.country,league.country,venue,referee`;

    console.log(newUrl);

    const response = await fetch(newUrl);
    const result = await response.json();

    console.log('Result:', result);

    result?.data?.map(item => {
        console.log('Local:', item.localTeam);
    });

    result?.data?.map(item => {
        console.log('Visitor:', item.visitorTeam);
    });
};
