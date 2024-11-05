const { places, userInformation } = require("../data.js");

const getUserPlaces = (req, res) => {
    const { uid } = req.params;
    let result = [];

    for (let i = 0; i < places.length; i++) {
        if (places[i].uid == uid) {
            result.push(places[i]);
        }
    }
    return res.json(result);
}

const addPlace = (req, res) => {
    const { title, description, location, latitude, longitude, image } = req.body;

    const newPlace = {
        title, description, location, latitude, longitude, image
    }

    const newId = places.length > 0 ? places[places.length - 1].id + 1 : 1;
    newPlace.id = newId;

    const uid = userInformation.login.id;

    newPlace.uid = uid;

    places.push(newPlace);

    return res.status(200).json({ "message": "Added place" })
}

const getPlace = (req, res) => {
    const { pid } = req.params;
    for (let i = 0; i < places.length; i++) {
        if (places[i].id == pid) {
            return res.status(200).json(places[i])
        }
    }

    return res.status(404).json({ "message": "Place not found" });
}

const updatePlace = (req, res) => {
    const { pid } = req.params;
    
    const { title, description, location, latitude, longitude, image } = req.body;

    for (let i = 0; i < places.length; i++) {
        if (places[i].id == pid) {
            if (title) {
                places[i].title = title;
            }
            if (description) {
                places[i].description = description
            }
            if (location) {
                places[i].location = location
            }
            if (latitude) {
                places[i].latitude = latitude
            }
            if (longitude) {
                places[i].longitude = longitude
            }
            if (image) {
                places[i].image = image;
            }

            return res.status(200).json({ "message": "updated successfully" })
        }
    }

    return res.status(400).json({ "message": "place not found" });
}


const deletePlace = (req, res) => {
    const { pid } = req.params;

    // Find the index of the place with the given id
    const placeIndex = places.findIndex(place => place.id === parseInt(pid));

    // If place is not found, return 404 error
    if (placeIndex === -1) {
        return res.status(404).json({ message: 'Place not found' });
    }

    // Remove the place from the array
    const deletedPlace = places.splice(placeIndex, 1); // Splice removes the place and returns it

    // Return the deleted place
    res.json(deletedPlace);
};


module.exports = {
    getUserPlaces,
    addPlace,
    getPlace,
    updatePlace,
    deletePlace
}