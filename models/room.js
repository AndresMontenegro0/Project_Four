var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var roomSchema = Schema({
    organizer: String,
    hotel_name: String,
    street_address: String,
    city: String, 
    state: String, 
    zipcode: String, 
    room_type: { type: String, required: true },
    max_people: { type: String, required: true },
    content: String,
    price: { type: Number, required: true },
    phone: {type: String, required: true},
    walker: String,
    createdAt: { type: Date, default: Date.now }
});

var Room = mongoose.model("Room", roomSchema);

module.exports = Room;