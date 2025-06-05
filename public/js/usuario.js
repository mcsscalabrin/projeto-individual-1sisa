function sair() {
    sessionStorage.clear();
    window.location = "login.html";
}

function carregarDadosDashboard() {
    var idUsuario = sessionStorage.ID_USUARIO;
    if (!idUsuario) {
        limparDashboard();
        return;
    }

    buscarEstatisticasUsuario(idUsuario);
}

function limparDashboard() {
    document.getElementById('kpiTotalQuizzes').textContent = '0';
    document.getElementById('kpiMediaAcertos').textContent = '0%';
    document.getElementById('kpiMelhorPontuacao').textContent = '0';
    renderizarGraficoQuiz([]);
}

function buscarEstatisticasUsuario(idUsuario) {
    fetch('/estatisticas/usuario/' + idUsuario)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                return [];
            }
        })
        .then(function(estatisticas) {
            var stats;
            if (estatisticas.length > 0) {
                stats = estatisticas[0];
            } else {
                stats = { totalQuizzes: 0, mediaAcertos: 0 };
            }

            document.getElementById('kpiTotalQuizzes').textContent = stats.totalQuizzes || 0;
            document.getElementById('kpiMediaAcertos').textContent = (stats.mediaAcertos || 0) + '%';

            buscarMelhorPontuacao(idUsuario);
        })
        .catch(function(erro) {
            console.error("Erro ao buscar estatísticas:", erro);
            limparDashboard();
        });
}

function buscarMelhorPontuacao(idUsuario) {
    fetch('/estatisticas/melhor-pontuacao/' + idUsuario)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                return { melhorPontuacao: 0 };
            }
        })
        .then(function(dados) {
            document.getElementById('kpiMelhorPontuacao').textContent = dados.melhorPontuacao || 0;

            buscarDadosQuiz(idUsuario);
        })
        .catch(function(erro) {
            console.error("Erro ao buscar melhor pontuação:", erro);
            document.getElementById('kpiMelhorPontuacao').textContent = '0';
            buscarDadosQuiz(idUsuario);
        });
}

function buscarDadosQuiz(idUsuario) {
    fetch('/quiz/')
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                return [];
            }
        })
        .then(function(todosQuizzes) {
            var quizzesDoUsuario = [];
            for (var i = 0; i < todosQuizzes.length; i++) {
                if (todosQuizzes[i].fkUsuario == idUsuario) {
                    quizzesDoUsuario.push(todosQuizzes[i]);
                }
            }

            quizzesDoUsuario.sort(function(a, b) {
                return new Date(b.dtHora) - new Date(a.dtHora);
            });

            var ultimasTentativas = [];
            for (var i = 0; i < quizzesDoUsuario.length && i < 10; i++) {
                ultimasTentativas.push(quizzesDoUsuario[i]);
            }

            ultimasTentativas.reverse();

            renderizarGraficoQuiz(ultimasTentativas);
        })
        .catch(function(erro) {
            console.error("Erro ao buscar dados do quiz:", erro);
            renderizarGraficoQuiz([]);
        });
}

function renderizarGraficoQuiz(quizData) {
    var ctx = document.getElementById('quizChart').getContext('2d');

    if (!quizData || quizData.length == 0) {
        ctx.font = "12px 'Open Sans', sans-serif";
        ctx.fillStyle = "#666";
        ctx.textAlign = "center";
        ctx.fillText("Nenhum dado de quiz disponível para exibir o gráfico.", ctx.canvas.width / 2, 10, 900);
        return;
    }

    var labels = [];
    var dataAcertos = [];
    var dataErros = [];

    for (var i = 0; i < quizData.length; i++) {
        var data = new Date(quizData[i].dtHora);
        var dataFormatada = data.toLocaleDateString();
        labels.push('Tentativa ' + (i + 1) + ' (' + dataFormatada + ')');
        dataAcertos.push(quizData[i].qtdAcertos);
        dataErros.push(quizData[i].qtdErros);
    }

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
                    ticks: { stepSize: 1 }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Erros vs. Acertos nas Últimas Tentativas',
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
