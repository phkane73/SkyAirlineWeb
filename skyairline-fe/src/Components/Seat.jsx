import { useDispatch, useSelector } from "react-redux";
import { bookingSeat, cancelSeat } from "../Services/SeatServices";
import { getInfo } from "../Services/UserServices";
import { useEffect, useState } from "react";
import { setSeat, removeSeat } from "../Redux/reducers/SessionReducer";
function Seat(props) {
  const token = useSelector((state) => state.Auth.token);
  const s = useSelector((state) => state.Session.seat);
  const ticketClass = useSelector((state) => state.Session.ticketClass);
  const [idUser, setIdUser] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const id = await getInfo(token);
      setIdUser(id.id);
    }
    fetchData();
  }, [token]);
  let seat;
  switch (props.status) {
    case "BOOKED":
      seat = (
        <img className="w-[35px]" src="/Assets/images/seat/booked.svg" alt="" />
      );
      break;
    case "BOOKING":
      if (props.idUser === idUser) {
        seat = (
          <img
            className="w-[35px]"
            src="/Assets/images/seat/bookingDisplayUser.svg"
            alt=""
          />
        );
      } else {
        if (ticketClass.className === props.class) {
          seat = (
            <img
              className="w-[35px]"
              src="/Assets/images/seat/bookingDisplayOther.svg"
              alt=""
            />
          );
        } else {
          seat = (
            <img
              className="w-[35px]"
              src="/Assets/images/seat/booked.svg"
              alt=""
            />
          );
        }
      }
      break;
    case "AVAILABLE":
      if (props.class) {
        switch (props.class) {
          case "BUSINESS":
            if (ticketClass.className === "BUSINESS") {
              seat = (
                <img
                  className="w-[35px]"
                  src="/Assets/images/seat/business.svg"
                  alt=""
                />
              );
            } else {
              seat = (
                <img
                  className="w-[35px]"
                  src="/Assets/images/seat/booked.svg"
                  alt=""
                />
              );
            }
            break;
          case "DELUXE":
            if (ticketClass.className === "DELUXE") {
              seat = (
                <img
                  className="w-[35px]"
                  src="/Assets/images/seat/deluxe.svg"
                  alt=""
                />
              );
            } else {
              seat = (
                <img
                  className="w-[35px]"
                  src="/Assets/images/seat/booked.svg"
                  alt=""
                />
              );
            }
            break;
          case "CLASSIC":
            if (ticketClass.className === "CLASSIC") {
              seat = (
                <img
                  className="w-[35px]"
                  src="/Assets/images/seat/classic.svg"
                  alt=""
                />
              );
            } else {
              seat = (
                <img
                  className="w-[35px]"
                  src="/Assets/images/seat/booked.svg"
                  alt=""
                />
              );
            }
            break;
          default:
            seat = (
              <img
                className="w-[35px]"
                src="/Assets/images/seat/classic.svg"
                alt=""
              />
            );
        }
      }
      break;

    default:
      seat = (
        <img className="w-[35px]" src="/Assets/images/seat/booked.svg" alt="" />
      );
  }
  const SeatBooked = function () {
    if (props.status === "AVAILABLE" && ticketClass.className === props.class) {
      if (Object.keys(s).length === 0) {
        bookingSeat(props.id, props.idSchedule, token);
        dispatch(
          setSeat({
            seatCode: props.code,
            seatId: props.id,
          })
        );
      } else {
        alert("Bạn chỉ có thể đặt 1 ghế!");
      }
    }
    if (props.status === "BOOKING" && ticketClass.className === props.class) {
      cancelSeat(props.id, props.idSchedule, token);
      dispatch(removeSeat(token));
    }
  };
  return (
    <div>
      <button className="seat bg-white border-none" onClick={SeatBooked}>
        {seat}
      </button>
    </div>
  );
}

export default Seat;
