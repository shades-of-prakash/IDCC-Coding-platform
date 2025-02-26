import { useState } from "react";
const CsvUploader=()=>{
    const [parsedData, setParsedData] = useState([]);
    const [error, setError] = useState(null);
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        Papa.parse(file, {
          complete: function(results) {
              console.log(results.data)
            setParsedData(results.data);
            setError(null);
            console.log("Parsed CSV data:", results.data);
          },
          header: true,
          skipEmptyLines: true,
          error: function(error) {
            setError("Error parsing CSV file: " + error.message);
            setParsedData([]);
            console.error("Error parsing CSV:", error);
          }
        });
      }
    };
    return <div className="file_upload_main dfc">
    <div className="upload">
            <label  htmlFor="csv_file_upload" className="dfc df_fd_c">
                <span className="catppuccin--csv"></span>
                <span>Select a CSV file to upload</span>
                <span>or drag and drop here</span>
            </label>
            <input type="file" id="csv_file_upload" accept=".csv" 
                onChange={handleFileUpload}
                className="file-input" />
    </div>
    <div className="file_list"></div>
  </div>
  }

export default CsvUploader;