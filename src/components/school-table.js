// components/SchoolTable.js
import { Typography } from '@mui/material';

const data = [
  { id: 1, name: 'Trường A', studentCount: 1200 },
  { id: 2, name: 'Trường B', studentCount: 850 },
  { id: 3, name: 'Trường C', studentCount: 950 },
  { id: 4, name: 'Trường D', studentCount: 1300 },
  { id: 5, name: 'Trường E', studentCount: 1100 },
  { id: 6, name: 'Trường E', studentCount: 1100 },
  { id: 7, name: 'Trường E', studentCount: 1100 },
  { id: 8, name: 'Trường E', studentCount: 1100 },
  { id: 9, name: 'Trường E', studentCount: 1100 },
  { id: 10, name: 'Trường E', studentCount: 1100 }
];

function SchoolTable() {
  return (
    <div className="p-4  bg-white border rounded">
      <Typography variant="h6" gutterBottom className="text-xl font-semibold mb-4">
        Danh Sách Trường và Số Lượng Sinh Viên
      </Typography>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="w-full bg-gray-100 border-b border-gray-200">
              <th className="py-2 px-4 text-left text-gray-600">Số thứ tự</th>
              <th className="py-2 px-4 text-left text-gray-600">Tên trường</th>
              <th className="py-2 px-4 text-left text-gray-600">Số lượng sinh viên</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 border-b border-gray-200">
                <td className="py-2 px-4 text-gray-800">{row.id}</td>
                <td className="py-2 px-4 text-gray-800">{row.name}</td>
                <td className="py-2 px-4 text-gray-800">{row.studentCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SchoolTable;
