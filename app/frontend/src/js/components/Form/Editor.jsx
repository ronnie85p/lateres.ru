import React, { createRef, useEffect } from "react";
import "@root/vendor/tinymce_6.2.0/tinymce.min";
import TextArea from "./TextArea";

// tinymce.PluginManager.add("charactercount", function (editor) {
//   var self = this;

//   function update() {
//     editor.theme.panel
//       .find("#charactercount")
//       .text(["Characters: {0}", self.getCount()]);
//   }

//   function decodeHtml(html) {
//     var txt = document.createElement("textarea");
//     txt.innerHTML = html;
//     return txt.value;
//   }

//   editor.on("init", function () {
//     var statusbar =
//       editor.theme.panel && editor.theme.panel.getElementById("statusbar");
//     // console.log('init', editor.theme)
//     if (statusbar) {
//       window.setTimeout(function () {
//         statusbar.insert(
//           {
//             type: "label",
//             name: "charactercount",
//             text: ["Characters: {0}", self.getCount()],
//             classes: "charactercount",
//             disabled: editor.settings.readonly,
//           },
//           0
//         );

//         editor.on("setcontent beforeaddundo", update);

//         editor.on("keyup", function (e) {
//           update();
//         });
//       }, 0);
//     }
//   });

//   self.getCount = function () {
//     var tx = editor.getContent({ format: "raw" });
//     var decoded = decodeHtml(tx);
//     // here we strip all HTML tags
//     var decodedStripped = decoded.replace(/(<([^>]+)>)/gi, "").trim();
//     var tc = decodedStripped.length;
//     return tc;
//   };
// });

const defaultProps = {
  height: 300,
  init: {
    theme: "silver",
    language: "ru",
    suffix: ".min",
    document_base_url: document.location.origin,
    base_url: `${document.location.origin}/app/frontend/vendor/tinymce_6.2.0`,
    relative_urls: true,
    statusbar: true,
    branding: false,
    menubar: false,
    height: 200,
    plugins: [
      "link",
      "autolink",
      "image",
      "lists",
      "preview",
      "fullscreen",
      "help",
    ],
    toolbar:
      "undo redo | formatselect | " +
      "bold italic backcolor | alignleft aligncenter " +
      "alignright alignjustify | bullist numlist outdent indent | " +
      "removeformat | help",
    content_style:
      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
  },
};

const Editor = (props) => {
  const { children, onInit, init, name, style, className, height } = {
    ...defaultProps,
    ...props,
  };
  const _ref = createRef(null);

  const beforeInit = () => {};

  const initCallback = (editor) => {
    const element = editor.getElement();
    const container = editor.getContainer();
    const header = container.querySelector(".tox-editor-header");

    if (height > 0) {
      container.style.height = `${height + header.offsetHeight}px`;
    }

    editor.on("input change", (event) => {
      element.dispatchEvent(new Event(event.type, { bubbles: true }));
    });

    onInit && onInit(editor);
  };

  useEffect(() => {
    beforeInit();

    tinymce.init({
      ...init,
      target: _ref.current,
      init_instance_callback: initCallback,
    });
  }, []);

  return (
    <textarea ref={_ref} name={name} style={style} className={className}>
      {children}
    </textarea>
  );
};

export default Editor;
