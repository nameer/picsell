import React, { useRef } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button/Button";
import { UploadIcon } from "../../assets/icons";
import ReactPlayer from "react-player";

const VideoPlayer = ({ file, onUpload }) => {
  const uploadInput = useRef();

  const handleUploadClick = () => {
    uploadInput.current.click();
  };

  const handleUpload = (e) => {
    onUpload(e.target.files[0]);
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
            icon={<UploadIcon />}
            color="secondary"
            onClick={handleUploadClick}
          >
            Upload video
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