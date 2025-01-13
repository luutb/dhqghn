import React, { useEffect, useState } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Container,
} from "@mui/material";
import axiosInstance from "@/axios/api-config";
import { subjects, universitys } from "@/axios/endpoints";

const FilterComponent = ({
  school,
  setSchool,
  course,
  setCourse,
  term,
  setTerm,
  onFilter,
}) => {
  const [schools, setSchools] = useState([]);
  const [_subjects, setSubjects] = useState([]);

  useEffect(() => {
    axiosInstance.get(universitys).then((response) => {
      if (response && response.data && response.data.data) {
        setSchools([...response.data.data]);
      }
    });
  }, []);
  useEffect(() => {
    axiosInstance.get(subjects).then((response) => {
      if (response && response.data && response.data.data) {
        setSubjects([...response.data.data]);
      }
    });
  }, []);
  return (
    <Container maxWidth="lg" className="my-8">
      <Typography variant="h5" component="h2" gutterBottom>
        Bộ lọc dữ liệu
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={8} md={4}>
          <FormControl fullWidth>
            <InputLabel id="school-label">Trường</InputLabel>
            <Select
              labelId="school-label"
              id="school"
              value={school}
              label="Trường"
              onChange={(e) => setSchool(e.target.value)}
            >
              <MenuItem value="">Tất cả</MenuItem>
              {schools.map((m, index) => {
                return (
                  <MenuItem key={index} value={m}>
                    {m.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={8} md={4}>
          <FormControl fullWidth>
            <InputLabel id="course-label">Môn học</InputLabel>
            <Select
              labelId="course-label"
              id="course"
              value={course}
              label="Môn học"
              onChange={(e) => setCourse(e.target.value)}
            >
              <MenuItem value="">Tất cả</MenuItem>
              {_subjects.map((m, index) => (
                <MenuItem key={index} value={m}>
                  {m.nameSubject}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={8} md={4}>
          <FormControl fullWidth>
            <InputLabel id="term-label">Khóa học</InputLabel>
            <Select
              labelId="term-label"
              id="term"
              value={term}
              label="Khóa học"
              onChange={(e) => setTerm(e.target.value)}
            >
              <MenuItem value="">Tất cả</MenuItem>
              <MenuItem value="term1">Khóa 1</MenuItem>
              <MenuItem value="term2">Khóa 2</MenuItem>
              <MenuItem value="term3">Khóa 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={8} md={4}>
          <Button variant="contained" color="primary" onClick={onFilter}>
            Lọc
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FilterComponent;
