import { bookingSeat, cancelSeat } from "../Services/SeatServices";

function Seat(props) {
  let seat;
  switch (props.status) {
    case "BOOKING":
      seat = (
        <img
          className="w-[35px]"
          src="/Assets/images/seat/bookingDisplayOther.svg"
          alt=""
        />
      );
      break;
    case "AVAILABLE":
      if (props.class) {
        switch (props.class) {
          case "BUSINESS":
            seat = (
              <img
                className="w-[35px]"
                src="/Assets/images/seat/business.svg"
                alt=""
              />
            );
            break;
          case "DELUXE":
            seat = (
              <img
                className="w-[35px]"
                src="/Assets/images/seat/deluxe.svg"
                alt=""
              />
            );
            break;
          case "CLASSIC":
            seat = (
              <img
                className="w-[35px]"
                src="/Assets/images/seat/classic.svg"
                alt=""
              />
            );
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
        <img
          className="w-[35px]"
          src="/Assets/images/seat/classic.svg"
          alt=""
        />
      );
  }
  const SeatBooked = function () {
    if (props.status === "AVAILABLE") {
      bookingSeat(props.id, props.idSchedule);
    } else {
      cancelSeat(props.id, props.idSchedule);
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
