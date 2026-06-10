'use client';

import { useState } from 'react';
import { submitContact } from '@/lib/actions/contact';

export default function Contato() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message?: string;
  }>({ type: 'idle' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading' });

    const result = await submitContact(formData);

    if (result.success) {
      setStatus({
        type: 'success',
        message: result.message,
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: '',
      });
    } else {
      setStatus({
        type: 'error',
        message: result.message,
      });
    }
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-[#050a30] text-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-playfair mb-8">
            Solicite um orçamento
          </h1>
          <p className="text-xl text-gray-300">
            Entre em contato com a gente. Vamos conversar sobre seu projeto.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-2">Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#bb1c3c]"
                placeholder="Seu nome"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#bb1c3c]"
                placeholder="seu@email.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold mb-2">Telefone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#bb1c3c]"
                placeholder="(11) 99999-9999"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-sm font-semibold mb-2">Empresa</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#bb1c3c]"
                placeholder="Sua empresa"
              />
            </div>

            {/* Service */}
            <div>
              <label className="block text-sm font-semibold mb-2">Serviço</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#bb1c3c]"
              >
                <option value="">Selecione um serviço</option>
                <option value="branding">Branding</option>
                <option value="conteudo">Conteúdo</option>
                <option value="digital">Digital</option>
                <option value="audiovisual">Audiovisual</option>
                <option value="social">Social Media</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold mb-2">Mensagem</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#bb1c3c]"
                placeholder="Conte mais sobre seu projeto"
              />
            </div>

            {/* Status */}
            {status.type === 'success' && (
              <div className="p-4 bg-green-100 text-green-800 rounded">
                {status.message}
              </div>
            )}
            {status.type === 'error' && (
              <div className="p-4 bg-red-100 text-red-800 rounded">
                {status.message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status.type === 'loading'}
              className="w-full bg-[#bb1c3c] hover:bg-[#bb1c3c] disabled:bg-gray-400 text-white px-6 py-3 rounded font-semibold transition"
            >
              {status.type === 'loading' ? 'Enviando...' : 'Solicitar Orçamento'}
            </button>
          </form>

          {/* Contact Info */}
          <div className="mt-16 pt-16 border-t border-gray-200">
            <h3 className="text-2xl font-playfair mb-8">Ou entre em contato direto</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-sm text-gray-500 mb-2">Comercial</p>
                <a href="mailto:camila.alfaro@agenciabrinde.com.br" className="text-lg font-semibold text-[#bb1c3c] hover:underline">
                  camila.alfaro@agenciabrinde.com.br
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Relacionamento</p>
                <a href="mailto:contato@agenciabrinde.com.br" className="text-lg font-semibold text-[#bb1c3c] hover:underline">
                  contato@agenciabrinde.com.br
                </a>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Carreiras</p>
                <a href="mailto:rh@agenciabrinde.com.br" className="text-lg font-semibold text-[#bb1c3c] hover:underline">
                  rh@agenciabrinde.com.br
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
