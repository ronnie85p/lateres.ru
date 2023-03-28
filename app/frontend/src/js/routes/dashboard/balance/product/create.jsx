import React, { useEffect, useContext, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Placeholder from "react-bootstrap/Placeholder";
import { useLoaderData, Link, useLocation } from "react-router-dom";

import Context from "@js/contexts/context";
import Button from "@js/components/Form/Button";
import { Form, useForm } from "@js/components/Form";
import Icon from "@js/components/Icon";
import { sendRequest, useRequest } from "@js/components/Request";
import { Page } from "@dashboard/components/Dashboard";
import FetchList from "@js/components/FetchList";
import { useSelectFiles, useActionFiles } from "@js/components/Files";
import Preloader from "@js/components/Preloader";
import { useModal, Modal } from "@js/components/Modal";
import getResults from "@js/loaders/getResults";
// import UploadPhotos from "@js/components/UploadPhotos";

const Index = (props) => {
  const context = useContext(Context);
  const data = useLoaderData();

  data.currencies = ["Руб", "Дол", "Евр"];
  context.data = data;

  return (
    <>
      <Page.Title>Новый товар</Page.Title>

      <Row>
        <Col md={8}>
          <IndexForm />
        </Col>
      </Row>
    </>
  );
};

const IndexForm = (props) => {
  const { data } = useContext(Context);

  const action = "mgr/product/create";
  const form = useForm({
    actionRequest: (values) => sendRequest(action, values),
    onSubmit() {
      console.log("[product] creating...");
      return false;
    },
  });

  return (
    <>
      <Form>
        <Category form={form} data={data} />
        <hr />

        <Section>
          <Title>Описание</Title>
          <ProductDescription form={form} data={data} />
        </Section>

        <Section>
          <Title>Характеристики</Title>
          <ProductFeatures form={form} data={data} />
        </Section>

        <hr />

        <Section>
          <Title>Производство</Title>
          <Fabrication form={form} data={data} />
        </Section>

        <Section>
          <Title>Закупка, цена</Title>
          <PurchasePrice form={form} data={data} />
        </Section>

        <Section>
          <Title>Продажа</Title>
          <SellingPrices form={form} data={data} />
        </Section>

        <hr />

        <Section>
          <Title>Фотографии</Title>
          <Photos form={form} data={form} />
        </Section>

        <hr />

        <Button
          type="submit"
          loading={form.isSubmitting}
          loadingText={"Добавляем товар..."}
        >
          Добавить
        </Button>
      </Form>
    </>
  );
};

const getCategories = (parent) => {
  return getResults("mgr/category/getList", { parent });
};

const Title = (props) => {
  const { children } = props;

  return <h5>{children}</h5>;
};

const Section = (props) => {
  const { children } = props;

  return <div className="mb-1x">{children}</div>;
};

const InputPriceWithCurrency = (props) => {
  const { currencies = [], inputProps, selectProps } = props;

  return (
    <InputGroup>
      <Form.Input
        maskAlias="currency"
        style={{ width: "50%" }}
        {...inputProps}
      />
      <Form.Select {...selectProps}>
        <option value="">-</option>
        {currencies?.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Form.Select>
    </InputGroup>
  );
};

const Category = (props) => {
  const { form, data } = props;
  const [categories, setCategories] = useState(null);

  const handleCategoryChange = async (event) => {
    let parent = parseInt(event.currentTarget.value);
    setCategories(null);
    if (isNaN(parent) || !parent) return;

    const results = await getCategories(parent);
    if (results.length) {
      setCategories(results);
    }
  };

  return (
    <>
      <Row>
        <Form.Group as={Col} md={6}>
          <Form.Label htmlFor="category">Категория</Form.Label>
          <Form.Select
            name="category"
            isInvalid={!!form.errors.category}
            onChange={handleCategoryChange}
          >
            <option value="">--Не выбрана</option>
            {data.categories?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.pagetitle}
              </option>
            ))}
          </Form.Select>
          <Form.FieldError>{form.errors.category}</Form.FieldError>
        </Form.Group>
      </Row>

      {categories ? (
        <Row>
          <Form.Group className="" as={Col} md={6}>
            <Form.Select name="parent" isInvalid={!!form.errors.parent}>
              {categories?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.pagetitle}
                </option>
              ))}
            </Form.Select>
            <Form.FieldError>{form.errors.parent}</Form.FieldError>
          </Form.Group>
        </Row>
      ) : (
        <></>
      )}
    </>
  );
};

