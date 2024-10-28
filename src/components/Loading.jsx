import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../assets/animations/animation_loading.json";

const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Player
        autoplay={true}
        loop={true}
        src={animationData}
        // style={{ height: '200px', width: '200px' }}
        rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
        className="h-full w-full overflow-x-clip"
      ></Player>
    </div>
  );
};

export default Loading;
