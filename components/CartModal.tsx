import React, { useState, useMemo } from 'react';
import { useCart } from '../contexts/CartContext';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WHATSAPP_NUMBER_DISPLAY = "(81) 99427-6674";

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
    const { cartItems, updateQuantity, subtotal, shippingCost, total, clearCart } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);
    
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        whatsapp: '',
        address: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zip: ''
    });

    const orderSummary = useMemo(() => {
        let summary = `--- ITENS DO PEDIDO ---\n`;
        cartItems.forEach(item => {
            summary += `${item.quantity}x - ${item.title} (#${item.issue}) - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
        });
        summary += `\n--- VALORES ---\n`;
        summary += `Subtotal: R$ ${subtotal.toFixed(2)}\n`;
        summary += `Frete: R$ ${shippingCost.toFixed(2)}\n`;
        summary += `TOTAL: R$ ${total.toFixed(2)}\n`;
        return summary;
    }, [cartItems, subtotal, shippingCost, total]);


    const handleClose = () => {
        // Reset form state for the next time it opens
        setSubmissionStatus(null);
        setIsSubmitting(false);
        onClose();
    };

    if (!isOpen) return null;

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmissionStatus(null);

        const formData = new FormData(e.target as HTMLFormElement);
        
        try {
            const response = await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData as any).toString(),
            });

            if (!response.ok) {
                throw new Error(`Submission failed with status: ${response.status}`);
            }

            setSubmissionStatus('success');
            clearCart();
            setTimeout(() => {
                handleClose();
            }, 3000);

        } catch (error) {
            console.error("Form submission error:", error);
            setSubmissionStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4 transition-opacity duration-300"
            onClick={handleClose}
            aria-modal="true"
            role="dialog"
        >
            <div
                className="bg-[#1a1a1a] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-800 animate-fade-in-scale"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 md:p-8 relative">
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-medium-text hover:text-light-text transition-colors"
                        aria-label="Fechar carrinho"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    <h2 className="text-3xl font-bold mb-6 text-light-text uppercase tracking-tighter">Seu Carrinho</h2>
                    
                    {cartItems.length === 0 && !submissionStatus ? (
                        <p className="text-medium-text text-center py-10">Seu carrinho está vazio.</p>
                    ) : submissionStatus === 'success' ? (
                        <div className="text-center py-20">
                            <h3 className="text-2xl font-bold text-green-400">Pedido Enviado com Sucesso!</h3>
                            <p className="text-medium-text mt-4">Obrigado! Uma cópia do pedido foi enviada para o seu e-mail. Não se esqueça de enviar o comprovante do PIX.</p>
                        </div>
                    ) : (
                        <form name="order-form" onSubmit={handleSubmit} data-netlify="true">
                            <input type="hidden" name="form-name" value="order-form" />
                            <textarea name="pedido" value={orderSummary} readOnly className="hidden" />

                            <div className="space-y-4 mb-6">
                                {cartItems.map(item => (
                                    <div key={item.issue} className="flex items-center gap-4 border-b border-gray-800 pb-4">
                                        <img src={item.coverImageUrl} alt={item.title} className="w-16 h-20 object-cover rounded-md" />
                                        <div className="flex-grow">
                                            <p className="font-bold text-light-text">{item.title}</p>
                                            <p className="text-sm text-medium-text">R$ {item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button type="button" onClick={() => updateQuantity(item.issue, item.quantity - 1)} className="w-8 h-8 bg-[#222] rounded">-</button>
                                            <span className="w-10 text-center font-bold">{item.quantity}</span>
                                            <button type="button" onClick={() => updateQuantity(item.issue, item.quantity + 1)} className="w-8 h-8 bg-[#222] rounded">+</button>
                                        </div>
                                        <p className="w-20 text-right font-bold text-brand-secondary">R$ {(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="font-mono text-medium-text space-y-2 mb-8">
                                <div className="flex justify-between"><span>Subtotal</span><span>R$ {subtotal.toFixed(2)}</span></div>
                                <div className="flex justify-between"><span>Frete</span><span>R$ {shippingCost.toFixed(2)}</span></div>
                                <hr className="border-gray-700" />
                                <div className="flex justify-between text-light-text font-bold text-xl"><span>Total</span><span className="text-brand-primary">R$ {total.toFixed(2)}</span></div>
                            </div>

                            <h3 className="text-2xl font-bold mb-4 text-light-text uppercase tracking-tighter">Informações de Entrega</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input required className="bg-dark-bg border border-gray-700 rounded-md p-2 col-span-2" type="text" name="name" placeholder="Nome Completo" value={formState.name} onChange={handleFormChange} />
                                <input required className="bg-dark-bg border border-gray-700 rounded-md p-2" type="email" name="email" placeholder="Seu E-mail" value={formState.email} onChange={handleFormChange} />
                                <input required className="bg-dark-bg border border-gray-700 rounded-md p-2" type="tel" name="whatsapp" placeholder="Seu WhatsApp (com DDD)" value={formState.whatsapp} onChange={handleFormChange} />
                                <input required className="bg-dark-bg border border-gray-700 rounded-md p-2 col-span-2" type="text" name="address" placeholder="Endereço" value={formState.address} onChange={handleFormChange} />
                                <input required className="bg-dark-bg border border-gray-700 rounded-md p-2" type="text" name="number" placeholder="Número" value={formState.number} onChange={handleFormChange} />
                                <input className="bg-dark-bg border border-gray-700 rounded-md p-2" type="text" name="complement" placeholder="Complemento (Opcional)" value={formState.complement} onChange={handleFormChange} />
                                <input required className="bg-dark-bg border border-gray-700 rounded-md p-2" type="text" name="neighborhood" placeholder="Bairro" value={formState.neighborhood} onChange={handleFormChange} />
                                <input required className="bg-dark-bg border border-gray-700 rounded-md p-2" type="text" name="city" placeholder="Cidade" value={formState.city} onChange={handleFormChange} />
                                <input required className="bg-dark-bg border border-gray-700 rounded-md p-2" type="text" name="state" placeholder="Estado (UF)" value={formState.state} onChange={handleFormChange} />
                                <input required className="bg-dark-bg border border-gray-700 rounded-md p-2" type="text" name="zip" placeholder="CEP" value={formState.zip} onChange={handleFormChange} />
                            </div>
                            
                            <div className="mt-8 p-4 bg-dark-bg rounded-lg border border-brand-secondary/50 text-center">
                                <p className="font-bold text-light-text">
                                    Após finalizar, realize o pagamento via PIX e envie o comprovante para o nosso WhatsApp: {WHATSAPP_NUMBER_DISPLAY}.
                                </p>
                            </div>

                            <div className="mt-8 p-4 bg-dark-bg rounded-lg border border-gray-700 text-sm text-medium-text">
                                <h4 className="font-bold text-light-text mb-2">Sobre o processo de impressão e envio</h4>
                                <p className="mb-2">
                                    <strong>Nota:</strong> As revistas do Public Domain Fanzine são produzidas em sistema de impressão sob demanda, de forma quase artesanal. Isso significa que cada edição é impressa com cuidado, em tiragens pequenas, e o processo pode levar um pouco mais de tempo do que o de uma gráfica comercial tradicional.
                                </p>
                                <p>
                                    Para manter a viabilidade do projeto, as impressões são realizadas em lotes, ou seja, aguardamos reunir um certo número de pedidos antes de enviar o material para produção. Dessa forma, conseguimos manter o preço acessível e a qualidade que o projeto merece.
                                </p>
                            </div>
                             
                            {submissionStatus === 'error' && (
                                <p className="mt-4 text-center text-red-500">Ocorreu um erro ao enviar o pedido. Por favor, tente novamente ou entre em contato diretamente.</p>
                            )}

                            <button type="submit" disabled={isSubmitting} className="w-full mt-6 bg-brand-primary text-dark-bg font-bold py-3 px-6 rounded-md text-lg uppercase tracking-wider transition-all duration-300 hover:bg-opacity-80 disabled:opacity-50 disabled:cursor-wait">
                                {isSubmitting ? 'Enviando...' : 'Finalizar Pedido'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartModal;