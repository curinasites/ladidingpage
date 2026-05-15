const CONFIG_PADRAO = {
    titulo: "Transforme sua Ideia em um Site ou App Profissional",
    subtitulo: "Desenvolvimento rápido, design moderno e preço acessível. Tudo que você precisa para começar seu negócio digital em até 7 dias.",
    preco: "97",
    linkCompra: "",
    videoYouTube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    exemploImagem: "https://via.placeholder.com/600x400/8b5cf6/ffffff?text=Preview+do+Site",
    linkExemplo: "#"
};

function aplicarConfig(config) {
    const cfg = config || CONFIG_PADRAO;
    
    document.getElementById('lp-titulo').innerHTML = cfg.titulo;
    document.getElementById('lp-subtitulo').textContent = cfg.subtitulo;
    document.getElementById('lp-preco').textContent = cfg.preco;
    if (document.getElementById('lp-preco-cta')) document.getElementById('lp-preco-cta').textContent = 'R$ ' + cfg.preco;
    document.getElementById('lp-video-iframe').src = cfg.videoYouTube;
    
    const linkCompra = cfg.linkCompra || '#';
    
    document.querySelectorAll('#lp-btn-whatsapp, #lp-btn-comprar, #lp-btn-cta, #lp-btn-header, #lp-whatsapp-float').forEach(btn => {
        btn.href = linkCompra;
    });
    
    const btnExemplo = document.getElementById('lp-btn-exemplo');
    if (btnExemplo && cfg.linkExemplo) btnExemplo.href = cfg.linkExemplo;
    
    const imgExemplo = document.getElementById('lp-exemplo-img');
    if (imgExemplo && cfg.exemploImagem) imgExemplo.src = cfg.exemploImagem;
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// Animação de entrada
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.servico-card-lp, .depoimento-card-lp, .faq-item-lp, .exemplo-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

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
