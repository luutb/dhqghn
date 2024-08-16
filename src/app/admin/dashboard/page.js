"use client";
import DailySchedule from "@/components/daily";
import SchoolTable from "@/components/school-table";
import WorkCalendar from "@/components/work-calendar";
import { BarChart } from "@mui/x-charts";
import { PieChart } from "@mui/x-charts/PieChart";
export default function Dashboard() {
  return (
    <div className="w-full ml-2 mt-2">
      <div className="w-full h-[60px] bg-white rounded text-back text-xl flex items-center pl-4 font-bold">
        Thống kê báo cáo
      </div>
      <div className="w-full flex flex-row mt-[10px]">
        <div className="w-full">
          <div className="flex flex-row w-full border bg-white">
            <BarChart
              xAxis={[
                { scaleType: "band", data: ["ĐH Ngoại ngữ", "ĐH Luật", "ĐH Công nghệ"] },
              ]}
              series={[
                { data: [9, 2, 5] },
                { data: [1, 8, 5] },
              ]}
              width={1280}
              height={500}
              className="w-full"
            />
            {/* <PieChart
              slotProps={{
                legend: {
                  direction: "row",
                  position: { vertical: "bottom", horizontal: "middle" },
                  padding: 0,
                },
              }}
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: "Qua môn" },
                    { id: 1, value: 15, label: "Không qua môn" },
                  ],
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              width={400}
              height={400}
            />
            <PieChart
              slotProps={{
                legend: {
                  direction: "row",
                  position: { vertical: "bottom", horizontal: "middle" },
                  padding: 0,
                },
              }}
              series={[
                {
                  data: [
                    { id: 0, value: 10, label: "Đủ điều kiện" },
                    { id: 1, value: 15, label: "Chưa đủ điều kiện" },
                  ],
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              width={400}
              height={400}
            /> */}
          </div>
          <div className="mt-4">
            <SchoolTable />
          </div>
        </div>
        <div className="w-[400px]">
          <DailySchedule />
        </div>
      </div>
    </div>
  );
}
