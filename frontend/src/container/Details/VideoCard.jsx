import React, { useRef, useState } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button/Button";
import { UploadIcon } from "../../assets/icons";
import ReactPlayer from "react-player";
import Spinner from "../../components/Spinner";

const VideoPlayer = ({ file, onUpload }) => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadInput = useRef();

  const handleUploadClick = () => {
    uploadInput.current.click();
  };

  const handleUpload = (e) => {
    setIsLoading(true);
    setTimeout(() => {
      onUpload(e.target.files[0]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      {!file && (
        <div className="h-72 border border-dashed border-[#D0D5DD] rounded-lg bg-[#FBFBFB] flex items-center justify-center">
          <input
            ref={uploadInput}
            type="file"
            className="hidden"
            accept="video/*"
            onChange={handleUpload}
          />
          <Button
            className="px-4"
            icon={
              isLoading ? (
                <Spinner className="size-4 text-white" />
              ) : (
                <UploadIcon />
              )
            }
            color="secondary"
            onClick={handleUploadClick}
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Upload video"}
          </Button>
        </div>
      )}
      {file && (
        <ReactPlayer
          controls={true}
          width="100%"
          height="400px"
          pip={false}
          playbackRate={1}
          playing={true}
          // onPlay={}
          url={file}
          style={{
            borderRadius: "8px",
            overflow: "hidden",
          }}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
              },
            },
          }}
        />
      )}
    </>
  );
};

export default VideoPlayer;
