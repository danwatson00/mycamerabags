import React, { FC } from 'react';
import { withFirebase } from '../Firebase';

interface FileUploadProps {
  firebase: any;
  saveImage(filePath: File): void;
}

const FileUpload: FC<FileUploadProps> = (props) => {

  function clickHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    if (e.target.files !== null) {
      props.saveImage(e.target.files[0]);
    }
  }
     
  return (
    <div>
      <form>
        <input id="image-upload" type="file" accept=".png, .jpg" onChange={(e) => clickHandler(e)}/>
      </form>
    </div>
  );
}

export default withFirebase(FileUpload);