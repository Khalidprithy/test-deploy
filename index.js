import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import appSettingRoute from './app/routes/appSettings.js';
import authRoute from './app/routes/auth.js';
import userFixture from './app/routes/fixture.js';
import highlightRoute from './app/routes/highlight.js';
import userMatch from './app/routes/match.js';
import userRoute from './app/routes/user.js';
import prisma from './prisma/index.js';

const app = express();
// dotenv.config();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', authRoute);
app.use('/api/v1', userRoute);
app.use('/api/v1', userMatch);
app.use('/api/v1', userFixture);
app.use('/api/v1', highlightRoute);
app.use('/api/v1', appSettingRoute);


app.get('/settings', async (req, res) => {
    try {
        const appSettings = await prisma.AppSettings.findMany();
        return res.status(200).send(appSettings);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Failed to fetch app settings, Try again' });
    }
});


app.get('/', (req, res) => {
    res.send('Turboooo Root Server');
});

app.listen(port, () => {
    console.log(`Turbo server listening on port: ${port}`);
});
