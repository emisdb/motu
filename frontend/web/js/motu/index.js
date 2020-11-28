const app = new App(document.getElementById("map"));

ymaps.ready(map_init);
function map_init() {

    var map = document.getElementById("map");
    map.addEventListener("animationend", ()=>{
        app.setMap(ymaps);
        app.map.container.fitToViewport();
        // app.setSites([
        //         {name:'Solo Sokos Palace Bridge',       latitude:59.945013, longitude:30.292790, stars:5},
        //         {name:'МФК «Горный»',                   latitude:59.941759, longitude:30.230429, stars:4},
        //         {name:'Solo Sokos Hotel Vasilievsky',   latitude:59.937301, longitude:30.282406, stars:5},
        //         {name:'Art Nuvo Palace',                latitude:59.945612, longitude:30.258124, stars:4},
        //         {name:'Courtyard by Marriott',          latitude:59.948717, longitude:30.279405, stars:5},
        //         {name:'Докланс Лайф',                   latitude:59.956985, longitude:30.241910, stars:3},
        //     ]
        // );
        app.setCenter(center_coors);
        app.setSites(show_points);
        app.setRecommendations(show_recommend);
        app.arrangeFilters(filters);
    });
}