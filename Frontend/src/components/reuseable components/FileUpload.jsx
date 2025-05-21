import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./FileUpload.css";

const FileUpload = ({ eventBanner }) => {
  const [upimg, setupimg] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (file) => {
    if (!file) {
      return;
    }
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "EventBanners");
    data.append("cloud_name", "dxtg6bwyq");
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dxtg6bwyq/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const uploadedImgUrl = await response.json();
    console.log("cloudinary res: ", uploadedImgUrl.url);
    setIsLoading(false);
    eventBanner(uploadedImgUrl.url);
  };

  const onDrop = useCallback((acceptedFiles) => {
    setIsLoading(true);
    handleFileUpload(acceptedFiles[0]);
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      setupimg(URL.createObjectURL(file));
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const binaryStr = reader.result;
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="fileInput">
      <input {...getInputProps()} />

      {upimg ? (
        <div className="uploadedimgdiv">
          {isLoading && <div className="uploadedLoading">Loading...</div>}
          <img src={upimg} alt="uploaded img" className="uploadedimg" />
        </div>
      ) : (
        <div className="fileInputDiv">
          <img
            src="/assets/icons/upload.svg"
            width={77}
            height={77}
            alt="file upload icon"
          />
          <h3 style={{ margin: "0px" }}>Drag photo here</h3>
          <p style={{ margin: "0px" }}>SVG, PNG, JPG</p>
          <button type="button" className="btn fileUploadbtn">
            Select from computer
          </button>
          {isDragActive ? (
            <p style={{ margin: "0px" }}>Drop files here ...</p>
          ) : (
            <p style={{ margin: "0px" }}>Drop files here!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
