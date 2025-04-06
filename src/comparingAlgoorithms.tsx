import React, { useEffect, useState } from 'react';
import {
  BarChart, PieChart, LineChart, ScatterChart,
} from '@mui/x-charts';
import {
  Card, Select, MenuItem, Checkbox, ListItemText,
  FormControl, InputLabel,
} from '@mui/material';
import { RouteComponentProps } from '@reach/router';
import axios from 'axios';
import Navbar from './component/navbar';

const algorithms = [
    "CNN",
    "YOLO",
    "R-CNN",
    "SVM",
    "KNN",
    "RF",
    "MNet",
    "UNet",
    "Aen",
    "LSTM"
  ];  
const ChartsOverviewDemo: React.FC<RouteComponentProps> = () => {
  const [rocData, setRocData] = useState<{ values: number[]; labels: string[] }>({ values: [], labels: [] });
  const [selectedMetric, setSelectedMetric] = useState('accuracy');
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<string[]>(["CNN", "YOLO"]);


  const handleMetricChange = (event: any) => {
    setSelectedMetric(event.target.value);
  };

  const handleAlgorithmsChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setSelectedAlgorithms(typeof value === 'string' ? value.split(',') : value);
  };

  useEffect(() => {
    const fetchMetrics = async () => {
      if (selectedAlgorithms.length === 0) return;

      try {
        const API_KEY ='AIzaSyDWcqEyX-qj0X5_2Gw-LcHKWzrW8wfknmk';
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

        const prompt = `
          Generate realistic ${selectedMetric.toUpperCase()} values between 0.1 and 1 for these pothole detection algorithms: 
          [${selectedAlgorithms.join(", ")}]. 
          Return only a JSON array of numbers in the same order as the algorithms.
        `;

        const response = await axios.post(API_URL, {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        });
        console.log(response.data)

        const outputText = response.data.candidates[0]?.content?.parts[0]?.text;

        const match = outputText?.match(/\[([^\]]+)\]/);
        const valuesArray = match
          ? match[1].split(',').map((v: string) => parseFloat(v.trim()))
          : [];

        setRocData({
          labels: selectedAlgorithms,
          values: valuesArray,
        });
      } catch (error) {
        console.error("Error generating with Gemini:", error);
      }
    };

    fetchMetrics();
  }, [selectedAlgorithms, selectedMetric]); // refetch on metric or algo change

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <FormControl sx={{ m: 1, width: 290, marginLeft: '1%', marginTop: '62px', position: 'absolute' }}>
  
          <Select style={{ height: '50px', marginTop: '4%' }}
            labelId="metric-select-label"
            value={selectedMetric}
            onChange={handleMetricChange} 
          >
            <MenuItem value="accuracy">ACCURACY</MenuItem>
            <MenuItem value="precision">PRECISION</MenuItem>
            <MenuItem value="recall">RECALL</MenuItem>
            <MenuItem value="f1">F1-SCORE</MenuItem>
            <MenuItem value="roc">ROC-AUC</MenuItem>
            <MenuItem value="mse">MEAN-SQUARED-ERROR (MSE)</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, width: 290, marginLeft: '78%', marginTop: '62px', position: 'absolute' }}>
      
          <Select style={{ height: '50px', marginTop: '2%' }}
            labelId="algorithm-select-label"
            multiple
            value={selectedAlgorithms}
            onChange={handleAlgorithmsChange}
            renderValue={(selected) => selected.join(', ')}
          >
            {algorithms.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={selectedAlgorithms.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* CHARTS */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '120px' }}>
        {rocData.values.length > 0 && (
          <>
            <ChartCard title="Bar Chart">
              <BarChart tooltip={{trigger:'axis'}}
                xAxis={[{ scaleType: 'band', data: rocData.labels}]}
                series={[{ data: rocData.values }]}
                height={300}
                width={400}
              />
            </ChartCard>

            <ChartCard title="Line Chart">
              <LineChart
                xAxis={[{ scaleType: 'band', data: rocData.labels}]}
                series={[{ data: rocData.values }]}
                height={300}
                width={400}
              />
            </ChartCard>
            <ChartCard title="Pie Chart">
              <PieChart
                series={[
                  {

                    data: rocData.values.map((value, index) => ({
                      id: index,
                      value,
                    })),
                  },
                ]}
                width={400}
                height={300}
              />
            </ChartCard>

            <ChartCard title="Scatter Chart">
              <ScatterChart
                series={[
                  {
                    label: selectedMetric.toUpperCase(),
                    data: rocData.values.map((y, i) => ({ id: i, x: i + 1, y })),
                  },
                ]}
                xAxis={[{ label: 'Model', min: 0, max: 10 }]}
                yAxis={[{ label: selectedMetric.toUpperCase(), min: 0, max: 1 }]}
                height={300}
                width={400}
              />
            </ChartCard>

            <ChartCard title="Area Chart">
              <LineChart 
                series={[{ data: rocData.values, area: true }]}
                xAxis={[{ scaleType: 'band', data: rocData.labels}]}
                height={300}
                width={400}
              />
            </ChartCard>

            <ChartCard title="Radar Style Chart">
              <LineChart
                series={[{ data: [...rocData.values, rocData.values[0]], connectNulls: true }]}
                xAxis={[{ data: [...rocData.labels, rocData.labels[0]], scaleType: 'band' }]}
                height={300}
                width={400}
                sx={{ '& path': { strokeDasharray: '4,4' } }}
              />
            </ChartCard>
          </>
        )}
      </div>
    </>
  );
};
const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <Card style={{ margin: 20, padding: 10, boxShadow: '3px 3px 6px #ccc' }}>
    <h4 style={{ textAlign: 'center' }}>{title}</h4>
    {children}
  </Card>
);

export default ChartsOverviewDemo;
