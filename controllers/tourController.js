const fs = require('fs');
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours,
        },
    });
};

exports.getTour = (req, res) => {
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
};

exports.createTour = (req, res) => {
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
};

exports.updateTour = (req, res) => {
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
};

exports.deleteTour = (req, res) => {
    const tour = tours.find((tour) => tour.id == req.params.id);
    if (tour)
        return res.status(204).json({
            status: 'success',
            data: {},
        });

    res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
    });
};
