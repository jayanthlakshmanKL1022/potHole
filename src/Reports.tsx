import React, { useState, useEffect } from "react";
import axios from "axios";
import { RouteComponentProps } from "@reach/router";
import Navbar from "./component/navbar";

const Reports: React.FC<RouteComponentProps> = () => {
  var borderStyle={border:'1px solid black',  textAlign: 'center' as 'center'}
  var headerStyle={border:'1px solid black',  textAlign: 'center' as 'center',color:'white',background:'green',height:'40px'}
    const [details, setDetails] = useState<any[]>([]);
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const reportDetails = await axios.get("http://localhost:5500/pothole/getDetails");
                console.log("Fetched Data:", reportDetails.data);
                setDetails(reportDetails.data); 
            } catch (error) {
                console.error("Error fetching data:", error);
                alert("Failed to fetch data");
            }
        };
        fetchDetails();
    }, []);

    return (
      <div style={{display:'flex',flexDirection:'row'}}>
        <Navbar/>
        <table style={{border:'1px solid black',marginLeft:'18%',width:'70%',height:'600px',borderCollapse:'collapse',marginTop:'5%',zIndex:'1'}}>
        <thead>
        <tr>
          <th style={headerStyle}>Name</th>
          <th style={headerStyle}>Latitude</th>
          <th style={headerStyle}>Longitude</th>
          <th style={headerStyle}>Description</th>
          <th style={headerStyle}>Location</th>
          <th style={headerStyle}>Mobile Number</th>
          <th style={headerStyle}>Traffic</th>
          <th style={headerStyle}>Severity</th>
        </tr>
      </thead>
      <tbody>
        {details.map((reports, index) => (
          <tr key={index}>
            <td style={borderStyle}>{reports.Name}</td>
            <td style={borderStyle}>{reports.latitude}</td>
            <td style={borderStyle}>{reports.longitude}</td>
            <td style={borderStyle}>{reports.description}</td>
            <td style={borderStyle}>{reports.location}</td>
            <td style={borderStyle}>{reports.mobileNumber}</td>
            <td style={borderStyle}>{reports.Traffic}</td>
            <td style={borderStyle}>{reports.severity}</td>
          </tr>
          ))}
        </tbody>
        </table>
       </div>

    );
};

export default Reports;
