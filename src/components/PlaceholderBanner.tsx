interface PlaceholderBannerProps {
  title: string;
  message: string;
}

export function PlaceholderBanner({ title, message }: PlaceholderBannerProps) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/80 px-5 py-4 text-center">
      <p className="font-display text-lg font-bold text-violet-800">{title}</p>
      <p className="mt-1 text-sm text-violet-600 sm:text-base">{message}</p>
    </div>
  );
}
