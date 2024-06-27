import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

interface DataPoint {
  timestamp: string;
  value: number;
}

const ChartComponent: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);
  const [timeframe, setTimeframe] = useState('daily');
  const [filteredData, setFilteredData] = useState<DataPoint[]>([]);

  useEffect(() => {
    fetch('/data.json')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  useEffect(() => {
    const filterData = () => {
      // Example filtering logic based on timeframe
      if (timeframe === 'daily') {
        return data;
      } else if (timeframe === 'weekly') {
        // Implement weekly filtering logic here
        return data;
      } else if (timeframe === 'monthly') {
        // Implement monthly filtering logic here
        return data;
      }
      return data;
    };
    setFilteredData(filterData());
  }, [data, timeframe]);

  const handleClick = (dataPoint: DataPoint) => {
    alert(`Timestamp: ${dataPoint.timestamp}, Value: ${dataPoint.value}`);
  };

  const exportChart = () => {
    html2canvas(document.querySelector('#chart')!).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'chart.png';
      link.click();
    });
  };

  return (
    <div>
      <div>
        <button onClick={() => setTimeframe('daily')}>Daily</button>
        <button onClick={() => setTimeframe('weekly')}>Weekly</button>
        <button onClick={() => setTimeframe('monthly')}>Monthly</button>
        <button onClick={exportChart}>Export as PNG</button>
      </div>
      <div id="chart">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={filteredData}
            onClick={(e) => {
              if (e && e.activePayload && e.activePayload.length) {
                handleClick(e.activePayload[0].payload as DataPoint);
              }
            }}
          >
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartComponent;