const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const { tourId, userId, bookingDate, persons, services } = req.body;
    if (req.user.id !== userId) return res.status(403).json({ message: 'Доступ заборонено' });
    const booking = new Booking({
      tour_id: tourId,
      user_id: userId,
      booking_date: bookingDate,
      persons,
      services,
      status: 'confirmed'
    });
    await booking.save();
    res.status(201).json({ message: 'Бронювання створено', booking });
  } catch (error) {
    res.status(500).json({ message: 'Помилка створення бронювання', error });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    if (req.user.id !== req.params.userId) return res.status(403).json({ message: 'Доступ заборонено' });
    const bookings = await Booking.find({ user_id: req.params.userId }).populate('tour_id');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Помилка отримання бронювань', error });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Бронювання не знайдено' });
    if (booking.user_id.toString() !== req.user.id) return res.status(403).json({ message: 'Доступ заборонено' });
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Бронювання оновлено', booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ message: 'Помилка оновлення бронювання', error });
  }
};
