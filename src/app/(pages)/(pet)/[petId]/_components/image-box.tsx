import { Badge, Heart } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface ImageBoxProps {
  imageUrl: StaticImageData;
  category: string;
}

const ImageBox = ({ imageUrl, category }: ImageBoxProps) => {
  return (
    <div className="relative">
      <div className="aspect-square rounded-3xl overflow-hidden shadow-card">
        <Image
          src={imageUrl}
          alt={category}
          className="w-full h-full object-cover"
        />
      </div>
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
  );
};

export default ImageBox;
