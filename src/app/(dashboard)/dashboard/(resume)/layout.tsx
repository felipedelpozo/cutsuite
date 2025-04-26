import { PageContainer } from '@/components/page-container';
import { SiteHeader } from '@/components/site-header';

export default function DashboardResumeLayout({
  children,
  schedule,
}: {
  children: React.ReactNode;
  schedule: React.ReactNode;
}) {
  return (
    <div className="h-full overflow-hidden">
      <SiteHeader>
        <h1 className="text-base font-medium">Calendar</h1>
      </SiteHeader>
      <PageContainer>
        {schedule}
        {children}
      </PageContainer>
    </div>
  );
}
