
"use client"
import React from 'react';
import InstructorList from '../../../../components/teacher-table';
import PermissionTable from '@/components/permision-table';

const Permission = () => {
  return (
    <div className="container mx-auto p-4">
 
      <PermissionTable  />
    </div>
  );
};

export default Permission;
