ymaps.ready(init);

const button = document.querySelector('button[id="button"]');

function init() {
    button.addEventListener('click', async (e) => {
        const address = document.querySelector('input[id="inputAddress"]').value;
        const doctorType = document.querySelector('input[id="doctorType"]').value;
        let res = await fetch('/distance', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                doctorType
            })
        });
        const doctorsSelected = await res.json();
        // Расчет расстояния
        for (let i = 0; i < doctorsSelected.length; i++) {
            ymaps.geocode(`${address} москва`)
                .then(function (res) {
                    let aPoint = res.geoObjects.get(0)
                        .geometry.getCoordinates();
                    ymaps.geocode(`${doctorsSelected[i].address} москва`)
                        .then(function (res) {
                            let bPoint = res.geoObjects.get(0)
                                .geometry.getCoordinates();
                            // Расстояние.
                            alert(ymaps.formatter.distance(ymaps.coordSystem.geo
                                .getDistance(aPoint, bPoint)).replace('&#160;км', ''));
                            alert(doctorsSelected[i].address);
                        });
                });
        }
        // console.log(distances);
        // console.log(addresses);
        // Гончарная улица, 26к1
    })

    let myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 10,
        controls: ["fullscreenControl", "zoomControl", "searchControl", "routeButtonControl",
        ]
    }, {
            searchControl: 'yandex#search'
        });
    async function a() {
        let res = await fetch('/placemark', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        let placemarks = await res.json()

        placemarks.forEach((obj) => {
            myMap.geoObjects
                .add(new ymaps.Placemark([obj.latitude, obj.longitude], {
                    hintContent: obj.hintContent,
                    balloonContent: obj.balloonContent
                }, {
                        preset: 'islands#blueMedicalCircleIcon',
                        iconColor: 'red'
                    }))
        });
        let suggestView1 = new ymaps.SuggestView('suggest1');
    }
    a();


}
