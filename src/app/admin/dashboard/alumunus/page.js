// pages/index.js
import StudentTable from '../../../../components/table';

// pages/index.js


const columns = [
  { header: 'Mã sinh viên', accessor: 'studentId' },
  { header: 'Họ và tên', accessor: 'fullName' },
  { header: 'Năm sinh', accessor: 'birthYear' },
  { header: 'Trường học', accessor: 'school' },
  { header: 'Tình trạng', accessor: 'status' },
  { header: 'Hành động', accessor: 'actions' }
];

const data = [
  { studentId: 'SV001', fullName: 'Nguyễn Văn A', birthYear: 2000, school: 'Trường Đại học A', status: 'Đạt' },
  { studentId: 'SV002', fullName: 'Trần Thị B', birthYear: 2001, school: 'Trường Đại học B', status: 'Chưa đạt' },
  { studentId: 'SV003', fullName: 'Lê Văn C', birthYear: 2002, school: 'Trường Đại học C', status: 'Đạt' },
  { studentId: 'SV004', fullName: 'Phạm Thị D', birthYear: 1999, school: 'Trường Đại học D', status: 'Đạt' },
  { studentId: 'SV005', fullName: 'Hoàng Văn E', birthYear: 2000, school: 'Trường Đại học E', status: 'Chưa đạt' },
  { studentId: 'SV006', fullName: 'Bùi Thị F', birthYear: 2001, school: 'Trường Đại học F', status: 'Đạt' },
  { studentId: 'SV007', fullName: 'Ngô Văn G', birthYear: 2002, school: 'Trường Đại học G', status: 'Đạt' },
  { studentId: 'SV008', fullName: 'Vũ Thị H', birthYear: 2000, school: 'Trường Đại học H', status: 'Chưa đạt' },
  { studentId: 'SV009', fullName: 'Đinh Văn I', birthYear: 1998, school: 'Trường Đại học I', status: 'Đạt' },
  { studentId: 'SV010', fullName: 'Dương Thị J', birthYear: 2001, school: 'Trường Đại học J', status: 'Chưa đạt' },
  { studentId: 'SV011', fullName: 'Nguyễn Thị K', birthYear: 2001, school: 'Trường Đại học K', status: 'Đạt' },
  { studentId: 'SV012', fullName: 'Lê Thị L', birthYear: 2002, school: 'Trường Đại học L', status: 'Chưa đạt' },
  { studentId: 'SV013', fullName: 'Nguyễn Văn M', birthYear: 1999, school: 'Trường Đại học M', status: 'Đạt' },
  { studentId: 'SV014', fullName: 'Trần Thị N', birthYear: 2000, school: 'Trường Đại học N', status: 'Chưa đạt' },
  { studentId: 'SV015', fullName: 'Lê Văn O', birthYear: 2001, school: 'Trường Đại học O', status: 'Đạt' },
  { studentId: 'SV016', fullName: 'Phạm Thị P', birthYear: 2002, school: 'Trường Đại học P', status: 'Đạt' },
  { studentId: 'SV017', fullName: 'Hoàng Văn Q', birthYear: 1999, school: 'Trường Đại học Q', status: 'Chưa đạt' },
  { studentId: 'SV018', fullName: 'Bùi Thị R', birthYear: 2000, school: 'Trường Đại học R', status: 'Đạt' },
  { studentId: 'SV019', fullName: 'Ngô Văn S', birthYear: 2001, school: 'Trường Đại học S', status: 'Đạt' },
  { studentId: 'SV020', fullName: 'Vũ Thị T', birthYear: 2002, school: 'Trường Đại học T', status: 'Chưa đạt' },
  { studentId: 'SV021', fullName: 'Đinh Văn U', birthYear: 1998, school: 'Trường Đại học U', status: 'Đạt' }
];

export default function Home() {
  return (
    <StudentTable  />
  );
}


