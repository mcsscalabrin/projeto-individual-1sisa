document.addEventListener('DOMContentLoaded', function () {
    if (sessionStorage.ID_USUARIO == undefined) {
        window.location = "login.html";
        return;
    }

    carregarVideos();
});

function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";
}

function mostrarErro(mensagem) {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML = mensagem;
    setTimeout(sumirMensagem, 5000);
}

function sumirMensagem() {
    cardErro.style.display = "none";
}

function extrairIdYoutube(url) {
    if (!url) return null;

    // Padrões de URL do YouTube
    const regexes = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\?]+)/,
        /youtube\.com\/embed\/([^&\?]+)/
    ];

    for (let regex of regexes) {
        const match = url.match(regex);
        if (match && match[1]) {
            return match[1];
        }
    }

    return null;
}

function validarUrlVideo(url) {
    // Verifica se é uma URL válida
    try {
        new URL(url);
    } catch (e) {
        return false;
    }

    return extrairIdYoutube(url) != null;
}

function postarVideo() {
    aguardar();

    var tituloVar = titulo_input.value;
    var descricaoVar = descricao_input.value;
    var videoUrlVar = video_url_input.value;

    // Validações
    if (tituloVar == "") {
        mostrarErro("Preencha o título do vídeo!");
        finalizarAguardar();
        return;
    }

    if (!videoUrlVar || !validarUrlVideo(videoUrlVar)) {
        mostrarErro("Insira uma URL válida de vídeo do YouTube!");
        finalizarAguardar();
        return;
    }

    var dados = {
        titulo: tituloVar,
        descricao: descricaoVar,
        videoUrl: videoUrlVar,
        idUsuario: sessionStorage.ID_USUARIO
    };

    fetch("/videos/publicar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    }).then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            titulo_input.value = "";
            descricao_input.value = "";
            video_url_input.value = "";

            carregarVideos();

            mostrarErro("Vídeo publicado com sucesso!");
        } else {
            mostrarErro("Houve um erro ao publicar o vídeo!");
        }
    }).catch(function (erro) {
        console.log(erro);
        mostrarErro("Houve um erro ao publicar o vídeo!");
    }).finally(function () {
        finalizarAguardar();
    });
}

function carregarVideos() {
    fetch("/videos/listar", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if (resposta.status == 200) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var videosContainer = document.getElementById("videos-container");
                var semVideos = document.getElementById("sem-videos");

                videosContainer.innerHTML = "";

                if (resposta.length > 0) {
                    semVideos.style.display = "none";

                    for (let i = 0; i < resposta.length; i++) {
                        var video = resposta[i];

                        var youtubeId = extrairIdYoutube(video.videoUrl);
                        var embedHtml = '';

                        if (youtubeId) {
                            embedHtml = `<iframe src="https://www.youtube.com/embed/${youtubeId}"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen></iframe>`;
                        } else {
                            embedHtml = `<p>URL de vídeo não suportada</p>`;
                        }

                        var videoCard = document.createElement("div");
                        videoCard.className = "video-card";

                        var data = new Date(video.dtHora);
                        var dataFormatada = data.toLocaleDateString('pt-BR') + ' ' + data.toLocaleTimeString('pt-BR');

                        videoCard.innerHTML = `
                            <h3>${video.titulo}</h3>
                            <p>${video.descricao || "Sem descrição"}</p>
                            ${embedHtml}
                            <div class="video-info">
                                <span>Por: ${video.nomeUsuario}</span>
                                <span>${dataFormatada}</span>
                            </div>
                        `;

                        videosContainer.appendChild(videoCard);
                    }
                } else {
                    semVideos.style.display = "block";
                    videosContainer.appendChild(semVideos);
                }
            });
        } else if (resposta.status == 204) {
            var videosContainer = document.getElementById("videos-container");
            var semVideos = document.getElementById("sem-videos");

            videosContainer.innerHTML = "";

            semVideos.style.display = "block";
            videosContainer.appendChild(semVideos);
        } else {
            console.error('Erro na API:', resposta.status);
        }
    }).catch(function (erro) {
        console.error(erro);
    });
}
