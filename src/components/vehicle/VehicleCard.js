import React, { useState } from "react";
import deleteIcon from "../../assets/deleteIcon.svg";
import PopupModal from "../common/PopupModal";

const VehicleCard = ({ data, handler }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="col-12 col-md-4">
      <div className="card h-100 shadow p-2 mb-1 border-0 rounded">
        <div className="card-body">
          <h5 className="card-title d-none">{data.vehicle.id}</h5>
          <h5 className="card-text d-flex justify-content-between align-items-center">
            <span>Name: {data.vehicle.name}</span>
            <button
              className="btn btn-warning"
              onClick={toggleModal}
            >
              Edit
            </button>
          </h5>
          <p className="card-text">Driver: {data.vehicle.driver}</p>
          <p className="card-text">Status: {data.vehicle.status}</p>
          <p className="card-text">Fuel Type: {data.vehicle.fuelType}</p>
          <h6 className="card-title">Equipments</h6>
          <div className="row g-2">
            {data.vehicle.equipments
              ? data.vehicle.equipments.map((equipmentId) => {
                  console.log("equipmentId : ", data.equipments);

                  let equipment = data.equipments.find(
                    (a) => a.id === equipmentId
                  );
                  //console.log("equipment : ", equipment);
                  return (
                    <>
                      <div className="col-auto">
                        <div className="card h-100 shadow-sm bg-light">
                          <div className="card-body px-2 py-1">
                            <h6 className="card-title p-1 m-0">
                              {equipment.id} - {equipment.name}
                              <button className="btn btn-danger btn-small p-1 ms-2">
                                <img src={deleteIcon} />
                              </button>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
      <PopupModal
            isOpen={isModalOpen}
            toggle={toggleModal}
            title={"Edit Vehicle"}
            option={"EDITV"}
            handler={handler}
          />
    </div>
  );
};

export default VehicleCard;
