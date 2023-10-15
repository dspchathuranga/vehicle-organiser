import React, { useState } from "react";
import deleteIcon from "../../assets/deleteIcon.svg";
import editIcon from "../../assets/pencil-square.svg"
import PopupModal from "../common/PopupModal";
import { useDeleteVehicleMutation, useUpdateVehicleMutation } from "../../api/vehicleSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VehicleCard = ({ data, handler, equipments }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(data);

  const [updateVehicleMutation, { isLoading: vehiclaLoading }] =
    useUpdateVehicleMutation();

    const [deleteVehicleMutation, { isLoading: deleteVehiclaLoading }] =
    useDeleteVehicleMutation();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEdit = (value) => {
    setEditData(value);
    toggleModal();
  };

  const handleEquipmentRemove = async (id) => {
    //console.log("equipment Id", id, data.vehicle);
    if (data.vehicle.equipments) {
      try {
        const updatedVehicle = {
          ...data.vehicle,
          equipments: data.vehicle.equipments.filter(
            (equipmentId) => equipmentId !== id
          ),
        };
        //console.log(updatedVehicle)
        await updateVehicleMutation(updatedVehicle).unwrap();
        toast("Equipment Removed Successful...");
      } catch (err) {
        // console.log("Failed to remove Equipment");
        toast("Equipment Removed Failed...");
      }
    }
  };

  const handleVehicleRemove = async (id) => {
    //console.log("vehicla Id", id);
    if (id) {
      try {
        await deleteVehicleMutation(id).unwrap();
        toast("Vehicle Removed Successful...");
      } catch (err) {
        // console.log("Failed to remove Vehicle");
        toast("Vehicle Removed Failed...");
      }
    }
  };

  return (
    <div className="col-12 col-md-4">
      <div className="card h-100 shadow p-2 mb-1 border-1 rounded ">
        <div className="card-body">
          <h5 className="card-title d-none">{data.vehicle.id}</h5>
          <h5 className="card-text d-flex justify-content-between align-items-center">
            <span>Name: {data.vehicle.name}</span>
            <div>
              {/* <button
                className="btn btn-warning" style={{marging:500}}
                onClick={() => handleEdit(data)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                // onClick={() =>
                //   handleEquipmentRemove(equipment.id)
                // }
              >
                <img src={deleteIcon} />
              </button> */}
              <div className="btn-group" role="group" aria-label="Basic example">
                
                <button type="button" className="btn btn-outline-secondary" onClick={() => handleEdit(data)}>
                <img src={editIcon} />
                </button>
                <button type="button" className="btn btn-outline-danger" onClick={() => handleVehicleRemove(data.vehicle.id)}>
                <img src={deleteIcon} />
                </button>
              </div>
            </div>
          </h5>
          <p className="card-text">Driver: {data.vehicle.driver}</p>
          <p className="card-text">Fuel Type: {data.vehicle.fuelType}</p>
          <p className="card-text">Status: {data.vehicle.status}</p>
          <h6 className="card-title">Equipments</h6>
          <div className="row g-2">
            {data.vehicle.equipments
              ? data.vehicle.equipments.map((equipmentId, index) => {
                  //console.log("equipmentId : ", data.equipments);

                  let equipment = data.equipments.find(
                    (a) => a.id === equipmentId
                  );
                  //console.log("equipment : ", equipment);
                  return (
                    <div className="col-auto" key={index}>
                      <div className="card h-100 shadow-sm bg-light">
                        <div className="card-body px-2 py-1">
                          <h6 className="card-title p-1 m-0">
                            {equipment.name}
                            <button
                              className="btn btn-outline-danger btn-small p-1 ms-2"
                              onClick={() =>
                                handleEquipmentRemove(equipment.id)
                              }
                            >
                              <img src={deleteIcon} />
                            </button>
                          </h6>
                        </div>
                      </div>
                    </div>
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
        equipments={equipments}
        data={editData}
      />
    </div>
  );
};

export default VehicleCard;
