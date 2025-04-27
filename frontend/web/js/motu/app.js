class App {
    constructor(container) {
        this.map_container = container;
        this.ixfilters =[];
        this.ixproviders =[];
        this.filters=[];
        this.currentFilter=[];
        this.currentCategory=[];
        this.currentPage=0;
        this.control=[];
        this.docontrol=true;
        this.tmp=[];
        this.selected=[]
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
        this.selected.push(i);
        let res=document.querySelector("#selected_bage span");
        res.innerHTML = this.selected.length;
        let plm=this.sites[i].mark[0];
        this.sites[i].mark[1] =1;
        plm.options.set('iconImageClipRect',[[241, 12],[265, 36]]);
        plm.options.set('visible',true);
    }
    baloon_content(i){
        var content = '<div class="baloon">';
        content +=      "<div><img src='../../images/tmp_pics/hrc_logo.png' alt='IMAGE' /></div>";
        content +=      "<div ><div class='baloon_text'><div>" + this.sites[i].brand_name_en + "</div>";
        content +=          "<div class='baloon_green'></div><div>" + this.sites[i].rating + "</div></div>";
        content +=          "<div class='baloon_text'><div class='baloon_note'>" + this.sites[i].address + "</div></div>";
        content +=          "<div class='baloon_text'><div class='baloon_note'>Средняя цена:</div><div>" + this.sites[i].average_price + "&#8381</div></div>";
        content +=          "<div><a onclick='app.setPage(" + i + ")' href='#'>Подробнее</a></div></div>";
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
                if( this.control.length==0) return;
                let step = this.control.pop();
                this.docontrol=true;
                if (step[1]) {
                    var reso = document.querySelector("#display_area");
                }
                else  {
                    var reso=document.querySelector("#control_area");
                    let slogoo=document.querySelector("#sidebar_logo");
                    slogoo.style.display='block';
                    let sbacko=document.querySelector("#sidebar_back");
                    sbacko.style.display='none';
                    this.setInvisible();
                    this.currentCategory=[];
                    this.currentFilter=[];
                }
                reso.innerHTML=step[0];
                 break;
            case 1:
                let res=document.querySelector("#control_area");
                if(this.docontrol) this.control.push([res.innerHTML,0]);
                res.innerHTML=this.getFilters();
                let slogo=document.querySelector("#sidebar_logo");
                slogo.style.display='none';
                let sback=document.querySelector("#sidebar_back");
                sback.style.display='block';
                break;
            case 2:
                let res2=document.querySelector("#display_area");
                if(this.docontrol)  this.control.push([res2.innerHTML,1]);
                this.docontrol=false;
                res2.innerHTML=this.getPage();
                let slogo2=document.querySelector("#sidebar_logo");
                slogo2.style.display='none';
                let sback2=document.querySelector("#sidebar_back");
                sback2.style.display='block';
                break;

        }
    }
    setRecommendations(recs) {
        this.recommendations = recs;
        let res=document.querySelector("#recommend_list");
        let num=document.querySelector("#recommend_number");
        var list = "";
        if(!this.recommendations) {
            for (var i = 0; i < this.recommendations.length; i++) {
                list += "<div><img src='" +  this.recommendations[i].picture + "' /></div>";
            }
        }
         res.innerHTML = list;
        num.innerHTML = --i;
    }
    setCategory(ids){
        this.currentCategory=ids;
        this.setControl(1);
        this.setVisible();
    }
    setPage(ix){
        this.currentPage=ix;
        this.setControl(2);
        this.setVisible();
    }
    setVisible(){

        var is_not =true;
        for (var ii = 0; ii < this.sites.length; ii++) {
            is_not = true;
            for (var i=0; i<this.currentCategory.length; i++) {
                let mark = this.sites[ii].mark;
                if (this.sites[ii].category_id == this.currentCategory[i]) {
                    mark[0].options.set("visible", true);
                    is_not=false;
                }else{
                    if(is_not) {
                        if (mark[1]) mark[0].options.set("visible", true);
                        else mark[0].options.set("visible", false);
                    }
                }
            }
        }
    }
    setInvisible(){
        for (var ii = 0; ii < this.sites.length; ii++) {
            let mark = this.sites[ii].mark;
            if (mark[1]) mark[0].options.set("visible", true);
            else mark[0].options.set("visible", false);
        }
     }
     goFilter() {
         var is_not=true;
       for (var ii = 0; ii < this.sites.length; ii++) {
           is_not=true;
           for(var fi=0; fi<this.currentFilter.length; fi++){
               var provs = this.ixfilters[this.currentFilter[fi]];
               if (provs.indexOf(this.sites[ii].id) > -1) {
                let mark = this.sites[ii].mark;
                mark[0].options.set("visible", true);
                   is_not=false;
            }
            else{
                if(is_not){
                    let mark = this.sites[ii].mark;
                    if (mark[1]) mark[0].options.set("visible", true);
                    else mark[0].options.set("visible", false);
                }
            }
           }
        }
    }
        toggleFilter(id) {
            let element = document.querySelector("#filterid_" + id);
            element.classList.toggle("selected_filter");
            var ix = this.currentFilter.indexOf(id);
         if ( ix < 0) {
             this.currentFilter.push(id);
         }else{
             this.currentFilter.splice(ix, 1);
         }
            if(this.currentFilter.length==0) {
                this.setVisible(this.currentCategory);
            } else {
                this.goFilter();
            }
     }
    getPage() {
        var content="<div class='page_container'>";
        content += "<div class='sidebar_row' style='max-width:300px;'><img src='../../images/tmp_pics/hrc.jpeg' alt='IMAGE' /></div>\";\n";
        content += "<div class='sidebar_row sidebar_title'>" + this.sites[this.currentPage].brand_name_en + "</div>\n";
        content += "<div class='sidebar_row'>" + this.sites[this.currentPage].address + "</div>\n";
        content += "<div class='sidebar_row'>" + this.sites[this.currentPage].phone +  " : " + this.sites[this.currentPage].web_url +"</div>\n";
        content += "<div class='sidebar_row sidebar_row_line'>" + this.sites[this.currentPage].from_operation_hour + " : " + this.sites[this.currentPage].to_operation_hour + "</div>\n";
        content += "<div class='sidebar_row'>" + this.sites[this.currentPage].discount + " " +this.sites[this.currentPage].rating + "</div>\n";
        content += "<div class='sidebar_row sidebar_row_line'>" + this.sites[this.currentPage].average_price + "</div>\n";
        content += "<div class='sidebar_row'>" + this.sites[this.currentPage].description + "</div>\n";
         return content +"</div>";

    }
        getFilters(){
            var content="<div class='filter_container'>";
            var ii=0;
            for(var cat_id in this.currentCategory){
                var arr = this.filters[this.currentCategory[cat_id]];
                for (var fkey in arr){
                    var filter =arr[fkey];
                    if(filter[1]>0) {
                        content += "<a class='filter' id='filterid_" + fkey + "' href='#' onclick='app.toggleFilter(" + fkey + ")'>" + filter[0] + " " + filter[1] + "</a>";
                        ii++;
                    }
                }
        }
        return content +"</div>";
    }
    arrangeFilters(filters){

        for (var i=0; i<filters.length; i++) {
            var num =1;
            if(filters[i].category_id in this.filters) {
                if(filters[i].filter_id in this.filters[filters[i].category_id]) {
                    num=this.filters[filters[i].category_id][filters[i].filter_id][1]+1;
                }
                    this.filters[filters[i].category_id][filters[i].filter_id]=[filters[i].title,num ];

            } else{
                this.filters[filters[i].category_id]=[];
                this.filters[filters[i].category_id][filters[i].filter_id]=[filters[i].title,num ];
            }
            if(!(filters[i].filter_id in this.ixfilters)) this.ixfilters[filters[i].filter_id] = [];
            this.ixfilters[filters[i].filter_id].push(filters[i].provider_id);
            this.ixproviders[filters[i].provider_id][1].push(filters[i].filter_id);
        }

    }
    setSites(sites){
        this.sites =sites;
        for (var i=0; i<this.sites.length; i++) {
            const label = this.sites[i].brand_name_en.slice(0,2);
            const name = this.baloon_content(i);
            this.ixproviders[this.sites[i].id]=[i,[]];

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
            this.sites[i].mark =[plm,0];
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