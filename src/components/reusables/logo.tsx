import { Heart } from "lucide-react";

interface LogoProps {
  height?: number;
  width?: number;
  className?: string;
}

export default function Logo({ height, width, className }: LogoProps) {
  return (
    <div className="flex items-center gap-2 transition-transform hover:scale-105">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-warm">
        <Heart className="h-5 w-5 text-primary-foreground" />
      </div>
      <span
        className="text-xl font-bold text-foreground"
        style={{ fontFamily: "Fredoka, sans-serif" }}
      >
        PawsHome
      </span>
    </div>
  );
}
