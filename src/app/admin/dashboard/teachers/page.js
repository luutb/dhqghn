
"use client"
import React from 'react';
import InstructorList from '../../../../components/teacher-table';

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách Giảng viên</h1>
      <InstructorList />
    </div>
  );
};

export default App;
