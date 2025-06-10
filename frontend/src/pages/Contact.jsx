import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <section className="section gradient-bg text-white rounded-[50px] md:rounded-[50px] overflow-hidden shadow-xl">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Контакти</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Зв'яжіться з нами будь-яким зручним для вас способом
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-2xl text-center slide-up">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p>
                <a href="mailto:info@turagency.ua" className="hover:text-blue-600 transition-colors">
                  info@turagency.ua
                </a>
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl text-center slide-up">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-semibold mb-2">Телефон</h3>
              <p>+380 12 345 6789</p>
            </div>

            <div className="glass-card p-6 rounded-2xl text-center slide-up">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-semibold mb-2">Адреса</h3>
              <p>вул. Туристична, 123, Київ, Україна</p>
            </div>
          </div>

          <div className="mt-12 glass-card p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Форма зворотного зв'язку</h2>
            <form className="max-w-md mx-auto space-y-4">
              <div>
                <label className="block mb-1">Ваше ім'я:</label>
                <input
                  type="text"
                  className="form-input w-full"
                  placeholder="Введіть ваше ім'я"
                />
              </div>
              <div>
                <label className="block mb-1">Ваш email:</label>
                <input
                  type="email"
                  className="form-input w-full"
                  placeholder="Введіть ваш email"
                />
              </div>
              <div>
                <label className="block mb-1">Повідомлення:</label>
                <textarea
                  className="form-input w-full"
                  rows="4"
                  placeholder="Введіть ваше повідомлення"
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn-primary w-full"
              >
                Надіслати повідомлення
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;