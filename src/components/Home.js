import React, { useState, useEffect } from "react";
import {
  useAddVehicleMutation,
  useGetAllVehiclesQuery,
  useUpdateVehicleMutation,
} from "../api/vehicleSlice";
import {
  useAddEquipmentMutation,
  useGetAllEquipmentsQuery,
} from "../api/equipmentSlice";
import VehicleCard from "./vehicle/VehicleCard";
import logo from "../assets/logo.svg";
import PopupModal from "./common/PopupModal";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, logOut } from "../auth/authSlice";

const Home = () => {
  const siteName = process.env.REACT_APP_NAME;

  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const { data: vehicles } = useGetAllVehiclesQuery();
  //console.log(vehicles);
  const { data: equipments } = useGetAllEquipmentsQuery();
  //console.log(equipments);

  const [addEquipmentMutation, { isLoading: equipmentLoading }] =
    useAddEquipmentMutation();

  const [addVehicleMutation, { isLoading: vehiclaLoading }] =
    useAddVehicleMutation();

    const [updateVehicleMutation, { isLoading: updateVehiclaLoading }] =
    useUpdateVehicleMutation();

  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState(false);
  const [isAddEquipmentModalOpen, setIsAddEquipmentModalOpen] = useState(false);

  const addVehicle = async (data) => {
    data.id = "v" + (vehicles.length + 1);
    //console.log("addv", data);
    const canSave = [data].every(Boolean) && !vehiclaLoading;

    if (canSave) {
      try {
        await addVehicleMutation(data).unwrap();
      } catch (err) {
        console.log("Failed to save the Vehicle");
      }
    }
  };

  const addEquipment = async (data) => {
    data.id = equipments.length + 1;
    //console.log("adde", data);

    const canSave = [data].every(Boolean) && !equipmentLoading;

    if (canSave) {
      try {
        await addEquipmentMutation(data).unwrap();
      } catch (err) {
        console.log("Failed to save the Equipment");
      }
    }
  };

  const editVehicle = async (data) => {
    //console.log("editing object", data);
    const canSave = [data].every(Boolean) && !updateVehiclaLoading;

    if (canSave) {
      try {
        await updateVehicleMutation(data).unwrap();
      } catch (err) {
        console.log("Failed to update Vehicle");
      }
    }
  };

  const toggleAddVehicleModal = () => {
    setIsAddVehicleModalOpen(!isAddVehicleModalOpen);
  };
  const toggleAddEquipmentModal = () => {
    setIsAddEquipmentModalOpen(!isAddEquipmentModalOpen);
  };

  return (
    <div>
      <div className="container-fluid px-0">
        <header>
          <div className="d-flex flex-column flex-md-row align-items-center px-3 py-2 mb-4 border-bottom bg-dark">
            <a
              href="/home"
              className="d-flex align-items-center link-body-emphasis text-decoration-none"
            >
              <img src={logo} />
              <span className="fs-4 ms-2 text-white">{siteName}</span>
            </a>
            <a
              href="/home"
              className="text-white ms-4 py-2 pt-3 link-body-emphasis text-decoration-none"
            >
              Home
            </a>

            <div className="text-white ms-4 py-2 pt-3 text-decoration-none">
              Welcome {user.firstName} {user.lastName}
            </div>

            <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
              <button
                className="me-3 py-1 btn btn-outline-secondary text-decoration-none"
                onClick={() => toggleAddEquipmentModal()}
              >
                Add Equipment
              </button>
              <button
                className="me-3 py-1 btn btn-outline-primary text-decoration-none"
                onClick={() => toggleAddVehicleModal()}
              >
                Add Vehicle
              </button>
              <button
                className="py-1 btn btn-danger"
                onClick={() => dispatch(logOut(user))}
              >
                Logout
              </button>
            </nav>
          </div>
        </header>
        <main className="container py-5">
          <div className="row g-3">
            {vehicles && equipments
              ? vehicles.map((vehicle, idx) => {
                  return (
                    <VehicleCard
                      key={vehicle.id}
                      data={{ vehicle, equipments }}
                      handler={editVehicle}
                      equipments={equipments}
                    />
                  );
                })
              : ""}
          </div>
          <PopupModal
            isOpen={isAddVehicleModalOpen}
            toggle={toggleAddVehicleModal}
            title={"Add Vehicle"}
            option={"ADDV"}
            handler={addVehicle}
            equipments={equipments}
          />
          <PopupModal
            isOpen={isAddEquipmentModalOpen}
            toggle={toggleAddEquipmentModal}
            title={"Add Equipment"}
            option={"ADDE"}
            handler={addEquipment}
            equipments={equipments}
          />
        </main>
        <footer className="py-2 border-top bg-dark">
          <div className="row m-0">
            <div className="col">
              <p className="text-white text-center m-0">
                All rights Reserved @2023
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
