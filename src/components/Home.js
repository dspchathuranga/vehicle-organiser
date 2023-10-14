import React, { useState, useEffect } from "react";
import { useGetAllVehiclesQuery } from "../api/vehicleSlice";
import { useGetAllEquipmentsQuery } from "../api/equipmentSlice";
import VehicleCard from "./vehicle/VehicleCard";
import logo from "../assets/logo.svg";
import PopupModal from "./common/PopupModal";

const Home = () => {
  const siteName = process.env.REACT_APP_NAME;
  const { data: vehicles } = useGetAllVehiclesQuery();
  console.log(vehicles);

  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState(false);
  const [isAddEquipmentModalOpen, setIsAddEquipmentModalOpen] = useState(false);

  const addVehicle = (data) => {
    console.log("addv", data);
  };

  const addEquipment = (data) => {
    console.log("adde", data);
  };

  const editVehicle = (data) => {
    console.log("editv", data);
  };


  const toggleAddVehicleModal = () => {
    setIsAddVehicleModalOpen(!isAddVehicleModalOpen);
  };
  const toggleAddEquipmentModal = () => {
    setIsAddEquipmentModalOpen(!isAddEquipmentModalOpen);
  };

  const { data: equipments, error, isLoading } = useGetAllEquipmentsQuery();
  console.log(equipments);
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
              <button className="py-1 btn btn-danger">Logout</button>
            </nav>
          </div>
        </header>
        <main className="container py-5">
          <div className="row g-3">
            {vehicles && equipments
              ? vehicles.map((vehicle, idx) => {
                  return (
                    <VehicleCard
                      data={{ vehicle, equipments }}
                      handler={editVehicle}
                      key={idx}
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
          />
          <PopupModal
            isOpen={isAddEquipmentModalOpen}
            toggle={toggleAddEquipmentModal}
            title={"Add Equipment"}
            option={"ADDE"}
            handler={addEquipment}
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
