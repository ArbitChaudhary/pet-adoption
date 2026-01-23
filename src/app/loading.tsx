import Image from "next/image";
import loaderGif from "@/assets/mouse-running.gif";

function Loading() {
  return (
    <div className="absolute top-0 right-0 left-0 bottom-0 w-full h-full z-10 flex justify-center items-center bg-black/50">
      <Image src={loaderGif} alt="Loading..." className="w-32 h-32" />
    </div>
  );
}

export default Loading;
