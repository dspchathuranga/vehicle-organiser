import React from "react";

const VehicleCard = ({ data }) => {
  return (
    <div className="col">
      <div className="card h-100">
        <div className="card-body">
          <h5 className="card-title">{data.vehicle.id}</h5>
          <p className="card-text">Name: {data.vehicle.name}</p>
          <p className="card-text">Driver: {data.vehicle.driver}</p>
          <p className="card-text">Status: {data.vehicle.status}</p>
          <p className="card-text">Fuel Type: {data.vehicle.fuelType}</p>
          <h6 className="card-title">Equipments</h6>
          {data.vehicle.equipments
            ? data.vehicle.equipments.map((equipmentId) => {
                //console.log("equipmentId : ", equipmentId);

                let equipment = data.equipments.find(
                  (a) => a.id === equipmentId
                );
                //console.log("equipment : ", equipment);
                return (
                  <>
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                      <div className="col">
                        <div className="card h-100">
                          <div className="card-body">
                            <h5 className="card-title">
                              {equipment.id} - {equipment.name}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );

                // return data.equipments.map((equipment) => {
                //   console.log("equipment : ", equipment);
                //   return (
                //     <><p className="card-text">ss</p><br/><p className="card-text">ssss</p></>
                //   );
                // });
              })
            : ""}
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
