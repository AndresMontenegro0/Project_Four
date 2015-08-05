var mongoose = require("mongoose"),
    Schema     = mongoose.Schema;

var userSchema = Schema ({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    hotel_name: {type: String, required: true},
    street_address: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zipcode: {type: String, required: true}

});

var User = mongoose.model("User", userSchema);

module.exports = User;
