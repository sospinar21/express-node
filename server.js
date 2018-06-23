const express = require('express');
const app = express();

const urlLogger = (request, response, next) => {
  console.log('Request URL:', request.url);
  next();
};

const timeLogger = (request, response, next) => {
  console.log('Datetime:', new Date(Date.now()).toString());
  next();
}

app.use(urlLogger, timeLogger);
app.use('/', express.static('public'));
app.use('/sunsets', express.static('public/sunsets'));

app.get('/json', urlLogger, timeLogger, (request, response) => {
  response.status(200).json({"name": "Robbie"});
});

app.get('./sunsets', (request, response) => {
  response.status(200);
  response.send('hi');
});

app.use(function (request, response, next) {
  response.status(404).sendFile(__dirname + '/public/404/');
})

app.listen(3000, () => {
  console.log('Express intro running on localhost:3000');
});

