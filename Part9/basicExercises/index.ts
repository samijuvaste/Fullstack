import { calculateBmi } from './calculators';
import { calculateExercises } from './calculators';

import express from 'express';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});
app.get('/bmi', (req, res) => {
    const query = req.query;
    if (!isNaN(Number(query.weight)) && !isNaN(Number(query.weight))) {
        const weight = Number(query.weight);
        const height = Number(query.height);
        res.json({
            weight,
            height,
            bmi: calculateBmi(height, weight)
        });
    } else {
        res.status(400).send({ error: 'malformatted parameters' });
    }

});
app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) {
        res.status(400).send({ error: 'parameters missing' });
    }else if (isNaN(Number(target)) || !Array.isArray(daily_exercises)) {
        res.status(400).send({ error: 'malformatted parameters' });
    }
    const dailys = daily_exercises as Array<number>;
    dailys.forEach(exercise => {
        if (isNaN(Number(exercise))) {
            res.status(400).send({ error: 'malformatted parameters' });
        }
    });
    res.json(calculateExercises(dailys, target as number));
});

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});