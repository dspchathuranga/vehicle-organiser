import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { useAddUserMutation, useGetAllUsersQuery } from "../../api/userSlice";

function RegistrationForm() {
  const navigate = useNavigate();
  const { data: users, error } = useGetAllUsersQuery();
  const [addUser, { isLoading }] = useAddUserMutation();

  const [formData, setFormData] = useState({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (users) {
      console.log("users: ", users);
      setFormData({
        ...formData,
        id: users.length + 1,
      });
    }
  }, [users]);

  const canSave =
    [formData].every(Boolean) && !isLoading;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bcryptPassword = bcrypt.hashSync(formData.password, 10);

    if (canSave) {
      try {
        await addUser({
          id: formData.id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: bcryptPassword,
        }).unwrap();

        setFormData({
          ...formData,
          id: users.length + 2,
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });

        navigate("/");
      } catch (err) {
        console.log("Failed to save the User");
      }
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Registration Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="Enter your first name"
                onChange={handleChange}
                value={formData.firstName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Enter your last name"
                onChange={handleChange}
                value={formData.lastName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email address"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;
