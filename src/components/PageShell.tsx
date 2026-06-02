import { Header } from "./Header";

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
}

export function PageShell({ children, className = "" }: PageShellProps) {
  return (
    <div className="flex min-h-full flex-col bg-gradient-to-b from-violet-50 via-white to-sky-50">
      <Header />
      <main
        className={`mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 sm:py-10 ${className}`}
      >
        {children}
      </main>
    </div>
  );
}
