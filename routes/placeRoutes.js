const express = require("express");
const router = express.Router();
const placeControllers = require("../controllers/placeControllers");

router.route("/user/:uid").get(placeControllers.getUserPlaces);

router.route("/").post(placeControllers.addPlace);

router.route("/:pid")
    .get(placeControllers.getPlace)
    .patch(placeControllers.updatePlace)
    .delete(placeControllers.deletePlace);


module.exports = router;