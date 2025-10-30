import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useCart } from '../contexts/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WHATSAPP_NUMBER_DISPLAY = "(81) 99427-6674";
const WHATSAPP_NUMBER_LINK = "5581994276674";
const PIX_QR_CODE_URL = "http://publicdomainfanzine.puter.site/img/qr_code_pix.jpg";

const brazilianStates = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
    'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

const WhatsAppIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg role="img" aria-label="WhatsApp icon" className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.35 3.45 16.86L2.05 22L7.31 20.59C8.76 21.39 10.37 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 9.27 20.92 6.83 19.11 4.99C17.3 3.14 14.89 2 12.04 2ZM12.04 20.12C10.56 20.12 9.1 19.72 7.82 19L7.43 18.77L4.24 19.73L5.22 16.62L4.97 16.22C4.12 14.83 3.65 13.25 3.65 11.91C3.65 7.33 7.44 3.54 12.04 3.54C14.28 3.54 16.35 4.39 17.89 5.96C19.42 7.49 20.43 9.6 20.43 11.91C20.43 16.49 16.64 20.12 12.04 20.12ZM16.56 14.45C16.31 14.32 15.11 13.75 14.88 13.67C14.66 13.58 14.5 13.54 14.35 13.79C14.2 14.04 13.73 14.6 13.58 14.77C13.43 14.94 13.28 14.96 13.03 14.83C12.78 14.71 11.97 14.45 11.01 13.6C10.21 12.91 9.68 12.08 9.53 11.83C9.38 11.58 9.49 11.45 9.61 11.33C9.72 11.21 9.86 11.03 10 10.86C10.14 10.69 10.19 10.56 10.29 10.36C10.39 10.16 10.34 10 10.27 9.87C10.19 9.75 9.73 8.6 9.53 8.1C9.34 7.61 9.14 7.68 9 7.68C8.86 7.68 8.71 7.68 8.56 7.68C8.41 7.68 8.16 7.73 7.94 7.98C7.71 8.23 7.11 8.78 7.11 9.93C7.11 11.08 7.97 12.18 8.12 12.35C8.27 12.52 9.73 14.82 12.03 15.76C12.58 16.01 13 16.12 13.33 16.23C13.84 16.37 14.29 16.34 14.64 16.29C15.04 16.23 16.08 15.68 16.31 15.11C16.54 14.54 16.54 14.08 16.49 14C16.44 13.91 16.31 13.87 16.06 13.75C15.81 13.62 16.81 14.58 16.56 14.45Z"/>
    </svg>
);

const FormInput: React.FC<{name: string, placeholder: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, error?: string, type?: string, className?: string, required?: boolean, maxLength?: number, onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void, inputRef?: React.RefObject<HTMLInputElement>}> = 
({ name, placeholder, value, onChange, error, type = 'text', className = '', required = true, maxLength, onBlur, inputRef }) => (
    <div className={className}>
        <input
            ref={inputRef}
            required={required}
            className={`bg-dark-bg border ${error ? 'border-red-500' : 'border-gray-700'} rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-brand-primary`}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            maxLength={maxLength}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
);

const StepHeader: React.FC<{title: string; step: number; total: number}> = ({title, step, total}) => (
    <div className="flex justify-between items-baseline mb-6 border-b border-gray-800 pb-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-light-text uppercase tracking-tighter">{title}</h2>
        <span className="font-mono text-medium-text">Passo {step}/{total}</span>
    </div>
);

const SpinnerIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
)

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
    const { cartItems, updateQuantity, subtotal, shippingCost, total, clearCart } = useCart();
    
    type Step = 'cart' | 'details' | 'review' | 'payment' | 'success';
    const [step, setStep] = useState<Step>('cart');
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionError, setSubmissionError] = useState<string | null>(null);

    const [cepLoading, setCepLoading] = useState(false);
    const [cepError, setCepError] = useState<string | null>(null);
    const numberInputRef = useRef<HTMLInputElement>(null);
    
    const [formState, setFormState] = useState({
        name: '', email: '', whatsapp: '', address: '',
        number: '', complement: '', neighborhood: '', city: '',
        state: '', zip: ''
    });
    const [formErrors, setFormErrors] = useState<Partial<typeof formState>>({});

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setStep('cart');
                 setFormState({
                    name: '', email: '', whatsapp: '', address: '',
                    number: '', complement: '', neighborhood: '', city: '',
                    state: '', zip: ''
                });
                setFormErrors({});
                setSubmissionError(null);
                setCepError(null);
            }, 300);
        } else {
             setStep('cart');
        }
    }, [isOpen]);
    
    const handleClose = () => {
        onClose();
    };

    const formatPhoneNumber = (value: string) => {
      const cleaned = ('' + value).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
      if (!match) return value;
      let formatted = '';
      if (match[1]) formatted += `(${match[1]}`;
      if (match[2]) formatted += `) ${match[2]}`;
      if (match[3]) formatted += `-${match[3]}`;
      return formatted;
    };

    const formatCep = (value: string) => {
      return value
        .replace(/\D/g, '')
        .replace(/^(\d{5})(\d)/, '$1-$2')
        .slice(0, 9);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let { name, value } = e.target;
        
        if (name === 'whatsapp') {
            value = formatPhoneNumber(value);
        }
        if (name === 'zip') {
            value = formatCep(value);
            if (cepError) setCepError(null);
        }
        
        setFormState(prev => ({ ...prev, [name]: value }));
        if (formErrors[name as keyof typeof formErrors]) {
            setFormErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };
    
    const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
      const cep = e.target.value.replace(/\D/g, '');

      if (cep.length !== 8) {
          if (cep.length > 0) setCepError("CEP deve ter 8 dígitos.");
          return;
      }
      
      setCepError(null);
      setCepLoading(true);

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) throw new Error('Falha ao buscar CEP.');
        
        const data = await response.json();

        if (data.erro) {
            throw new Error('CEP não encontrado.');
        }

        setFormState(prev => ({
            ...prev,
            address: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf
        }));
        
        // Foca no campo de número após o preenchimento
        numberInputRef.current?.focus();

      } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido.';
          setCepError(errorMessage);
          setFormState(prev => ({...prev, address: '', neighborhood: '', city: '', state: ''}));
      } finally {
        setCepLoading(false);
      }
    };

    const validateForm = (): boolean => {
        const errors: Partial<typeof formState> = {};
        if (!formState.name.trim()) errors.name = "Nome é obrigatório.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) errors.email = "E-mail inválido.";
        const plainWhatsapp = formState.whatsapp.replace(/\D/g, '');
        if (plainWhatsapp.length < 10) errors.whatsapp = "WhatsApp inválido. Use (XX) XXXXX-XXXX.";
        if (!/^\d{5}-?\d{3}$/.test(formState.zip)) errors.zip = "CEP inválido.";
        if (!formState.address.trim()) errors.address = "Endereço é obrigatório.";
        if (!formState.number.trim()) errors.number = "Número é obrigatório.";
        if (!formState.neighborhood.trim()) errors.neighborhood = "Bairro é obrigatório.";
        if (!formState.city.trim()) errors.city = "Cidade é obrigatória.";
        if (!formState.state) errors.state = "Estado é obrigatório.";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleNextFromCart = () => { if (cartItems.length > 0) setStep('details'); };
    const handleNextFromDetails = () => { if (validateForm()) setStep('review'); };

    const handlePlaceOrder = async () => {
        setIsSubmitting(true);
        setSubmissionError(null);

        const orderSummary = `--- ITENS DO PEDIDO ---\n${cartItems.map(item => `${item.quantity}x - ${item.title} (#${item.issue}) - R$ ${(item.price * item.quantity).toFixed(2)}`).join('\n')}\n\n--- VALORES ---\nSubtotal: R$ ${subtotal.toFixed(2)}\nFrete: R$ ${shippingCost.toFixed(2)}\nTOTAL: R$ ${total.toFixed(2)}`;
        
        const body = new URLSearchParams({
            'form-name': 'order-form',
            'pedido': orderSummary,
            ...formState,
        }).toString();
        
        try {
            const response = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
            if (!response.ok) throw new Error(`Submission failed with status: ${response.status}`);
            setStep('success');
            clearCart();
        } catch (error) {
            console.error("Form submission error:", error);
            setSubmissionError('Ocorreu um erro ao enviar o pedido. Tente novamente ou entre em contato conosco.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    const renderCartStep = () => (
        <>
            <StepHeader title="Seu Carrinho" step={1} total={4} />
            <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                    <div key={item.issue} className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-y-2 gap-x-4 border-b border-gray-800 pb-4 last:border-b-0">
                        <div className="flex items-center gap-4">
                            <img src={item.coverImageUrl} alt={item.title} className="w-16 h-20 object-cover rounded-md flex-shrink-0" />
                            <div>
                                <p className="font-bold text-light-text">{item.title}</p>
                                <p className="text-sm text-medium-text">R$ {item.price.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                            <div className="flex items-center gap-1">
                                <button type="button" onClick={() => updateQuantity(item.issue, item.quantity - 1)} className="w-8 h-8 bg-[#222] rounded">-</button>
                                <span className="w-10 text-center font-bold">{item.quantity}</span>
                                <button type="button" onClick={() => updateQuantity(item.issue, item.quantity + 1)} className="w-8 h-8 bg-[#222] rounded">+</button>
                            </div>
                            <p className="w-20 text-right font-bold text-brand-secondary">R$ {(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="font-mono text-medium-text space-y-2 mb-8"><div className="flex justify-between"><span>Subtotal</span><span>R$ {subtotal.toFixed(2)}</span></div><div className="flex justify-between"><span>Frete</span><span>R$ {shippingCost.toFixed(2)}</span></div><hr className="border-gray-700" /><div className="flex justify-between text-light-text font-bold text-lg sm:text-xl"><span>Total</span><span className="text-brand-primary">R$ {total.toFixed(2)}</span></div></div>
            <div className="flex justify-end"><button type="button" onClick={handleNextFromCart} className="w-full sm:w-auto bg-brand-primary text-dark-bg font-bold py-3 sm:py-2 px-6 rounded-md uppercase tracking-wider transition-colors hover:bg-opacity-80">Próximo &raquo;</button></div>
        </>
    );

    const renderDetailsStep = () => (
        <>
            <StepHeader title="Informações de Entrega" step={2} total={4} />
            <p className="text-sm text-medium-text mb-6 text-center -mt-4">Por enquanto, não enviamos para fora do Brasil.</p>
            <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                <FormInput className="sm:col-span-6" name="name" placeholder="Nome Completo" value={formState.name} onChange={handleFormChange} error={formErrors.name} />
                <FormInput className="sm:col-span-3" name="email" placeholder="Seu E-mail" type="email" value={formState.email} onChange={handleFormChange} error={formErrors.email} />
                <FormInput className="sm:col-span-3" name="whatsapp" placeholder="WhatsApp (XX) XXXXX-XXXX" type="tel" value={formState.whatsapp} onChange={handleFormChange} error={formErrors.whatsapp} maxLength={15} />

                <div className="sm:col-span-2 relative">
                  <FormInput
                    name="zip"
                    placeholder="CEP"
                    value={formState.zip}
                    onChange={handleFormChange}
                    onBlur={handleCepBlur}
                    error={formErrors.zip || cepError || undefined}
                    maxLength={9}
                  />
                  {cepLoading && <SpinnerIcon className="w-5 h-5 text-brand-secondary absolute top-2.5 right-2.5" />}
                </div>

                <FormInput className="sm:col-span-4" name="address" placeholder="Endereço" value={formState.address} onChange={handleFormChange} error={formErrors.address} />
                <FormInput className="sm:col-span-2" name="number" placeholder="Número" value={formState.number} onChange={handleFormChange} error={formErrors.number} inputRef={numberInputRef}/>
                <FormInput className="sm:col-span-4" name="complement" placeholder="Complemento (Opcional)" value={formState.complement} onChange={handleFormChange} required={false} />
                <FormInput className="sm:col-span-3" name="neighborhood" placeholder="Bairro" value={formState.neighborhood} onChange={handleFormChange} error={formErrors.neighborhood} />
                <FormInput className="sm:col-span-2" name="city" placeholder="Cidade" value={formState.city} onChange={handleFormChange} error={formErrors.city} />
                 <div className="sm:col-span-1">
                    <select
                        required
                        name="state"
                        value={formState.state}
                        onChange={handleFormChange}
                        className={`bg-dark-bg border ${formErrors.state ? 'border-red-500' : 'border-gray-700'} rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-brand-primary h-[42px]`}
                    >
                        <option value="">UF</option>
                        {brazilianStates.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                    </select>
                    {formErrors.state && <p className="text-red-500 text-xs mt-1">{formErrors.state}</p>}
                </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row justify-between mt-8 gap-4"><button type="button" onClick={() => setStep('cart')} className="w-full sm:w-auto bg-gray-700 text-light-text font-bold py-3 sm:py-2 px-6 rounded-md uppercase tracking-wider transition-colors hover:bg-gray-600">&laquo; Voltar</button><button type="button" onClick={handleNextFromDetails} className="w-full sm:w-auto bg-brand-primary text-dark-bg font-bold py-3 sm:py-2 px-6 rounded-md uppercase tracking-wider transition-colors hover:bg-opacity-80">Próximo &raquo;</button></div>
        </>
    );

    const renderReviewStep = () => (
        <>
            <StepHeader title="Conferência do Pedido" step={3} total={4} />
            <div className="space-y-6">
                <div className="bg-dark-bg p-4 rounded-lg border border-gray-700">
                    <div className="flex justify-between items-baseline mb-3"><h3 className="text-lg sm:text-xl font-bold text-light-text">Resumo do Pedido</h3><button onClick={() => setStep('cart')} className="text-sm text-brand-secondary hover:underline">Revisar Pedido</button></div>
                    {cartItems.map(item => (<p key={item.issue} className="text-medium-text">{item.quantity}x {item.title}</p>))}
                    <p className="text-right font-bold text-lg text-brand-primary mt-2">Total: R$ {total.toFixed(2)}</p>
                </div>
                <div className="bg-dark-bg p-4 rounded-lg border border-gray-700">
                    <div className="flex justify-between items-baseline mb-3"><h3 className="text-lg sm:text-xl font-bold text-light-text">Dados de Entrega</h3><button onClick={() => setStep('details')} className="text-sm text-brand-secondary hover:underline">Revisar Endereço</button></div>
                    <div className="text-medium-text font-mono text-sm"><p>{formState.name}</p><p>{formState.email} / {formState.whatsapp}</p><p>{formState.address}, {formState.number} {formState.complement}</p><p>{formState.neighborhood}, {formState.city} - {formState.state}</p><p>{formState.zip}</p></div>
                </div>
            </div>
            <div className="flex justify-end mt-8"><button type="button" onClick={() => setStep('payment')} className="w-full sm:w-auto bg-brand-primary text-dark-bg font-bold py-3 px-6 rounded-md text-base sm:text-lg uppercase tracking-wider transition-colors hover:bg-opacity-80">Prosseguir</button></div>
        </>
    );

    const renderPaymentStep = () => (
        <div className="text-center">
            <StepHeader title="Pagamento" step={4} total={4} />
            <div className="p-4 bg-dark-bg rounded-lg border border-gray-700">
                <img src={PIX_QR_CODE_URL} alt="QR Code para pagamento PIX" className="mx-auto w-40 h-40 sm:w-48 sm:h-48 rounded-md border-4 border-light-text mb-4" />
                <p className="text-2xl sm:text-3xl font-bold text-light-text font-mono mb-4">Total: R$ {total.toFixed(2)}</p>
                <div className="text-left text-medium-text space-y-2 text-sm mb-6">
                    <p><span className="font-bold text-light-text">1.</span> Faça o PIX usando o QR Code acima no valor indicado.</p>
                    <p><span className="font-bold text-light-text">2.</span> <span className="text-brand-primary font-bold">Envie o comprovante para nosso WhatsApp.</span></p>
                    <p><span className="font-bold text-light-text">3.</span> Clique em "Efetivar Pedido" para registrar sua compra.</p>
                </div>

                <div className="text-left text-xs text-medium-text space-y-2 p-3 my-4 bg-dark-bg border border-gray-700 rounded-md">
                    <h4 className="font-bold text-light-text">Uma nota importante sobre nosso projeto:</h4>
                    <p>Somos hobbystas e, por enquanto, não temos recursos para um e-commerce tradicional. Nossas revistas são impressas sob demanda e em lotes para manter o preço acessível.</p>
                    <p>Por isso, é <span className="font-bold text-brand-primary">essencial</span> que você nos avise por WhatsApp ou e-mail após efetivar o pedido e nos envie o comprovante. Adoramos trocar uma ideia com nossos leitores! Agradecemos sua compreensão e apoio.</p>
                </div>
                
                 <div className="flex flex-col sm:flex-row justify-between items-center text-sm mb-4 gap-2">
                    <button onClick={() => setStep('cart')} className="text-brand-secondary hover:underline">Editar Pedido</button>
                    <button onClick={() => setStep('details')} className="text-brand-secondary hover:underline">Editar Endereço</button>
                 </div>
                 {submissionError && (<p className="my-4 text-center text-red-500">{submissionError}</p>)}
                <button onClick={handlePlaceOrder} disabled={isSubmitting} className="w-full bg-brand-secondary text-dark-bg font-bold py-3 px-6 rounded-md text-base sm:text-lg uppercase tracking-wider transition-all duration-300 hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-wait">{isSubmitting ? 'Enviando...' : 'Efetivar Pedido'}</button>
            </div>
        </div>
    );
    
    const renderSuccessStep = () => (
         <div className="text-center py-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-green-400">Pedido Enviado!</h3>
            <p className="text-light-text mt-4 mb-6 max-w-md mx-auto">Obrigado por sua compra! Seu pedido foi registrado. Lembre-se de fazer o pagamento via PIX e nos enviar o comprovante pelo WhatsApp para que possamos iniciar a produção.</p>
             <a href={`https://wa.me/${WHATSAPP_NUMBER_LINK}?text=${encodeURIComponent(`Olá! Acabei de fazer um pedido no site e gostaria de enviar o comprovante.`)}`} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center px-4 sm:px-6 py-3 text-base sm:text-lg font-bold text-dark-bg bg-brand-secondary uppercase tracking-widest rounded-md border-2 border-brand-secondary transition-all duration-300 hover:bg-transparent hover:text-brand-secondary"><WhatsAppIcon className="w-6 h-6 mr-3" /> Enviar Comprovante</a>
            <p className="text-xs text-medium-text mt-8">Você pode fechar esta janela.</p>
        </div>
    );
    
    const renderContent = () => {
        if (cartItems.length === 0 && step !== 'success') {
            return <p className="text-medium-text text-center py-20">Seu carrinho está vazio.</p>;
        }
        
        switch (step) {
            case 'cart': return renderCartStep();
            case 'details': return renderDetailsStep();
            case 'review': return renderReviewStep();
            case 'payment': return renderPaymentStep();
            case 'success': return renderSuccessStep();
            default: return null;
        }
    }

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 transition-opacity duration-300" onClick={handleClose} aria-modal="true" role="dialog">
            <div className="bg-[#1a1a1a] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-800 animate-fade-in-scale" onClick={(e) => e.stopPropagation()}>
                <div className="p-6 md:p-8 relative">
                    <button onClick={handleClose} className="absolute top-4 right-4 text-medium-text hover:text-light-text transition-colors z-10" aria-label="Fechar carrinho"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default CartModal;