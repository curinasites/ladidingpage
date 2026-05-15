// ========== CONFIGURAÇÃO PADRÃO ==========
const CONFIG_PADRAO = {
    titulo: "Transforme sua Ideia em um Site ou Aplicativo Profissional",
    subtitulo: "Desenvolvimento rápido, design moderno e preço acessível. Tudo que você precisa para começar seu negócio digital.",
    preco: "R$ 97",
    whatsapp: "5599999999999",
    mensagemWhatsApp: "Olá! Tenho interesse no serviço de criação de sites/apps.",
    linkCompra: "",
    videoYouTube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    projetos: [
        { nome: "Loja de APKs", imagem: "https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Projeto+1", link: "#" },
        { nome: "Landing Page", imagem: "https://via.placeholder.com/400x300/6366f1/ffffff?text=Projeto+2", link: "#" },
        { nome: "Site Institucional", imagem: "https://via.placeholder.com/400x300/a78bfa/ffffff?text=Projeto+3", link: "#" }
    ]
};

// ========== APLICAR CONFIGURAÇÕES ==========
function aplicarConfig(config) {
    const cfg = config || CONFIG_PADRAO;
    
    document.getElementById('lp-titulo').textContent = cfg.titulo;
    document.getElementById('lp-subtitulo').textContent = cfg.subtitulo;
    document.getElementById('lp-preco').textContent = cfg.preco;
    document.getElementById('lp-video-iframe').src = cfg.videoYouTube;
    
    const linkCompra = cfg.linkCompra || `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(cfg.mensagemWhatsApp)}`;
    
    document.querySelectorAll('[id^="lp-btn"]').forEach(btn => {
        btn.href = linkCompra;
    });

    // Atualiza projetos
    if (cfg.projetos) {
        cfg.projetos.forEach((projeto, i) => {
            const num = i + 1;
            const img = document.getElementById('lp-projeto-img' + num);
            const nome = document.getElementById('lp-projeto-nome' + num);
            const link = document.getElementById('lp-projeto-link' + num);
            if (img) img.src = projeto.imagem || img.src;
            if (nome) nome.textContent = projeto.nome || nome.textContent;
            if (link) link.href = projeto.link || '#';
        });
    }
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
