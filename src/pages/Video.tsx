import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useThrowAsyncError } from "../components/useThrowAsyncError";
import { CustomErrorName } from "../components/ErrorBoundary";
import { YoutubeIds } from "../components/data";
import { randomNumber } from "../components/utils";
import Home from "./Home";
import YouTube, {
  YouTubeEvent,
  YouTubePlayer,
  YouTubeProps,
} from "react-youtube";

const Video = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const throwError = useThrowAsyncError();
  const playerRef = useRef<YouTubePlayer | null>(null);
  const [playerWidth, setPlayerWidth] = useState(window.innerWidth);
  const [playerHeight, setPlayerHeight] = useState(window.innerHeight);
  const [isPlay, setIsPlay] = useState<boolean>(false);
  const [videoID] = useState<string>(
    YoutubeIds[randomNumber(0, YoutubeIds.length - 1)]
  );

  const opts: YouTubeProps["opts"] = {
    height: playerHeight,
    width: playerWidth,
    playerVars: {
      autoplay: 1,
      controls: 0,
      showinfo: 0,
      modestbranding: 1,
      showRelatedVideos: false,
      rel: 0,
    },
  };

  useEffect(() => {
    const handleResize = () => {
      setPlayerWidth(window.innerWidth);
      setPlayerHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // return () => {
    //   window.removeEventListener("resize", handleResize);
    // };
  }, []);

  if (!location.state) return <Home />;

  const onReady = (event: YouTubeEvent) => {
    playerRef.current = event.target;
    playerRef.current?.playVideo();
  };

  const onPlay = (event: YouTubeEvent) => {
    setIsPlay(true);
  };

  const onPause = (event: YouTubeEvent) => {
    setIsPlay(false);
  };

  const onEnd = (event: YouTubeEvent) => {
    navigate("/home");
  };

  const onError = (event: YouTubeEvent) => {
    const error = new Error(
      "An error occurred during playing video.\nPlease try again later."
    );
    error.name = CustomErrorName;
    throwError(error);
  };

  const clickHandleVideo = () => {
    isPlay ? playerRef.current?.pauseVideo() : playerRef.current?.playVideo();
  };

  return (
    <div style={{ position: "relative" }}>
      <YouTube
        videoId={videoID}
        opts={opts}
        onReady={onReady}
        onPlay={onPlay}
        onPause={onPause}
        onEnd={onEnd}
        onError={onError}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
        onClick={clickHandleVideo}
      />
    </div>
  );
};
export default Video;
