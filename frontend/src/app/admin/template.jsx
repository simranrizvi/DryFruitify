import Sidebar from "@/src/app/components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-50">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
