const express = require("express");

const router = express.Router();

const roomController = require("../controllers/room.controller");

router.get("/", roomController.getRooms);

router.get("/:id", roomController.getRoomById);

router.post("/", roomController.createRoom);

router.post("/bulk", roomController.createRooms);

router.put("/:id", roomController.updateRoom);

module.exports = router;