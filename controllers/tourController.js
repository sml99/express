const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkID = (req, res, next, val) => {
    if (!tours.find((tour) => tour.id === val * 1))
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    next();
};

exports.checkBody = (req, res, next) => {
    if (!(req.body.price && req.body.name))
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price!',
        });
    next();
};

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
    const tour = tours.find((t) => t.id === req.params.id * 1);
    res.status(200).json({
        status: 'success',
        data: {
            tour,
        },
    });
};

exports.createTour = (req, res) => {
    const tour = req.body;
    tour.id = tours[tours.length - 1].id + 1;
    // tours.push(tour);
    // fs.writeFile(`${__dirname}/../dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    //     if (err) return console.log('Something went wrong adding the tour!\nError: ' + err);
    res.status(201).json({
        status: 'success',
        data: {
            tour,
        },
    });
    // });
};

exports.updateTour = (req, res) => {
    const tour = tours.find((t) => t.id === req.params.id * 1);
    res.status(200).json({
        status: 'success',
        data: {
            tour,
        },
    });
};

exports.deleteTour = (req, res) => {
    const tour = tours.find((t) => t.id === req.params.id * 1);
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
