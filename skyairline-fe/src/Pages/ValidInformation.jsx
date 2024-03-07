import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
const ValidInformation = ({ onChangeStep }) => {
  onChangeStep(1);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };
  const { id } = useParams();

  return (
    <div>
      <div className="container my-5">
        <div className="h-[50px] flex justify-between sticky top-0 z-50">
          <button
            class="bg-[#2D7690] hover:bg-[#4fabcd] text-white font-bold py-2 px-4 rounded transition-all flex items-center pl-1"
            onClick={handleClick}
          >
            <ChevronLeftIcon />
            <span>Quay lại</span>
          </button>
        </div>
        {id}
      </div>
    </div>
  );
};

export default ValidInformation;
