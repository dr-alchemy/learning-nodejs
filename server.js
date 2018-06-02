var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var http       = require('http').Server(app);
var io         = require('socket.io')(http)
var mongoose   = require('mongoose')

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var dbUrl = 'mongodb://eliot:Pirulin.01@ds245250.mlab.com:45250/learning-nodejs'

// Message Model
var Message = mongoose.model('Message', {
    name: String,
    message: String
});

// var messages = [
//     {name: 'Tim', message: 'Hi'},
//     {name: 'Jane', message: 'Hello'}
// ];

// End points
app.get('/messages', function(request, response) {
    Message.find({}, function (err, data) {
        response.send(data);    
    });
});

app.post('/messages', function(request, response) {
    // console.log('request.body', request.body);
    var message = new Message(request.body);
    
    message.save(function (err) {
        if (err) {
            sendStatus(500);
        } else {
            // messages.push(request.body);
            io.emit('message', request.body);
            response.sendStatus(200);
        }
    });

});

io.on('connection', function (socket) {
    console.log('a user connected');
});

// Connect to MongoDB 
mongoose.connect(dbUrl, function(err) {
    console.log('MongoDB connection', err);
});

// Start http server
var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
});