const Fabrication = (props) => {
  const { form, data } = props;

  return (
    <>
      <Row>
        <Form.Group as={Col}>
          <Form.Label name="fabricator">Производитель</Form.Label>
          <Form.Select name="fabricator" isInvalid={!!form.errors.fabricator}>
            <option value="">--Не выбран</option>
          </Form.Select>
          <Form.FieldError>{form.errors.fabricator}</Form.FieldError>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label name="trademark">Торговая марка</Form.Label>
          <Form.Select name="trademark" isInvalid={!!form.errors.trademark}>
            <option value="">--Не выбрана</option>
          </Form.Select>
          <Form.FieldError>{form.errors.trademark}</Form.FieldError>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label name="made_in">Страна</Form.Label>
          <Form.Select name="made_in" isInvalid={!!form.errors.made_in}>
            <option value="">--Не выбрана</option>
          </Form.Select>
          <Form.FieldError>{form.errors.made_in}</Form.FieldError>
        </Form.Group>
      </Row>
    </>
  );
};

const ProductDescription = (props) => {
  const { form, data } = props;

  const handlePagetitleInput = () => {};

  return (
    <>
      <Row>
        <Form.Group as={Col}>
          <Form.Label htmlFor="pagetitle">Наименование</Form.Label>
          <Form.Input
            name="pagetitle"
            placeholder=""
            onChange={handlePagetitleInput}
          />
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col}>
          <Form.Label htmlFor="longtitle">Полное наименование</Form.Label>
          <Form.Input name="longtitle" placeholder="" />
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col}>
          <Form.Label htmlFor="description">Краткое описание</Form.Label>
          <Form.Input name="description" placeholder="" />
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col}>
          <Form.Label htmlFor="content">Описание</Form.Label>
          <Form.Editor name="content" placeholder="" height={300} />
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col}>
          <Form.Label htmlFor="benefits">Преимущества</Form.Label>
          <Form.Editor name="benefits" placeholder="" height={300} />
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col}>
          <Form.Label htmlFor="tags">
            Ключевые фразы по товару, разделенные запятыми (до 10 фраз)
          </Form.Label>
          <Form.InputTags name="tags" placeholder="" maxCount={10} />
        </Form.Group>
      </Row>
    </>
  );
};

const SelectOptions = (props) => {
  const { items, defaultOptionValue } = props;
  return (
    <>
      {defaultOptionValue ? (
        <option value="">{defaultOptionValue}</option>
      ) : (
        <></>
      )}

      {items?.map((item) => (
        <option key={item.id} value={item.id}>
          {item.pagetitle}
        </option>
      ))}
    </>
  );
};

const getProductOptions = async (path, query) => {
  const response = await sendRequest("mgr/product/settings/getList", {
    path,
    query,
  });

  return response?.results || [];
};

