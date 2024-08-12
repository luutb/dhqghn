// components/DailySchedule.js
import { useState } from 'react';
import { Box, Typography, Paper, TextField, Button, List, ListItem } from '@mui/material';

const initialEvents = [
    { time: '08:00', person: 'Nguyễn Văn A', location: 'Phòng 101', school: 'Trường A', task: 'Họp với khách hàng' },
    { time: '09:30', person: 'Trần Thị B', location: 'Phòng 102', school: 'Trường B', task: 'Soạn giáo án' },
    { time: '11:00', person: 'Lê Văn C', location: 'Phòng 103', school: 'Trường C', task: 'Phỏng vấn ứng viên' },
    { time: '12:00', person: 'Nguyễn Văn A', location: 'Phòng 104', school: 'Trường A', task: 'Ăn trưa' },
    { time: '13:30', person: 'Trần Thị B', location: 'Phòng 105', school: 'Trường B', task: 'Đánh giá bài tập' },
    { time: '15:00', person: 'Lê Văn C', location: 'Phòng 106', school: 'Trường C', task: 'Kiểm tra dự án' },
    { time: '16:30', person: 'Nguyễn Văn A', location: 'Phòng 107', school: 'Trường A', task: 'Gặp gỡ phụ huynh' },
    { time: '18:00', person: 'Trần Thị B', location: 'Phòng 108', school: 'Trường B', task: 'Họp nhóm' },
    { time: '19:30', person: 'Lê Văn C', location: 'Phòng 109', school: 'Trường C', task: 'Chuẩn bị tài liệu cho tuần sau' }
  ];

function DailySchedule() {
  const [events, setEvents] = useState(initialEvents);
  const [time, setTime] = useState('');
  const [person, setPerson] = useState('');
  const [location, setLocation] = useState('');
  const [school, setSchool] = useState('');
  const [task, setTask] = useState('');
    const date = new Date();
  const handleAddEvent = () => {
    if (time && person && location && school && task) {
      setEvents([...events, { time, person, location, school, task }]);
      setTime('');
      setPerson('');
      setLocation('');
      setSchool('');
      setTask('');
    }
  };

  return (
    <Box className="ml-2">
      <Paper elevation={3} sx={{ padding: 3, borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0,0,0,0.2)' }}>
        <Typography variant="h6" gutterBottom sx={{ marginBottom: 2 }}>
          Lịch làm việc ngày {date.getDate()} / {date.getMonth() + 1} / {date.getFullYear()}
        </Typography>
        <List sx={{ padding: 0 }}>
          {events.map((event, index) => (
            <ListItem key={index} sx={{ padding: '10px 0', borderBottom: '1px solid #ddd' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {event.time}
                </Typography>
                <Typography variant="body1">
                  {event.person} - {event.location} - {event.school}
                </Typography>
                <Typography variant="body1">
                  {event.task}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default DailySchedule;
