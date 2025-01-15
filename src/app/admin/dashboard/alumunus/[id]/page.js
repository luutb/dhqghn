"use client";

import axiosInstance from "@/axios/api-config";
import { preview } from "@/axios/endpoints";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function PreviewCertificate() {
  const params = useParams();
  const id = decodeURIComponent(params.id.toString());
  console.log("id", id);
  const [coursesData, setCoursesData] = useState([]);
  const [student, setStudent] = useState(null);
  useEffect(() => {
    axiosInstance.get(`${preview}?codeStudent=${id}`).then((res) => {
      console.log(res.data.data);
      if (res.data) {
        if (res.data.data?.courses) {
          setCoursesData(res.data.data.courses);
        }
        if (res.data.data?.profile) {
          setStudent(res.data.data.profile);
        }
      }
    });
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        {student?.fullName}
      </h1>
      <TableContainer
        component={Paper}
        className="max-w-full shadow-lg rounded-lg"
      >
        <Table>
          <TableHead className="">
            <TableRow>
              <TableCell className="font-bold">Tên Môn Học</TableCell>
              <TableCell className="font-bold">Mã Khóa Học</TableCell>
              <TableCell className="font-bold">Phòng</TableCell>
              <TableCell className="font-bold">Trường</TableCell>
              <TableCell className="font-bold">Điểm</TableCell>
              <TableCell className="font-bold">Tình trạng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coursesData.length > 0 ? (
              coursesData.map((course) => (
                <TableRow
                  key={course._id}
                  className={`hover:bg-gray-100 transition-all duration-200 `}
                >
                  <TableCell className=" font-bold">
                    {course.nameCourse}
                  </TableCell>
                  <TableCell className=" font-bold">
                    {course.codeCourse}
                  </TableCell>
                  <TableCell className="font-bold">{course.nameRoom}</TableCell>
                  <TableCell className="font-bold">
                    {course.nameSchool}
                  </TableCell>
                  <TableCell className="font-bold">{course.point}</TableCell>
                  <TableCell className=" font-bold">
                    <div
                      className={`${
                        Number(course.point) > 4 ? "bg-green-500" : "bg-red-500"
                      } text-white font-bold w-[80px] text-center rounded`}
                    >
                      {Number(course.point) > 4 ? "ĐẠT" : "CHƯA ĐẠT"}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <div className="flex w-screen h-screen justify-center">Sinh viên chưa tham gia học</div>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
