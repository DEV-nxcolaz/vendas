const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Arquivo de dados
const DATA_FILE = path.join(__dirname, 'dados.json');

// Inicializar arquivo de dados se não existir
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ orcamentos: [], feedback: [], contato: [] }, null, 2));
}

// Função para ler dados
function lerDados() {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
}

// Função para salvar dados
function salvarDados(dados) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(dados, null, 2));
}

// ========================================
// ROTAS
// ========================================

// POST - Orçamentos
app.post('/api/orcamentos', (req, res) => {
    try {
        const dados = lerDados();
        const orcamento = {
            id: Date.now(),
            ...req.body,
            data: new Date().toISOString()
        };
        dados.orcamentos.push(orcamento);
        salvarDados(dados);
        
        console.log('Novo orçamento recebido:', orcamento.nome);
        res.json({ success: true, message: 'Orçamento salvo com sucesso!', data: orcamento });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao salvar orçamento' });
    }
});

// POST - Feedback
app.post('/api/feedback', (req, res) => {
    try {
        const dados = lerDados();
        const feedback = {
            id: Date.now(),
            ...req.body,
            data: new Date().toISOString()
        };
        dados.feedback.push(feedback);
        salvarDados(dados);
        
        console.log('Novo feedback recebido:', feedback.nome);
        res.json({ success: true, message: 'Feedback salvo com sucesso!', data: feedback });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao salvar feedback' });
    }
});

// POST - Contato
app.post('/api/contato', (req, res) => {
    try {
        const dados = lerDados();
        const contato = {
            id: Date.now(),
            ...req.body,
            data: new Date().toISOString()
        };
        dados.contato.push(contato);
        salvarDados(dados);
        
        console.log('Nova mensagem de contato:', contato.nome);
        res.json({ success: true, message: 'Mensagem salva com sucesso!', data: contato });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao salvar mensagem' });
    }
});

// GET - Feedbacks
app.get('/api/feedback', (req, res) => {
    try {
        const dados = lerDados();
        res.json({ success: true, data: dados.feedback });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao carregar feedbacks' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log('API disponível em http://localhost:3000/api');
});

