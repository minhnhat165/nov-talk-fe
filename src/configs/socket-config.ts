export const socketConfig = {
  events: {
    message: {
      new: 'message.new',
    },
    room: {
      join: 'room.join',
      leave: 'room.leave',
      update: 'room.update',
    },
  },
};
