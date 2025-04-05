export type ErrorPageProps = {
  code: string;
  message: string;
  description?: string;
  children?: React.ReactNode;
};

export function ErrorPage(props: ErrorPageProps) {
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] leading-tight font-bold">{props.code}</h1>
        <span className="font-medium">{props.message}</span>
        {props.description && (
          <p className="text-muted-foreground max-w-sm text-center">
            {props.description}
          </p>
        )}
        {props.children && (
          <div className="mt-6 flex gap-4">{props.children}</div>
        )}
      </div>
    </div>
  );
}
