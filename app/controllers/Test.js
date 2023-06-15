let data =
    "{\r\n  Origin: 'https://aesport.tv',\r\n  Referer: 'https://aesport.tv/',\r\n  User-Agent: 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36'\r\n}";
console.log(JSON.parse(data));

export const createTest = async (req, res) => {
    console.log(JSON.parse(data));
    console.log('Inside find all user');
    try {
        const users = await prisma.User.create();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
