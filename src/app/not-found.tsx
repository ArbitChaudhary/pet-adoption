import dogGif from "@/assets/dog.gif";
import Image from "next/image";
import Link from "next/link";

function NotFound() {
  return (
    <div className="w-full h-screen">
      <div className="flex justify-center items-center h-full flex-col gap-4">
        <Image src={dogGif} alt="Not Found" height={300} width={300} />
        <h1 className="text-2xl font-bold">Oops! Page Not Found</h1>
        <Link href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
export default NotFound;
