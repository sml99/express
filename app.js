const fs = require('fs');
const express = require('express');
const app = express();
//MIDDLEWARE
app.use(express.json());

// app.get('/', (req, res) => {
//     // res.status(200).send('Hello MotherFather!');
//     res.status(200).json({ message: 'Hello MF', app: 'Natours' });
// });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours,
        },
    });
});

app.get('/api/v1/tours/:id', (req, res) => {
    const tour = tours.find((tour) => tour.id == req.params.id);
    if (tour)
        return res.status(200).json({
            status: 'success',
            data: {
                tour,
            },
        });

    res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
    });
});

app.post('/api/v1/tours', (req, res) => {
    const id = tours[tours.length - 1].id + 1;
    const tour = Object.assign({ id }, req.body);
    tours.push(tour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
        if (err) return console.log('Something went wrong adding the tour!\nError: ' + err);

        console.log('New Tour added!');
        res.status(201).json({
            status: 'success',
            data: {
                tour,
            },
        });
    });
});

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
