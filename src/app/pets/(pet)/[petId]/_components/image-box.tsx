import { Badge, Heart } from "lucide-react";
import Image from "next/image";

interface ImageBoxProps {
  imageUrl: string;
  category: string;
}

const ImageBox = ({ imageUrl, category }: ImageBoxProps) => {
  return (
    <div className="flex justify-center">
      <div className="relative lg:sticky lg:top-20 h-[300px] w-[300px] lg:h-[500px] lg:w-[400px] rounded-3xl overflow-hidden shadow-card">
        <Image
          src={imageUrl}
          alt={category}
          fill
          className="w-full h-full object-cover relative"
        />
        <button className="absolute top-4 right-4 h-12 w-12 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-primary hover:text-primary-foreground shadow-soft">
          <Heart className="h-6 w-6" />
        </button>
        <Badge
          //   variant="secondary"
          className={`absolute top-4 left-4  border font-medium capitalize text-sm px-4 py-1`}
        >
          {category}
        </Badge>
      </div>
    </div>
  );
};

export default ImageBox;
