const CONFIG_PADRAO = {
    titulo: "Transforme sua Ideia em um Site ou Aplicativo Profissional",
    subtitulo: "Desenvolvimento rápido, design moderno e preço acessível.",
    preco: "R$ 97",
    linkCompra: "",
    videoYouTube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    exemploImagem: "https://via.placeholder.com/500x300/8b5cf6/ffffff?text=Preview+do+Site",
    linkExemplo: "#"
};

function aplicarConfig(config) {
    const cfg = config || CONFIG_PADRAO;
    
    document.getElementById('lp-titulo').textContent = cfg.titulo;
    document.getElementById('lp-subtitulo').textContent = cfg.subtitulo;
    document.getElementById('lp-preco').textContent = cfg.preco;
    document.getElementById('lp-video-iframe').src = cfg.videoYouTube;
    
    const linkCompra = cfg.linkCompra || '#';
    
    document.querySelectorAll('#lp-btn-whatsapp, #lp-btn-comprar, #lp-btn-cta').forEach(btn => {
        btn.href = linkCompra;
    });
    
    const btnExemplo = document.getElementById('lp-btn-exemplo');
    if (btnExemplo && cfg.linkExemplo) btnExemplo.href = cfg.linkExemplo;
    
    const imgExemplo = document.getElementById('lp-exemplo-img');
    if (imgExemplo && cfg.exemploImagem) imgExemplo.src = cfg.exemploImagem;
}

async function carregarConfig() {
    try {
        const snap = await database.ref('landing-config').once('value');
        const config = snap.val();
        aplicarConfig(config || CONFIG_PADRAO);
    } catch(e) {
        aplicarConfig(CONFIG_PADRAO);
    }
}

carregarConfig();
