import React, { useEffect, useContext, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import RawHTML from "@js/components/RawHTML";
import { useRequest, Suspense } from "@js/components/Http/Request";
import Aside from "../Aside";

import Context from "@js/contexts/context";

export default (props) => {
  const { resource, user } = useContext(Context);
  const [isAddressShown, setIsAddressShown] = useState(() => {
    return user.use_address === 1;
  });

  const request = useRequest({
    params: {
      action: "web/profile/menu/getList",
    },
  });

  const toggleAddressShown = () => {
    setIsAddressShown(!isAddressShown);
  };

  return (
    <>
      <Suspense
        request={request}
        LoadingComponent={() => <>Loading...</>}
        ErrorComponent={({ error }) => <>{error.message}</>}
      >
        {({ response }) => (
          <Aside>
            <Aside.Menu items={response.results} />

            <Aside.Content title={resource.longtitle}>
              <Card className="pb-2 pt-2">
                <Card.Body>
                  <Form>
                    <Row>
                      <Form.Group className="form-group" as={Col}>
                        <label htmlFor="">Название</label>
                        <Form.Control name="" />
                      </Form.Group>
                    </Row>

                    <Row>
                      <Form.Group className="form-group" as={Col}>
                        <label htmlFor="inn">ИНН</label>
                        <Form.Control name="inn" />
                      </Form.Group>
                      <Form.Group className="form-group" as={Col}>
                        <label htmlFor="ogrn">ОГРН (ИП)</label>
                        <Form.Control name="ogrn" />
                      </Form.Group>
                      <Form.Group className="form-group" as={Col}>
                        <label htmlFor="kpp">КПП</label>
                        <Form.Control name="kpp" />
                      </Form.Group>
                    </Row>

                    <Row>
                      <Form.Group className="form-group" as={Col}>
                        <label htmlFor="phone">Телефон</label>
                        <Form.Select name="phone">
                          <option value="0">-- Не выбран</option>
                        </Form.Select>
                      </Form.Group>
                    </Row>

                    <Row>
                      <Form.Group className={"form-group"} as={Col}>
                        <Form.Check
                          id="use-address"
                          name="use_address"
                          type="switch"
                          label="Заполнить адрес"
                          onChange={toggleAddressShown}
                        />
                      </Form.Group>
                    </Row>

                    {isAddressShown ? (
                      <>
                        <Row>
                          <Form.Group className="form-group" as={Col}>
                            <label htmlFor="address_country">Страна</label>
                            <Form.Control name="address_country" />
                          </Form.Group>
                          <Form.Group className="form-group" as={Col}>
                            <label htmlFor="address_region">Регион</label>
                            <Form.Control name="address_region" />
                          </Form.Group>
                          <Form.Group className="form-group" as={Col}>
                            <label htmlFor="address_index">Индекс</label>
                            <Form.Control name="address_index" />
                          </Form.Group>
                        </Row>

                        <Row>
                          <Form.Group className="form-group" as={Col}>
                            <label htmlFor="address_city">Город</label>
                            <Form.Control name="address_city" />
                          </Form.Group>
                          <Form.Group className="form-group" as={Col}>
                            <label htmlFor="address_street">Улица</label>
                            <Form.Control name="address_street" />
                          </Form.Group>
                          <Form.Group className="form-group" as={Col}>
                            <label htmlFor="address_building">Дом</label>
                            <Form.Control name="address_building" />
                          </Form.Group>
                        </Row>

                        <Row>
                          <Form.Group className="form-group" as={Col}>
                            <label htmlFor="address_corpus">Корпус</label>
                            <Form.Control name="address_corpus" />
                          </Form.Group>
                          <Form.Group className="form-group" as={Col}>
                            <label htmlFor="address_floor">Этаж</label>
                            <Form.Control name="address_floor" />
                          </Form.Group>
                          <Form.Group className="form-group" as={Col}>
                            <label htmlFor="address_premise">Помещение</label>
                            <Form.Control name="address_premise" />
                          </Form.Group>
                          <Form.Group className="form-group" as={Col}>
                            <label htmlFor="address_office">Офис</label>
                            <Form.Control name="address_office" />
                          </Form.Group>
                        </Row>
                      </>
                    ) : (
                      <></>
                    )}

                    <hr className="" />

                    <Row>
                      <Col className="text-start">
                        <Button variant="primary" type="button">
                          Сохранить
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </Aside.Content>
          </Aside>
        )}
      </Suspense>
    </>
  );
};

{
  /* <div class="custom-control custom-checkbox mt-2">  
  <input class="custom-control-input" name="use_org_address" value="1" type="checkbox" id="ex-check-2" data-toggle="collapse" data-target="#org-address"{if $order.use_org_address} checked{/if}>
  <label class="custom-control-label" for="ex-check-2">Заполнить адрес</label>
</div> */
}
