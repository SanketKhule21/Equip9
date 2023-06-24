import React, { useState } from "react";
import { register } from "./UserFunctions";
import axios from "axios";

const Register = ({ history }) => {
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    errors: {},
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const { first_name, last_name, email, password, errors } = state;

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  // const onSubmit = (e) => {
  //   e.preventDefault();

  //   if (validateForm()) {
  //     const newUser = {
  //       first_name,
  //       last_name,
  //       email,
  //       password,
  //     };

  //     register(newUser)
  //       .then((res) => {
  //         history.push(`/login`);
  //       })
  //       .catch((error) => {
  //         console.error("Registration error:", error);

  //       });
  //   }
  // };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const newUser = {
        first_name,
        last_name,
        email,
        password,
      };

      register(newUser)
        .then((res) => {
          if (selectedImage) {
            const formData = new FormData();
            formData.append("photos", selectedImage);

            axios
              .post("/upload", formData)
              .then((res) => {
                console.log(res.data);
              })
              .catch((error) => {
                console.error("Image upload error:", error);
              });
          }

          history.push(`/login`);
        })
        .catch((error) => {
          console.error("Registration error:", error);
        });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (first_name.trim() === "") {
      errors.first_name = "First name is required";
      isValid = false;
    }

    if (last_name.trim() === "") {
      errors.last_name = "Last name is required";
      isValid = false;
    }

    if (email.trim() === "") {
      errors.email = "Email address is required";
      isValid = false;
    } else if (!isValidEmail(email)) {
      errors.email = "Invalid email address";
      isValid = false;
    }

    if (password.trim() === "") {
      errors.password = "Password is required";
      isValid = false;
    } else if (!isValidPassword(password)) {
      errors.password =
        "Password must be at least 6 characters and contain at least 1 uppercase letter, 1 lowercase letter, 1 numeric digit, and 1 special character";
      isValid = false;
    }

    setState({ ...state, errors });
    return isValid;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const isFormValid = () => {
    return (
      first_name.trim() !== "" &&
      last_name.trim() !== "" &&
      email.trim() !== "" &&
      isValidEmail(email) &&
      password.trim() !== "" &&
      isValidPassword(password)
    );
  };

  return (
    <div className="container">
      <div className="jumbotron ">
        <div className="containerMain">
          <h1 className="text-center headerMain ">
            Join <span className="headerMid">The </span> Community
          </h1>
        </div>
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={onSubmit}>
              {/* <h1 className="h3 mb-3 font-weight-normal">Register</h1> */}
              <div className="form-group">
                <label htmlFor="name">
                  First name<sup style={{ color: "red" }}>*</sup>
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.first_name && "is-invalid"
                  }`}
                  name="first_name"
                  placeholder="Enter your first name"
                  value={first_name}
                  onChange={onChange}
                />
                {errors.first_name && (
                  <div className="invalid-feedback">{errors.first_name}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="name">
                  Last name<sup style={{ color: "red" }}>*</sup>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.last_name && "is-invalid"}`}
                  name="last_name"
                  placeholder="Enter your last name"
                  value={last_name}
                  onChange={onChange}
                />
                {errors.last_name && (
                  <div className="invalid-feedback">{errors.last_name}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  Email address<sup style={{ color: "red" }}>*</sup>
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.email && "is-invalid"}`}
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={onChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  Password<sup style={{ color: "red" }}>*</sup>
                </label>
                <input
                  type="password"
                  className={`form-control ${errors.password && "is-invalid"}`}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={onChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="image">Profile Image</label>
                <input
                  type="file"
                  className="form-control-file"
                  name="image"
                  onChange={handleImageChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-lg  btn-block"
                disabled={!isFormValid()}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
