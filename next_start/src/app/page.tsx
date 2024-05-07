import CenterStyle from "@/components/CenterStyle";
import HomeImg from "/public/home.jpg";

export default function Home() {
  return (
    <>
      <CenterStyle title="Home Page" imgSrc={HomeImg} imgAlt="Home Image" />
    </>
  );
}
