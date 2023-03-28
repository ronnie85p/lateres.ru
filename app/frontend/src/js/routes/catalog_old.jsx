import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Container from "@js/components/Page/Container";
import Icon from "@js/components/Icon";
import { useLoaderData } from "@js/components/Router";
import { Link } from "@js/components/Router";
import FetchList from "@js/components/FetchList";
import { getProducts, getVisitProducts } from "@js/loaders/products";
import Preloader from "@js/components/Preloader";
import ProductItem from "@js/components/Catalog/ProductItem";
import ProductVisits from "@js/components/Product/Visits";
import Context from "@js/contexts/context";

const viewButtonProps = [
  {
    id: "filter-grid",
    icon: "grid",
  },
  {
    id: "filter-list",
    icon: "list",
  },
];

const Catalog = (props) => {
  const { object, categories, products } = useLoaderData();

  const defaultFilters = {
    view: "grid",
  };

  const [filters, setFilters] = React.useState(defaultFilters);
  const context = React.useContext(Context);
  context.filters = filters;
  context.setFilters = (data) => {
    setFilters({ ...filters, ...data });
  };

  return (
    <>
      <Container>
        <h1 className="h4 mb-2x" style={{ fontWeight: 500 }}>
          {object?.pagetitle}{" "}
          <span className="text-muted" style={{ fontSize: ".6em" }}>
            {products?.total} товаров
          </span>
        </h1>

        <Row>
          <Col md={3}>
            <div className="h5">Категории</div>

            <ul className="list-unstyled">
              {categories?.list?.map((item) => (
                <li key={item.id}>
                  <Link to={item.uri} title={item.pagetitle}>
                    {item.pagetitle}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col>
            <Filter />
            <hr className="mt-2 mb-4" />

            <Row>
              <FetchList
                params={{
                  parent: object?.id,
                  sortby: context.filters.sortby,
                }}
                loader={(params) => getProducts(params)}
                ItemComponent={(item) => (
                  <ProductItem key={item.id} data={item} view={filters.view} />
                )}
                EmptyComponent={() => "empty"}
                FallbackComponent={() => <Preloader show={true} />}
              />
            </Row>
          </Col>
        </Row>

        <ProductVisits />
      </Container>
    </>
  );
};

const Filter = (props) => {
  const { filters, setFilters } = React.useContext(Context);
  console.log("filters", filters);
  return (
    <>
      <Row>
        <Col md={5}>
          <InputGroup>
            <Form.Select
              aria-label="Сортировать по"
              onChange={(event) =>
                setFilters({ sortby: event.currentTarget.value })
              }
            >
              <option value="publishedon">Новые</option>
              <option value="popular">Популярные</option>
              <option value="price">По цене</option>
              <option value="rating">По рейтингу</option>
            </Form.Select>

            <Form.Select
              aria-label="Порядок сортировки"
              onChange={(event) =>
                setFilters({ sortby: event.currentTarget.value })
              }
            >
              <option value="DESC">По убыванию</option>
              <option value="ASC">По возрастанию</option>
            </Form.Select>
          </InputGroup>
        </Col>
        <Col md={7} className="text-end">
          {viewButtonProps.map((props) => (
            <Button
              key={props.id}
              variant={""}
              className={
                "mr-1" +
                (props.id === `filter-${filters.view}` ? " active" : "")
              }
              onClick={() =>
                setFilters({ view: props.id.replace("filter-", "") })
              }
              {...props}
            >
              <Icon name={props.icon} />
            </Button>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default Catalog;
