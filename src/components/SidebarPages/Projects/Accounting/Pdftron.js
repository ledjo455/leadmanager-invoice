import React, { useRef, useEffect, useState } from "react";
import WebViewer from "@pdftron/webviewer";
const jsonData = {
  company: "LLC",
  total: "20.00",
  items: {
    insert_rows: [
      ["1", "2", "3", "4"],
      ["1", "2", "3", "4"],
    ],
  },
};

function PdfTron({ data }) {
  const viewer = useRef(null);
  const [recievedData, setReceivedData] = useState(data);
  const [pdfTronData, setPdfTronData] = useState({
    company: "LLC",
    total: "20.00",
    items: {
      insert_rows: data,
    },
  });

  useEffect(() => {
    console.log("MERGENCY", pdfTronData);
    pdfTronData.items.insert_rows = data;
  }, [data, recievedData]);

  useEffect(() => {
    console.log("webviewer ", data);
    WebViewer(
      {
        path: "/webviewer/lib",
        initialDoc: "/files/sample2.docx",
      },
      viewer.current
    ).then((instance) => {
      const { documentViewer, annotationManager, Annotations } = instance.Core;
      instance.UI.useEmbeddedPrint(true);

      instance.UI.setHeaderItems((header) => {
        header.push({
          type: "actionButton",
          img: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
          onClick: async () => {
            console.log(
              await annotationManager.exportAnnotations({
                links: false,
                widgets: false,
              })
            );
          },
        });
      });

      documentViewer.addEventListener("documentLoaded", async () => {
        await documentViewer.getDocument().documentCompletePromise();
        documentViewer.updateView();
        const doc = documentViewer.getDocument();
        const keys = doc.getTemplateKeys();
        console.log("these are the keys", keys);

        annotationManager.setCurrentUser("Ledjo");
        const rectangleAnnot = new Annotations.RectangleAnnotation({
          PageNumber: 1,
          X: 100,
          Y: 150,
          Width: 200,
          Height: 50,
          Author: annotationManager.getCurrentUser(),
        });

        // annotationManager.addAnnotation(rectangleAnnot);
        // annotationManager.redrawAnnotation(rectangleAnnot);

        await documentViewer.getDocument().applyTemplateValues(pdfTronData);
      });
    });
  }, []);

  return (
    <div className="App">
      <div className="header">Edit the document, click download to Save!</div>
      <div
        className="webviewer"
        style={{ width: "1900px", height: "1000px" }}
        ref={viewer}
      ></div>
    </div>
  );
}

export default PdfTron;
