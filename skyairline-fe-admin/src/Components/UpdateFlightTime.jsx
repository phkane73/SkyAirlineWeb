import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { NumericFormat } from "react-number-format";
import {
  getListAirportNoFlightTime,
  addFlightTime,
} from "../Services/AirportServices";

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

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      valueIsNumericString
      thousandSeparator
    />
  );
});

export default function UpdateFlightTime({ id, name, onChildChange }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    airport: "",
    hour: 0,
    minute: 0,
  });
  const [data, setData] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setFormData({ airport: "", hour: 0, minute: 0 });
    setMessage("");
    setOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getListAirportNoFlightTime(id);
      setData(data);
    }
    fetchData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await addFlightTime(
      id,
      formData.airport,
      parseInt(formData.hour) + parseFloat((formData.minute / 60).toFixed(2)),
      formData.price
    );
    onChildChange();
    setMessage(data);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMessage("");
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <button
        className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-5 rounded transition-all"
        onClick={() => {
          handleOpen();
        }}
      >
        Cập nhật
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h1 className="text-3xl text-center">Thêm tuyến đường bay</h1>
            <h1 className="mb-3 text-xl">{name}</h1>
            <form onSubmit={handleSubmit}>
              <FormControl variant="filled" sx={{ mb: 2, width: "100%" }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  Đến sân bay
                </InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={formData.airport}
                  onChange={handleInputChange}
                  autoWidth
                  name="airport"
                >
                  {data.map((d) => {
                    return (
                      <MenuItem key={d.id} value={d.id}>
                        {d.airportName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <div className="relative z-0 w-full mb-4 group">
                <TextField
                  required
                  id="price"
                  name="price"
                  label="Chi phí bay"
                  variant="filled"
                  value={formData.price}
                  sx={{ width: "100%" }}
                  onChange={handleInputChange}
                  InputProps={{
                    inputComponent: NumericFormatCustom,
                  }}
                />
              </div>
              <div className="flex w-100">
                <div className="relative z-0 w-full mb-1 group mr-2">
                  <TextField
                    required
                    type="number"
                    InputProps={{ inputProps: { min: 0, step: 1 } }}
                    id="hour"
                    name="hour"
                    label="Giờ"
                    variant="filled"
                    value={formData.hour}
                    sx={{ width: "100%" }}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="relative z-0 w-full mb-1 group">
                  <TextField
                    required
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    id="minute"
                    name="minute"
                    label="Phút"
                    variant="filled"
                    value={formData.minute}
                    sx={{ width: "100%" }}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <span className="text-green-600">{message}</span>
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
