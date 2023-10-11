// REFERENCES
// [1] React Documentation: https://react.dev/learn

// import necessary dependencies
import React, { useState } from "react";
import Modal from "react-modal";
import "./RequestVisit.css";
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function RequestVisitButton() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // open the modal window
  const openModal = () => {
    setModalIsOpen(true);
  };

  // close the modal window
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Sets the selected date and closes the modal window
  const handleDateSelect = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    closeModal();

    // implement a way to collect user details etc...
  };

  const navigate = useNavigate();

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    const data = {selectedDate:selectedDate, slectedTime: selectedTime};
    axios.post("http://localhost:3000/createUser", data)//Need backend route to implement to correct route
    .then(()=> alert("SUCCESS"))
    .catch((res)=> alert("Error code: " + res));
    navigate("/houses")
  }

  // style the modal window
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: "60%",
      borderRadius: "10px",
      padding: "20px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    },
  };

  return (
    <div>
      <h2>Test implementation</h2>
      <button className="request-button" onClick={openModal}>
        Request Visit
      </button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Select Date Modal"
      >
        <button className="close-button" onClick={closeModal}>
          ❌
        </button>
        <h3 className="select-date-heading">Select a date and time</h3>
        <input
          className="date-input"
          type="date"
          onChange={(e) => handleDateSelect(e.target.value, selectedTime || "")}
          value={selectedDate || ""}
        />
        <select
          className="time-select"
          value={selectedTime || ""}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          <option value="">Select a Time</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </select>
        <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
      </Modal>
    </div>
  );
}

Modal.setAppElement("#root");

export default RequestVisitButton;
