"use client";
import DailySchedule from "@/components/daily";
import SchoolTable from "@/components/school-table";
import WorkCalendar from "@/components/work-calendar";
import { PieChart } from "@mui/x-charts/PieChart";
export default function Dashboard() {
  return (
    <div className="w-full flex ">
      <div></div>
      <div>
        <div className="flex flex-row w-full border bg-white">
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
          />
        </div>
        <div className="mt-4">
          <SchoolTable />
        </div>
      </div>
      <div className="w-full">
        <DailySchedule />
      </div>
    </div>
  );
}
