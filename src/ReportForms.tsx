import { Card } from '@mui/material';
import { RouteComponentProps } from '@reach/router';
import Navbar from './component/navbar';
import { useState } from 'react';
import axios from 'axios';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { ToastContainer, toast } from 'react-toastify';

const reportForms: React.FC<RouteComponentProps> = () => {  
    const [formData, setFormData] = useState({
        Name: "",
        description: "",
        location: "",
        mobileNumber:"",
        latitude:"12",
        longitude:"13",
        Traffic:"",
        severity:""
      });
      const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
      }
      async function fetchGeminiResponse(query:any) {
        const API_KEY ='AIzaSyDWcqEyX-qj0X5_2Gw-LcHKWzrW8wfknmk';
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
      
        try {
          const response = await fetch(API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [{ text: "give only the coordinates of the place as an array, not any other info,only coords separated by commas,please no other texts consider request  "+`${query}` }],
                },
              ],
            }),
          });
          if (!response.ok) {
            throw new Error(`API Error: ${response.status} - ${response.statusText}`);
          }
      
          const data = await response.json();
          console.log("Gemini API Response:", data);

          console.log(data.candidates?.[0]?.content?.parts?.[0]?.text )
          const myCoordinates=(data.candidates?.[0]?.content?.parts?.[0]?.text )
          console.log(myCoordinates)
          const coords=myCoordinates.split(",");
          sendData(coords[0],coords[1])
          return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
        } catch (error) {
          console.error("Error fetching Gemini response:", error);
          return "An error occurred while fetching the response.";
        }
      }
      

      async function sendData(lat:any,long:any) {
        try{
          const updatedData = {
            ...formData,
            latitude: lat,
            longitude: long
        };
        const potHoleData=await axios.post(" http://localhost:5500/potHole/sendDetails",updatedData)
        setFormData({
            Name: "",
            description: "",
            location: "",
            mobileNumber: "",
            latitude:"",
            longitude:"",
            Traffic: "",
            severity: "",
          });
        if(potHoleData)
        {
            toast.success("Data has been sent successfully")
            console.log("Data has been sent to the backend successfully!")
        }
    }
    catch(error)
    {
        toast.error("Unable to send the data,due to some issues!")
        alert(error)
    }
  
      
      }
    return(
        <>
        <div style={{display:'flex',flexDirection:'column'}}>
        <Navbar/>
        </div>

        <Card
  style={{
    maxWidth: '600px',
    background: '#ffffff',
    padding: '30px',
    margin: '100px auto',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    border: '1px solid #ccc',
  }}
>
  <form>
    <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#1976D2' }}>
      Report a Pothole by filling this form.
    </h2>

    {/* Input field */}
    {[
      { label: 'Your Name', name: 'Name' },
      { label: 'Pothole Description', name: 'description' },
      {
        label: 'Pothole Location (street or road name)',
        name: 'location',
      },
      { label: 'Mobile Number', name: 'mobileNumber' },
    ].map((field, index) => (
      <div style={{ marginBottom: '20px' }} key={index}>
        <label
          style={{
            display: 'block',
            fontWeight: 'bold',
            marginBottom: '8px',
            fontSize: '16px',
            color: '#333',
          }}
        >
          {field.label}
        </label>
        <input
          type="text"
          name={field.name}
          value={(formData as any)[field.name]}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '15px',
            outline: 'none',
          }}
        />
      </div>
    ))}

    {/* Select Inputs */}
    {[
      { label: 'Traffic caused due to Pothole', name: 'Traffic' },
      { label: 'Severity of the Pothole', name: 'severity' },
    ].map((field, index) => (
      <div style={{ marginBottom: '20px' }} key={index}>
        <label
          style={{
            display: 'block',
            fontWeight: 'bold',
            marginBottom: '8px',
            fontSize: '16px',
            color: '#333',
          }}
        >
          {field.label}
        </label>
        <Select
          name={field.name}
          value={(formData as any)[field.name]}
          onChange={handleChange}
          displayEmpty
          style={{
            width: '100%',
            backgroundColor: '#fafafa',
            borderRadius: '6px',
            padding: '10px',
            border: '1px solid #ccc',
            fontSize: '15px',
          }}
        >
          <MenuItem value="">Select</MenuItem>
          <MenuItem value="high">High</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="low">Low</MenuItem>
        </Select>
      </div>
    ))}

    {/* Submit Button */}
    <button
      onClick={(event) => {
        event.preventDefault();
        fetchGeminiResponse(formData.location);
      }}
      style={{
        width: '100%',
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '12px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        marginTop: '10px',
      }}
    >
      Submit
    </button>

    <ToastContainer />
  </form>
</Card>

        </>
    )
}
export default reportForms

