import React, { useState } from "react";
import { RouteComponentProps } from "@reach/router";
import { BarChart } from "@mui/x-charts/BarChart";
import { Select, MenuItem, FormControl,  Box, Typography, Paper } from "@mui/material";
import Navbar from "./component/navbar";
import './Home.css';

const stats = [
  { name: "Potholes Detected", value: 5324 },
  { name: "Cities Covered", value: 78 },
  { name: "Detection Accuracy", value: "94.2%" },
  { name: "Live Reports", value: 1231 },
];

const features = [
  { icon: "📷", title: "Real-time Detection", description: "AI detects potholes using dashcams, drones, or mobile footage." },
  { icon: "📍", title: "Geo Mapping", description: "Each pothole is geo-tagged and plotted on an interactive map." },
  { icon: "🧠", title: "AI Analytics", description: "View model performance metrics and detection confidence." },
  { icon: "📱", title: "Mobile Ready", description: "Access the app and upload reports via your phone." },
];

const accidentData = {
  2020: [3200, 2800, 3000, 3500],
  2021: [3100, 2700, 2900, 3400],
  2022: [3000, 2600, 2800, 3300],
  2023: [2900, 2500, 2700, 3200],
  2024: [2800, 2400, 2600, 3100],
};

const Home: React.FC<RouteComponentProps> = () => {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const labels = ["Urban", "Rural", "Highways", "Others"];

  return (
    <div style={{ margin: 0, padding: 0, boxSizing: "border-box", width: "100vw", overflowX: "hidden" }}>
      <Navbar />
      <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#111", color: "white", margin: 0, padding: 0 }}>

        {/* Hero Section */}
        <section style={{ textAlign: "center", padding: "80px 20px", background: "linear-gradient(to bottom, #1f2937, #111)" }}>
          <h1 style={{ fontSize: "52px", fontWeight: "bold", marginBottom: "20px", color: "#4ade80" }}>Safer Roads, Smarter Cities</h1>
          <p style={{ fontSize: "20px", maxWidth: "700px", margin: "0 auto", color: "#ddd" }}>
            Real-time pothole detection and analytics powered by AI and Computer Vision. Empowering cities to fix roads before accidents happen.
          </p>
        </section>

        {/* Stats Section */}
        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px", textAlign: "center", padding: "60px 20px" }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ backgroundColor: "#222", padding: "20px", borderRadius: "12px", boxShadow: "0 0 15px rgba(0,0,0,0.5)" }}>
              <h3 style={{ fontSize: "28px", fontWeight: "bold", color: "#4ade80" }}>{stat.value}</h3>
              <p style={{ color: "#aaa" }}>{stat.name}</p>
            </div>
          ))}
        </section>

        {/* Features */}
        <section style={{ padding: "60px 20px" }}>
          <h2 style={{ textAlign: "center", fontSize: "36px", fontWeight: "bold", marginBottom: "40px", color: "#60a5fa" }}>Core Features</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px", maxWidth: "1100px", margin: "0 auto" }}>
            {features.map(({ icon, title, description }, i) => (
              <div key={i} style={{ backgroundColor: "#1e1e1e", padding: "24px", borderRadius: "12px", display: "flex", alignItems: "flex-start", gap: "16px", border: "1px solid #333" }}>
                <span style={{ fontSize: "30px" }}>{icon}</span>
                <div>
                  <h3 style={{ fontSize: "22px", fontWeight: "600", color: "#facc15" }}>{title}</h3>
                  <p style={{ color: "#aaa", fontSize: "15px" }}>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section style={{ padding: "60px 20px", background: "#1f2937" }}>
          <h2 style={{ textAlign: "center", fontSize: "34px", fontWeight: "bold", marginBottom: "30px", color: "#38bdf8" }}>How It Works</h2>
          <ul style={{ maxWidth: "900px", margin: "0 auto", listStyle: "none", padding: 0, color: "#ddd", fontSize: "18px" }}>
            <li>🚗 Vehicles upload footage to the cloud.</li>
            <li>🧠 AI analyzes video frames to detect road anomalies.</li>
            <li>📍 Each pothole is geo-tagged with location data.</li>
            <li>📊 Results are visualized and alerts are generated.</li>
          </ul>
        </section>

        {/* Accident Graph Section */}
        <section style={{ padding: "60px 20px", backgroundColor: "#111", textAlign: "center" }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: "white" }}>
            Pothole Accidents in India by Region – {selectedYear}
          </Typography>

          <Box sx={{ maxWidth: 300, margin: "0 auto", mb: 3 }}>
            <FormControl fullWidth>

              <Select
                labelId="year-select-label"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                sx={{ color: "white", backgroundColor: "#222", borderRadius: 1 }}
              >
                {[2020, 2021, 2022, 2023, 2024].map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Paper elevation={6} sx={{ backgroundColor: "#1a1a1a", padding: 2, borderRadius: 3, maxWidth: 800, margin: "0 auto" }}>
          <BarChart 
  xAxis={[{ scaleType: 'band', data: labels, label: "Region" }]}
  series={[
    {
      data: accidentData[selectedYear],
  
    }
  ]}
  width={800}
  height={350}
  sx={{
    mx: "auto",
    backgroundColor: "#111",
    borderRadius: "8px",
    padding: 2,
    ".MuiChartsAxis-tickLabel": { fill: "#fff" },
    ".MuiChartsAxis-label": { fill: "#fff", fontWeight: "bold" },
    ".MuiChartsLegend-root": { color: "white" },
  }}
/>

          </Paper>
          <Typography variant="caption" color="#aaa">
            * Estimated pothole-related accidents by region.
          </Typography>
        </section>

        {/* Pros & Cons */}
        <section style={{ padding: "60px 20px" }}>
          <h2 style={{ textAlign: "center", fontSize: "34px", fontWeight: "bold", marginBottom: "40px", color: "#f472b6" }}>Pros & Cons</h2>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "24px" }}>
            <div style={{ backgroundColor: "#166534", padding: "20px", borderRadius: "12px", width: "300px" }}>
              <h3 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "10px", color: "#fff" }}>✅ Pros</h3>
              <ul style={{ paddingLeft: "20px", color: "#ccc" }}>
                <li>High detection accuracy</li>
                <li>Live monitoring and alerts</li>
                <li>Integrates with smart city systems</li>
                <li>Scalable and mobile-friendly</li>
              </ul>
            </div>
            <div style={{ backgroundColor: "#7f1d1d", padding: "20px", borderRadius: "12px", width: "300px" }}>
              <h3 style={{ fontSize: "22px", fontWeight: "bold", marginBottom: "10px", color: "#fff" }}>⚠️ Cons</h3>
              <ul style={{ paddingLeft: "20px", color: "#ccc" }}>
                <li>Dependent on camera quality</li>
                <li>Needs consistent data input</li>
                <li>May require training for accuracy</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section style={{ textAlign: "center", padding: "80px 20px", background: "linear-gradient(to right, #0f172a, #1e293b)" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "20px", color: "#34d399" }}>Join the Road Safety Revolution</h2>
          <p style={{ fontSize: "18px", color: "#ddd", marginBottom: "30px" }}>
            Help us make roads safer by contributing data or reporting potholes. Together, we can reduce accidents and save lives.
          </p>
          <button style={{ padding: "12px 28px", fontSize: "18px", backgroundColor: "#4ade80", border: "none", borderRadius: "8px", color: "#111", fontWeight: "bold", cursor: "pointer" }}>
            Get Started
          </button>
        </section>

        {/* Footer */}
        <footer style={{ backgroundColor: "#111", textAlign: "center", padding: "20px", color: "#aaa" }}>
          © {new Date().getFullYear()} Pothole AI. Built with React and ❤️.
        </footer>
      </div>
    </div>
  );
};

export default Home;
