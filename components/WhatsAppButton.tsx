export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/554188828001?text=Ol%C3%A1%2C%20estou%20entrando%20em%20contato%20atrav%C3%A9s%20do%20site%20da%20Brinde%20e%20gostaria%20de%20um%20or%C3%A7amento"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full overflow-visible shadow-2xl hover:scale-105 transition-transform"
      aria-label="Fale conosco no WhatsApp"
    >
      <div className="w-full h-full rounded-full overflow-hidden ring-2 ring-white/80">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://res.cloudinary.com/dyezpmorm/image/upload/v1786384332/atendimento-brinde_j1oxzx.jpg"
          alt="WhatsApp"
          className="w-full h-full object-cover"
        />
      </div>
      <span className="absolute bottom-0 left-0 flex items-center justify-center w-4 h-4">
        <span className="absolute inline-flex w-[180%] h-[180%] rounded-full bg-green-500 opacity-50 animate-ping" />
        <span className="relative w-4 h-4 rounded-full bg-green-500 ring-1 ring-white" />
      </span>
    </a>
  );
}
