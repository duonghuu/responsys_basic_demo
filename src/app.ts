import express, { Request, Response } from 'express';
import fs from 'fs';
import morgan from 'morgan';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    morgan('common', {
        stream: fs.createWriteStream(path.join(__dirname, '../access.log'), { flags: 'a' }),
    })
);

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome!!!');
});

app.post('/rest/api/v1.3/lists/Resp_Banking_Customers/members', (req: Request, res: Response) => {
    const data = req.body;
    console.log('data', data);
    res.json(data);
});

app.post('/rest/api/v1.3/folders/Banking/suppData/Activity_:activityName/members', (req: Request, res: Response) => {
    const { activityName } = req.params;
    const data = req.body;
    console.log('Activity_', data);
    res.json({ activityName, data });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
