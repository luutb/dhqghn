import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import BarChartComponent from "./bar-chart";
import FilterComponent from "./filter-home-component";
import axiosInstance from "@/axios/api-config";
import { liststudent, report, subjects, universitys } from "@/axios/endpoints";

// Dữ liệu mẫu
const mockData = {
  labels: [
    "Môn Điền kinh 1",
    "Môn Điền kinh 2",
    "Môn Bóng rổ 1",
    "Môn Thể chất cơ bản",
    "Môn Bóng đá 1",
    "Môn Bóng đá 2",
  ],
  datasets: [
    { subject: "Môn Điền kinh 1", passed: 30, failed: 10 },
    { subject: "Môn Điền kinh 2", passed: 20, failed: 20 },
    { subject: "Môn Bóng rổ 1", passed: 10, failed: 30 },
    { subject: "Môn Thể chất cơ bản", passed: 10, failed: 30 },
    { subject: "Môn Bóng đá 1", passed: 10, failed: 30 },
    { subject: "Môn Bóng đá 2", passed: 10, failed: 30 },
  ],
};

const StatisticsPage = () => {
  const [school, setSchool] = useState(null);
  const [course, setCourse] = useState(null);
  const [term, setTerm] = useState("");
  const [chartData, setChartData] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedCohort, setSelectedCohort] = useState(null);
  useEffect(() => {
    // Giả lập tải dữ liệu dựa trên các bộ lọc
    // Thay thế mockData bằng dữ liệu thực tế từ API
    if (school) {
      axiosInstance
        .post(report, {
          nameSchool: school.name.toUpperCase(),
        })
        .then((res) => {
          const labels = res.data.map((m) => m.codeCourse);
          setChartData({
            labels: labels,
            datasets: res.data,
          });
        });
    }
  }, [school]);

  const handleFilter = () => {
    // Thực hiện hành động lọc dữ liệu và cập nhật biểu đồ
    axiosInstance
      .post(report, {
        codeCourse: course.code,
        nameSchool: school.name.toUpperCase(),
      })
      .then((res) => {
        const labels = res.data.map((m) => m.codeCourse);
        setChartData({
          labels: labels,
          datasets: res.data,
        });
      });
  };

  return (
    <Container maxWidth="lg" className="my-8">
      <Typography variant="h4" component="h1" gutterBottom>
        Thống kê số lượng sinh viên đạt và không đạt
      </Typography>
      {/* Bộ lọc */}
      <FilterComponent
        school={school}
        setSchool={setSchool}
        course={course}
        setCourse={setCourse}
        term={term}
        setTerm={setTerm}
        onFilter={handleFilter}
      />
      {/* Hiển thị biểu đồ */}
      {chartData ? <BarChartComponent data={chartData} /> : null}
    </Container>
  );
};

export default StatisticsPage;
