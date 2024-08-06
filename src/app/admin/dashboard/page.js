"use client";
import { PieChart } from "@mui/x-charts/PieChart";
export default function Dashboard() {
  return (
    <div className="w-full">
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: "Qua môn" },
              { id: 1, value: 15, label: "Không qua môn" },
            ],
          },
        ]}
        width={400}
        height={200}
      />
      <div>
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: "Đủ điều kiện" },
              { id: 1, value: 15, label: "Chưa đủ điều kiện" },
            ],
          },
        ]}
        width={400}
        height={200}
      />
      <div></div>
      </div>
    </div>
  );
}
