import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { addPlane } from "../Services/PlaneServices";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { getAllAirport } from "../Services/AirportServices";

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

export default function AddPlane({ onChildChange }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    planeName: "",
    onAirport: "",
  });
  const [listAirport, setListAirport] = useState([]);
  const [message, setMessage] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setMessage("");
    setFormData({});
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await addPlane(formData);
    if (data) {
      setMessage(
        <span className="text-green-600">Thêm Máy bay thành công!</span>
      );
      onChildChange();
    } else {
      setMessage(<span className="text-red-600">Máy bay đã tồn tại!</span>);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getAllAirport();
      setListAirport(data);
    }
    fetchData();
  }, []);

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
        Thêm máy bay
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
              Thêm máy bay mới
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="relative z-0 w-full mb-1 group">
                <TextField
                  required
                  id="planeName"
                  name="planeName"
                  label="Nhập tên máy bay"
                  variant="filled"
                  value={formData.planeName}
                  sx={{ width: "100%" }}
                  onChange={handleInputChange}
                />
              </div>
              <FormControl variant="filled" sx={{ mt: 2, width: "100%" }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Sân bay đang đậu
                </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={formData.onAirport}
                  onChange={handleInputChange}
                  autoWidth
                  name="onAirport"
                >
                  {listAirport.map((d) => {
                    return (
                      <MenuItem key={d.id} value={d.id}>
                        {d.airportName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
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
