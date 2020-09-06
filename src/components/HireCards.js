import * as React from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";

export default function HireCards({ product }) {
  const [modalOpen, setModalOpen] = React.useState(false);
  console.log(product.image);
  return (
    <React.Fragment>
      <Modal isOpen={modalOpen}>
        <button onClick={() => setModalOpen(!modalOpen)}>close</button>
        cool
      </Modal>
      <Link to="/hire" className="py-6">
        <div className="flex max-w-md bg-white hover:shadow-lg rounded overflow-hidden">
          <div
            className="w-1/3 bg-cover"
            style={{
              backgroundImage: `url(../static/products/${product.sku}_2.jpg)`,
            }}
          ></div>
          <div className="w-2/3 p-4">
            <h1 className="text-gray-900 font-bold text-md truncate">
              {product.title}
            </h1>
            <p className="mt-2 text-gray-600 text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit In odit
              exercitationem fuga id nam quia
            </p>
            <div className="flex item-center justify-between mt-3">
              <h1 className="font-bold">Ugx {product.price}</h1>
              <button
                onClick={() => setModalOpen(!modalOpen)}
                className="px-3 py-2 bg-agrisolidgreen text-agribackgroung text-xs font-bold uppercase rounded"
              >
                REQUEST HIRE
              </button>
            </div>
          </div>
        </div>
      </Link>
    </React.Fragment>
  );
}
