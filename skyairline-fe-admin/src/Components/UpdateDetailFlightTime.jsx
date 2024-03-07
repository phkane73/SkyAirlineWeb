import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { updatePrice } from "../Services/AirportServices";
import { NumericFormat } from "react-number-format";
import EditIcon from "@mui/icons-material/Edit";

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

export default function UpdateDetailFlightTime({ id, price, onChildChange }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    price: price,
  });
  const [message, setMessage] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setMessage("");
    setFormData({ price: price });
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await updatePrice(id, formData.price);
    if (data) {
      setMessage(
        <span className="text-green-600">Cập nhật giá mới thành công!</span>
      );
      onChildChange();
    } else {
      setMessage(<span className="text-red-600">Vui lòng nhập đúng giá!</span>);
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
    <div className="inline-block ml-3">
      <button
        className="text-blue-700"
        onClick={() => {
          handleOpen();
        }}
      >
        <EditIcon />
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
              Điều chỉnh giá tuyến bay
            </h1>
            <form onSubmit={handleSubmit}>
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
              {message}
              <button
                className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-5 rounded uppercase transition-all float-end"
                onClick={handleSubmit}
              >
                Sửa
              </button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
