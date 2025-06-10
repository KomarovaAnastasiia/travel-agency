import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-800 to-blue-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-['Great_Vibes'] mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L13.09 8.26L18 7L16.74 12L22 13.09L15.74 14.35L17 19.26L12 18L6.26 19.26L7.35 14.35L2 13.09L7.26 12L6 7L10.91 8.26L12 2Z"/>
              </svg>
              ТурАгенція
            </h3>
            <p className="text-white/80">
              Подорожуйте з нами та відкривайте для себе нові горизонти.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Навігація</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/80 hover:text-amber-200 transition-colors">Головна</Link></li>
              <li><Link to="/search" className="text-white/80 hover:text-amber-200 transition-colors">Пошук турів</Link></li>
              <li><Link to="/contact" className="text-white/80 hover:text-amber-200 transition-colors">Контакти</Link></li>
              <li><Link to="/profile" className="text-white/80 hover:text-amber-200 transition-colors">Профіль</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Контакти</h4>
            <ul className="space-y-2 text-white/80">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C15.9 2 19 5.1 19 9c0 1.4-.4 2.7-1.1 3.9L12 22l-5.9-9.1C5.4 11.7 5 10.4 5 9c0-3.9 3.1-7 7-7m0 2c-2.8 0-5 2.2-5 5 0 1 .3 2 .8 2.8L12 18.3l4.2-6.5c.5-.8.8-1.8.8-2.8 0-2.8-2.2-5-5-5m0 2c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3z"/>
                </svg>
                Київ, вул. Туристична, 123
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                info@turagency.ua
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 15.5c-1.2 0-2.5-.2-3.6-.6h-.1c-.3 0-.5.1-.7.3l-2.2 2.2c-2.8-1.5-5.2-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.4-.5-3.6 0-.5-.5-1-1-1H4c-.5 0-1 .5-1 1 0 9.4 7.6 17 17 17 .5 0 1-.5 1-1v-3.5c0-.5-.5-1-1-1z"/>
                </svg>
                +380 12 345 6789
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Соцмережі</h4>
            <div className="mt-6">
              <p className="text-sm text-white/60">
                © 2025 ТурАгенція. Всі права захищені.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;