import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
const AutoplaySlider = withAutoplay(AwesomeSlider);

function Carousel() {
  return (
    <div className="carousel h-[100px] relative">
      <AutoplaySlider
        play={true}
        cancelOnInteraction={false}
        interval={4000}
        fillParent={true}
        bullets={false}
      >
        <div data-src="/Assets/images/carousel1.jpg" />
        <div data-src="/Assets/images/carousel2.jpg" />
        <div data-src="/Assets/images/carousel3.jpg" />
        <div data-src="/Assets/images/carousel4.jpg" />
      </AutoplaySlider>
    </div>
  );
}
export default Carousel;
