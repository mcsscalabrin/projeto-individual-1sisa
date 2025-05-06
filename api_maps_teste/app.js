function initMap() {
    // Coordenadas iniciais do mapa (ex: Copacabana)
    const initialPosition = { lat: -22.970722, lng: -43.182365 };

    // Configuração inicial do mapa
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: initialPosition
    });

    // Lista de locais
    const locations = [
        {
            name: "Praia de Copacabana",
            position: { lat: -22.970722, lng: -43.182365 },
            info: "Aulas particulares e quadras para aluguel"
        },
        {
            name: "Posto 6 - Praia do Diabo",
            position: { lat: -22.986966, lng: -43.190657 },
            info: "Quadras públicas disponíveis"
        }
        // Adicione mais locais aqui
    ];

    // Adicionar marcadores
    locations.forEach(location => {
        const marker = new google.maps.Marker({
            position: location.position,
            map: map,
            title: location.name
        });

        // Janela de informação
        const infoWindow = new google.maps.InfoWindow({
            content: `<h3>${location.name}</h3><p>${location.info}</p>`
        });

        // Evento de clique no marcador
        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });
    });
}
