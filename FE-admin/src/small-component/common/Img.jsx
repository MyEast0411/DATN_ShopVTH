import React from "react";
import { Image } from "@nextui-org/react";

export default function Img({ width, src, fallbackSrc }) {
  return (
    <Image
      width={width}
      alt="NextUI hero Image"
      fallbackSrc={fallbackSrc}
      src={src}
    />
  );
}
