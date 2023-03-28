import React, { useEffect, useContext } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import { useLoaderData } from "react-router-dom";

import Context from "@js/contexts/context";
import Icon from "@js/components/Icon";
import Title from "@js/components/Page/Title";

const Address = (props) => {
  const context = useContext(Context);
  const data = useLoaderData();

  return (
    <Context.Provider value={{ ...context, data }}>
      <Title>{data?.pagetitle}</Title>

      <Card>
        <Card.Body>
          <div
            className="border rounded bg-light mb-1x"
            style={{ height: 100 }}
          >
            Map loading...
          </div>

          <Row>
            <Col style={{ borderRight: "1px solid #e6e6e6" }}>
              <h2 className="h6">Производство</h2>
              <List>
                <ListItem iconName="envelope">
                  <a className="navi-link" href="mailto:sale@lateres.ru">
                    sale@lateres.ru
                  </a>
                </ListItem>

                <ListItem iconName="telephone">
                  <a className="navi-link" href="tel:+7 (495) 668-1069">
                    +7 (495) 668-1069
                  </a>
                </ListItem>

                <ListItem iconName="clock">
                  <div>Пон. - Суб.: 09:00 - 20:00</div>
                  <div>Воскр: по договоренности</div>
                </ListItem>
              </List>
            </Col>
            <Col>
              <h2 className="h6">Отдел продаж</h2>
              <List>
                <ListItem iconName="envelope">
                  <a className="navi-link" href="mailto:sale@lateres.ru">
                    sale@lateres.ru
                  </a>
                </ListItem>

                <ListItem iconName="telephone">
                  <a className="navi-link" href="tel:+7 (903) 151-3344">
                    +7 (903) 151-3344
                  </a>
                </ListItem>

                <ListItem iconName="clock">
                  <div>Пон. - Суб.: 09:00 - 20:00</div>
                  <div>Воскр: по договоренности</div>
                </ListItem>
              </List>
            </Col>
          </Row>
          <hr />

          <h2 className="h5">Наши реквизиты</h2>
          <Row>
            <Col className="text-muted" md={3}>
              Наименование:
            </Col>
            <Col>Индивидуальный предприниматель «Каводник Г.Н.»</Col>
          </Row>
          <Row>
            <Col className="text-muted" md={3}>
              Торговая марка:
            </Col>
            <Col>LATERES</Col>
          </Row>
          <Row>
            <Col className="text-muted" md={3}>
              ОГРНИП:
            </Col>
            <Col>313504411400031</Col>
          </Row>
          <Row>
            <Col className="text-muted" md={3}>
              ИНН:
            </Col>
            <Col>04405298481</Col>
          </Row>
          <Row>
            <Col className="text-muted" md={3}>
              Адрес:
            </Col>
            <Col>
              МО, Солнечногорский р-н, с/п Смирновское, пос. Смирновка, вл 2,
              стр 1
            </Col>
          </Row>
          <Row>
            <Col className="text-muted" md={3}>
              Телефон:
            </Col>
            <Col>+7 (495) 668-1069</Col>
          </Row>
        </Card.Body>
      </Card>
    </Context.Provider>
  );
};

const List = (props) => {
  const { children } = props;

  return (
    <>
      <ul className="list-unstyled" {...props}>
        {children}
      </ul>
    </>
  );
};

const ListItem = (props) => {
  const { iconName, iconProps, children } = props;

  return (
    <>
      <li {...props} className={"d-flex " + (props.className || "")}>
        {iconName || iconProps ? (
          <>
            <Icon
              className="mr-3 text-muted"
              size={"1.1em"}
              name={iconName}
              {...iconProps}
            />
          </>
        ) : (
          <></>
        )}
        <div className="flex-fill">{children}</div>
      </li>
    </>
  );
};

export default Address;

// <script src="//api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
// <script type="text/javascript">
// 	  ymaps.ready(init);
// 	  var myMap;
// 	  function init(){
//       myMap = new ymaps.Map("mapOne", {
// 		  center: [ 56.2213078, 36.9487177 ],
// 		  zoom: 15
//         }), clusterer = new ymaps.Clusterer({preset: 'islands#invertedRedClusterIcons'});
// 		var geoObjects = []; geoObjects[0] = new ymaps.Placemark([ 56.2213078, 36.9487177 ], {iconContent: 'Производство',balloonContentHeader: "Завод «LATERES» - Производство",balloonContentBody:  "Производство бетонных, фундаментных и керамзитобетонных блоков, облицовочного кирпича, лицевого камня для фасадов, тротуарной плитки, бордюрного камня и элементов благоустройства методом вибропрессования, а так же продажа строительных материалов онлайн.",balloonContentFooter: "Россия, Московская область,Солнечногорский район, с/п Смирновское,пос. Смирновка, владение 2, строение 1",hintContent: "Подробнее"},{
// 		  // Иконка метки будет растягиваться под размер ее содержимого.
// 		  preset: 'islands#redStretchyIcon',
// 		});
// 		clusterer.add(geoObjects);
// 		myMap.geoObjects.add(clusterer);
// 	  }
// </script>
// <div class="row">
//   <div class="col-md-12 col-sm-12">
//     <div class="card mb-30">
//       <div id="mapOne" style="height: 450px;"></div>
//       <div class="card-body">
//         <ul class="list-icon">
//           <li> <i class="icon-map-pin text-muted"></i>МО, Солнечногорский р-н, с/п Смирновское, пос. Смирновка, вл 2, стр 1</li>
//         </ul>
//       </div>
//     </div>
//   </div>
// </div>
