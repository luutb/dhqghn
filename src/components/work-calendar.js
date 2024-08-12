// components/WorkCalendar.js
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../app/globals.css'; // Đảm bảo CSS tùy chỉnh được áp dụng

// Dữ liệu mẫu cho công việc của các nhân viên
const workData = {
  '2024-08-15': [
    { employee: 'Nguyễn Văn A', task: 'Họp với khách hàng', time: '09:00 - 10:00' },
    { employee: 'Trần Thị B', task: 'Hoàn thành báo cáo', time: '14:00 - 16:00' }
  ],
  '2024-08-16': [
    { employee: 'Lê Văn C', task: 'Xem xét dự án', time: '10:00 - 12:00' }
  ]
};

function WorkCalendar() {
  const [date, setDate] = useState(new Date());

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const tileContent = ({ date }) => {
    const formattedDate = formatDate(date);
    const workList = workData[formattedDate];
    return workList ? (
      <ul className="list-none p-0 m-0">
        {workList.map((item, index) => (
          <li
            key={index}
            className="text-blue-600 text-xs py-1 border-b border-gray-300"
          >
            <div>
              <span className="font-bold">{item.employee}</span>: {item.task} ({item.time})
            </div>
          </li>
        ))}
      </ul>
    ) : null;
  };

  return (
    <div className="p-4">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Lịch Công Việc</h2>
        <Calendar
        //   onChange={setDate}
          value={date}
          tileContent={tileContent}
          showNeighboringMonth={false}
          minDetail="month"
          className="react-calendar-custom"
        />
      </div>
    </div>
  );
}

export default WorkCalendar;
