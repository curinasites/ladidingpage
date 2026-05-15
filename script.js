// ========== CONFIGURAÇÃO ==========
// Edite estas informações ou use o admin
const CONFIG_PADRAO = {
    titulo: "Transforme sua Ideia em um Site ou Aplicativo Profissional",
    subtitulo: "Desenvolvimento rápido, design moderno e preço acessível. Tudo que você precisa para começar seu negócio digital.",
    preco: "R$ 97",
    whatsapp: "5599999999999",
    mensagemWhatsApp: "Olá! Tenho interesse no serviço de criação de sites/apps.",
    videoYouTube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    fotos: [
        "https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Projeto+1",
        "https://via.placeholder.com/400x300/6366f1/ffffff?text=Projeto+2",
        "https://via.placeholder.com/400x300/a78bfa/ffffff?text=Projeto+3"
    ]
};

// ========== APLICAR CONFIGURAÇÕES ==========
function aplicarConfig(config) {
    const cfg = config || CONFIG_PADRAO;
    
    document.getElementById('lp-titulo').textContent = cfg.titulo;
    document.getElementById('lp-subtitulo').textContent = cfg.subtitulo;
    document.getElementById('lp-preco').textContent = cfg.preco;
    document.getElementById('lp-video-iframe').src = cfg.videoYouTube;
    
    const linkWhatsApp = `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(cfg.mensagemWhatsApp)}`;
    
    document.querySelectorAll('[id^="lp-btn"]').forEach(btn => {
        btn.href = linkWhatsApp;
    });
}

// ========== CARREGAR DO FIREBASE ==========
async function carregarConfig() {
    try {
        const snap = await database.ref('landing-config').once('value');
        const config = snap.val();
        if (config) {
            aplicarConfig(config);
        } else {
            aplicarConfig(CONFIG_PADRAO);
        }
    } catch(e) {
        aplicarConfig(CONFIG_PADRAO);
    }
}

carregarConfig();