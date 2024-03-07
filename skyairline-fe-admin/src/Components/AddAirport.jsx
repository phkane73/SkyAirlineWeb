import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { addAirport } from "../Services/AirportServices";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddAirport({ onChildChange }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setMessage("");
    setFormData({});
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await addAirport(formData.airportName, formData.location);
    if (data) {
      setMessage(
        <span className="text-green-600">Thêm sân bay thành công!</span>
      );
      onChildChange();
    } else {
      setMessage(<span className="text-red-600">Sân bay đã tồn tại!</span>);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <button
        className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-5 rounded uppercase mb-1 transition-all float-end"
        onClick={() => {
          handleOpen();
        }}
      >
        <i className="fa-solid fa-plus mr-2"></i>
        Thêm sân bay
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h1 className="text-center text-xl mb-2 uppercase">
              Thêm sân bay mới
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="relative z-0 w-full mb-1 group">
                <TextField
                  required
                  id="airportName"
                  name="airportName"
                  label="Nhập tên sân bay"
                  variant="filled"
                  value={formData.airportName}
                  sx={{ width: "100%" }}
                  onChange={handleInputChange}
                />
              </div>
              <div className="relative z-0 w-full mb-1 group mt-4">
                <TextField
                  required
                  id="location"
                  name="location"
                  label="Đặt tại vị trí"
                  variant="filled"
                  value={formData.location}
                  sx={{ width: "100%" }}
                  onChange={handleInputChange}
                />
              </div>
              {message}
              <button
                className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-5 rounded uppercase mt-4 transition-all float-end"
                type="submit"
              >
                Thêm
              </button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
