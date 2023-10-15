import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { useGetUserByEmailQuery } from "../../api/userSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../auth/authSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { data: users, error, isLoading } = useGetUserByEmailQuery(formData);

  const handleSignIn = (e) => {
    e.preventDefault();
    // You can handle login logic here
    //console.log("Login submitted: ", formData);
    if(users.length > 0) {
      users.forEach((user) => {
        bcrypt.compare(formData.password, user.password, (err, isMatch) => {
          if (err) {
            // Handle error
            console.log("Error : ", err);
            toast("Error : ", err);
          } else if (isMatch) {
            // console.log("User ID: ", user.id);
            // console.log("First Name: ", user.firstname);
            // console.log("Last Name: ", user.lastname);
            // console.log("Email: ", user.email);
            // console.log("Password: ", user.password);
            dispatch(setCredentials({ ...user }));
            navigate("/home");
          } else {
            // Passwords do not match, show an error message
            console.log("Passwords not match");
            toast("Passwords not match");
          }
        });
      });
    } else {
      console.log("User not found");
      toast("User not found");
    }
  };

  const toggleForm = () => {
    navigate("/register");
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
       <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Login</h2>
          <form>
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
            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={handleSignIn}
            >
              Sign In
            </button>
          </form>
        </div>
        <div className="card-footer">
          <p className="text-center">
            {"Don't have an account? "}
            <a href="#toggle" onClick={toggleForm}>
              {"Sign Up"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
