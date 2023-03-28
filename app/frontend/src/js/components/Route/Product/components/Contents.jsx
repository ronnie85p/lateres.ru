import React, { useContext, useState, Fragment } from "react";
import Nav from "react-bootstrap/Nav";

import { preventDefault } from "@js/utils";

import Context from "../context";
import BlockContent from "./BlockContent";
import Reviews from "./Reviews";

const contents = [
  {
    id: "content",
    title: "Описание",
    CustomComponent: (props) => <BlockContent {...props} />,
  },
  {
    id: "benefits",
    title: "Преимущества",
    CustomComponent: (props) => <BlockContent {...props} option={true} />,
  },
  {
    id: "features",
    title: "Характеристики",
    CustomComponent: (props) => <BlockContent {...props} />,
  },
  {
    id: "certs_and_docs",
    title: "Сертификаты и документация",
    CustomComponent: (props) => <BlockContent {...props} option={true} />,
  },
  {
    id: "reviews",
    title: "Рейтинг и отзывы",
    CustomComponent: (props) => <Reviews {...props} />,
  },
];

const Contents = (props) => {
  const { activeKey = "content", navProps, navItemProps, contentProps } = props;

  return (
    <>
      {/* <Nav 
            className='mb-4 sticky-top bg-light py-2'
            variant="pills" 
            activeKey={activeKey}
            {...navProps}>
                {contents.map(({ id, title }) => 
                    <Nav.Item {...navItemProps} key={id}>
                        <Nav.Link 
                            eventKey={id} 
                            href={`#${id}`} 
                            onClick={preventDefault}>
                                {title}
                            </Nav.Link>
                    </Nav.Item>
                )}
        </Nav> */}

      {/* 
          <div className="mt-4">
            <section>
              <div className="h5">Доставка</div>
              Доставка транспортом компании (манипулятор, шаланда или
              малотоннажный транспорт) и Самовывоз по адресу производства.
            </section>

            <section>
              <div className="h5">Сроки получения товара</div>В день заказа -
              если заказ сделан до 14:00, на следующий рабочий день - если заказ
              сделан после 14:00.
              <span className="text-info">
                В связи с загруженностью производства могут увеличиваться сроки
                изготовления на отдельные виды изделий до 6-9 дней.
              </span>
            </section>
          </div> */}
      {/* <h5>Способы получения товара</h5>

            <p className="text-muted">
              Минимальная сумма заказа 100 руб. Доставка транспортом компании
              (манипулятор, шаланда или малотоннажный транспорт) и Самовывоз по
              адресу производства.
              <span className="text-info">
                Для расчёта доставки положите товар в корзину и перейдите по
                ссылке в корзину, затем укажите адрес доставки.
              </span>
              <a href="" className="navi-link">
                Рассчитать
              </a>
            </p> */}

      {/* <h5>Сроки получения товара</h5>
            <p className="text-muted">
              В день заказа - если заказ сделан до 14:00, на следующий рабочий
              день - если заказ сделан после 14:00.
              <span className="text-info">
                В связи с загруженностью производства могут увеличиваться сроки
                изготовления на отдельные виды изделий до 6-9 дней.
              </span>
            </p> */}

      {contents.map((props) => {
        const { CustomComponent, id } = props;
        return (
          <Fragment key={id}>
            <CustomComponent {...contentProps} {...props} />
          </Fragment>
        );
      })}
    </>
  );
};

{
  /* <Card className="mb-2">
                    <Card.Body>
                        <h2 className="h4 fw-bolder" id="benefits">Возврат товара</h2>

                        <p className="mb-1">
                            Если товар имеет брак, то вы можете вернуть или обменять товар в течение 14 дней с момента приобретения.
                        </p>

                        <p className="text-muted text-xs mt-1">
                            Внимание! Действительный цвет и текстура товаров могут незначительно отличаться от их изображений, 
                            представленных на сайте. Данные о ценах и наличии товаров находятся в режиме тестирования. 
                            Пожалуйста, уточняйте точную стоимость и наличие товаров на сладе. Они могут отличаться от опубликованных на сайте.
                        </p>
                    </Card.Body>
                </Card> */
}

{
  /* <Card className="mb-2">
                    <Card.Body>
                        <h2 className="h4 fw-bolder" id="benefits">Наши гарантии</h2>

                        <p className="mb-1">
                            Мы гарантируем соответствие изделий требованиям ГОСТ при соблюдении условий транспортирования, монтажа, эксплуатации и хранения.
                        </p>

                        <p class="text-muted text-xs mt-1">
                            Согласно п.2 ст.34 Технического регламента о безопасности зданий и сооружений, 
                            Федеральный закон от 30.12.2009 N 384-ФЗ, 
                            "Строительные материалы и изделия должны соответствовать требованиям, 
                            установленным в соответствии с законодательством Российской Федерации о техническом регулировании".<br/>
                            Согласно ст.470 ГК РФ продолжительность договорных гарантий качества определяется гарантийными сроками. 
                            Гарантийный срок представляет собой установленный изготовителем товара или соглашением сторон период времени, 
                            в течение которого товар должен быть пригодным для целей его обычного использования.
                        </p>
                    </Card.Body>
                </Card> */
}

export default Contents;
