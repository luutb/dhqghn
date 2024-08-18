import React, { useState } from 'react';
import { Container, Grid, Typography, Paper, Box, Button, Avatar, Tooltip } from '@mui/material';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, addMonths, subMonths, addYears, subYears, isToday } from 'date-fns';
import { vi } from 'date-fns/locale'; // Import Vietnamese locale
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; // Import Material-UI icon for <
import ChevronRightIcon from '@mui/icons-material/ChevronRight'; // Import Material-UI icon for >

import DoubleArrowIcon   from '@mui/icons-material/DoubleArrow'; // Import Material-UI icon for <<

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'; // Import Material-UI icon for >>
import clsx from 'clsx'; // Import clsx

const events = {
  '2024-08-18': [{ name: 'Nguyen A', img: 'https://i.pravatar.cc/150?img=1' }, { name: 'Tran B', img: 'https://i.pravatar.cc/150?img=2' }],
  '2024-08-22': [{ name: 'Le C', img: 'https://i.pravatar.cc/150?img=3' }],
  // Add more events here
};

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Calculate the start and end of the month
  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  // @ts-ignore
  const days = eachDayOfInterval({ start, end });

  // Calculate days to display including days from the previous and next month
  const startWeek = startOfWeek(start, { weekStartsOn: 0 });
  const endWeek = endOfWeek(end, { weekStartsOn: 0 });
  const allDays = eachDayOfInterval({ start: startWeek, end: endWeek });

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handlePrevYear = () => {
    setCurrentMonth(subYears(currentMonth, 1));
  };

  const handleNextYear = () => {
    setCurrentMonth(addYears(currentMonth, 1));
  };

  const getDayEvents = (day) => {
    const dayString = format(day, 'yyyy-MM-dd');
    return events[dayString] || [];
  };

  return (
    <Container className="py-4">
      <Paper elevation={3} className="p-4 mb-4 bg-white shadow-lg">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} className="flex items-center justify-between">
            <Button
              onClick={handlePrevYear}
              variant="contained"
              color="primary"
              className="p-1"
              size="small"
            >
              <DoubleArrowIcon fontSize="small" sx={{ transform: 'rotate(180deg)' }} />
            </Button>
            <Button
              onClick={handlePrevMonth}
              variant="contained"
              color="primary"
              className="p-1"
              size="small"
            >
              <ChevronLeftIcon fontSize="small" />
            </Button>
            <Typography variant="h6" className="text-center flex-grow">
              {format(currentMonth, 'MMMM yyyy', { locale: vi })}
            </Typography>
            <Button
              onClick={handleNextMonth}
              variant="contained"
              color="primary"
              className="p-1"
              size="small"
            >
              <ChevronRightIcon fontSize="small" />
            </Button>
            <Button
              onClick={handleNextYear}
              variant="contained"
              color="primary"
              className="p-1"
              size="small"
            >
              <DoubleArrowIcon fontSize="small"  />
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={2}>
        {/* Calendar */}
        <Grid item xs={12}>
          <Paper elevation={3} className="p-4 bg-white shadow-lg">
            <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
              {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
                <Box key={day} className="text-center py-2 font-semibold text-gray-600">
                  {day}
                </Box>
              ))}
              {allDays.map(day => {
                const dayEvents = getDayEvents(day);
                return (
                  <Tooltip
                    key={day.toString()}
                    title={
                      <Box>
                        {dayEvents.map(event => (
                          <Box key={event.name} className="flex items-center mb-1">
                            <Avatar src={event.img} sx={{ width: 24, height: 24, marginRight: 1 }} />
                            <Typography variant="body2">{event.name}</Typography>
                          </Box>
                        ))}
                      </Box>
                    }
                    placement="top"
                  >
                    <Button
                      className={clsx(
                        'w-full h-16 flex flex-col items-center justify-center text-base border rounded-lg',
                        isToday(day) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
                      )}
                    >
                      {format(day, 'd')}
                      {dayEvents.length > 0 && (
                        <Box className="flex mt-1">
                          {dayEvents.slice(0, 3).map(event => (
                            <Avatar key={event.name} src={event.img} sx={{ width: 20, height: 20, marginLeft: -4 }} />
                          ))}
                          {dayEvents.length > 3 && (
                            <Typography variant="body2" sx={{ marginLeft: 0.5 }}>
                              +{dayEvents.length - 3}
                            </Typography>
                          )}
                        </Box>
                      )}
                    </Button>
                  </Tooltip>
                );
              })}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Calendar;
