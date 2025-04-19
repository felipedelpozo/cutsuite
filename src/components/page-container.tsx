type PageProps = Readonly<{
  children: React.ReactNode;
}>;

export function PageContainer({ children }: PageProps) {
  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          {children}
        </div>
      </div>
    </>
  );
}
