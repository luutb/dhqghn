"use client";
import BarChart from "@/components/bar-chart-component";
import DailySchedule from "@/components/daily";
import SchoolTable from "@/components/school-table";

export default function Dashboard() {
  return (
    <div className="w-full ml-2 mt-2">
      <div className="w-full h-[60px] bg-white rounded text-back text-xl flex items-center pl-4 font-bold">
        Thống kê báo cáo
      </div>
      <div className="w-full flex flex-row mt-[10px]">
        <div className="w-full">
          <div className="flex flex-row w-full border bg-white">
          <BarChart />
           
          </div>
          {/* <div className="mt-4">
            <SchoolTable />
          </div> */}
        </div>
        <div className="w-[400px]">
          <DailySchedule />
        </div>
      </div>
    </div>
  );
}
