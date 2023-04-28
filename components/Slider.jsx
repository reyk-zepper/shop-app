import { Carousel } from "react-bootstrap";
import Image from "next/image";

export default function Slider() {
  return (
    <div className="text-center">
      <Carousel controls={false} fade={true} interval={2500}>
        <Carousel.Item>
          <Image
            className="d-block w-50 h-50 rounded-3"
            src="/images/carousel/future-productsglasses.jpg"
            alt="Fidget"
            width={3000}
            height={1000}
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="d-block w-50 h-50 rounded-3"
            src="/images/carousel/future-products.jpg"
            alt="robots"
            width={3000}
            height={1000}
          />
        </Carousel.Item>
        {/* <Carousel.Item>
          <Image
            className="d-block w-50 h-50 rounded-3"
            src="/images/products/robo.jpg"
            alt="Picture of a robot"
            width={3000}
            height={1000}
          />
        </Carousel.Item> */}
      </Carousel>
    </div>
  );
}
