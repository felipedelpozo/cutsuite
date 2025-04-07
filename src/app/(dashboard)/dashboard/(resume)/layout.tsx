export default function DashboardResumeLayout({
  children,
  schedule,
}: {
  children: React.ReactNode;
  schedule: React.ReactNode;
}) {
  return (
    <div className="@container p-1 sm:w-full sm:p-4 md:max-w-sm">
      {schedule}
      {children}
    </div>
  );
}
