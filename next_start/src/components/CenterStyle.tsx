import Image, { StaticImageData } from "next/image";

interface CenterStyle {
  title: string;
  imgSrc: StaticImageData;
  imgAlt: string;
}

export default function CenterStyle(props: CenterStyle) {
  return (
    <section className=" text-center mt-40">
      <h1 className="text-2xl font-bold">{props.title.toUpperCase()}</h1>
      <p className=" text-sm font-medium text-gray-500 tracking-wider max-w-4xl mx-auto my-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum suscipit
        architecto nisi numquam, est, porro ad quibusdam enim tempore eius
        soluta unde rem ipsum, consequuntur reiciendis sit aperiam facere.
        Eveniet.
      </p>
      <Image
        src={props.imgSrc}
        alt={props.imgAlt}
        width={400}
        height={300}
        className="mx-auto mb-4"
      />
      <button className=" text-lg font-medium bg-black p-2 rounded text-white active:scale-95 duration-200">
        Learn More ...
      </button>
    </section>
  );
}
