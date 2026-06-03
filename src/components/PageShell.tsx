import { AppNav } from "./layout/AppNav";

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
}

export function PageShell({ children, className = "" }: PageShellProps) {
  return (
    <div className="min-h-full bg-brand-off">
      <div className="relative mx-auto min-h-full w-full max-w-[430px] bg-white shadow-[0_0_40px_rgba(123,79,255,0.08)]">
        <AppNav />
        <main className={`px-0 pb-24 pt-2 md:pb-8 md:pt-0 ${className}`}>{children}</main>
      </div>
    </div>
  );
}
