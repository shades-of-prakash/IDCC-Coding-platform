import "./Upload.css"
import csvIcon from "../../assets/csv_icon.svg"
import { useState } from "react";
import Papa from 'papaparse';
import CsvUploader from "./CsvUploader";
const FileUpload=()=>{
  const [show,setShow]=useState(false);
  function showUploadComponent(){
    setShow((prev)=>!prev)
  }
    return <div className="file_upload">
        <div className="file_upload_des df df_jc_space df_ai_center">
            <div className="des"><p>Create Contest</p><span>upload csv files to create new contest</span></div>
            <button className="upload_button dfc" onClick={showUploadComponent}>Create contest</button>
            {show && <CsvUploader/>}
        </div>
        <CsvUploader/> 
    </div>
}
export default FileUpload