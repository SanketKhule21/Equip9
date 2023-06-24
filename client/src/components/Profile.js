import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

const Profile = () => {
  const [greeting, setGreeting] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);

    setFirstName(decoded.first_name);
    setLastName(decoded.last_name);
    setEmail(decoded.email);

    const currentTime = new Date();

    const currentHour = currentTime.getHours();

    let timeOfDayGreeting;
    if (currentHour < 12) {
      timeOfDayGreeting = "Morning";
    } else if (currentHour < 18) {
      timeOfDayGreeting = "Afternoon";
    } else {
      timeOfDayGreeting = "Evening";
    }

    setGreeting(timeOfDayGreeting);
  }, []);

  return (
    <div className="container">
      <div className="jumbotron mt-5">
        <div className="col-sm-8 mx-auto">
          <h1 className="text-center headerMain ">
            Good <span className="headerMid">{greeting} </span>
          </h1>
        </div>
        <table className="table col-md-6 mx-auto style={{ fontWeight: 'bold', fontSize: '16px' }}">
          <tbody>
            <tr>
              <td>First Name</td>
              <td>{firstName}</td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td>{lastName}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
