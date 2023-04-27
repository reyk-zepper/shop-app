import { Carousel } from "react-bootstrap";
import Image from "next/image";

export default function Slider() {
  return (
    <div className="text-center">
      <Carousel controls={false} fade={true} interval={2500}>
        <Carousel.Item>
          <Image
            className="d-block w-50 h-50 rounded-3"
            src="/pictures/products/candyGrabber.jpg"
            alt="Candy Grabber"
            width={3000}
            height={1000}
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="d-block w-50 h-50 rounded-3"
            src="/pictures/products/hoptimistChrome.jpg"
            alt="chrome Hoptimist"
            width={3000}
            height={1000}
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="d-block w-50 h-50 rounded-3"
            src="/pictures/products/robo.jpg"
            alt="Picture of a robot"
            width={3000}
            height={1000}
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
