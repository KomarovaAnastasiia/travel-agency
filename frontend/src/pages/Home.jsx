import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const popularTours = [
    { id: 1, name: 'Карпати', price: 3500, description: 'Гірські пейзажі та свіже повітря', icon: '🏔️' },
    { id: 2, name: 'Одеса', price: 4500, description: 'Море, пляжі та історія', icon: '🏖️' },
    { id: 3, name: 'Львів', price: 3000, description: 'Архітектура та культура', icon: '🏰' }
  ];

  const features = [
    {
      icon: '✈️',
      title: 'Найкращі тури',
      description: 'Ретельно відібрані маршрути по найкрасивіших місцях України'
    },
    {
      icon: '🛡️',
      title: 'Безпека',
      description: 'Повне страхування та підтримка 24/7 під час подорожі'
    },
    {
      icon: '💰',
      title: 'Вигідні ціни',
      description: 'Найкращі ціни на ринку без прихованих платежів'
    },
    {
      icon: '🎯',
      title: 'Індивідуальний підхід',
      description: 'Персоналізовані тури відповідно до ваших побажань'
    }
  ];

  const handleSearchTour = (destination = '') => {
    navigate('/search', { state: { destination } });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section w-full rounded-[100px] md:rounded-[140px] overflow-hidden shadow-xl">
        <div className="hero-overlay"></div>
        <div className="hero-content fade-in p-20">
          {/* Декоративні елементи */}

          {/* ☁️ Хмари */}
          <div className="absolute top-20 right-10 text-5xl opacity-80 animate-float z-0">☁️</div>
          <div className="absolute bottom-16 left-16 text-5xl opacity-70 animate-float delay-1000 z-0">☁️</div>

          {/* 🌈 Градієнтні сфери */}
          <div className="absolute top-[10%] left-[15%] w-36 h-36 bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 rounded-full opacity-20 blur-2xl animate-float z-0"></div>
          <div className="absolute bottom-[15%] right-[20%] w-28 h-28 bg-gradient-to-br from-amber-200 via-yellow-300 to-orange-400 rounded-full opacity-25 blur-2xl animate-float delay-500 z-0"></div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-['Poppins']">
            Відкрийте для себе
            <span className="block gradient-logo bg-gradient-to-r from-amber-200 via-yellow-300 to-orange-300 bg-clip-text text-transparent font-['Great_Vibes'] text-[3.5rem] md:text-[5rem] leading-tight">
              Україну
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Найкрасивіші куточки нашої країни чекають на вас. 
            Створюємо незабутні пригоди з 2010 року.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => handleSearchTour()} 
              className="btn-secondary text-lg px-8 py-4"
            >
              🔍 Знайти тур
            </button>
            <button 
              onClick={() => navigate('/contact')} 
              className="btn-outline border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-4"
            >
              📞 Зв'язатися з нами
            </button>
          </div>
        </div>
        
        {/* Floating decoration */}
        <div className="absolute top-20 left-10 float">
          <div className="w-20 h-20 bg-white/10 rounded-full backdrop-blur-sm"></div>
        </div>
        <div className="absolute bottom-20 right-10 float" style={{animationDelay: '1s'}}>
          <div className="w-16 h-16 bg-amber-200/20 rounded-full backdrop-blur-sm"></div>
        </div>
      </section>

      {/* Popular Tours Section */}
      <section className="section">
        <div className="container mx-auto">
          <div className="text-center mb-16 slide-up">
            <h2 className="section-title gradient-text">
              Популярні напрямки
            </h2>
            <p className="section-subtitle">
              Оберіть з найпопулярніших турів, які обирають наші клієнти
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 slide-up">
            {popularTours.map((tour) => (
              <div key={tour.id} className="popular-tour-item">
                <div className="text-4xl mb-4">{tour.icon}</div>
                <h3 className="text-2xl font-['Poppins'] font-semibold mb-2 text-gray-800">
                  Тур: {tour.name}
                </h3>
                <p className="text-gray-600 mb-4">{tour.description}</p>
                <div className="flex justify-between items-center">
                  <span className="popular-tour-price">
                    {tour.price} грн
                  </span>
                  <button 
                    onClick={() => handleSearchTour(tour.name)}
                    className="btn-primary"
                  >
                    Детальніше
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container mx-auto">
          <div className="text-center mb-16 slide-up">
            <h2 className="section-title">
              Чому обирають нас?
            </h2>
            <p className="section-subtitle">
              Ми робимо ваші подорожі незабутніми завдяки професійному підходу
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="glass-card p-8 text-center slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-['Poppins'] font-semibold mb-3 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section gradient-bg text-white w-full rounded-[100px] md:rounded-[140px] overflow-hidden shadow-xl">
        <div className="container mx-auto text-center">
          <div className="slide-up">
            <h2 className="text-4xl font-['Poppins'] font-bold mb-6">
              Готові до пригод?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Приєднуйтесь до тисяч задоволених мандрівників, які довіряють нам свої відпустки
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => handleSearchTour()} 
                className="btn-secondary text-lg px-8 py-4"
              >
                📋 Переглянути всі тури
              </button>
              <button 
                onClick={() => navigate('/contact')} 
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30 font-semibold px-8 py-4 rounded-xl transition-all duration-300"
              >
                💬 Отримати консультацію
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;