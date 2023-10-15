import { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useGetAllEquipmentsQuery } from "../../api/equipmentSlice";

const PopupModal = ({ isOpen, toggle, title, option, handler, equipments }) => {
  //const { data: equipments } = useGetAllEquipmentsQuery();
  //console.log(equipments);

  const [selectedEquipment, setSelectedEquipment] = useState([]);

  const fuelTypesEnv = process.env.REACT_APP_FUEL_TYPES;
  const vehicleStatusEnv = process.env.REACT_APP_VEHICLE_STATUS;

  const [equipmentData, setEquipmentData] = useState({
    id: 0,
    name: "",
  });

  const [vehicleData, setVehicleData] = useState({
    id: "",
    name: "",
    driver: "",
    status: "",
    fuelType: "",
    equipments: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataObject = option === "ADDE" ? equipmentData : vehicleData;
    handler(dataObject);
    setVehicleData((prevData) => ({
      ...prevData,
      name: "",
      driver: "",
      equipments: [],
    }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (option === "ADDE") {
      setEquipmentData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    } else if (option === "ADDV") {
      setVehicleData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const handleCheckboxChange = (event) => {
    const equipmentId = parseInt(event.target.id);
    //console.log(equipmentId);

    if (event.target.checked) {
      setVehicleData((prevData) => ({
        ...prevData,
        equipments: [...prevData.equipments, equipmentId],
      }));
      //console.log('checked',vehicleData.equipments);
    } else {
      setVehicleData((prevData) => ({
        ...prevData,
        equipments: prevData.equipments.filter(
          (equipment) => equipment !== equipmentId
        ),
      }));

      //console.log('unchecked',vehicleData.equipments);
    }
  };

  useEffect(() => {
    if (option === "ADDV") {
      handleChange({ target: { id: "fuelType", value: "Petrol" } });
      handleChange({ target: { id: "status", value: "active" } });
    }
  }, []);

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
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  onChange={handleChange}
                />
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
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="driver" className="col-sm-2 col-form-label">
                Driver
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="driver"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="driver" className="col-sm-2 col-form-label">
                Fuel Type
              </label>
              <div className="col-sm-10">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  id="fuelType"
                  onChange={handleChange}
                >
                  {fuelTypesEnv.split(",").map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="driver" className="col-sm-2 col-form-label">
                Status
              </label>
              <div className="col-sm-10">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  id="status"
                  onChange={handleChange}
                >
                  {vehicleStatusEnv.split(",").map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <h6>Equipments</h6>
            <div className="row mb-3">
              {equipments
                ? equipments.map((equipment) => (
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={equipment.id}
                          checked={vehicleData.equipments.includes(
                            equipment.id
                          )}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="gridCheck1"
                        >
                          {equipment.name}
                        </label>
                      </div>
                    </div>
                  ))
                : ""}

              {/* <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="gridCheck1"
                  />
                  <label className="form-check-label" htmlFor="gridCheck1">
                    Test Equipmentc 1
                  </label>
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
              </div> */}
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
