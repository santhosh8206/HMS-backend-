const roomService = require("../services/room.service");

const getRooms = async (req, res) => {
  try {
    const rooms = await roomService.getAllRooms();

    res.status(200).json({
      success: true,
      message: "Rooms fetched successfully",
      data: rooms,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;

    const room = await roomService.getSingleRoom(id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      data: room,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const createRoom = async (req, res) => {
  try {
    const room = await roomService.createRoom(req.body);

    res.status(201).json({
      success: true,
      message: "Room created successfully",
      data: room,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const updateRoom = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedRoom = await roomService.updateRoom(
      id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Room updated successfully",
      data: updatedRoom,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createRooms = async (req, res) => {
  try {
    const rooms = req.body;

    const result = await roomService.createManyRooms(rooms);

    res.status(201).json({
      success: true,
      message: "Rooms inserted successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



module.exports = {
  getRooms,
  getRoomById,
  createRoom,
  createRooms,
  updateRoom,
};