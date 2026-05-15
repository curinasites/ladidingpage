// ========== ADMIN LANDING PAGE ==========

// Carrega as configurações salvas
async function carregarConfig() {
    try {
        const snap = await database.ref('landing-config').once('value');
        const config = snap.val();
        if (config) {
            document.getElementById('admin-titulo').value = config.titulo || '';
            document.getElementById('admin-subtitulo').value = config.subtitulo || '';
            document.getElementById('admin-preco').value = config.preco || '';
            document.getElementById('admin-whatsapp').value = config.whatsapp || '';
            document.getElementById('admin-mensagem').value = config.mensagemWhatsApp || '';
            document.getElementById('admin-video').value = config.videoYouTube || '';
            const fotos = config.fotos || [];
            document.getElementById('admin-foto1').value = fotos[0] || '';
            document.getElementById('admin-foto2').value = fotos[1] || '';
            document.getElementById('admin-foto3').value = fotos[2] || '';
        }
    } catch (e) {
        console.log('Nenhuma configuração salva ainda.');
    }
}

// Salva as configurações
async function salvarConfig() {
    const config = {
        titulo: document.getElementById('admin-titulo').value.trim(),
        subtitulo: document.getElementById('admin-subtitulo').value.trim(),
        preco: document.getElementById('admin-preco').value.trim(),
        whatsapp: document.getElementById('admin-whatsapp').value.trim(),
        mensagemWhatsApp: document.getElementById('admin-mensagem').value.trim(),
        videoYouTube: document.getElementById('admin-video').value.trim(),
        fotos: [
            document.getElementById('admin-foto1').value.trim(),
            document.getElementById('admin-foto2').value.trim(),
            document.getElementById('admin-foto3').value.trim()
        ]
    };

    try {
        await database.ref('landing-config').set(config);
        document.getElementById('msg-sucesso').style.display = 'block';
        setTimeout(() => {
            document.getElementById('msg-sucesso').style.display = 'none';
        }, 2000);
    } catch (e) {
        alert('❌ Erro ao salvar: ' + e.message);
    }
}

// Carrega ao abrir a página
carregarConfig();