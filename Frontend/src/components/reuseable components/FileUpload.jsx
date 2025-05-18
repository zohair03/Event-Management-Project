import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = () => {
  const [upimg, setupimg] = useState();

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        const binaryStr = reader.result
        setupimg(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })
    
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="fileInput">
      <input {...getInputProps()} />
      <div className="fileInputDiv">
        <img src={upimg} alt="uploaded img" />
        <img
          src="/assets/icons/upload.svg"
          width={77}
          height={77}
          alt="file upload icon"
        />
        <h3 style={{ margin: "0px" }}>Drag photo here</h3>
        <p style={{ margin: "0px" }}>SVG, PNG, JPG</p>
        <button type="button" className="btn">Select from computer</button>
        {isDragActive ? (
          <p style={{ margin: "0px" }}>Drop files here ...</p>
        ) : (
          <p style={{ margin: "0px" }}>Drop files here!</p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;