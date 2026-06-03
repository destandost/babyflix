export const CHARACTERS = {
  fox: "char-fox",
  bear: "char-bear",
  dragon: "char-dragon",
  unicorn: "char-unicorn",
  dino: "char-dino",
  fish: "char-fish",
  bunny: "char-bunny",
  monkey: "char-monkey",
  cloud: "char-cloud",
  starbear: "char-starbear",
} as const;

export type CharacterId = keyof typeof CHARACTERS;

interface CharacterProps {
  id: CharacterId;
  size?: number;
  className?: string;
  animate?: boolean;
}

export function CharacterDefs() {
  return (
    <svg style={{ display: "none" }} aria-hidden>
      <defs>
        <symbol id="char-fox" viewBox="0 0 100 100">
          <ellipse cx="50" cy="72" rx="26" ry="22" fill="#FF7A2F" />
          <ellipse cx="50" cy="76" rx="16" ry="14" fill="#FFD0A8" />
          <circle cx="50" cy="44" r="26" fill="#FF7A2F" />
          <polygon points="24,26 14,4 34,18" fill="#FF7A2F" />
          <polygon points="76,26 86,4 66,18" fill="#FF7A2F" />
          <polygon points="26,24 18,8 32,18" fill="#FF4D8D" />
          <polygon points="74,24 82,8 68,18" fill="#FF4D8D" />
          <ellipse cx="50" cy="50" rx="16" ry="14" fill="#FFD0A8" />
          <circle cx="41" cy="40" r="5" fill="white" />
          <circle cx="59" cy="40" r="5" fill="white" />
          <circle cx="42" cy="41" r="3" fill="#2D2D44" />
          <circle cx="60" cy="41" r="3" fill="#2D2D44" />
          <circle cx="43" cy="40" r="1" fill="white" />
          <circle cx="61" cy="40" r="1" fill="white" />
          <ellipse cx="50" cy="50" rx="4" ry="3" fill="#FF4D8D" />
          <path d="M46 53 Q50 57 54 53" stroke="#2D2D44" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <circle cx="36" cy="48" r="5" fill="#FF9A6C" opacity="0.5" />
          <circle cx="64" cy="48" r="5" fill="#FF9A6C" opacity="0.5" />
          <ellipse cx="72" cy="82" rx="10" ry="8" fill="#FF7A2F" transform="rotate(-30 72 82)" />
          <ellipse cx="74" cy="80" rx="5" ry="4" fill="white" transform="rotate(-30 74 80)" />
        </symbol>
        <symbol id="char-bear" viewBox="0 0 100 100">
          <ellipse cx="50" cy="72" rx="26" ry="22" fill="#8B5E3C" />
          <ellipse cx="50" cy="76" rx="16" ry="14" fill="#C49A6C" />
          <circle cx="50" cy="44" r="26" fill="#8B5E3C" />
          <circle cx="28" cy="22" r="10" fill="#8B5E3C" />
          <circle cx="72" cy="22" r="10" fill="#8B5E3C" />
          <circle cx="28" cy="22" r="6" fill="#C49A6C" />
          <circle cx="72" cy="22" r="6" fill="#C49A6C" />
          <ellipse cx="50" cy="50" rx="16" ry="14" fill="#C49A6C" />
          <circle cx="41" cy="40" r="5" fill="white" />
          <circle cx="59" cy="40" r="5" fill="white" />
          <circle cx="42" cy="41" r="3" fill="#2D2D44" />
          <circle cx="60" cy="41" r="3" fill="#2D2D44" />
          <ellipse cx="50" cy="51" rx="5" ry="4" fill="#6B3F20" />
          <path d="M46 55 Q50 59 54 55" stroke="#2D2D44" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </symbol>
        <symbol id="char-dragon" viewBox="0 0 100 100">
          <ellipse cx="50" cy="72" rx="24" ry="20" fill="#00C9B1" />
          <ellipse cx="50" cy="75" rx="14" ry="12" fill="#E0FFF9" />
          <ellipse cx="20" cy="55" rx="14" ry="9" fill="#00A898" transform="rotate(-30 20 55)" />
          <ellipse cx="80" cy="55" rx="14" ry="9" fill="#00A898" transform="rotate(30 80 55)" />
          <circle cx="50" cy="44" r="24" fill="#00C9B1" />
          <polygon points="37,22 32,6 42,18" fill="#FFD600" />
          <polygon points="63,22 68,6 58,18" fill="#FFD600" />
          <ellipse cx="50" cy="50" rx="14" ry="12" fill="#E0FFF9" />
          <circle cx="41" cy="40" r="5" fill="white" />
          <circle cx="59" cy="40" r="5" fill="white" />
          <circle cx="42" cy="41" r="3" fill="#2D2D44" />
          <circle cx="60" cy="41" r="3" fill="#2D2D44" />
          <ellipse cx="50" cy="50" rx="4" ry="3" fill="#00A898" />
          <path d="M46 54 Q50 58 54 54" stroke="#2D2D44" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </symbol>
        <symbol id="char-unicorn" viewBox="0 0 100 100">
          <ellipse cx="50" cy="72" rx="26" ry="20" fill="#F0D0FF" />
          <ellipse cx="50" cy="75" rx="16" ry="12" fill="white" />
          <circle cx="50" cy="44" r="26" fill="#F0D0FF" />
          <polygon points="50,6 44,28 56,28" fill="#FFD600" />
          <ellipse cx="50" cy="50" rx="14" ry="12" fill="white" />
          <circle cx="41" cy="40" r="5" fill="white" />
          <circle cx="59" cy="40" r="5" fill="white" />
          <circle cx="42" cy="41" r="3" fill="#7B4FFF" />
          <circle cx="60" cy="41" r="3" fill="#7B4FFF" />
          <ellipse cx="50" cy="50" rx="4" ry="3" fill="#FF9ABF" />
          <path d="M46 54 Q50 58 54 54" stroke="#CC6699" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </symbol>
        <symbol id="char-dino" viewBox="0 0 100 100">
          <ellipse cx="50" cy="72" rx="26" ry="22" fill="#2ECC71" />
          <ellipse cx="50" cy="76" rx="16" ry="14" fill="#A8F0C8" />
          <polygon points="30,30 26,12 34,24" fill="#27AE60" />
          <polygon points="50,20 48,2 53,16" fill="#27AE60" />
          <polygon points="70,30 66,12 74,24" fill="#27AE60" />
          <circle cx="50" cy="48" r="26" fill="#2ECC71" />
          <ellipse cx="50" cy="54" rx="14" ry="12" fill="#A8F0C8" />
          <circle cx="41" cy="42" r="5" fill="white" />
          <circle cx="59" cy="42" r="5" fill="white" />
          <circle cx="42" cy="43" r="3" fill="#2D2D44" />
          <circle cx="60" cy="43" r="3" fill="#2D2D44" />
          <path d="M46 59 Q50 63 54 59" stroke="#2D2D44" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </symbol>
        <symbol id="char-fish" viewBox="0 0 100 100">
          <polygon points="15,50 28,36 28,64" fill="#00C9B1" />
          <ellipse cx="58" cy="50" rx="32" ry="24" fill="#00D4FF" />
          <ellipse cx="60" cy="54" rx="20" ry="14" fill="#E0FAFF" />
          <circle cx="78" cy="44" r="9" fill="white" />
          <circle cx="80" cy="44" r="6" fill="#2D2D44" />
        </symbol>
        <symbol id="char-bunny" viewBox="0 0 100 100">
          <ellipse cx="36" cy="18" rx="8" ry="18" fill="#FFD0E8" />
          <ellipse cx="64" cy="18" rx="8" ry="18" fill="#FFD0E8" />
          <ellipse cx="50" cy="72" rx="26" ry="22" fill="white" />
          <circle cx="50" cy="46" r="26" fill="white" />
          <circle cx="41" cy="40" r="5" fill="white" />
          <circle cx="59" cy="40" r="5" fill="white" />
          <circle cx="42" cy="41" r="3" fill="#7B4FFF" />
          <circle cx="60" cy="41" r="3" fill="#7B4FFF" />
          <ellipse cx="50" cy="52" rx="5" ry="4" fill="#FF9ABF" />
        </symbol>
        <symbol id="char-monkey" viewBox="0 0 100 100">
          <ellipse cx="50" cy="72" rx="24" ry="20" fill="#C49A3C" />
          <circle cx="24" cy="44" r="10" fill="#C49A3C" />
          <circle cx="76" cy="44" r="10" fill="#C49A3C" />
          <circle cx="50" cy="44" r="26" fill="#C49A3C" />
          <ellipse cx="50" cy="52" rx="18" ry="16" fill="#E8C870" />
          <circle cx="41" cy="40" r="5" fill="white" />
          <circle cx="59" cy="40" r="5" fill="white" />
          <circle cx="42" cy="41" r="3" fill="#2D2D44" />
          <circle cx="60" cy="41" r="3" fill="#2D2D44" />
          <path d="M45 58 Q50 63 55 58" stroke="#2D2D44" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </symbol>
        <symbol id="char-cloud" viewBox="0 0 100 100">
          <circle cx="35" cy="55" r="20" fill="white" />
          <circle cx="55" cy="45" r="26" fill="white" />
          <circle cx="72" cy="58" r="16" fill="white" />
          <rect x="18" y="55" width="66" height="26" rx="4" fill="white" />
          <circle cx="47" cy="47" r="3" fill="#00D4FF" />
          <circle cx="65" cy="47" r="3" fill="#00D4FF" />
          <path d="M50 56 Q56 61 62 56" stroke="#7B4FFF" strokeWidth="2" fill="none" strokeLinecap="round" />
          <polygon points="80,20 74,36 85,20" fill="#FFD600" />
        </symbol>
        <symbol id="char-starbear" viewBox="0 0 100 100">
          <use href="#char-bear" width="100" height="100" />
          <polygon points="50,8 52,14 58,14 53,18 55,24 50,20 45,24 47,18 42,14 48,14" fill="#FFD600" />
        </symbol>
      </defs>
    </svg>
  );
}

export function Character({ id, size = 80, className = "", animate = false }: CharacterProps) {
  const symbolId = CHARACTERS[id];
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`${animate ? "animate-float" : ""} ${className}`.trim()}
      aria-hidden
    >
      <use href={`#${symbolId}`} />
    </svg>
  );
}
