import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { Link } from "@js/components/Router";
import RatingStars from "@js/components/Rating/Stars";

const Styles = {
  Item: {
    discount: {
      position: "absolute",
      top: "5px",
      left: "5px",
      right: "5px",
    },
    discountBadge: {
      fontSize: "1.1em",
    },
  },
};

const ListItem = (props) => {
  const { view } = props;

  if (view === "grid") {
    return <ListItemGrid {...props} />;
  }

  return <ListItemRow {...props} />;
};

const ListItemGrid = (props) => {
  const { data } = props;

  return (
    <Col md={3} className="mb-4">
      <Card className="shadow-sm_ overflow-hidden position-relative">
        <div className="" style={Styles.Item.discount}>
          {data.discount > 0 ? (
            <Badge bg="danger" style={Styles.Item.discountBadge}>
              -{data.discount}%
            </Badge>
          ) : (
            <></>
          )}
        </div>

        <Link to={`${data.uri}?as=product`} title={data.pagetitle}>
          <Card.Img variant="top" src={data.image} style={{ height: 150 }} />
        </Link>

        <Card.Body>
          {/* <Row className='mb-2 d-none'>
                          <Col md={12} className='text-end text-success'>
                              <i className="icon-check"></i> Наличие
                          </Col>
                      </Row> */}
          {/* <div className="mb-4 overflow-hidden" style={{ height: '42px', fontSize: '1.1em' }} title={data.pagetitle}>
                          <a href={data.url} style={{ color: 'black', textDecoration: 'none' }}>{data.pagetitle}</a>
                      </div> */}

          <Card.Title className="fs-6">{data.pagetitle}</Card.Title>
          <RatingStars />
          {/* <Card.Text>{data.description}</Card.Text> */}

          <hr className="my-4 d-none" />
          <Row>
            <Col md={8} className="fw-bolder" style={{ fontSize: "1.5em" }}>
              {data.price} {data.currencyHtmlCode}
            </Col>
            <Col md={4} className="text-end"></Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

const ListItemRow = (props) => {
  const { data } = props;

  return (
    <Col md={12} className="mb-4">
      <div className="card shadow-sm_ overflow-hidden position-relative">
        <div
          className=""
          style={{
            position: "absolute",
            top: "5px",
            left: "5px",
            right: "5px",
          }}
        >
          {data.discount > 0 ? (
            <span className="badge bg-danger" style={{ fontSize: "1.1em" }}>
              -{data.discount}%
            </span>
          ) : (
            <></>
          )}
        </div>

        <a href={data.uri}>
          <img src={data.image} style={{ height: "153px" }} />
        </a>

        <div className="card-body">
          <div className="mb-2 row d-none">
            <div className="col-12 text-end text-success">
              <i className="icon-check"></i> Наличие
            </div>
          </div>
          <div
            className="mb-4 overflow-hidden"
            style={{ height: "42px", fontSize: "1.1em" }}
            title={data.pagetitle}
          >
            <a
              href={data.url}
              style={{ color: "black", textDecoration: "none" }}
            >
              {data.pagetitle}
            </a>
          </div>
          <hr className="my-4 d-none" />
          <div className="row">
            <div className="col-8 fw-bolder" style={{ fontSize: "1.5em" }}>
              {data.price} {data.currencyHtmlCode}
            </div>
            <div className="col-4 text-end">
              <button
                className="btn icon-shopping-cart"
                type="button"
                style={{ fontSize: "1.3em" }}
                title="В корзину"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default ListItem;
