import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "@js/components/Image";
import Button from "@js/components/Form/Button";
import { useSelectFiles } from "./Files";

const defaultProps = {
  prefix: "upload-photos-",
};

const UploadPhotos = (props) => {
  const {
    prefix,
    gallery: _gallery,
    GalleryItem,
  } = { ...defaultProps, ...props };
  const [checkedAll, setCheckedAll] = React.useState(false);
  const gallery = React.useMemo(() => _gallery, []);
  const selectFiles = useSelectFiles({});

  //   const actionFiles = useActionFiles({
  //     checkRequest: (data) => sendRequest("web/file/check", { data }),
  //     uploadRequest: (file) => sendRequest("web/file/upload", file),
  //     removeRequest: (file) => sendRequest("web/file/remove", { file }),
  //   });

  const handleSelect = () => {
    selectFiles
      .openDialog()
      .then(({ target }) => target.files)
      .then(async (files) => {
        console.log("files", files);

        // actionFiles.uploadFiles(files);
        return;
        const {
          files: _files,
          errors,
          count,
        } = await actionFiles.checkFiles(files);

        if (_files.length) {
          actionFiles.uploadFiles(_files);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <>
      <Container>
        <ControlPanel>
          <Form.Check
            type="checkbox"
            id={`${prefix}checkall`}
            label="Выбрать все"
            checked={checkedAll}
          />

          {checkedAll ? <Button>Удалить выбранные</Button> : <></>}
        </ControlPanel>
        <PhotoGrid>
          {photos.map((item) => (
            <GalleryItem key={item.id} {...item} />
          ))}
        </PhotoGrid>
        <Button onClick={handleSelect}>Выбрать с компьютера</Button>
      </Container>
    </>
  );
};

const Container = (props) => {
  const { children } = props;

  return <div className="upload-photos-container">{children}</div>;
};

const ControlPanel = (props) => {
  const { children } = props;

  return <div className="upload-photos-control-panel">{children}</div>;
};

const PhotoGrid = (props) => {
  const { children } = props;

  return <Row className="upload-photos-grid">{children}</Row>;
};

const PhotoGridItem = (props) => {
  const { url } = props;

  return (
    <Col>
      <div className="upload-photos-grid-item border rounded p-2">
        <Image src={url} />
      </div>
    </Col>
  );
};

export default UploadPhotos;
