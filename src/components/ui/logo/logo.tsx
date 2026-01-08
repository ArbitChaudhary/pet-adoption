import logo from "@/assets/logo.png";

interface LogoProps {
  height?: number;
  width?: number;
}

export default function Logo({ height = 80, width = 100 }: LogoProps) {
  return (
    <img
      src={logo}
      alt=""
      style={{
        height: `${height}px`,
        width: `${width}px`,
      }}
    />
  );
}