const ProductFeatures = (props) => {
  const { form, data } = props;
  const { product_types, product_materials, brand_strengths } = data || {};

  return (
    <>
      <Row>
        <Form.Group as={Col} md={6}>
          <Form.Label htmlFor="product_type">Тип изделия</Form.Label>
          <Form.InputSelect
            loader={(query) =>
              getProductOptions("features/product-type", query)
            }
            name="product_type"
            isInvalid={!!form.errors.product_type}
            defaultValue="--Не выбран"
          />
          <Form.FieldError>{form.errors.product_type}</Form.FieldError>
        </Form.Group>

        <Form.Group as={Col} md={6}>
          <Form.Label htmlFor="product_material">Материал</Form.Label>
          <Form.InputSelect
            loader={(query) =>
              getProductOptions("features/product-material", query)
            }
            name="product_material"
            isInvalid={!!form.errors.product_material}
            defaultValue="--Не выбран"
          />
          <Form.FieldError>{form.errors.product_material}</Form.FieldError>
        </Form.Group>

        <Form.Group as={Col} md={6}>
          <Form.Label htmlFor="brand_strength">Марка прочности</Form.Label>
          <Form.InputSelect
            loader={(query) =>
              getProductOptions("features/brand-strength", query)
            }
            name="brand_strength"
            isInvalid={!!form.errors.brand_strength}
            defaultValue="--Не выбрана"
          />
          <Form.FieldError>{form.errors.brand_strength}</Form.FieldError>
        </Form.Group>

        <Form.Group as={Col} md={12}>
          <Form.Label htmlFor="color">Цвет</Form.Label>
          <Form.InputTags name="color" isInvalid={!!form.errors.color} />
          <Form.FieldError>{form.errors.color}</Form.FieldError>
        </Form.Group>

        <Form.Group as={Col} md={12}>
          <Form.Label htmlFor="size">Размер, мм (Ш x В x Д)</Form.Label>
          <Form.InputTags name="size" isInvalid={!!form.errors.size} />
          <Form.FieldError>{form.errors.size}</Form.FieldError>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col} md={3}>
          <Form.Label htmlFor="weight">Вес, кг</Form.Label>
          <Form.Input
            name="weight"
            isInvalid={!!form.errors.weight}
            maskAlias="weight"
          />
          <Form.FieldError>{form.errors.weight}</Form.FieldError>
        </Form.Group>
        <Form.Group as={Col} md={3}>
          <Form.Label htmlFor="product_count">Кол-во товара</Form.Label>
          <Form.Input
            name="product_count"
            isInvalid={!!form.errors.product_count}
            maskAlias="integer"
          />
          <Form.FieldError>{form.errors.product_count}</Form.FieldError>
        </Form.Group>

        <Form.Group as={Col} md={3}>
          <Form.Label htmlFor="qty_per_pallet">Кол-во на поддоне</Form.Label>
          <Form.Input
            name="qty_per_pallet"
            isInvalid={!!form.errors.qty_per_pallet}
            maskAlias="integer"
          />
          <Form.FieldError>{form.errors.qty_per_pallet}</Form.FieldError>
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label htmlFor="measure_unit">Ед. измерения</Form.Label>
          <Form.Select
            name="measure_unit"
            isInvalid={!!form.errors.measure_unit}
          >
            <option value="">--Не выбрана</option>
          </Form.Select>
          <Form.FieldError>{form.errors.measure_unit}</Form.FieldError>
        </Form.Group>
      </Row>
    </>
  );
};

const PurchasePrice = (props) => {
  const { form, data } = props;
  const { currencies } = data;

  return (
    <>
      <Row>
        <Form.Group as={Col} md={4}>
          <InputPriceWithCurrency
            currencies={currencies}
            inputProps={{
              name: "purchase_price",
              isInvalid: !!form.errors.purchase_price,
            }}
            selectProps={{
              name: "purchase_currency",
              isInvalid: !!form.errors.purchase_currency,
            }}
          />
          <Form.FieldError>{form.errors.purchase_price}</Form.FieldError>
          <Form.FieldError>{form.errors.purchase_currency}</Form.FieldError>
        </Form.Group>
      </Row>
    </>
  );
};

