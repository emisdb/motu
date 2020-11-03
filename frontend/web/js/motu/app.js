class App {
    constructor(container) {
        this.map_container = container;
    }
     setMap(ymaps){
        this.map = new ymaps.Map(this.map_container, {
            center: [30.25, 59.943],
            zoom: 14
        });
        this.map.controls.add('zoomControl', {right: '5px', bottom: '50px'});
    }
    setHotels(hotels){
        this.hotels =hotels;
        let mm = document.querySelector("#myMenu");
        var list = "<table>";
         for (var i=0; i<this.hotels.length; i++) {
            const label = this.hotels[i].name.slice(0,2);
            const name = this.hotels[i].name;
            list += "<tr class='" + (i%2?"odd":"even")+ "' onmouseover='app.omover(this)' onmouseout='app.omout(this)' ><td>" + label + "</td><td><a href='#'>" + name + "</a></td></tr>";
            let plm =new ymaps.Placemark(
                [this.hotels[i].longtitude ,this.hotels[i].latitude],
                {
                    balloonContent: name,
                    iconContent: label,
                },
                {
                    preset: "twirl#darkblueIcon",
                    inx: i,
                });
            plm.events.add('balloonopen', function (e) {
                let res=document.querySelector("#myResult");
                var target = e.get('target');
                let inx = target.options.get('inx');
                res.innerHTML = this.hotels[inx].name;
            }.bind(this));
            this.hotels[i].mark =plm;
            this.map.geoObjects.add(plm);
        }
        mm.innerHTML = list + "</table>";
    }
    setSites(sites){
        this.sites =sites;
        for (var i=0; i<this.sites.length; i++) {
            const label = this.sites[i].name.slice(0,2);
            const name = this.sites[i].name;
            let plm =new ymaps.Placemark(
                [this.sites[i].longtitude ,this.sites[i].latitude],
                {
                    balloonContent: name,
                    iconContent: label,
                },
                {
                    preset: "twirl#darkblueIcon",
                    inx: i,
            });
            plm.events.add('balloonopen', function (e) {
                let res=document.querySelector("#myResult");
                var target = e.get('target');
                let inx = target.options.get('inx');
                res.innerHTML = this.sites[inx].name;
            }.bind(this));
            this.sites[i].mark =plm;
            this.map.geoObjects.add(plm);
        }
    }

    omover(tr){
        let e=document.querySelector("#myResult");
        e.innerHTML = this.hotels[tr.rowIndex].name;
        var geoO=this.hotels[tr.rowIndex].mark;
//        geoO.options.set("iconColor", 'ff66ff');
        geoO.options.set('preset', 'twirl#nightDotIcon');

    }
    omout(tr){
        let e=document.querySelector("#myResult");
        e.innerHTML = "";
        var geoO=this.hotels[tr.rowIndex].mark;
        geoO.options.set('preset', 'twirl#darkblueIcon');

    }

}