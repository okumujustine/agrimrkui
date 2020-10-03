import * as React from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Zoom from "react-medium-image-zoom";
import { connect } from "react-redux";
import PhoneInput from "react-phone-number-input/input";
import DateTimePicker from "react-datetime-picker";
import { toast } from "react-toastify";

import { imageUrl } from "../sdk/serverConsts";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "70%",
    transform: "translate(-50%, -50%)",
  },
  overlay: { zIndex: 1000 },
};

function HireCards({ product, authState }) {
  const { isAuthenticated } = authState;

  const [value, setValue] = React.useState();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [hireNote, setHireNote] = React.useState("");
  const [neededDate, setNeededDate] = React.useState(new Date());
  const [returnDate, setReturnDate] = React.useState(new Date());
  const [days, setDays] = React.useState("");
  const [address, setAddress] = React.useState("");

  const hireRequest = () => {
    if (!value) {
      toast.error("Enter phone number please");
      return;
    }
    if (days === 0) {
      toast.error("Enter number of days please");
      return;
    }
    if (!address) {
      toast.error("Enter location address please");
      return;
    }

    console.log({
      phone: value,
      hireNote,
      neededDate,
      returnDate,
      days,
      address,
    });
  };

  return (
    <React.Fragment>
      <Modal isOpen={modalOpen} ariaHideApp={false} style={customStyles}>
        <div className="flex">
          <div className="w-10/12">
            <div className="flex flex-col">
              <div className="flex flex-col">
                <label>Phone Number</label>
                <PhoneInput
                  className="focus:outline-none border-agrisolidgreen border-2 w-10/12"
                  placeholder="Enter phone number"
                  country="UG"
                  value={value}
                  onChange={setValue}
                />
              </div>
              <div className="flex flex-col">
                <label>Needed Date</label>
                <DateTimePicker
                  className="focus:outline-none border-agrisolidgreen border-2 w-10/12"
                  disableClock={true}
                  value={neededDate}
                  onChange={setNeededDate}
                />
              </div>
              <div className="flex flex-col">
                <label>Return date</label>
                <DateTimePicker
                  className="focus:outline-none border-agrisolidgreen border-2 w-10/12"
                  disableClock={true}
                  value={returnDate}
                  onChange={setReturnDate}
                />
              </div>
              <div className="flex flex-col">
                <label>Number of days</label>
                <input
                  className="focus:outline-none border-agrisolidgreen border-2 w-10/12"
                  type="number"
                  placeholder="number of days"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label>Home address</label>
                <input
                  className="focus:outline-none border-agrisolidgreen border-2 w-10/12"
                  placeholder="home address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label>Hire Notes</label>
                <textarea
                  value={hireNote}
                  onChange={(e) => setHireNote(e.target.value)}
                  className="focus:outline-none border-agrisolidgreen border-2 w-10/12 resize-none"
                  placeholder="enter notes here"
                />
              </div>
              <small>
                <b>
                  NB:{" "}
                  <i>
                    we shall contact you on phone, make sure you enter a valid
                    phone number!
                  </i>
                </b>
              </small>
              <button
                className="bg-agrisolidgreen p-1 text-agribackgroung font-bold w-10/12 mt-3"
                onClick={hireRequest}
              >
                submit request
              </button>
            </div>
          </div>
          <div>
            <div className="w-5/12 float-right">
              <button
                className="font-bold w-full flex justify-center items-center rounded-full p-1 mb-2 text-agrisolidgreen bg-agribackgroung hover:text-agribackgroung hover:bg-agrisolidgreen border-agrisolidgreen border-2 float-right focus:outline-none"
                onClick={() => setModalOpen(!modalOpen)}
              >
                close
              </button>
            </div>
            <div className="flex flex-col py-3 ">
              <h1 className="font-bold underline text-agrisolidgreen capitalize">
                {product.title}
              </h1>
              <small className="font-bold">Ugx {product.price}</small>
              <small className="text-agrisolidgreen">
                {product.description}
              </small>
            </div>
          </div>
        </div>
      </Modal>

      <Link
        to="/hire"
        className="flex flex-col rounded overflow-hidden hover:shadow-lg mb-10 w-full bg-white focus:outline-none"
      >
        <div className="bg-white focus:outline-none">
          <Zoom>
            <img
              className="object-contain h-32 w-full focus:outline-none"
              src={`${imageUrl}${product.image_one}`}
              alt="Agro pay image here"
            />
          </Zoom>
        </div>
        <div className="px-6 py-2">
          <div className="font-bold text-md truncate">{product.title}</div>
          <p className="text-gray-700 text-base truncate">
            {product.description}
          </p>
        </div>
        <div className="px-6">
          <h1 className="font-bold">Ugx {product.price}</h1>
        </div>
        <div className="px-6 pt-4 pb-2 justify-end">
          <button
            onClick={() => setModalOpen(!modalOpen)}
            className="inline-block px-3 py-1 text-sm font-semibold mr-2 mb-2 w-full bg-agrisolidgreen text-agribackgroung"
          >
            HIRE
          </button>
        </div>
      </Link>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  authState: state.authReducer,
});

export default connect(mapStateToProps, null)(HireCards);
