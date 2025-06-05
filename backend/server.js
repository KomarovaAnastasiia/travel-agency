require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const tourRoutes = require('./routes/tours');
const userRoutes = require('./routes/users');
const bookingRoutes = require('./routes/bookings');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// Підключення до MongoDB
connectDB();

// Маршрути
app.use('/api/tours', tourRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);

// Обробка помилок
app.use(errorHandler);

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
