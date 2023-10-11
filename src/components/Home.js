import React, { useState, useEffect } from "react";
import { useGetAllVehiclesQuery } from "../api/vehicleSlice";
import { useGetAllEquipmentsQuery } from "../api/equipmentSlice";

const Home = () => {
  const {data:vehicles} = useGetAllVehiclesQuery();
    console.log(vehicles);

    const {data:equipments, error, isLoading} = useGetAllEquipmentsQuery();
    console.log(equipments);
  return (
    <div>Home</div>
  )
}

export default Home