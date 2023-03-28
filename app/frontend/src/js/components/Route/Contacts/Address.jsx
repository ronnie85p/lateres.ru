import React from "react";

import Aside from "@js/components/Page/Aside";
import RawHTML from "@js/components/RawHTML";

export default (props) => {
  const { resource, topPanel } = global.App?.config || {};

  const menuList = [
    {
      pagetitle: "Адрес производства",
      id: 1,
      url: "/contacts/address",
    },
    {
      pagetitle: "Служба поддержки клиентов",
      id: 2,
      url: "/contacts/support",
    },
    {
      pagetitle: "Сотрудничество",
      id: 3,
      url: "/contacts/collaboration",
    },
    {
      pagetitle: "Оптовые продажи",
      id: 4,
      url: "/contacts/wholesales",
    },
    {
      pagetitle: "Офис",
      id: 6,
      url: "/contacts/office",
    },
    {
      id: 7,
      pagetitle: "Пресс-служба",
      url: "/contacts/press",
    },
  ];

  return (
    <>
      <Aside>
        <Aside.Menu items={menuList} />
        <Aside.Content title={resource.pagetitle}>
          <RawHTML>{resource.content}</RawHTML>
        </Aside.Content>
      </Aside>
    </>
  );
};

{
  /* 
<script src="//api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
<script type="text/javascript">
	  ymaps.ready(init);
	  var myMap;
	  function init(){     
      myMap = new ymaps.Map("mapOne", {
		  center: [ 56.2213078, 36.9487177 ],
		  zoom: 15
        }), clusterer = new ymaps.Clusterer({preset: 'islands#invertedRedClusterIcons'});
		var geoObjects = []; geoObjects[0] = new ymaps.Placemark([ 56.2213078, 36.9487177 ], {iconContent: 'Производство',balloonContentHeader: "Завод «LATERES» - Производство",balloonContentBody:  "Производство бетонных, фундаментных и керамзитобетонных блоков, облицовочного кирпича, лицевого камня для фасадов, тротуарной плитки, бордюрного камня и элементов благоустройства методом вибропрессования, а так же продажа строительных материалов онлайн.",balloonContentFooter: "Россия, Московская область,Солнечногорский район, с/п Смирновское,пос. Смирновка, владение 2, строение 1",hintContent: "Подробнее"},{ 
		  // Иконка метки будет растягиваться под размер ее содержимого.
		  preset: 'islands#redStretchyIcon',
		}); 
		clusterer.add(geoObjects);
		myMap.geoObjects.add(clusterer);    
	  }
</script> */
}