const SellingPrices = (props) => {
  const { form, data } = props;
  const { currencies } = data;

  return (
    <>
      <Row>
        <Form.Group as={Col} md={4}>
          <Form.Label htmlFor="price">Розница, цена</Form.Label>
          <Form.Input name="price" maskAlias="currency" />
          <Form.FieldError>{form.errors.price}</Form.FieldError>
        </Form.Group>
        <Form.Group as={Col} md={4}>
          <Form.Label>Мелкий ОПТ, от шт.</Form.Label>
          <InputGroup>
            <Form.Input
              name="small_wholesale_qty"
              maskAlias="integer"
              isInvalid={!!form.errors.small_wholesale_qty}
            />
            <Form.Input
              name="small_wholesale_price"
              maskAlias="currency"
              isInvalid={!!form.errors.small_wholesale_price}
            />
          </InputGroup>
          <Form.FieldError>{form.errors.small_wholesale_qty}</Form.FieldError>
          <Form.FieldError>{form.errors.small_wholesale_price}</Form.FieldError>
        </Form.Group>
        <Form.Group as={Col} md={4}>
          <Form.Label>Крупный ОПТ, от шт.</Form.Label>
          <InputGroup as={Col}>
            <Form.Input
              name="wholesale_qty"
              maskAlias="integer"
              isInvalid={!!form.errors.wholesale_qty}
            />
            <Form.Input
              name="wholesale_price"
              maskAlias="currency"
              isInvalid={!!form.errors.wholesale_price}
            />
          </InputGroup>
          <Form.FieldError>{form.errors.wholesale_qty}</Form.FieldError>
          <Form.FieldError>{form.errors.wholesale_price}</Form.FieldError>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group as={Col} md={2}>
          <Form.Label htmlFor="currency">Валюта</Form.Label>
          <Form.Select name="currency" isInvalid={!!form.errors.currency}>
            <option value="">-</option>
            {currencies?.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Form.Select>
          <Form.FieldError>{form.errors.currency}</Form.FieldError>
        </Form.Group>
      </Row>
    </>
  );
};

const MediaContent = (props) => {
  const { form, data } = props;

  return <></>;
};

const useRequestAction = (props) => {
  const [pending, setPending] = useState(false);
  const [response, setResponse] = useState({});

  const handleAction = async (action, data) => {
    setPending(true);
    const response = await sendRequest(action, data);

    setResponse(response);
    setPending(false);

    return response;
  };

  return { pending, response, handleAction };
};

const Photos = (props) => {
  const path = "app/uploads";
  const action = useRequestAction({});
  const selectFiles = useSelectFiles({
    multiple: true,
  });

  const [errors, setErrors] = useState();
  const [checkedAll, setCheckedAll] = useState(false);
  const [uploadBtn, setUploadBtn] = useState();
  const [items, setItems] = useState();

  const errorsModal = useModal({
    titleText: "Ошибки",
    titleIcon: "exclamation-triangle",
    titleProps: { className: "text-danger" },
  });

  const footerBtns = React.useMemo(
    () => (uploadBtn ? [uploadBtn] : []),
    [uploadBtn]
  );

  const list = React.useMemo(() => items || [], [items]);

  const openModalErrors = (data) => {
    const { errors, files, count } = data;
    setErrors(errors);

    if (files.length > 0) {
      setUploadBtn({
        text: "Загрузить",
        onClick() {
          handleUploadFiles(files, count);
        },
      });
    }

    errorsModal.open();
  };

  const Errors = () => {
    return (
      <>
        <Row className="fw-bolder">
          <Col md={3}>Имя файла</Col>
          <Col md={3}>Размер</Col>
          <Col md={3}>Тип</Col>
          <Col md={3}>Ошибка</Col>
        </Row>

        <hr className="mt-1 mb-4" />

        {errors.map((err) => (
          <div key={err.toString()}>
            <Row>
              <Col md={3} className="text-truncate">
                {err.id?.name}
              </Col>
              <Col md={3}>{(err.id?.size / 1024 ** 2).toFixed(3)} Mb</Col>
              <Col md={3}>{err.id?.type || "-"}</Col>
              <Col md={3} className="text-break text-danger">
                {err.msg}
              </Col>
            </Row>
            <hr className="mt-1 mb-2" />
          </div>
        ))}
      </>
    );
  };

  const handleValidateFiles = (files) => {
    const data = [];
    for (let file of files) {
      data.push({ name: file.name, type: file.type, size: file.size });
    }

    return action.handleAction("web/file/check", { data, path });
  };

  const handleUploadFile = (file, rank) => {
    var fd = new FormData();
    fd.append("container", path);
    fd.append("rank", rank);
    fd.append(0, file, file.name);

    return action.handleAction("web/file/upload", fd);
  };

  const handleUploadFiles = (files, count) => {
    let rank = count;
    for (let file of files) {
      const request = handleUploadFile(file, rank);
      items.push({ file, request });
      rank++;
    }
  };

  const handleSelect = () => {
    selectFiles
      .openDialog()
      .then(({ target }) => target.files)
      .then(async (files) => {
        let {
          files: _files,
          success,
          errors,
          count,
        } = await handleValidateFiles(files);

        if (_files.length > 0) {
          files = Array.from(files).filter((file) =>
            _files.some((_file) => _file.name === file.name)
          );
        } else {
          files = [];
        }

        if (!success) {
          openModalErrors({ errors, files, count });
          return;
        }

        handleUploadFiles(files, count);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const getItems = async () => {
    const { results } = await sendRequest("web/file/getList", { path });

    setItems(results);
  };

  useEffect(() => {
    getItems();
  }, []);

  console.log("items", items);

  let hasChecked = list.some((item) => item.checked);

  return (
    <>
      <div className="input-group bg-light rounded border-bottom mb-1x">
        <InputGroup.Checkbox
          type="checkbox"
          id="check-all"
          style={{ bottom: "2px", position: "relative" }}
          checked={checkedAll}
          onChange={(event) => {
            setCheckedAll(!checkedAll);

            for (let i in list) {
              list[i].checked = !checkedAll;
            }

            console.log("list", list);
          }}
        />
        {hasChecked ? (
          <Button className="border" variant={"light"} size={"sm"}>
            <Icon name="trash" /> Удалить выбранные
          </Button>
        ) : (
          <></>
        )}
      </div>

      <Modal {...errorsModal} Body={() => <Errors />} footerBtns={footerBtns} />
      <Preloader show={action.pending} />

      <Row>
        {list.map((item, idx) => (
          <PhotoItem
            key={idx}
            list={list}
            idx={idx}
            setCheckedAll={setCheckedAll}
            {...item}
          />
        ))}
      </Row>

      <Button onClick={handleSelect}>Выбрать с компьютера</Button>

      {/* <Row>
        <Form.Group as={Col}>
          <Form.Label htmlFor="utube">Ссылка на видео с YouTube</Form.Label>
          <Form.Input
            name="utube_link"
            placeholder="https://youtu.be/t_jHrUE5IOk"
          />
        </Form.Group>
      </Row> */}
    </>
  );
};

const PhotoItem = (props) => {
  const {
    url,
    file,
    request,
    checked: _checked = false,
    idx,
    list,
    setCheckedAll,
  } = props;
  const [pending, setPending] = useState(false);
  const [checked, setChecked] = useState(false);
  const [response, setResponse] = useState();
  const action = useRequestAction();
  const selectFiles = useSelectFiles({
    multiple: false,
  });

  // var checked = React.useMemo(() => _checked || false, [_checked]);

  const handleRemove = async (file) => {
    action.handleAction("web/file/remove", { file });
  };

  const handleChange = async (file, url) => {
    var fd = new FormData();
    fd.append("path", "app/uploads");
    fd.append("file", url);
    fd.append(0, file, file.name);

    const response = await action.handleAction("web/file/change", fd);
  };

  const handleSelectChange = (file) => {
    selectFiles
      .openDialog()
      .then(({ target }) => target.files)
      .then(async (files) => {
        let {
          files: _files,
          success,
          errors,
          count,
        } = await handleValidateFiles(files);

        if (!success) {
          return;
        }

        handleChange(files[0], file);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const Message = () => {
    if (!action.response.success) {
      return <div className="text-danger">{action.response.message}</div>;
    }

    return <div className="text-success">{action.response.message}</div>;
  };

  const pendingRequest = async () => {
    setPending(true);
    const response = await request;
    setResponse(response);
    setPending(false);
  };

  useEffect(() => {
    // pendingRequest();
    console.log("update checked", checked, _checked);
    setChecked(_checked);
  }, [_checked]);

  console.log("checked", checked, _checked, props);

  return (
    <>
      <Col md={3}>
        <div
          className="position-relative border rounded"
          style={{ minHeight: 150 }}
        >
          <Preloader show={pending} position="absolute" />
          <div className="position-absolute">
            <Form.Check
              defaultValue={1}
              checked={checked}
              onChange={(event) => {
                setChecked(!checked);
                list[idx].checked = !checked;

                let hasChecked = list.some((item) => item.checked === true);
                setCheckedAll(hasChecked);

                console.log("[onchange]", { checked, idx, hasChecked, list });
              }}
            />

            <Button
              variant={"light"}
              size={"sm"}
              onClick={(event) => handleRemove(response?.object?.file || file)}
            >
              Удалить
            </Button>

            <Button
              variant={"light"}
              size={"sm"}
              onClick={(event) =>
                handleSelectChange(response?.object?.file || file)
              }
            >
              Заменить
            </Button>

            {action.pending ? (
              <div className="text-danger">Loading</div>
            ) : (
              <></>
            )}
            {action.response.message ? <Message /> : <></>}
          </div>
          <Image src={response?.object?.url || url} rounded />
        </div>
      </Col>
    </>
  );
};

const MediaGallery = (props) => {
  const { items: _items, Item } = props;
  const [pending, setPending] = useState(false);
  const [items, setItems] = useState([]);

  const getItems = async () => {
    let items = _items;

    if (typeof items === "function") {
      items = items();
    }

    if (items instanceof Promise) {
      items = await items;
    }

    return Array.isArray(items) ? items : [];
  };

  const initItems = async () => {
    setPending(true);
    let items = await getItems();
    setItems(items);
    setPending(false);
  };

  useEffect(() => {
    initItems();
  }, []);

  return <div className="photo-gallery">{items?.map(Item)}</div>;
};

const getFiles = async (path) => {
  const { results } = await sendRequest("web/file/getList", { path });

  return results;
};

export default Index;
