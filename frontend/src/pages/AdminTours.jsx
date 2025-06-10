// src/pages/AdminTours.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useStore from '../store/useStore';

const AdminTours = () => {
  const user = useStore((state) => state.user);
  const [tours, setTours] = useState([]);
  const [tourData, setTourData] = useState({
    name: '',
    destination: '',
    start_date: '',
    end_date: '',
    price: '',
    description: '',
    images: []
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/tours`);
        setTours(response.data);
      } catch (error) {
        console.error('Помилка завантаження турів:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user && user.role === 'admin') {
      fetchTours();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingId) {
        // Оновлення існуючого туру
        await axios.put(`${import.meta.env.VITE_API_URL}/tours/${editingId}`, tourData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setSuccessMessage('Тур успішно оновлено!');
      } else {
        // Додавання нового туру
        await axios.post(`${import.meta.env.VITE_API_URL}/tours`, tourData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setSuccessMessage('Тур успішно додано!');
      }
      
      // Оновлюємо список турів
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/tours`);
      setTours(response.data);
      
      // Скидаємо форму
      resetForm();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Помилка операції:', error);
      alert(`Помилка ${editingId ? 'оновлення' : 'додавання'} туру`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setTourData({ ...tourData, [e.target.name]: e.target.value });
  };

  const handleEdit = (tour) => {
    setTourData({
      name: tour.name,
      destination: tour.destination,
      start_date: tour.start_date.split('T')[0],
      end_date: tour.end_date.split('T')[0],
      price: tour.price,
      description: tour.description,
      images: tour.images
    });
    setEditingId(tour._id);
    setIsAddingNew(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Ви впевнені, що хочете видалити цей тур?')) return;
    
    try {
      setIsLoading(true);
      await axios.delete(`${import.meta.env.VITE_API_URL}/tours/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      // Оновлюємо список турів
      const updatedTours = tours.filter(tour => tour._id !== id);
      setTours(updatedTours);
      setSuccessMessage('Тур успішно видалено!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Помилка видалення туру:', error);
      alert('Помилка видалення туру');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setTourData({ 
      name: '', 
      destination: '', 
      start_date: '', 
      end_date: '', 
      price: '', 
      description: '', 
      images: [] 
    });
    setEditingId(null);
    setIsAddingNew(false);
  };

  if (!user || user.role !== 'admin') return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass-card p-8 rounded-2xl text-center">
        <h2 className="text-2xl font-bold mb-4">Доступ заборонено</h2>
        <p className="mb-4">Ця сторінка доступна лише для адміністраторів</p>
        <a href="/" className="btn-primary inline-block px-6 py-3">
          На головну
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <section className="section gradient-bg text-white rounded-[50px] md:rounded-[50px] overflow-hidden shadow-xl">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2">Панель адміністратора</h1>
          <p className="text-xl">Керування турами та контентом сайту</p>
        </div>
      </section>

      <section className="section">
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Керування турами</h2>
              {!isAddingNew && (
                <button 
                  onClick={() => {
                    resetForm();
                    setIsAddingNew(true);
                  }}
                  className="btn-primary px-4 py-2"
                >
                  + Додати новий тур
                </button>
              )}
            </div>

          {isAddingNew && (
            <div className="glass-card p-8 rounded-2xl mb-8">
              <h3 className="text-xl font-bold mb-4">
                {editingId ? 'Редагування туру' : 'Додати новий тур'}
              </h3>
              
              {successMessage && (
                <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg">
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-2 text-gray-700">Назва туру:</label>
                  <input
                    type="text"
                    name="name"
                    value={tourData.name}
                    onChange={handleChange}
                    required
                    placeholder="Назва туру"
                    className="form-input w-full"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-gray-700">Місце призначення:</label>
                    <input
                      type="text"
                      name="destination"
                      value={tourData.destination}
                      onChange={handleChange}
                      required
                      placeholder="Місто"
                      className="form-input w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-gray-700">Ціна (грн):</label>
                    <input
                      type="number"
                      name="price"
                      value={tourData.price}
                      onChange={handleChange}
                      required
                      placeholder="Введіть ціну"
                      min="0"
                      className="form-input w-full"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 text-gray-700">Дата початку:</label>
                    <input
                      type="date"
                      name="start_date"
                      value={tourData.start_date}
                      onChange={handleChange}
                      required
                      className="form-input w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-gray-700">Дата закінчення:</label>
                    <input
                      type="date"
                      name="end_date"
                      value={tourData.end_date}
                      onChange={handleChange}
                      required
                      className="form-input w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block mb-2 text-gray-700">Опис туру:</label>
                  <textarea
                    name="description"
                    value={tourData.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Детальний опис туру"
                    className="form-input w-full"
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-gray-700">Зображення (URL через кому):</label>
                  <input
                    type="text"
                    name="images"
                    value={tourData.images.join(',')}
                    onChange={(e) => setTourData({...tourData, images: e.target.value.split(',')})}
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                    className="form-input w-full"
                  />
                </div>
                
                <div className="flex gap-4">
                  <button 
                    type="submit" 
                    className="btn-primary flex-1 py-3 flex justify-center items-center"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : null}
                    {editingId ? 'Оновити тур' : 'Додати тур'}
                  </button>
                  
                  <button 
                    type="button" 
                    onClick={resetForm}
                    className="btn-outline flex-1 py-3"
                  >
                    Скасувати
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="glass-card p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4">Список турів</h3>
            
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p>Завантаження даних...</p>
              </div>
            ) : tours.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Тури не знайдено</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Назва</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Місце</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ціна</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дії</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tours.map((tour) => (
                      <tr key={tour._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{tour.name}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{tour.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900">{tour.destination}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-900">
                            {new Date(tour.start_date).toLocaleDateString('uk-UA')} - {' '}
                            {new Date(tour.end_date).toLocaleDateString('uk-UA')}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-lg font-bold gradient-text">{tour.price} грн</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(tour)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Редагувати
                            </button>
                            <button
                              onClick={() => handleDelete(tour._id)}
                              className="text-red-600 hover:text-red-900 ml-4"
                            >
                              Видалити
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminTours;