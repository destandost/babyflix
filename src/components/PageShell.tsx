interface PageShellProps {
  children: React.ReactNode;
  className?: string;
}

/** Extra page padding — tab bar lives in AppShell (root layout). */
export function PageShell({ children, className = "" }: PageShellProps) {
  return <div className={`px-0 pt-2 ${className}`}>{children}</div>;
}
