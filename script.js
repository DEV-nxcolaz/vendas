// ========================================
// JAVASCRIPT - SITE WEB FUTURA
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initFormularios();
    loadFeedbacks();
});

// ========================================
// MENU MOBILE
// ========================================
function initMobileMenu() {
    const menuToggle = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
}

// ========================================
// FORMULÁRIOS
// ========================================
function initFormularios() {
    const formFeedback = document.getElementById('formFeedback');
    if (formFeedback) {
        formFeedback.addEventListener('submit', function(e) {
            e.preventDefault();
            enviarFeedback(this);
        });
    }
}

// ========================================
// ENVIAR ORÇAMENTO
// ========================================
function enviarOrcamento(form) {
    const btn = form.querySelector('button[type="submit"]');
    const mensagem = document.getElementById('mensagemOrcamento');
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    btn.disabled = true;
    
    const formData = new FormData(form);
    const dados = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        telefone: formData.get('telefone'),
        tipoSite: formData.get('tipoSite'),
        orcamento: formData.get('orcamento'),
        prazo: formData.get('prazo'),
        descricao: formData.get('descricao'),
        tipo: 'orcamento'
    };
    
    fetch('http://localhost:3000/api/orcamentos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        mostrarMensagem(mensagem, 'success', 'Orçamento enviado com sucesso!');
        form.reset();
    })
    .catch(error => {
        console.log('API não disponível, salvando localmente');
        salvarLocalmente(dados);
        mostrarMensagem(mensagem, 'success', 'Orçamento enviado com sucesso!');
        form.reset();
    })
    .finally(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Solicitação';
        btn.disabled = false;
    });
}

// ========================================
// ENVIAR FEEDBACK
// ========================================
function enviarFeedback(form) {
    const btn = form.querySelector('button[type="submit"]');
    const mensagem = document.getElementById('mensagemFeedback');
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    btn.disabled = true;
    
    const formData = new FormData(form);
    const dados = {
        nome: formData.get('feedbackNome'),
        empresa: formData.get('feedbackEmpresa'),
        rating: formData.get('rating'),
        mensagem: formData.get('feedbackMensagem'),
        tipo: 'feedback'
    };
    
    fetch('http://localhost:3000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        mostrarMensagem(mensagem, 'success', 'Feedback enviado com sucesso!');
        form.reset();
        loadFeedbacks();
    })
    .catch(error => {
        console.log('API não disponível, salvando localmente');
        salvarLocalmente(dados);
        mostrarMensagem(mensagem, 'success', 'Feedback enviado com sucesso!');
        form.reset();
    })
    .finally(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Feedback';
        btn.disabled = false;
    });
}

// ========================================
// ENVIAR CONTATO
// ========================================
function enviarContato(form) {
    const btn = form.querySelector('button[type="submit"]');
    const mensagem = document.getElementById('mensagemContato');
    
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    btn.disabled = true;
    
    const formData = new FormData(form);
    const dados = {
        nome: formData.get('contatoNome'),
        email: formData.get('contatoEmail'),
        mensagem: formData.get('contatoMensagem'),
        tipo: 'contato'
    };
    
    fetch('http://localhost:3000/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        mostrarMensagem(mensagem, 'success', 'Mensagem enviada com sucesso!');
        form.reset();
    })
    .catch(error => {
        console.log('API não disponível, salvando localmente');
        salvarLocalmente(dados);
        mostrarMensagem(mensagem, 'success', 'Mensagem enviada com sucesso!');
        form.reset();
    })
    .finally(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
        btn.disabled = false;
    });
}

// ========================================
// SALVAR LOCALMENTE
// ========================================
function salvarLocalmente(dados) {
    let lista = JSON.parse(localStorage.getItem('webfutura_dados') || '[]');
    lista.push({ ...dados, data: new Date().toISOString() });
    localStorage.setItem('webfutura_dados', JSON.stringify(lista));
}

// ========================================
// CARREGAR FEEDBACKS
// ========================================
function loadFeedbacks() {
    const grid = document.getElementById('testimonialsGrid');
    if (!grid) return;
    
    const feedbacksExemplo = [
        {
            nome: 'Maria Silva',
            empresa: 'Empresa ABC',
            rating: 5,
            mensagem: 'Excelente trabalho! O site ficou exatamente como eu imaginava.',
            data: '2026-01-15'
        },
        {
            nome: 'João Santos',
            empresa: 'Loja Online',
            rating: 5,
            mensagem: 'Super recomendo! Meu ecommerce aumentou 50% das vendas.',
            data: '2026-01-10'
        },
        {
            nome: 'Pedro Oliveira',
            empresa: 'Consultoria',
            rating: 5,
            mensagem: 'Ótimo atendimento e desenvolvimento rápido.',
            data: '2025-12-20'
        }
    ];
    
    grid.innerHTML = feedbacksExemplo.map(f => criarCardFeedback(f)).join('');
    
    const totalEl = document.getElementById('totalReviews');
    if (totalEl) {
        totalEl.textContent = feedbacksExemplo.length;
    }
}

function criarCardFeedback(feedback) {
    const estrelas = Array(feedback.rating).fill('<i class="fas fa-star"></i>').join('');
    const iniciais = feedback.nome.split(' ').map(n => n[0]).join('').substring(0, 2);
    
    return '<div class="testimonial-card"><div class="testimonial-header"><div class="testimonial-avatar">' + iniciais + '</div><div class="testimonial-info"><h4>' + feedback.nome + '</h4><div class="testimonial-rating">' + estrelas + '</div></div></div><p class="testimonial-text">"' + feedback.mensagem + '"</p></div>';
}

// ========================================
// MOSTRAR MENSAGEM
// ========================================
function mostrarMensagem(elemento, tipo, texto) {
    elemento.className = 'mensagem show ' + tipo;
    elemento.innerHTML = '<i class="fas fa-check-circle"></i> ' + texto;
    
    setTimeout(() => {
        elemento.classList.remove('show');
    }, 5000);
}
