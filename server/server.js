const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const movieRouter = require('./routes/movie.routes');
const projectionRouter = require('./routes/projection.routes');
const authRouter = require('./routes/auth.routes');
const ticketRouter = require('./routes/ticket.routes');

const app = express({origin: 'https://localhost:3000'});

app.use(bodyParser.json());
app.use(cors());

app.use('/movies', movieRouter);
app.use('/projections', projectionRouter);
app.use('/tickets', ticketRouter);
app.use('/auth', authRouter);

// Static file handling for React build
app.use(express.static(path.join(__dirname, '..\client\build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..\client\build', 'index.html'));
});

app.listen(5000);