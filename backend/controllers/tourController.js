const Tour = require('../models/Tour');

exports.getTours = async (req, res) => {
  try {
    const { destination, start_date, price } = req.query;
    const query = {};
    if (destination) query.destination = destination;
    if (start_date) query.start_date = { $gte: new Date(start_date) };
    if (price) query.price = { $lte: parseFloat(price) };
    const tours = await Tour.find(query);
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера', error });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: 'Тур не знайдено' });
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера', error });
  }
};

exports.createTour = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Доступ заборонено' });
    const tour = new Tour(req.body);
    await tour.save();
    res.status(201).json({ message: 'Тур створено', tour });
  } catch (error) {
    res.status(500).json({ message: 'Помилка створення туру', error });
  }
};

exports.updateTour = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Доступ заборонено' });
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tour) return res.status(404).json({ message: 'Тур не знайдено' });
    res.status(200).json({ message: 'Тур оновлено', tour });
  } catch (error) {
    res.status(500).json({ message: 'Помилка оновлення туру', error });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Доступ заборонено' });
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) return res.status(404).json({ message: 'Тур не знайдено' });
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: 'Помилка сервера', error });
  }
};
