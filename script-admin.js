// ========== ADMIN LANDING PAGE ==========
const SENHA_ADMIN = "curina2024"; // ALTERE ESTA SENHA!

// Verifica se já está logado
if (localStorage.getItem('lp_admin_logado') !== 'sim') {
    // Mostra tela de senha
    document.querySelector('.admin-container').innerHTML = `
        <h2>🔐 Acesso Restrito</h2>
        <p style="text-align:center;color:#808098;font-size:13px;margin-bottom:16px;">Área exclusiva para administrador</p>
        <div class="input-group">
            <label>Senha de Admin</label>
            <input type="password" id="senha-input" placeholder="Digite a senha..." style="width:100%; padding:11px 14px; border-radius:10px; border:1px solid rgba(255,255,255,0.12); background:rgba(255,255,255,0.05); color:#fff; font-size:14px; outline:none;">
        </div>
        <p style="color:#f87171;font-size:13px;text-align:center;display:none;" id="erro-senha">Senha incorreta!</p>
        <button class="btn-salvar" onclick="verificarSenha()" style="width:100%; padding:14px; border-radius:30px; border:none; font-weight:700; font-size:15px; cursor:pointer; background:linear-gradient(135deg, #6366f1, #8b5cf6); color:#fff; margin-top:10px;">Entrar</button>
        <div class="voltar" style="text-align:center; margin-top:20px;">
            <a href="index.html" style="color:#808098; text-decoration:none; font-size:13px;">← Voltar para a página</a>
        </div>
    `;
}

function verificarSenha() {
    const senha = document.getElementById('senha-input').value;
    if (senha === SENHA_ADMIN) {
        localStorage.setItem('lp_admin_logado', 'sim');
        location.reload();
    } else {
        document.getElementById('erro-senha').style.display = 'block';
    }
}

function logout() {
    localStorage.removeItem('lp_admin_logado');
    location.reload();
}

// Só carrega se estiver logado
if (localStorage.getItem('lp_admin_logado') === 'sim') {
    carregarConfig();
}

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
