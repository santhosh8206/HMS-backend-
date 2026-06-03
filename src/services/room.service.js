const prisma = require("../config/db");


const getAllRooms = async () => {
  return await prisma.room.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getSingleRoom = async (id) => {
  return await prisma.room.findUnique({
    where: {
      id,
    },
  });
};

const createRoom = async (data) => {
  return await prisma.room.create({
    data,
  });
};

const updateRoom = async (id, data) => {
  return await prisma.room.update({
    where: {
      id,
    },
    data,
  });
};

const createManyRooms = async (rooms) => {
  return await prisma.room.createMany({
    data: rooms,
  });
};


module.exports = {
  getAllRooms,
  getSingleRoom,
  createRoom,
  createManyRooms,
  updateRoom,
};