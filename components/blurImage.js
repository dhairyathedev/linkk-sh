import Image from "next/image";
import { useState } from "react";

export default function BlurImage({ src, width, height, className }) {
    const [isLoading, setLoading] = useState(true);
  
    return (
      <a className="group">
        <div className="">
          <Image
            alt=""
            src={src}   
            width={width}
            height={height}
            className={`
                duration-700 ${className}
                ${
                  isLoading
                    ? "scale-110 blur-2xl grayscale"
                    : "scale-100 blur-0 grayscale-0"
                })`}
            onLoadingComplete={() => setLoading(false)}
          />
        </div>
      </a>
    );
  }