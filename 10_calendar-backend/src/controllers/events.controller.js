import { CalendarEvent } from '../models/index.js';

export const getCalendarEvents = async (req, res) => {
  const [calendarEvents, total] = await Promise.all([
    CalendarEvent.find().populate('user', 'name'),
    CalendarEvent.countDocuments(),
  ]);

  res.status(200).json({
    ok: true,
    total,
    events: calendarEvents,
  });
};

export const createEvent = async (req, res) => {
  const { title, note, start, end } = req.body;

  const calendarEvent = new CalendarEvent({
    title,
    note,
    start,
    end,
    user: req.authenticatedUser.id,
  });

  try {
    await calendarEvent.save();

    res.status(201).json({
      ok: true,
      calendar_event: calendarEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: 'Something went wrong!' });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id: eventID } = req.params;
    const { title, note, start, end } = req.body;

    const calendarEvent = await CalendarEvent.findById(eventID);
    if (calendarEvent.user.toString() !== req.authenticatedUser.id)
      return res.status(401).json({ ok: false, msg: 'Unauthorized!' });

    const newEvent = {
      title,
      note,
      start,
      end,
      user: req.authenticatedUser.id,
    };

    const updatedEven = await CalendarEvent.findByIdAndUpdate(
      eventID,
      newEvent,
      { new: true }
    );

    res.status(200).json({
      ok: true,
      event: updatedEven,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: 'Something went wrong!' });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const calendarEvent = await CalendarEvent.findById(id);
    if (calendarEvent.user.toString() !== req.authenticatedUser.id)
      return res.status(401).json({ ok: false, msg: 'Unauthorized!' });

    await CalendarEvent.findByIdAndDelete(id);

    res
      .status(200)
      .json({ ok: true, msg: 'Proyecto eliminado satisfactoriamente!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: 'Something went wrong!' });
  }
};
