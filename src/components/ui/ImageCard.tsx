/* eslint-disable @next/next/no-img-element */
import { imageDefaultUrl } from "@/utils/constants";
import React, { useState } from "react";

type ImageCardProps = {
  imageUrl: string;
  title?: string;
  isProfile?: boolean;
};

const ImageCard: React.FC<ImageCardProps> = ({
  imageUrl,
  title,
  isProfile = false,
}) => {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  return (
    <>
      {imageUrl ? (
        <img
          src={`${imageDefaultUrl}/${imageUrl}`}
          alt={title}
          onLoad={() => setIsImageLoading(false)}
          className="w-full h-full overflow-hidden object-cover object-center"
        />
      ) : (
        <div className=" w-full h-full flex justify-center items-center bg-slate-200">
          {isProfile ? (
            <svg
              width="36"
              height="36"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.754 14a2.249 2.249 0 0 1 2.25 2.249v.575c0 .894-.32 1.76-.902 2.438-1.57 1.834-3.957 2.739-7.102 2.739-3.146 0-5.532-.905-7.098-2.74a3.75 3.75 0 0 1-.898-2.435v-.577a2.249 2.249 0 0 1 2.249-2.25h11.501Zm0 1.5H6.253a.749.749 0 0 0-.75.749v.577c0 .536.192 1.054.54 1.461 1.253 1.468 3.219 2.214 5.957 2.214s4.706-.746 5.962-2.214a2.25 2.25 0 0 0 .541-1.463v-.575a.749.749 0 0 0-.749-.75ZM12 2.004a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"
                fill="#ffffff"
              />
            </svg>
          ) : (
            <svg
              width="36"
              height="36"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.75 3A3.25 3.25 0 0 1 21 6.25v11.5A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75V6.25A3.25 3.25 0 0 1 6.25 3h11.5Zm.58 16.401-5.805-5.686a.75.75 0 0 0-.966-.071l-.084.07-5.807 5.687c.182.064.378.099.582.099h11.5c.203 0 .399-.035.58-.099l-5.805-5.686L18.33 19.4ZM17.75 4.5H6.25A1.75 1.75 0 0 0 4.5 6.25v11.5c0 .208.036.408.103.594l5.823-5.701a2.25 2.25 0 0 1 3.02-.116l.128.116 5.822 5.702c.067-.186.104-.386.104-.595V6.25a1.75 1.75 0 0 0-1.75-1.75Zm-2.498 2a2.252 2.252 0 1 1 0 4.504 2.252 2.252 0 0 1 0-4.504Zm0 1.5a.752.752 0 1 0 0 1.504.752.752 0 0 0 0-1.504Z"
                fill="#ffffff"
              />
            </svg>
          )}
        </div>
      )}
      {isImageLoading && (
        <div className=" w-full h-full animate-pulse  bg-slate-200 z-20"></div>
      )}
    </>
  );
};

export default ImageCard;
