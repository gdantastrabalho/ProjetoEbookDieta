
/* ============================================================ */
/* DIETA BASE - JAVASCRIPT COMPLETO */
/* ============================================================ */

// Configurações
const CHECKOUT_URL_EXTERNA = ''; // Preencher com URL da Hotmart/Kiwify se desejar

// ============================================================
// FAQ TOGGLE
// ============================================================

function toggleFaq(element) {
    const faqItem = element.closest('.faq-item');
    if (!faqItem) return;

    // Fechar outros FAQs abertos
    document.querySelectorAll('.faq-item.active').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });

    // Toggle o FAQ clicado
    faqItem.classList.toggle('active');
}

// ============================================================
// SCROLL PARA CHECKOUT
// ============================================================

function scrollToCheckout() {
    if (CHECKOUT_URL_EXTERNA) {
        window.location.href = CHECKOUT_URL_EXTERNA;
    } else {
        window.location.href = 'checkout.html';
    }
}

// ============================================================
// VALIDAÇÃO DE FORMULÁRIO
// ============================================================

function validateName() {
    const name = document.getElementById('name');
    const error = document.getElementById('nameError');

    if (!name.value.trim()) {
        error.textContent = 'Digite seu nome completo';
        return false;
    }

    if (name.value.trim().length < 3) {
        error.textContent = 'Nome deve ter pelo menos 3 caracteres';
        return false;
    }

    error.textContent = '';
    return true;
}

function validateEmail() {
    const email = document.getElementById('email');
    const error = document.getElementById('emailError');
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.value) {
        error.textContent = 'Digite seu email';
        return false;
    }

    if (!regex.test(email.value)) {
        error.textContent = 'Email inválido';
        return false;
    }

    error.textContent = '';
    return true;
}

function validateCPF() {
    const cpf = document.getElementById('cpf');
    const error = document.getElementById('cpfError');

    if (!cpf.value) {
        error.textContent = '';
        return true; // CPF é opcional
    }

    // Remove caracteres especiais
    const clean = cpf.value.replace(/\D/g, '');

    if (clean.length !== 11) {
        error.textContent = 'CPF deve ter 11 dígitos';
        return false;
    }

    // Validação básica de CPF (simplificada)
    if (/^(\d)\1{10}$/.test(clean)) {
        error.textContent = 'CPF inválido';
        return false;
    }

    error.textContent = '';
    return true;
}

function validateCardNumber() {
    const cardNumber = document.getElementById('cardNumber');
    const error = document.getElementById('cardNumberError');

    if (!document.getElementById('cardFields').style.display === 'none') {
        return true; // Se cartão não é visível, pula validação
    }

    const clean = cardNumber.value.replace(/\s/g, '');

    if (clean.length < 13 || clean.length > 19) {
        error.textContent = 'Número do cartão inválido';
        return false;
    }

    error.textContent = '';
    return true;
}

function validateCardExpiry() {
    const expiry = document.getElementById('cardExpiry');
    const error = document.getElementById('cardExpiryError');

    if (!document.getElementById('cardFields').style.display === 'none') {
        return true;
    }

    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (!regex.test(expiry.value)) {
        error.textContent = 'Formato: MM/AA';
        return false;
    }

    error.textContent = '';
    return true;
}

function validateCardCVV() {
    const cvv = document.getElementById('cardCVV');
    const error = document.getElementById('cardCVVError');

    if (!document.getElementById('cardFields').style.display === 'none') {
        return true;
    }

    const clean = cvv.value.replace(/\D/g, '');

    if (clean.length < 3 || clean.length > 4) {
        error.textContent = 'CVV inválido';
        return false;
    }

    error.textContent = '';
    return true;
}

// ============================================================
// FORMATAÇÃO DE ENTRADA
// ============================================================

function formatCPF() {
    const cpf = document.getElementById('cpf');
    let value = cpf.value.replace(/\D/g, '');

    if (value.length > 11) {
        value = value.substring(0, 11);
    }

    if (value.length > 0) {
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
        value = value.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    }

    cpf.value = value;
    validateCPF();
}

function formatCardNumber() {
    const card = document.getElementById('cardNumber');
    let value = card.value.replace(/\s/g, '');

    if (value.length > 19) {
        value = value.substring(0, 19);
    }

    value = value.replace(/(\d{4})/g, '$1 ').trim();
    card.value = value;
    validateCardNumber();
}

function formatExpiry() {
    const expiry = document.getElementById('cardExpiry');
    let value = expiry.value.replace(/\D/g, '');

    if (value.length > 4) {
        value = value.substring(0, 4);
    }

    if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
    }

    expiry.value = value;
    validateCardExpiry();
}

function toggleCardFields() {
    const method = document.querySelector('input[name="paymentMethod"]:checked').value;
    const cardFields = document.getElementById('cardFields');

    if (method === 'card') {
        cardFields.style.display = 'block';
    } else {
        cardFields.style.display = 'none';
    }
}

// ============================================================
// VALIDAÇÃO DO FORMULÁRIO
// ============================================================

function submitCheckout(event) {
    event.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isCPFValid = validateCPF();
    const isCardValid = validateCardNumber();
    const isExpiryValid = validateCardExpiry();
    const isCVVValid = validateCardCVV();
    const termsCheckbox = document.getElementById('terms');
    const termsError = document.getElementById('termsError');

    if (!termsCheckbox.checked) {
        termsError.textContent = 'Você deve concordar com os termos';
        return false;
    }

    termsError.textContent = '';

    if (!isNameValid || !isEmailValid || !isCPFValid || !isCardValid || !isExpiryValid || !isCVVValid) {
        return false;
    }

    // Simular submissão
    showSuccessModal();

    // Aqui você integraria com a API de pagamento real
    console.log('Formulário válido. Processando pagamento...');

    return false;
}

// ============================================================
// TELA DE SUCESSO
// ============================================================

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('show');

    // Limpar formulário
    document.getElementById('checkoutForm').reset();
}

// ============================================================
// EVENT LISTENERS
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Toggles
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            toggleFaq(this);
        });
    });

    // Real-time Validation
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const cpfInput = document.getElementById('cpf');
    const cardInput = document.getElementById('cardNumber');
    const expiryInput = document.getElementById('cardExpiry');
    const cvvInput = document.getElementById('cardCVV');

    if (nameInput) nameInput.addEventListener('blur', validateName);
    if (emailInput) emailInput.addEventListener('blur', validateEmail);
    if (cpfInput) cpfInput.addEventListener('blur', validateCPF);
    if (cardInput) cardInput.addEventListener('blur', validateCardNumber);
    if (expiryInput) expiryInput.addEventListener('blur', validateCardExpiry);
    if (cvvInput) cvvInput.addEventListener('blur', validateCardCVV);

    // Close modal on outside click
    const modal = document.getElementById('successModal');
    if (modal) {
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.classList.remove('show');
            }
        });
    }

    // Analytics básico
    console.log('%c🎯 Dieta Base Landing Page', 'color: #00FF41; font-weight: bold; font-size: 14px;');
    console.log('%cPronto para conversão!', 'color: #FF7B1C; font-weight: bold;');
});

// ============================================================
// FUNÇÕES AUXILIARES
// ============================================================

// Smooth scroll (fallback para browsers antigos)
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Analytics custom (integrar com Google Analytics, etc)
function trackEvent(eventName, eventData = {}) {
    console.log(`[Analytics] ${eventName}`, eventData);

    // Exemplo de integração com Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
}

// Track CTA clicks
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function() {
        trackEvent('cta_click', {
            cta_text: this.textContent,
            cta_position: this.getBoundingClientRect().top
        });
    });
});
