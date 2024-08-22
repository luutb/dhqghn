import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  IconButton,
  Button,
  Alert,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { format, parse, isValid } from "date-fns";

const WorkScheduleDialog = ({ open, onClose }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPerson, setSelectedPerson] = useState("");
  const [location, setLocation] = useState("");
  const [timeSlots, setTimeSlots] = useState([{ start: "", end: "" }]);
  const [errors, setErrors] = useState([]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTimeChange = (index, type, event) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index][type] = event.target.value;
    setTimeSlots(newTimeSlots);
  };

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { start: "", end: "" }]);
  };

  const removeTimeSlot = (index) => {
    if (timeSlots.length > 1) {
      setTimeSlots(timeSlots.filter((_, i) => i !== index));
    }
  };

  const handlePersonChange = (event) => {
    setSelectedPerson(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const validateTimeSlots = () => {
    const newErrors = [];
    timeSlots.forEach((slot, index) => {
      const startTime = parse(slot.start, "HH:mm", new Date());
      const endTime = parse(slot.end, "HH:mm", new Date());

      if (!isValid(startTime) || !isValid(endTime)) {
        newErrors.push(`Khoảng thời gian ${index + 1} không hợp lệ.`);
      } else if (startTime >= endTime) {
        newErrors.push(
          `Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc cho khoảng thời gian ${
            index + 1
          }.`
        );
      }
    });

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateTimeSlots();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Xử lý dữ liệu form ở đây
    const formattedDate = format(new Date(selectedDate), "yyyy-MM-dd");
    const formattedTimeSlots = timeSlots.map((slot) => ({
      start: format(parse(slot.start, "HH:mm", new Date()), "HH:mm"),
      end: format(parse(slot.end, "HH:mm", new Date()), "HH:mm"),
    }));
    console.log({
      selectedPerson,
      selectedDate: formattedDate,
      timeSlots: formattedTimeSlots,
      location,
    });
    onClose(); // Đóng dialog sau khi gửi
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Tạo Lịch Làm Việc</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.length > 0 && (
            <Alert severity="error" className="mb-4">
              {errors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </Alert>
          )}
          <FormControl fullWidth>
            <InputLabel id="person-select-label">
              Chọn Người Làm Việc
            </InputLabel>
            <Select
              labelId="person-select-label"
              value={selectedPerson}
              onChange={handlePersonChange}
              label="Chọn Người Làm Việc"
            >
              <MenuItem value="person1">Người 1</MenuItem>
              <MenuItem value="person2">Người 2</MenuItem>
              <MenuItem value="person3">Người 3</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Ngày Làm Việc"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />

          {timeSlots.map((slot, index) => (
            <div key={index} className="flex space-x-4 items-center mb-4">
              <TextField
                label={`Khoảng Thời Gian ${index + 1} (Bắt Đầu)`}
                type="time"
                value={slot.start}
                onChange={(event) => handleTimeChange(index, "start", event)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label={`Khoảng Thời Gian ${index + 1} (Kết Thúc)`}
                type="time"
                value={slot.end}
                onChange={(event) => handleTimeChange(index, "end", event)}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <IconButton color="error" onClick={() => removeTimeSlot(index)}>
                <RemoveCircleIcon />
              </IconButton>
            </div>
          ))}
          <IconButton color="primary" onClick={addTimeSlot}>
            <AddCircleIcon />
          </IconButton>
          <TextField
            label="Địa Điểm Làm Việc"
            value={location}
            onChange={handleLocationChange}
            fullWidth
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} >
          Hủy
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkScheduleDialog;
