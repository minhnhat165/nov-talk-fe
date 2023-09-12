export const socketConfig = {
  events: {
    message: {
      new: 'message.new',
      update: 'message.update',
    },
    room: {
      join: 'room.join',
      leave: 'room.leave',
      update: 'room.update',
      delete: 'room.delete',
    },
  },
};
