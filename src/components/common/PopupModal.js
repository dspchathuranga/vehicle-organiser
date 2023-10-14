import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

const PopupModal = ({ isOpen, toggle, title, option, handler }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataObject = { data: "ok" };
    handler(dataObject);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered size="lg">
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>
        {option === "ADDE" ? (
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="name" className="col-sm-3 col-form-label">
                Equipment Name
              </label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="name" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Vehicle Name
              </label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="name" />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="driver" className="col-sm-2 col-form-label">
                Driver
              </label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="driver" />
              </div>
            </div>
            <h6>Equipments</h6>
            <div className="row mb-3">
              <div className="col-auto">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck1"
                  />
                  <label className="form-check-label" htmlFor="gridCheck1">
                    Test Equipmentc 1
                  </label>
                </div>
              </div>
              <div className="col-auto">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck1"
                  />
                  <label className="form-check-label" htmlFor="gridCheck1">
                    Test Equipment 2
                  </label>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        )}
      </ModalBody>
    </Modal>
  );
};

export default PopupModal;
