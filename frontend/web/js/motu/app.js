class App {
    constructor(container) {
        this.map_container = container;
    }
     setMap(ymaps){
        this.map = new ymaps.Map(this.map_container, {
//            center: [30.25, 59.943],
            center: center_coors,
            zoom: 15,
            controls: ['smallMapDefaultSet']
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
                [this.hotels[i].longitude ,this.hotels[i].latitude],
                {
                    balloonContent: name,
                    iconContent: label,
                },
                {
                    preset: "twirl#darkblueIcon",
                    inx: i,
                });
            plm.events.add('balloonopen', function (e) {
                let res=document.querySelector("#visited div:last-child");
                var target = e.get('target');
                let inx = target.options.get('inx');
                res.innerHTML = this.hotels[inx].name;
            }.bind(this));
            this.hotels[i].mark =plm;
            this.map.geoObjects.add(plm);
        }

        mm.innerHTML = list + "</table>";
    }
    pt_details(i){
        let res=document.querySelector("#sidebar div:first-child");
        res.innerHTML = app.sites[i].brand_name_en;
        let bar=document.querySelector("#sidebar")
        const mouseoverEvent = new Event('mouseenter');
       bar.dispatchEvent(mouseoverEvent);
    }
    pt_select(i){
        let res=document.querySelector("#selected div:last-child");
        res.innerHTML = app.sites[i].brand_name_en;
    }
    baloon_content(i){
        var content = '<div class="baloon">';
        content += "<h2>" + this.sites[i].brand_name_en + "</h2>";
        content += '<div style="height:80px; border: solid 1px;">IMAGE</div>';
        content += '<div><a onclick="app.pt_details('+ i +')" href="#">Details</a></div>';
        content += '<div><a onclick="app.pt_select('+ i +')" href="#">Select</a></div>';
        return content += '</div>';
    }
    setCenter(center){
        let myPlacemarkWithContent = new ymaps.Placemark(center, {
            hintContent: 'Park Inn by Radisson Nevsky',
            balloonContent: 'Park Inn by Radisson Nevsky',
            //          iconContent: 'Hotel'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            iconImageHref: 'https://avatars.mds.yandex.net/get-tycoon/1654178/9594_pin_bitmap_standard_2019-09-18T13_22_49/pin-desktop_x2',
            // Размеры метки.
            iconImageSize: [60, 60],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            //           iconImageOffset: [-20, -20],
            // Смещение слоя с содержимым относительно слоя с картинкой.
//            iconContentOffset: [15, 15],
            // Макет содержимого.
//             iconContentLayout: MyIconContentLayout
        });

        this.map.geoObjects.add(myPlacemarkWithContent);

    }
        setSites(sites){
        this.sites =sites;
        for (var i=0; i<this.sites.length; i++) {
            const label = this.sites[i].brand_name_en.slice(0,2);
            const name = this.baloon_content(i);
            var mark_color = 'twirl#darkblueIcon';
            switch (this.sites[i].category_id) {
                case '1':
                    mark_color = 'twirl#darkblueIcon';
                    break;
                case '2':
                    mark_color = 'twirl#darkgreenIcon';
                    break;
                case '3':
                    mark_color = 'twirl#darkorangeIcon';
                    break;
                case '4':
                    mark_color = 'twirl#yellowIcon';
                    break;
                case '5':
                    mark_color = 'twirl#greyIcon';
                    break;
            }
            let plm =new ymaps.Placemark(
                [this.sites[i].longitude ,this.sites[i].latitude],
                {
                    balloonContent: name,
                    iconContent: label,
                },
                {
                    preset: mark_color,
                    inx: i,
            });
            plm.events.add('balloonopen', function (e) {
                let res=document.querySelector("#visited div:last-child");
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
        e.innerHTML = this.hotels[tr.rowIndex].brand_name_en;
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