import React, { useState, FC } from 'react';

interface FileUploadProps {

}

const FileUpload: FC<FileUploadProps> = (props) => {

  function clickHandler() {
    console.log("click");
  }
  
   return (
    <div>
      <button type="button" className="button" onClick={() => clickHandler()}>Upload</button>
    </div>
  );
}

export default FileUpload;