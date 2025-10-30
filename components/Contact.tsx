import React from 'react';

// A simple SVG component for the WhatsApp icon to ensure brand recognition.
const WhatsAppIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg
      role="img"
      aria-label="WhatsApp icon"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.35 3.45 16.86L2.05 22L7.31 20.59C8.76 21.39 10.37 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 9.27 20.92 6.83 19.11 4.99C17.3 3.14 14.89 2 12.04 2ZM12.04 20.12C10.56 20.12 9.1 19.72 7.82 19L7.43 18.77L4.24 19.73L5.22 16.62L4.97 16.22C4.12 14.83 3.65 13.25 3.65 11.91C3.65 7.33 7.44 3.54 12.04 3.54C14.28 3.54 16.35 4.39 17.89 5.96C19.42 7.49 20.43 9.6 20.43 11.91C20.43 16.49 16.64 20.12 12.04 20.12ZM16.56 14.45C16.31 14.32 15.11 13.75 14.88 13.67C14.66 13.58 14.5 13.54 14.35 13.79C14.2 14.04 13.73 14.6 13.58 14.77C13.43 14.94 13.28 14.96 13.03 14.83C12.78 14.71 11.97 14.45 11.01 13.6C10.21 12.91 9.68 12.08 9.53 11.83C9.38 11.58 9.49 11.45 9.61 11.33C9.72 11.21 9.86 11.03 10 10.86C10.14 10.69 10.19 10.56 10.29 10.36C10.39 10.16 10.34 10 10.27 9.87C10.19 9.75 9.73 8.6 9.53 8.1C9.34 7.61 9.14 7.68 9 7.68C8.86 7.68 8.71 7.68 8.56 7.68C8.41 7.68 8.16 7.73 7.94 7.98C7.71 8.23 7.11 8.78 7.11 9.93C7.11 11.08 7.97 12.18 8.12 12.35C8.27 12.52 9.73 14.82 12.03 15.76C12.58 16.01 13 16.12 13.33 16.23C13.84 16.37 14.29 16.34 14.64 16.29C15.04 16.23 16.08 15.68 16.31 15.11C16.54 14.54 16.54 14.08 16.49 14C16.44 13.91 16.31 13.87 16.06 13.75C15.81 13.62 16.81 14.58 16.56 14.45Z"/>
    </svg>
);

const EmailIcon: React.FC = () => (
    <svg
      role="img"
      aria-label="Email icon"
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      ></path>
    </svg>
);


const Contact: React.FC = () => {
  const whatsappNumber = "5581994276674";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const emailAddress = "misterquadrinho@gmail.com";

  return (
    <section className="py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter">Contato</h2>
          <p className="mt-4 text-base sm:text-lg text-medium-text max-w-2xl mx-auto">Quer tirar uma dúvida, fazer um pedido ou simplesmente bater um papo sobre quadrinhos? Entre em contato conosco!</p>
        </div>
        <div className="max-w-md mx-auto text-center">
           <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg font-bold text-dark-bg bg-brand-primary uppercase tracking-widest rounded-md border-2 border-brand-primary transition-all duration-300 hover:bg-transparent hover:text-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary ring-offset-2 ring-offset-dark-bg"
            >
              <WhatsAppIcon className="w-6 h-6 mr-3" />
              Conversar no WhatsApp
            </a>
            <p className="mt-4 text-sm text-medium-text">
              Clique para abrir uma conversa direta. Rápido e fácil!
            </p>

            <div className="mt-12 pt-8 border-t border-gray-800 space-y-4 font-mono text-medium-text">
                <div className="flex items-center justify-center gap-4">
                  <EmailIcon />
                  <a href={`mailto:${emailAddress}`} className="hover:text-brand-secondary transition-colors">{emailAddress}</a>
                </div>
                <div className="flex items-center justify-center gap-4">
                   <WhatsAppIcon className="w-6 h-6"/>
                   <span>(81) 99427-6674</span>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
