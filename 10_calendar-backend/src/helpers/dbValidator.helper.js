import { CalendarEvent, User } from '../models/index.js';

export const isAlreadyRegistered = async (query, collection) => {
  let model;

  const checkInCollection = () => {
    if (model)
      throw new Error(
        `The ${collection}${
          query.includes('@') ? "'s email" : ' name'
        } is already registered!`
      );
  };

  switch (collection) {
    case 'user':
      model = await User.findOne({ email: query });
      return checkInCollection();

    default:
      throw new Error('Something went wrong!');
  }
};

export const doesItExist = async (id, collection) => {
  let model;

  const checkInCollection = () => {
    if (!model) throw new Error(`${collection} ID: '${id}' doesn't exist!`);
  };

  // Search by ID
  switch (collection) {
    case 'user':
      model = await User.findById(id);
      return checkInCollection();

    case 'event':
      model = await CalendarEvent.findById(id);
      return checkInCollection();
  }
};
