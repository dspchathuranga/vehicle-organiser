import React, { useState, useEffect } from "react";
import { useGetAllVehiclesQuery } from "../api/vehicleSlice";
import { useGetAllEquipmentsQuery } from "../api/equipmentSlice";
import VehicleCard from "./vehicle/VehicleCard";

const Home = () => {
  const { data: vehicles } = useGetAllVehiclesQuery();
  console.log(vehicles);

  const { data: equipments, error, isLoading } = useGetAllEquipmentsQuery();
  console.log(equipments);
  return (
    <div>
      Home
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {vehicles && equipments ? vehicles.map((vehicle, idx) => {
          return <VehicleCard data={{vehicle,equipments}} key={idx} />;
        }) : ""}
      </div>
    </div>
  );
};

export default Home;
