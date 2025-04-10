export default function DashboardResumeLayout({
  children,
  schedule,
}: {
  children: React.ReactNode;
  schedule: React.ReactNode;
}) {
  return (
    <div className="@container sm:w-full sm:p-4">
      {schedule}
      {children}
    </div>
  );
}
