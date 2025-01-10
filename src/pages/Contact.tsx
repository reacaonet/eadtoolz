import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Contact() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            className="w-full h-full object-cover"
            alt="Contact background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Entre em Contato
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Estamos aqui para ajudar. Entre em contato conosco para tirar suas dúvidas ou fazer sugestões.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-black py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Informações de Contato</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Email</h3>
                    <p className="mt-1 text-gray-400">contato@eadtoolz.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Telefone</h3>
                    <p className="mt-1 text-gray-400">(11) 99999-9999</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <MapPin className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Endereço</h3>
                    <p className="mt-1 text-gray-400">
                      Av. Paulista, 1000 - Bela Vista<br />
                      São Paulo - SP, 01310-100
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full bg-gray-900 border border-gray-800 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full bg-gray-900 border border-gray-800 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-1 block w-full bg-gray-900 border border-gray-800 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                  >
                    Enviar Mensagem
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
