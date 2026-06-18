export type NavIconId = "home" | "shows" | "games" | "learn";

interface NavIconProps {
  id: NavIconId;
  active?: boolean;
  className?: string;
}

const STROKE = "#2D2D44";

/** Small cartoon SVGs for the bottom tab bar — matches BabyFlix rounded style. */
export function NavIcon({ id, active = false, className = "" }: NavIconProps) {
  const fill = active ? "currentColor" : "#B8B8D4";
  const accent = active ? "currentColor" : "#D4D4E8";

  return (
    <svg
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
      className={className}
      aria-hidden
    >
      {id === "home" && <HomeIcon fill={fill} accent={accent} stroke={STROKE} active={active} />}
      {id === "shows" && <ShowsIcon fill={fill} accent={accent} stroke={STROKE} active={active} />}
      {id === "games" && <GamesIcon fill={fill} accent={accent} stroke={STROKE} active={active} />}
      {id === "learn" && <LearnIcon fill={fill} accent={accent} stroke={STROKE} active={active} />}
    </svg>
  );
}

function HomeIcon({
  fill,
  accent,
  stroke,
  active,
}: {
  fill: string;
  accent: string;
  stroke: string;
  active: boolean;
}) {
  return (
    <>
      <path
        d="M4 11.5 13 4l9 7.5V21a1.5 1.5 0 0 1-1.5 1.5H5.5A1.5 1.5 0 0 1 4 21V11.5Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={active ? 1.4 : 1.2}
        strokeLinejoin="round"
      />
      <path
        d="M10 22v-6.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 16 15.5V22"
        fill={active ? "#fff" : accent}
        stroke={stroke}
        strokeWidth={1.1}
        strokeLinejoin="round"
      />
      <circle cx={13} cy={10} r={1.2} fill={active ? "#fff" : accent} />
    </>
  );
}

function ShowsIcon({
  fill,
  accent,
  stroke,
  active,
}: {
  fill: string;
  accent: string;
  stroke: string;
  active: boolean;
}) {
  return (
    <>
      <rect
        x={3}
        y={6}
        width={20}
        height={14}
        rx={3}
        fill={fill}
        stroke={stroke}
        strokeWidth={active ? 1.4 : 1.2}
      />
      <rect x={5.5} y={8.5} width={15} height={9} rx={1.5} fill={active ? "#fff" : accent} />
      <path
        d="M12 11.5 15.5 13.5 12 15.5V11.5Z"
        fill={active ? fill : "#9E9EBF"}
        stroke={stroke}
        strokeWidth={0.8}
        strokeLinejoin="round"
      />
      <rect x={10} y={20} width={6} height={1.5} rx={0.75} fill={fill} />
      <line x1={8} y1={21.5} x2={18} y2={21.5} stroke={stroke} strokeWidth={1.2} strokeLinecap="round" />
    </>
  );
}

function GamesIcon({
  fill,
  accent,
  stroke,
  active,
}: {
  fill: string;
  accent: string;
  stroke: string;
  active: boolean;
}) {
  return (
    <>
      <path
        d="M6 10.5c0-2.2 1.8-4 4-4h6c2.2 0 4 1.8 4 4v3.5c0 2.2-1.8 4-4 4h-6c-2.2 0-4-1.8-4-4v-3.5Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={active ? 1.4 : 1.2}
      />
      <circle cx={9} cy={13} r={1.8} fill={active ? "#fff" : accent} stroke={stroke} strokeWidth={0.8} />
      <circle cx={11.5} cy={11.5} r={0.9} fill={active ? fill : "#9E9EBF"} />
      <circle cx={17.5} cy={12} r={1.4} fill={active ? "#FF6B4A" : accent} stroke={stroke} strokeWidth={0.7} />
      <circle cx={19.2} cy={13.8} r={1.4} fill={active ? "#00C9B1" : accent} stroke={stroke} strokeWidth={0.7} />
      <circle cx={17.5} cy={15.6} r={1.4} fill={active ? "#FFD600" : accent} stroke={stroke} strokeWidth={0.7} />
      <circle cx={15.8} cy={13.8} r={1.4} fill={active ? "#7B4FFF" : accent} stroke={stroke} strokeWidth={0.7} />
    </>
  );
}

function LearnIcon({
  fill,
  accent,
  stroke,
  active,
}: {
  fill: string;
  accent: string;
  stroke: string;
  active: boolean;
}) {
  return (
    <>
      <path
        d="M5 7.5 13 4l8 3.5v11L13 22l-8-3.5V7.5Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={active ? 1.4 : 1.2}
        strokeLinejoin="round"
      />
      <path
        d="M13 8v14"
        stroke={stroke}
        strokeWidth={1.1}
        strokeLinecap="round"
      />
      <path
        d="M17 9.5 20 11v9l-3-1.5V9.5Z"
        fill={accent}
        stroke={stroke}
        strokeWidth={1}
        strokeLinejoin="round"
      />
      <path
        d="M8.5 10.5 11 11.8v2.2l-2.5-1.2v-2.3Z"
        fill={active ? "#FFD600" : accent}
        stroke={stroke}
        strokeWidth={0.7}
        strokeLinejoin="round"
      />
    </>
  );
}
