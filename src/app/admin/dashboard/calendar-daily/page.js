
"use client"
import React from 'react';
import Calendar from '../../../../components/calender-daily';
import { Container, Typography } from '@mui/material';

const HomePage = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Calendar with Event Details
      </Typography>
      <Calendar />
    </Container>
  );
};

export default HomePage;
