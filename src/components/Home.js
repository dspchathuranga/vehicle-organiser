import React, { useState, useEffect } from "react";
import { useGetAllUsersQuery } from '../api/userSlice';

const Home = () => {
  const {data, error, isLoading} = useGetAllUsersQuery();
    console.log(data);
  return (
    <div>Home</div>
  )
}

export default Home