class App {
    constructor(container) {
        this.map_container = container;
    }
     setMap(ymaps){
        this.map = new ymaps.Map(this.map_container, {
//            center: [30.25, 59.943],
            center: center_coors,
            zoom: 14,
            controls: ['smallMapDefaultSet'],
            behaviors: ['default', 'scrollZoom'],
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
        content +=      "<div><img src='../../images/tmp_pics/hrc_logo.png' alt='IMAGE' /></div>";
        content +=      "<div ><div class='baloon_text'><div>" + this.sites[i].brand_name_en + "</div>";
        content +=          "<div class='baloon_green'></div><div>" + this.sites[i].rating + "</div></div>";
        content +=          "<div class='baloon_text'><div class='baloon_note'>" + this.sites[i].address + "</div></div>";
        content +=          "<div class='baloon_text'><div class='baloon_note'>Средняя цена:</div><div>" + this.sites[i].average_price + "&#8381</div></div>";
        content +=          "<div><a onclick='app.pt_details(" + i + ") href='#'>Подробнее</a></div></div>";
        content += "<div><div class='baloon_percent'>" + this.sites[i].discount + "%</div>";
        content += '<div><a onclick="app.pt_select('+ i +')" href="#"><img src="./../images/icons/route.svg" /></a></div></div>';
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
    setControl(step){
        switch(step){
            case 0:
                let reso=document.querySelector("#control_area");
                reso.innerHTML=this.control;
                let slogoo=document.querySelector("#sidebar_logo");
                slogoo.style.display='block';
                let sbacko=document.querySelector("#sidebar_back");
                sbacko.style.display='none';
                this.setInisible();
                this.currentCategory=[];
                break;
            case 1:
                let res=document.querySelector("#control_area");
                this.control=res.innerHTML;
                res.innerHTML=this.getFilters();
                let slogo=document.querySelector("#sidebar_logo");
                slogo.style.display='none';
                let sback=document.querySelector("#sidebar_back");
                sback.style.display='block';
                break;

        }
    }
    setRecommendations(recs) {
        this.recommendsations = recs;
        let res=document.querySelector("#recommend_list");
        let num=document.querySelector("#recommend_number");
        var list = "";

         for (var i = 0; i < this.recommendsations.length; i++) {
            list += "<div><img src='" +  this.recommendsations[i].picture + "' /></div>";
        }
        res.innerHTML = list;
        num.innerHTML = --i;
    }
    setVisible(ids){
        for (var ii = 0; ii < this.sites.length; ii++) {
            for (var i=0; i<ids.length; i++) {
                let plm = this.sites[ii].mark;
                if (this.sites[ii].category_id == ids[i]) {
                    plm.options.set("visible", true);
                }else{
                    plm.options.set("visible", false);
                }
            }
        }
        this.currentCategory=ids;
        this.setControl(1);
    }
    setInisible(){
        for (var ii = 0; ii < this.sites.length; ii++) {
            let plm = this.sites[ii].mark;
            plm.options.set("visible", false);
        }
     }
    getFilters(){
        var content="<div class='filter_container'>";
        var ii=0;
  //      for (var i=0; i<this.filters.length; i++) {
        for (var key0 in this.filters) {
            if(this.currentCategory.indexOf(parseInt(key0))>=0){
                for (var key1 in this.filters[key0]) {
                    if(this.filters[key0][key1][1]>0) {
                        content += "<a class='filter' href='#' onclick='app.setFilter(' + key1 + ')'>" + this.filters[key0][key1][0] + " " + this.filters[key0][key1][1] + "</a>";
                        ii++;
                    }
                }
            }
        }
        return content +"</div>";

    }
    arrangeFilters(filters){
        this.filters=[];

        for (var i=0; i<filters.length; i++) {
            var num =0;
            if(filters[i].category_id in this.filters) {
                if(filters[i].filter_id in this.filters[filters[i].category_id]) {
                    num=this.filters[filters[i].category_id][filters[i].filter_id][1]+1;
                }
                    this.filters[filters[i].category_id][filters[i].filter_id]=[filters[i].title,num ];

            } else{
                this.filters[filters[i].category_id]=[];
                this.filters[filters[i].category_id][filters[i].filter_id]=[filters[i].title,num ];
            }
             this.providers[filters[i].provider_id][1].push(filters[i].filter_id);
        }

    }
    setSites(sites){
        this.sites =sites;
        this.providers =[];
        for (var i=0; i<this.sites.length; i++) {
            const label = this.sites[i].brand_name_en.slice(0,2);
            const name = this.baloon_content(i);
            this.providers[this.sites[i].id]=[i,[]];

//            var mark_color = 'twirl#darkblueIcon';
            var mark_color = 'twirl#darkblueIcon';

            switch (this.sites[i].category_id) {
                case '1':
//                    mark_color = 'twirl#darkblueIcon';
                    mark_color = [[57, 12],[81, 36]];
                    break;
                case '2':
 //                   mark_color = 'twirl#darkgreenIcon';
                    mark_color = [[149, 12],[173, 36]];
                    break;
                case '3':
//                    mark_color = 'twirl#darkorangeIcon';
                    mark_color = [[103, 12],[127, 36]];
                    break;
                case '4':
//                    mark_color = 'twirl#yellowIcon';
                    mark_color = [[195, 12],[219, 36]];
                    break;
                case '5':
//                    mark_color = 'twirl#greyIcon';
                    mark_color = [[149, 12],[173, 36]];
                    break;
            }
            let plm =new ymaps.Placemark(
                [this.sites[i].longitude ,this.sites[i].latitude],
                {
                    balloonContent: name,
//                    iconContent: label,
                },
                {
                    iconImageHref: '../../images/GeoPins.png',
                    iconImageOffset:[-15, -20],
                    // Размеры изображения иконки
                    iconImageSize: [24, 24],
                    //                   iconImageClipRect:[[124, 364],[140, 378]],
                    iconImageClipRect: mark_color,
//                    iconContent: ix,
                    balloonContentSize: [100, 100],
                    balloonShadow: true,
//                   preset: mark_color,
                    inx: i,
            });
            plm.events.add('balloonopen', function (e) {
 //               let res=document.querySelector("#visited div:last-child");
                var target = e.get('target');
                let inx = target.options.get('inx');
//                res.innerHTML = this.sites[inx].name;
            }.bind(this));
            plm.options.set("visible", false);
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