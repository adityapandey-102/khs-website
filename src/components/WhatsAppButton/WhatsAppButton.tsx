"use client";

export default function WhatsAppButton() {
  const whatsappUrl = "https://wa.me/916362068331?text=Hi%20Krishna%20Home%20Studio%2C%20I%20am%20interested%20in%20your%20products.";

  return (
    <div className="group fixed bottom-6 right-6 z-1300 flex items-center">
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap bg-primary-dark px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:block">
        Chat with us
      </span>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        id="whatsapp-floating-button"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/60" aria-hidden="true" />
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" className="relative" aria-hidden="true">
          <path d="M12.031 2C6.49 2 2 6.48 2 12.02c0 1.91.53 3.69 1.45 5.24L2 22l4.9-1.4c1.47.8 3.14 1.25 4.93 1.25 5.54 0 10.03-4.49 10.03-10.03C21.861 6.49 17.37 2 12.031 2zm6.29 13.9c-.27.75-1.56 1.46-2.15 1.52-.52.05-1.2.27-3.48-.68-2.91-1.21-4.75-4.14-4.89-4.33-.15-.19-1.19-1.58-1.19-3.01 0-1.43.75-2.13 1.01-2.42.27-.3.59-.37.79-.37.2 0 .4 0 .58.01.2.01.46-.08.72.54.27.65.92 2.23 1 2.4.08.18.14.38.01.63-.12.25-.19.4-.38.63-.19.22-.4.5-.57.67-.19.19-.4.39-.17.78.23.39.99 1.64 2.12 2.65 1.46 1.3 2.68 1.7 3.07 1.9.39.19.62.16.85-.1.23-.27.99-1.15 1.25-1.54.26-.39.52-.32.88-.19.36.13 2.27 1.07 2.66 1.26.39.19.65.29.75.46.1.17.1.98-.17 1.73z" />
        </svg>
      </a>
    </div>
  );
}
