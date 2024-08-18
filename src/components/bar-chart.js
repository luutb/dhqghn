import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Container, Typography } from '@mui/material';

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const BarChartComponent = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Số lượng sinh viên đạt',
        data: data.datasets.map(item => item.passed),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Số lượng sinh viên không đạt',
        data: data.datasets.map(item => item.failed),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container maxWidth="lg" className="my-8">
      {/* <Typography variant="h4" component="h1" gutterBottom>
        Thống kê số lượng sinh viên đạt và không đạt
      </Typography> */}
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Biểu đồ số lượng sinh viên đạt và không đạt',
            },
          },
        }}
      />
    </Container>
  );
};

export default BarChartComponent;
