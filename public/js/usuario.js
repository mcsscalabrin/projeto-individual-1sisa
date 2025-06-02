document.addEventListener('DOMContentLoaded', function () {
    if (sessionStorage.ID_USUARIO == undefined) {
        window.location = "login.html";
        return;
    }

    spanNomeUsuario.innerHTML = sessionStorage.NOME_USUARIO || "Nome não disponível";
    spanEmailUsuario.innerHTML = sessionStorage.EMAIL_USUARIO || "Email não disponível";
    spanCategoriaUsuario.innerHTML = sessionStorage.CATEGORIA_USUARIO || "Categoria não disponível";

    carregarDadosDashboard();
});

function sair() {
    sessionStorage.clear();
    window.location = "login.html";
}

function carregarDadosDashboard() {
    const idUsuario = sessionStorage.ID_USUARIO;

    if (!idUsuario) {
        console.error("ID do usuário não encontrado na sessão.");
        document.getElementById('kpiTotalQuizzes').textContent = '0';
        document.getElementById('kpiMediaAcertos').textContent = '0%';
        document.getElementById('kpiMelhorPontuacao').textContent = '0';
        renderizarGraficoQuiz([]);
        return;
    }

    // Buscar dados dos quizzes do usuário
    fetch(`/quiz/`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status == 204) {
                console.log("Nenhum dado de quiz encontrado para o usuário.");
                return [];
            }
            throw new Error('Falha ao buscar dados do quiz: ' + response.statusText);
        })
        .then(data => {
            const quizDataUsuario = data.filter(registro => registro.fkUsuario == idUsuario);
            atualizarKPIs(quizDataUsuario);
            renderizarGraficoQuiz(quizDataUsuario);
        })
        .catch(error => {
            console.error("Erro ao carregar dados dos quizzes do usuário:", error);
            document.getElementById('kpiTotalQuizzes').textContent = '0';
            document.getElementById('kpiMediaAcertos').textContent = '0%';
            document.getElementById('kpiMelhorPontuacao').textContent = '0';
            renderizarGraficoQuiz([]);
        });
}

    // Buscar dados do ranking
    /*
    fetch(`/quiz/ranking/${idUsuario}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status == 204) {
                console.log("Nenhum dado de ranking encontrado.");
                return { posicao: '-', totalParticipantes: 0 };
            }
            throw new Error('Falha ao buscar dados do ranking: ' + response.statusText);
        })
        .then(dataRanking => {
            if (dataRanking.posicao != '-' && dataRanking.totalParticipantes > 0) {
                document.getElementById('kpiPosicaoGeral').textContent = `${dataRanking.posicao}º de ${dataRanking.totalParticipantes}`;
            } else if (dataRanking.posicao == '-' && dataRanking.totalParticipantes > 0) {
                document.getElementById('kpiPosicaoGeral').textContent = `N/A de ${dataRanking.totalParticipantes}`;
            } else {
                document.getElementById('kpiPosicaoGeral').textContent = '-';
            }
        })
        .catch(error => {
            console.error("Erro ao carregar dados do ranking:", error);
            document.getElementById('kpiPosicaoGeral').textContent = 'Erro';
        });
        */

function atualizarKPIs(quizData) {
    const totalQuizzes = quizData.length;
    let totalAcertos = 0;
    let totalErros = 0;
    let melhorPontuacao = 0;

    quizData.forEach(quiz => {
        totalAcertos += quiz.qtdAcertos;
        totalErros += quiz.qtdErros;
        if (quiz.qtdAcertos > melhorPontuacao) {
            melhorPontuacao = quiz.qtdAcertos;
        }
    });

    const mediaAcertos = totalQuizzes > 0 ? ((totalAcertos / (totalAcertos + totalErros)) * 100).toFixed(1) : 0;

    document.getElementById('kpiTotalQuizzes').textContent = totalQuizzes;
    document.getElementById('kpiMediaAcertos').textContent = `${mediaAcertos}%`;
    document.getElementById('kpiMelhorPontuacao').textContent = melhorPontuacao;
}

function renderizarGraficoQuiz(quizData) {
    const ctx = document.getElementById('quizChart').getContext('2d');

    if (!quizData || quizData.length == 0) {
        ctx.font = "12px 'Open Sans', sans-serif";
        ctx.fillStyle = "#666";
        ctx.textAlign = "center";
        ctx.fillText("Nenhum dado de quiz disponível para exibir o gráfico.", ctx.canvas.width / 2, 10, 900);
        return;
    }

    const labels = quizData.map((quiz, index) => `Quiz ${index + 1} (${new Date(quiz.dtHora).toLocaleDateString()})`);
    const dataAcertos = quizData.map(quiz => quiz.qtdAcertos);
    const dataErros = quizData.map(quiz => quiz.qtdErros);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Acertos',
                    data: dataAcertos,
                    backgroundColor: 'rgba(42, 157, 143, 0.7)',
                    borderColor: 'rgba(42, 157, 143, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Erros',
                    data: dataErros,
                    backgroundColor: 'rgba(220, 53, 69, 0.7)',
                    borderColor: 'rgba(220, 53, 69, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                },
                x: {
                    max: 10
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Desempenho nos Quizzes',
                    font: {
                        size: 35,
                        family: "'Open Sans', sans-serif"
                    },
                    color: '#555'
                },
                legend: {
                    labels: {
                        font: {
                            family: "'Open Sans', sans-serif"
                        }
                    }
                }
            }
        }
    });
}
