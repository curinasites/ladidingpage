const CONFIG_PADRAO = {
    titulo: 'Transforme sua Ideia em um <span class="gradient-text">Site ou App Profissional</span>',
    subtitulo: "Desenvolvimento rápido, design moderno e preço acessível. Tudo que você precisa para começar seu negócio digital.",
    preco: "97",
    linkCompra: "",
    videoYouTube: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    exemploImagem: "https://via.placeholder.com/800x500/8b5cf6/ffffff?text=Preview+do+Projeto",
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

// Header scroll
window.addEventListener('scroll', () => {
    document.getElementById('header')?.classList.toggle('scrolled', window.scrollY > 50);
});

// Animação ao scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

async function carregarConfig() {
    try {
        const snap = await database.ref('landing-config').once('value');
        aplicarConfig(snap.val() || CONFIG_PADRAO);
    } catch(e) {
        aplicarConfig(CONFIG_PADRAO);
    }
}

carregarConfig();
