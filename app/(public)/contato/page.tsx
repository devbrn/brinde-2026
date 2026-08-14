'use client';

import { useEffect, useRef, useState } from 'react';
import { submitContact } from '@/lib/actions/contact';
import { captureCampaignParams, type CampaignParams } from '@/lib/campaign-params';

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
  const campaign = useRef<CampaignParams>({});

  useEffect(() => {
    campaign.current = captureCampaignParams();
  }, []);

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

    const result = await submitContact({ ...formData, ...campaign.current });

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
    <div className="bg-white min-h-screen">
      {/* ─── HERO ─── */}
      <section className="bg-[#050a30] text-white pt-32 pb-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto">
          <h1
            className="text-[2.8rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[4.6rem] leading-none font-black uppercase tracking-tight mb-6"
            style={{ fontFamily: 'Aileron, sans-serif' }}
          >
            Solicite um<br />orçamento
          </h1>
          <p
            className="text-[20px] text-white/70 leading-relaxed max-w-[600px]"
            style={{ fontFamily: 'Aileron, sans-serif' }}
          >
            Entre em contato com a gente. Vamos conversar sobre seu projeto.
          </p>
        </div>
      </section>

      {/* ─── FORM ─── */}
      <section className="px-6 md:px-12 lg:px-24 py-20" data-nav-light>
        <div className="max-w-[800px] mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Name */}
            <div>
              <label
                className="block text-sm font-bold mb-2 text-[#050a30]"
                style={{ fontFamily: 'Aileron, sans-serif' }}
              >
                Nome
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-[#050a30] placeholder:text-gray-400 focus:outline-none focus:border-[#c51618] transition-colors"
                style={{ fontFamily: 'Aileron, sans-serif' }}
                placeholder="Seu nome"
              />
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-sm font-bold mb-2 text-[#050a30]"
                style={{ fontFamily: 'Aileron, sans-serif' }}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-[#050a30] placeholder:text-gray-400 focus:outline-none focus:border-[#c51618] transition-colors"
                style={{ fontFamily: 'Aileron, sans-serif' }}
                placeholder="seu@email.com"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                className="block text-sm font-bold mb-2 text-[#050a30]"
                style={{ fontFamily: 'Aileron, sans-serif' }}
              >
                Telefone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-[#050a30] placeholder:text-gray-400 focus:outline-none focus:border-[#c51618] transition-colors"
                style={{ fontFamily: 'Aileron, sans-serif' }}
                placeholder="(11) 99999-9999"
              />
            </div>

            {/* Company */}
            <div>
              <label
                className="block text-sm font-bold mb-2 text-[#050a30]"
                style={{ fontFamily: 'Aileron, sans-serif' }}
              >
                Empresa
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-[#050a30] placeholder:text-gray-400 focus:outline-none focus:border-[#c51618] transition-colors"
                style={{ fontFamily: 'Aileron, sans-serif' }}
                placeholder="Sua empresa"
              />
            </div>

            {/* Service */}
            <div>
              <label
                className="block text-sm font-bold mb-2 text-[#050a30]"
                style={{ fontFamily: 'Aileron, sans-serif' }}
              >
                Serviço
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-[#050a30] placeholder:text-gray-400 focus:outline-none focus:border-[#c51618] transition-colors"
                style={{ fontFamily: 'Aileron, sans-serif' }}
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
              <label
                className="block text-sm font-bold mb-2 text-[#050a30]"
                style={{ fontFamily: 'Aileron, sans-serif' }}
              >
                Mensagem
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-[#050a30] placeholder:text-gray-400 focus:outline-none focus:border-[#c51618] transition-colors"
                style={{ fontFamily: 'Aileron, sans-serif' }}
                placeholder="Conte mais sobre seu projeto"
              />
            </div>

            {/* Status */}
            {status.type === 'success' && (
              <div
                className="p-4 bg-green-100 text-green-800 rounded-xl"
                style={{ fontFamily: 'Aileron, sans-serif' }}
              >
                {status.message}
              </div>
            )}
            {status.type === 'error' && (
              <div
                className="p-4 bg-red-100 text-red-800 rounded-xl"
                style={{ fontFamily: 'Aileron, sans-serif' }}
              >
                {status.message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status.type === 'loading'}
              className="inline-flex items-center justify-center px-6 py-3 mt-2 rounded-full text-sm font-bold transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 w-fit shadow-md"
              style={{ backgroundColor: '#c51618', color: '#ffffff', fontFamily: 'Aileron, sans-serif' }}
            >
              {status.type === 'loading' ? 'Enviando...' : 'Solicitar Orçamento'}
            </button>
          </form>

        </div>
      </section>
    </div>
  );
}
