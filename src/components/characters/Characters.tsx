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
  girl: "char-girl",
  boy: "char-boy",
  grandma: "char-grandma",
  baby: "char-baby",
  teacher: "char-teacher",
  lion: "char-lion",
  elephant: "char-elephant",
  penguin: "char-penguin",
  owl: "char-owl",
  koala: "char-koala",
  panda: "char-panda",
  giraffe: "char-giraffe",
  parrot: "char-parrot",
  frog: "char-frog",
} as const;

const VIEWBOXES: Partial<Record<CharacterId, string>> = {
  girl: "0 0 100 120",
  boy: "0 0 100 120",
  grandma: "0 0 100 120",
  teacher: "0 0 100 120",
  baby: "0 0 100 110",
  elephant: "0 0 100 110",
  penguin: "0 0 100 110",
  owl: "0 0 100 110",
  parrot: "0 0 100 110",
  giraffe: "0 0 100 120",
};

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
        {/* ══════════════════════════════════════
          HUMAN CHARACTERS
          ══════════════════════════════════════ */}
        {/* GIRL (Lily) — pink outfit, pigtails */}
        <symbol id="char-girl" viewBox="0 0 100 120">
          <rect x="28" y="70" width="44" height="38" rx="10" fill="#FF9DE2"/>
          <rect x="32" y="100" width="14" height="18" rx="7" fill="#FFD0A8"/>
          <rect x="54" y="100" width="14" height="18" rx="7" fill="#FFD0A8"/>
          <ellipse cx="39" cy="118" rx="10" ry="5" fill="#FF4D8D"/>
          <ellipse cx="61" cy="118" rx="10" ry="5" fill="#FF4D8D"/>
          <ellipse cx="18" cy="82" rx="8" ry="14" fill="#FF9DE2" transform="rotate(15 18 82)"/>
          <ellipse cx="82" cy="82" rx="8" ry="14" fill="#FF9DE2" transform="rotate(-15 82 82)"/>
          <circle cx="14" cy="94" r="7" fill="#FFD0A8"/>
          <circle cx="86" cy="94" r="7" fill="#FFD0A8"/>
          <rect x="42" y="62" width="16" height="12" rx="4" fill="#FFD0A8"/>
          <circle cx="50" cy="46" r="28" fill="#FFD0A8"/>
          <ellipse cx="18" cy="34" rx="10" ry="14" fill="#FF4D8D" transform="rotate(-20 18 34)"/>
          <ellipse cx="82" cy="34" rx="10" ry="14" fill="#FF4D8D" transform="rotate(20 82 34)"/>
          <ellipse cx="50" cy="24" rx="26" ry="16" fill="#4A2400"/>
          <ellipse cx="50" cy="30" rx="28" ry="12" fill="#4A2400"/>
          <circle cx="22" cy="44" r="5" fill="#FFD600"/>
          <circle cx="78" cy="44" r="5" fill="#FFD600"/>
          <circle cx="40" cy="46" r="6" fill="white"/>
          <circle cx="60" cy="46" r="6" fill="white"/>
          <circle cx="41" cy="47" r="3.5" fill="#4A2400"/>
          <circle cx="61" cy="47" r="3.5" fill="#4A2400"/>
          <circle cx="42" cy="46" r="1.2" fill="white"/>
          <circle cx="62" cy="46" r="1.2" fill="white"/>
          <path d="M35 41 Q37 38 40 40" stroke="#4A2400" strokeWidth="1.5" fill="none"/>
          <path d="M60 40 Q63 38 65 41" stroke="#4A2400" strokeWidth="1.5" fill="none"/>
          <ellipse cx="50" cy="52" rx="3" ry="2" fill="#FFBF9A"/>
          <path d="M44 57 Q50 62 56 57" stroke="#FF7BAC" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <circle cx="34" cy="53" r="6" fill="#FFB3D1" opacity="0.6"/>
          <circle cx="66" cy="53" r="6" fill="#FFB3D1" opacity="0.6"/>
        </symbol>
        {/* BOY (Leo) — blue outfit, spiky hair */}
        <symbol id="char-boy" viewBox="0 0 100 120">
          <rect x="28" y="70" width="44" height="38" rx="10" fill="#4A90E2"/>
          <rect x="28" y="80" width="44" height="6" fill="#2D6BC4"/>
          <rect x="32" y="100" width="14" height="18" rx="7" fill="#2D2D44"/>
          <rect x="54" y="100" width="14" height="18" rx="7" fill="#2D2D44"/>
          <ellipse cx="39" cy="118" rx="10" ry="5" fill="#1A1A2E"/>
          <ellipse cx="61" cy="118" rx="10" ry="5" fill="#1A1A2E"/>
          <ellipse cx="18" cy="82" rx="8" ry="14" fill="#4A90E2" transform="rotate(15 18 82)"/>
          <ellipse cx="82" cy="82" rx="8" ry="14" fill="#4A90E2" transform="rotate(-15 82 82)"/>
          <circle cx="14" cy="94" r="7" fill="#FFD0A8"/>
          <circle cx="86" cy="94" r="7" fill="#FFD0A8"/>
          <rect x="42" y="62" width="16" height="12" rx="4" fill="#FFD0A8"/>
          <circle cx="50" cy="46" r="28" fill="#FFD0A8"/>
          <ellipse cx="50" cy="22" rx="26" ry="14" fill="#4A2400"/>
          <polygon points="28,28 22,8 34,22" fill="#4A2400"/>
          <polygon points="38,20 34,2 44,18" fill="#4A2400"/>
          <polygon points="50,18 48,0 54,16" fill="#4A2400"/>
          <polygon points="62,20 58,2 66,18" fill="#4A2400"/>
          <polygon points="72,28 66,8 78,22" fill="#4A2400"/>
          <circle cx="40" cy="46" r="6" fill="white"/>
          <circle cx="60" cy="46" r="6" fill="white"/>
          <circle cx="41" cy="47" r="3.5" fill="#2D2D44"/>
          <circle cx="61" cy="47" r="3.5" fill="#2D2D44"/>
          <circle cx="42" cy="46" r="1.2" fill="white"/>
          <circle cx="62" cy="46" r="1.2" fill="white"/>
          <path d="M35 39 Q40 36 45 39" stroke="#4A2400" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M55 39 Q60 36 65 39" stroke="#4A2400" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <ellipse cx="50" cy="52" rx="3" ry="2" fill="#FFBF9A"/>
          <path d="M43 58 Q50 64 57 58" stroke="#FF7B60" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <circle cx="33" cy="53" r="6" fill="#FFCFB8" opacity="0.5"/>
          <circle cx="67" cy="53" r="6" fill="#FFCFB8" opacity="0.5"/>
        </symbol>
        {/* GRANDMA — grey bun, glasses, kind smile */}
        <symbol id="char-grandma" viewBox="0 0 100 120">
          <rect x="22" y="68" width="56" height="42" rx="12" fill="#9B59B6"/>
          <rect x="34" y="72" width="32" height="36" rx="8" fill="#F5EEF8"/>
          <rect x="30" y="102" width="14" height="16" rx="7" fill="#D7BDE2"/>
          <rect x="56" y="102" width="14" height="16" rx="7" fill="#D7BDE2"/>
          <ellipse cx="37" cy="118" rx="10" ry="5" fill="#6C3483"/>
          <ellipse cx="63" cy="118" rx="10" ry="5" fill="#6C3483"/>
          <ellipse cx="14" cy="82" rx="9" ry="16" fill="#9B59B6" transform="rotate(20 14 82)"/>
          <ellipse cx="86" cy="82" rx="9" ry="16" fill="#9B59B6" transform="rotate(-20 86 82)"/>
          <circle cx="10" cy="96" r="8" fill="#FFD0A8"/>
          <circle cx="90" cy="96" r="8" fill="#FFD0A8"/>
          <rect x="42" y="60" width="16" height="12" rx="4" fill="#FFD0A8"/>
          <circle cx="50" cy="44" r="28" fill="#FFD0A8"/>
          <ellipse cx="50" cy="20" rx="24" ry="14" fill="#BDC3C7"/>
          <ellipse cx="50" cy="14" rx="14" ry="10" fill="#BDC3C7"/>
          <circle cx="50" cy="12" r="8" fill="#95A5A6"/>
          <circle cx="38" cy="44" r="9" fill="none" stroke="#8E44AD" strokeWidth="2.5"/>
          <circle cx="62" cy="44" r="9" fill="none" stroke="#8E44AD" strokeWidth="2.5"/>
          <line x1="47" y1="44" x2="53" y2="44" stroke="#8E44AD" strokeWidth="2"/>
          <line x1="20" y1="42" x2="29" y2="44" stroke="#8E44AD" strokeWidth="2"/>
          <line x1="71" y1="44" x2="80" y2="42" stroke="#8E44AD" strokeWidth="2"/>
          <circle cx="38" cy="44" r="4" fill="#4A2400"/>
          <circle cx="62" cy="44" r="4" fill="#4A2400"/>
          <circle cx="39" cy="43" r="1.2" fill="white"/>
          <circle cx="63" cy="43" r="1.2" fill="white"/>
          <ellipse cx="50" cy="51" rx="3" ry="2" fill="#FFBF9A"/>
          <path d="M41 57 Q50 64 59 57" stroke="#C0392B" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <circle cx="34" cy="53" r="5" fill="#FFB3A0" opacity="0.5"/>
          <circle cx="66" cy="53" r="5" fill="#FFB3A0" opacity="0.5"/>
          <path d="M32 50 Q34 48 36 50" stroke="#FFBF9A" strokeWidth="1" fill="none"/>
          <path d="M64 50 Q66 48 68 50" stroke="#FFBF9A" strokeWidth="1" fill="none"/>
        </symbol>
        {/* BABY — chubby, big eyes, nappy */}
        <symbol id="char-baby" viewBox="0 0 100 110">
          <ellipse cx="50" cy="88" rx="28" ry="18" fill="white"/>
          <ellipse cx="50" cy="88" rx="22" ry="12" fill="#E8F4FD"/>
          <circle cx="32" cy="82" r="4" fill="#FFD600"/>
          <circle cx="68" cy="82" r="4" fill="#FF4D8D"/>
          <ellipse cx="50" cy="72" rx="26" ry="20" fill="#FFD0A8"/>
          <ellipse cx="18" cy="68" rx="10" ry="14" fill="#FFD0A8"/>
          <ellipse cx="82" cy="68" rx="10" ry="14" fill="#FFD0A8"/>
          <circle cx="12" cy="78" r="9" fill="#FFD0A8"/>
          <circle cx="88" cy="78" r="9" fill="#FFD0A8"/>
          <circle cx="9" cy="76" r="2" fill="#FFBF9A"/>
          <circle cx="85" cy="76" r="2" fill="#FFBF9A"/>
          <ellipse cx="50" cy="58" rx="18" ry="8" fill="#FFD0A8"/>
          <circle cx="50" cy="38" r="32" fill="#FFD0A8"/>
          <path d="M40 8 Q50 2 60 8" stroke="#4A2400" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <path d="M46 6 Q50 0 54 6" stroke="#4A2400" strokeWidth="4" fill="none" strokeLinecap="round"/>
          <circle cx="37" cy="38" r="10" fill="white"/>
          <circle cx="63" cy="38" r="10" fill="white"/>
          <circle cx="38" cy="39" r="6" fill="#4A2400"/>
          <circle cx="64" cy="39" r="6" fill="#4A2400"/>
          <circle cx="40" cy="37" r="2" fill="white"/>
          <circle cx="66" cy="37" r="2" fill="white"/>
          <circle cx="26" cy="46" r="8" fill="#FFB3D1" opacity="0.6"/>
          <circle cx="74" cy="46" r="8" fill="#FFB3D1" opacity="0.6"/>
          <ellipse cx="50" cy="46" rx="3" ry="2" fill="#FFBF9A"/>
          <path d="M44 52 Q50 57 56 52" stroke="#FF9ABF" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M50 56 Q51 60 50 62" stroke="#A8DAFF" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </symbol>
        {/* TEACHER — smart, glasses, holding a book */}
        <symbol id="char-teacher" viewBox="0 0 100 120">
          <rect x="24" y="68" width="52" height="42" rx="12" fill="#2D6BC4"/>
          <polygon points="50,68 44,80 50,76 56,80" fill="#FF4D8D"/>
          <rect x="46" y="76" width="8" height="16" rx="3" fill="#FF4D8D"/>
          <ellipse cx="14" cy="82" rx="9" ry="16" fill="#2D6BC4" transform="rotate(20 14 82)"/>
          <ellipse cx="86" cy="82" rx="9" ry="16" fill="#2D6BC4" transform="rotate(-20 86 82)"/>
          <rect x="74" y="88" width="20" height="26" rx="4" fill="#FFD600"/>
          <rect x="76" y="90" width="16" height="22" rx="2" fill="#FF6B4A"/>
          <line x1="84" y1="90" x2="84" y2="112" stroke="#FFD600" strokeWidth="1.5"/>
          <circle cx="10" cy="96" r="8" fill="#FFD0A8"/>
          <rect x="30" y="102" width="14" height="16" rx="7" fill="#1A3A6E"/>
          <rect x="56" y="102" width="14" height="16" rx="7" fill="#1A3A6E"/>
          <ellipse cx="37" cy="118" rx="10" ry="5" fill="#1A1A2E"/>
          <ellipse cx="63" cy="118" rx="10" ry="5" fill="#1A1A2E"/>
          <rect x="42" y="60" width="16" height="12" rx="4" fill="#FFD0A8"/>
          <circle cx="50" cy="44" r="28" fill="#FFD0A8"/>
          <ellipse cx="50" cy="22" rx="26" ry="14" fill="#2D2D44"/>
          <ellipse cx="50" cy="28" rx="28" ry="10" fill="#2D2D44"/>
          <circle cx="38" cy="44" r="9" fill="white" stroke="#2D2D44" strokeWidth="2"/>
          <circle cx="62" cy="44" r="9" fill="white" stroke="#2D2D44" strokeWidth="2"/>
          <line x1="47" y1="44" x2="53" y2="44" stroke="#2D2D44" strokeWidth="1.5"/>
          <line x1="20" y1="42" x2="29" y2="44" stroke="#2D2D44" strokeWidth="1.5"/>
          <line x1="71" y1="44" x2="80" y2="42" stroke="#2D2D44" strokeWidth="1.5"/>
          <circle cx="38" cy="44" r="4.5" fill="#2D2D44"/>
          <circle cx="62" cy="44" r="4.5" fill="#2D2D44"/>
          <circle cx="39.5" cy="43" r="1.5" fill="white"/>
          <circle cx="63.5" cy="43" r="1.5" fill="white"/>
          <ellipse cx="50" cy="51" rx="3" ry="2" fill="#FFBF9A"/>
          <path d="M42 57 Q50 63 58 57" stroke="#CC5500" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <circle cx="34" cy="53" r="5" fill="#FFCFB8" opacity="0.4"/>
          <circle cx="66" cy="53" r="5" fill="#FFCFB8" opacity="0.4"/>
        </symbol>
        {/* ══════════════════════════════════════
          NEW ANIMALS
          ══════════════════════════════════════ */}
        {/* LION — golden mane, proud face */}
        <symbol id="char-lion" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="38" fill="#E67E22"/>
          <circle cx="26" cy="32" r="10" fill="#D35400"/>
          <circle cx="14" cy="50" r="10" fill="#D35400"/>
          <circle cx="26" cy="68" r="10" fill="#D35400"/>
          <circle cx="74" cy="32" r="10" fill="#D35400"/>
          <circle cx="86" cy="50" r="10" fill="#D35400"/>
          <circle cx="74" cy="68" r="10" fill="#D35400"/>
          <circle cx="50" cy="18" r="10" fill="#D35400"/>
          <circle cx="50" cy="82" r="10" fill="#D35400"/>
          <ellipse cx="50" cy="74" rx="22" ry="18" fill="#F0B429"/>
          <circle cx="50" cy="46" r="26" fill="#F0B429"/>
          <ellipse cx="50" cy="54" rx="14" ry="12" fill="#F5CBA7"/>
          <circle cx="41" cy="42" r="5" fill="white"/>
          <circle cx="59" cy="42" r="5" fill="white"/>
          <circle cx="42" cy="43" r="3" fill="#2D2D44"/>
          <circle cx="60" cy="43" r="3" fill="#2D2D44"/>
          <circle cx="43" cy="42" r="1" fill="white"/>
          <circle cx="61" cy="42" r="1" fill="white"/>
          <ellipse cx="50" cy="51" rx="5" ry="3.5" fill="#CC4400"/>
          <path d="M45 55 Q50 60 55 55" stroke="#2D2D44" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M50 55 L50 58" stroke="#2D2D44" strokeWidth="1.5"/>
          <circle cx="36" cy="53" r="1.5" fill="#CC8800"/>
          <circle cx="36" cy="57" r="1.5" fill="#CC8800"/>
          <circle cx="64" cy="53" r="1.5" fill="#CC8800"/>
          <circle cx="64" cy="57" r="1.5" fill="#CC8800"/>
          <circle cx="28" cy="26" r="9" fill="#F0B429"/>
          <circle cx="72" cy="26" r="9" fill="#F0B429"/>
          <circle cx="28" cy="26" r="5" fill="#E67E22"/>
          <circle cx="72" cy="26" r="5" fill="#E67E22"/>
          <circle cx="34" cy="50" r="6" fill="#F5A623" opacity="0.5"/>
          <circle cx="66" cy="50" r="6" fill="#F5A623" opacity="0.5"/>
        </symbol>
        {/* ELEPHANT — grey, big ears, trunk */}
        <symbol id="char-elephant" viewBox="0 0 100 110">
          <ellipse cx="50" cy="82" rx="32" ry="24" fill="#BDC3C7"/>
          <rect x="24" y="98" width="16" height="14" rx="8" fill="#95A5A6"/>
          <rect x="60" y="98" width="16" height="14" rx="8" fill="#95A5A6"/>
          <ellipse cx="28" cy="112" rx="4" ry="2" fill="#AAB7B8"/>
          <ellipse cx="36" cy="112" rx="4" ry="2" fill="#AAB7B8"/>
          <ellipse cx="64" cy="112" rx="4" ry="2" fill="#AAB7B8"/>
          <ellipse cx="72" cy="112" rx="4" ry="2" fill="#AAB7B8"/>
          <ellipse cx="16" cy="46" rx="16" ry="22" fill="#BDC3C7"/>
          <ellipse cx="84" cy="46" rx="16" ry="22" fill="#BDC3C7"/>
          <ellipse cx="16" cy="46" rx="10" ry="16" fill="#E8D5D5"/>
          <ellipse cx="84" cy="46" rx="10" ry="16" fill="#E8D5D5"/>
          <circle cx="50" cy="42" r="28" fill="#BDC3C7"/>
          <path d="M44 64 Q38 78 42 88 Q44 92 50 90 Q56 88 54 82 Q52 74 48 68" fill="#95A5A6"/>
          <ellipse cx="46" cy="88" rx="6" ry="4" fill="#7F8C8D"/>
          <circle cx="38" cy="38" r="6" fill="white"/>
          <circle cx="62" cy="38" r="6" fill="white"/>
          <circle cx="39" cy="39" r="3.5" fill="#2D2D44"/>
          <circle cx="63" cy="39" r="3.5" fill="#2D2D44"/>
          <circle cx="40" cy="38" r="1.2" fill="white"/>
          <circle cx="64" cy="38" r="1.2" fill="white"/>
          <path d="M33 33 Q36 30 39 33" stroke="#2D2D44" strokeWidth="1.5" fill="none"/>
          <path d="M61 33 Q64 30 67 33" stroke="#2D2D44" strokeWidth="1.5" fill="none"/>
          <path d="M44 56 Q50 62 56 56" stroke="#7F8C8D" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <circle cx="30" cy="48" r="7" fill="#E8D5D5" opacity="0.8"/>
          <circle cx="70" cy="48" r="7" fill="#E8D5D5" opacity="0.8"/>
          <path d="M80 80 Q90 74 88 82 Q92 86 86 88" stroke="#95A5A6" strokeWidth="3" fill="none" strokeLinecap="round"/>
        </symbol>
        {/* PENGUIN — tuxedo, bow tie, chubby */}
        <symbol id="char-penguin" viewBox="0 0 100 110">
          <ellipse cx="50" cy="78" rx="28" ry="28" fill="#2D2D44"/>
          <ellipse cx="50" cy="82" rx="18" ry="22" fill="white"/>
          <ellipse cx="18" cy="72" rx="10" ry="20" fill="#2D2D44" transform="rotate(10 18 72)"/>
          <ellipse cx="82" cy="72" rx="10" ry="20" fill="#2D2D44" transform="rotate(-10 82 72)"/>
          <ellipse cx="38" cy="106" rx="12" ry="6" fill="#FF8C00"/>
          <ellipse cx="62" cy="106" rx="12" ry="6" fill="#FF8C00"/>
          <circle cx="50" cy="40" r="26" fill="#2D2D44"/>
          <ellipse cx="50" cy="44" rx="17" ry="19" fill="white"/>
          <circle cx="41" cy="38" r="6" fill="white"/>
          <circle cx="59" cy="38" r="6" fill="white"/>
          <circle cx="42" cy="39" r="3.5" fill="#2D2D44"/>
          <circle cx="60" cy="39" r="3.5" fill="#2D2D44"/>
          <circle cx="43" cy="38" r="1.2" fill="white"/>
          <circle cx="61" cy="38" r="1.2" fill="white"/>
          <polygon points="50,48 44,54 56,54" fill="#FF8C00"/>
          <circle cx="33" cy="48" r="5" fill="#FFB3B3" opacity="0.5"/>
          <circle cx="67" cy="48" r="5" fill="#FFB3B3" opacity="0.5"/>
          <polygon points="44,66 50,70 44,74" fill="#FF4D8D"/>
          <polygon points="56,66 50,70 56,74" fill="#FF4D8D"/>
          <circle cx="50" cy="70" r="3" fill="#CC0055"/>
        </symbol>
        {/* OWL — wise huge eyes, ear tufts */}
        <symbol id="char-owl" viewBox="0 0 100 110">
          <ellipse cx="50" cy="78" rx="28" ry="26" fill="#8B6914"/>
          <ellipse cx="24" cy="76" rx="12" ry="20" fill="#6B4E0A" transform="rotate(15 24 76)"/>
          <ellipse cx="76" cy="76" rx="12" ry="20" fill="#6B4E0A" transform="rotate(-15 76 76)"/>
          <ellipse cx="50" cy="82" rx="16" ry="18" fill="#F5CBA7"/>
          <ellipse cx="42" cy="75" rx="6" ry="4" fill="#E8B896" opacity="0.6"/>
          <ellipse cx="50" cy="73" rx="6" ry="4" fill="#E8B896" opacity="0.6"/>
          <ellipse cx="58" cy="75" rx="6" ry="4" fill="#E8B896" opacity="0.6"/>
          <path d="M36 104 L30 112 M36 104 L36 112 M36 104 L42 112" stroke="#8B6914" strokeWidth="3" strokeLinecap="round"/>
          <path d="M64 104 L58 112 M64 104 L64 112 M64 104 L70 112" stroke="#8B6914" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="50" cy="40" r="28" fill="#8B6914"/>
          <polygon points="32,18 26,4 38,16" fill="#6B4E0A"/>
          <polygon points="68,18 74,4 62,16" fill="#6B4E0A"/>
          <circle cx="37" cy="42" r="13" fill="white"/>
          <circle cx="63" cy="42" r="13" fill="white"/>
          <circle cx="37" cy="42" r="10" fill="#FFD600"/>
          <circle cx="63" cy="42" r="10" fill="#FFD600"/>
          <circle cx="37" cy="42" r="6" fill="#2D2D44"/>
          <circle cx="63" cy="42" r="6" fill="#2D2D44"/>
          <circle cx="39" cy="40" r="2" fill="white"/>
          <circle cx="65" cy="40" r="2" fill="white"/>
          <circle cx="37" cy="42" r="12" fill="none" stroke="#C8A000" strokeWidth="1.5"/>
          <circle cx="63" cy="42" r="12" fill="none" stroke="#C8A000" strokeWidth="1.5"/>
          <polygon points="50,50 44,58 56,58" fill="#FF8C00"/>
          <ellipse cx="50" cy="24" rx="10" ry="6" fill="#6B4E0A"/>
        </symbol>
        {/* KOALA — big nose, fluffy ears, eucalyptus */}
        <symbol id="char-koala" viewBox="0 0 100 100">
          <ellipse cx="50" cy="74" rx="24" ry="20" fill="#BDC3C7"/>
          <ellipse cx="50" cy="78" rx="14" ry="14" fill="#D5D8DC"/>
          <ellipse cx="22" cy="68" rx="10" ry="14" fill="#BDC3C7" transform="rotate(20 22 68)"/>
          <ellipse cx="78" cy="68" rx="10" ry="14" fill="#BDC3C7" transform="rotate(-20 78 68)"/>
          <path d="M80 62 Q90 50 84 38" stroke="#2ECC71" strokeWidth="3" fill="none"/>
          <ellipse cx="87" cy="42" rx="7" ry="4" fill="#27AE60" transform="rotate(-30 87 42)"/>
          <ellipse cx="82" cy="36" rx="7" ry="4" fill="#2ECC71" transform="rotate(20 82 36)"/>
          <circle cx="22" cy="26" r="16" fill="#BDC3C7"/>
          <circle cx="78" cy="26" r="16" fill="#BDC3C7"/>
          <circle cx="22" cy="26" r="10" fill="#D5D8DC"/>
          <circle cx="78" cy="26" r="10" fill="#D5D8DC"/>
          <circle cx="50" cy="44" r="26" fill="#BDC3C7"/>
          <ellipse cx="50" cy="52" rx="10" ry="7" fill="#7F8C8D"/>
          <circle cx="47" cy="51" r="2" fill="#2D2D44"/>
          <circle cx="53" cy="51" r="2" fill="#2D2D44"/>
          <circle cx="38" cy="40" r="5" fill="white"/>
          <circle cx="62" cy="40" r="5" fill="white"/>
          <circle cx="39" cy="41" r="3" fill="#2D2D44"/>
          <circle cx="63" cy="41" r="3" fill="#2D2D44"/>
          <circle cx="40" cy="40" r="1" fill="white"/>
          <circle cx="64" cy="40" r="1" fill="white"/>
          <path d="M44 58 Q50 63 56 58" stroke="#7F8C8D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <circle cx="30" cy="48" r="6" fill="#D5D8DC" opacity="0.8"/>
          <circle cx="70" cy="48" r="6" fill="#D5D8DC" opacity="0.8"/>
        </symbol>
        {/* PANDA — eye patches, bamboo */}
        <symbol id="char-panda" viewBox="0 0 100 100">
          <ellipse cx="50" cy="74" rx="26" ry="22" fill="white"/>
          <ellipse cx="32" cy="78" rx="12" ry="14" fill="#2D2D44"/>
          <ellipse cx="68" cy="78" rx="12" ry="14" fill="#2D2D44"/>
          <ellipse cx="50" cy="76" rx="14" ry="14" fill="white"/>
          <ellipse cx="20" cy="70" rx="10" ry="14" fill="#2D2D44" transform="rotate(20 20 70)"/>
          <ellipse cx="80" cy="70" rx="10" ry="14" fill="#2D2D44" transform="rotate(-20 80 70)"/>
          <rect x="84" y="50" width="6" height="40" rx="3" fill="#2ECC71"/>
          <rect x="84" y="54" width="6" height="4" rx="1" fill="#27AE60"/>
          <rect x="84" y="64" width="6" height="4" rx="1" fill="#27AE60"/>
          <rect x="84" y="74" width="6" height="4" rx="1" fill="#27AE60"/>
          <ellipse cx="96" cy="56" rx="8" ry="4" fill="#2ECC71" transform="rotate(-20 96 56)"/>
          <ellipse cx="78" cy="68" rx="8" ry="4" fill="#2ECC71" transform="rotate(20 78 68)"/>
          <circle cx="26" cy="22" r="12" fill="#2D2D44"/>
          <circle cx="74" cy="22" r="12" fill="#2D2D44"/>
          <circle cx="50" cy="44" r="28" fill="white"/>
          <ellipse cx="38" cy="42" rx="10" ry="8" fill="#2D2D44" transform="rotate(-15 38 42)"/>
          <ellipse cx="62" cy="42" rx="10" ry="8" fill="#2D2D44" transform="rotate(15 62 42)"/>
          <circle cx="38" cy="42" r="5" fill="white"/>
          <circle cx="62" cy="42" r="5" fill="white"/>
          <circle cx="39" cy="43" r="3" fill="#2D2D44"/>
          <circle cx="63" cy="43" r="3" fill="#2D2D44"/>
          <circle cx="40" cy="42" r="1" fill="white"/>
          <circle cx="64" cy="42" r="1" fill="white"/>
          <ellipse cx="50" cy="52" rx="5" ry="3.5" fill="#2D2D44"/>
          <path d="M45 56 Q50 61 55 56" stroke="#2D2D44" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <path d="M50 56 L50 58" stroke="#2D2D44" strokeWidth="1"/>
          <circle cx="32" cy="52" r="6" fill="#FFB3B3" opacity="0.4"/>
          <circle cx="68" cy="52" r="6" fill="#FFB3B3" opacity="0.4"/>
        </symbol>
        {/* GIRAFFE — long neck, spots, ossicones */}
        <symbol id="char-giraffe" viewBox="0 0 100 120">
          <ellipse cx="50" cy="96" rx="24" ry="18" fill="#F0B429"/>
          <ellipse cx="38" cy="90" rx="7" ry="5" fill="#CC8800" transform="rotate(-15 38 90)"/>
          <ellipse cx="58" cy="96" rx="6" ry="8" fill="#CC8800" transform="rotate(10 58 96)"/>
          <ellipse cx="44" cy="104" rx="5" ry="4" fill="#CC8800"/>
          <rect x="34" y="108" width="10" height="14" rx="5" fill="#F0B429"/>
          <rect x="56" y="108" width="10" height="14" rx="5" fill="#F0B429"/>
          <ellipse cx="39" cy="122" rx="6" ry="3" fill="#8B6914"/>
          <ellipse cx="61" cy="122" rx="6" ry="3" fill="#8B6914"/>
          <rect x="40" y="40" width="20" height="58" rx="10" fill="#F0B429"/>
          <ellipse cx="46" cy="52" rx="5" ry="8" fill="#CC8800" transform="rotate(-10 46 52)"/>
          <ellipse cx="54" cy="68" rx="5" ry="8" fill="#CC8800" transform="rotate(10 54 68)"/>
          <ellipse cx="50" cy="28" rx="20" ry="22" fill="#F0B429"/>
          <rect x="38" y="6" width="6" height="14" rx="3" fill="#CC8800"/>
          <rect x="56" y="6" width="6" height="14" rx="3" fill="#CC8800"/>
          <circle cx="41" cy="6" r="4" fill="#8B6914"/>
          <circle cx="59" cy="6" r="4" fill="#8B6914"/>
          <circle cx="40" cy="28" r="5" fill="white"/>
          <circle cx="60" cy="28" r="5" fill="white"/>
          <circle cx="41" cy="29" r="3" fill="#2D2D44"/>
          <circle cx="61" cy="29" r="3" fill="#2D2D44"/>
          <circle cx="42" cy="28" r="1" fill="white"/>
          <circle cx="62" cy="28" r="1" fill="white"/>
          <path d="M36 23 Q39 20 42 23" stroke="#2D2D44" strokeWidth="1.5" fill="none"/>
          <path d="M58 23 Q61 20 64 23" stroke="#2D2D44" strokeWidth="1.5" fill="none"/>
          <ellipse cx="50" cy="42" rx="8" ry="6" fill="#E8A520"/>
          <circle cx="47" cy="42" r="2" fill="#CC8800"/>
          <circle cx="53" cy="42" r="2" fill="#CC8800"/>
          <path d="M44 46 Q50 50 56 46" stroke="#CC8800" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <ellipse cx="33" cy="32" rx="5" ry="4" fill="#CC8800"/>
          <ellipse cx="67" cy="32" rx="5" ry="4" fill="#CC8800"/>
        </symbol>
        {/* PARROT — colourful tropical, multicolour wings */}
        <symbol id="char-parrot" viewBox="0 0 100 110">
          <ellipse cx="50" cy="100" rx="6" ry="16" fill="#FF4D8D"/>
          <ellipse cx="38" cy="104" rx="5" ry="12" fill="#7B4FFF" transform="rotate(-15 38 104)"/>
          <ellipse cx="62" cy="104" rx="5" ry="12" fill="#00C9B1" transform="rotate(15 62 104)"/>
          <ellipse cx="50" cy="78" rx="26" ry="24" fill="#2ECC71"/>
          <ellipse cx="20" cy="72" rx="14" ry="22" fill="#27AE60" transform="rotate(15 20 72)"/>
          <ellipse cx="20" cy="72" rx="8" ry="16" fill="#FFD600" transform="rotate(15 20 72)"/>
          <ellipse cx="80" cy="72" rx="14" ry="22" fill="#27AE60" transform="rotate(-15 80 72)"/>
          <ellipse cx="80" cy="72" rx="8" ry="16" fill="#FF6B4A" transform="rotate(-15 80 72)"/>
          <path d="M38 102 L32 112 M38 102 L38 112 M38 102 L44 112" stroke="#8B6914" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M62 102 L56 112 M62 102 L62 112 M62 102 L68 112" stroke="#8B6914" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="50" cy="42" r="26" fill="#2ECC71"/>
          <ellipse cx="34" cy="38" rx="10" ry="12" fill="#FFD600"/>
          <ellipse cx="66" cy="38" rx="10" ry="12" fill="#FF4D8D"/>
          <circle cx="38" cy="38" r="6" fill="white"/>
          <circle cx="62" cy="38" r="6" fill="white"/>
          <circle cx="39" cy="39" r="3.5" fill="#2D2D44"/>
          <circle cx="63" cy="39" r="3.5" fill="#2D2D44"/>
          <circle cx="40" cy="38" r="1.2" fill="white"/>
          <circle cx="64" cy="38" r="1.2" fill="white"/>
          <path d="M44 50 Q50 58 56 50 Q52 54 50 52 Q48 54 44 50Z" fill="#FF8C00"/>
          <ellipse cx="48" cy="50" rx="2" ry="1.5" fill="#CC6600"/>
          <ellipse cx="52" cy="50" rx="2" ry="1.5" fill="#CC6600"/>
          <circle cx="30" cy="46" r="5" fill="#FF4D8D" opacity="0.6"/>
          <circle cx="70" cy="46" r="5" fill="#FF4D8D" opacity="0.6"/>
        </symbol>
        {/* FROG — bright green, huge bulging eyes */}
        <symbol id="char-frog" viewBox="0 0 100 100">
          <ellipse cx="50" cy="70" rx="30" ry="24" fill="#2ECC71"/>
          <ellipse cx="50" cy="74" rx="20" ry="16" fill="#A8F0C8"/>
          <ellipse cx="20" cy="82" rx="12" ry="8" fill="#27AE60" transform="rotate(-30 20 82)"/>
          <ellipse cx="80" cy="82" rx="12" ry="8" fill="#27AE60" transform="rotate(30 80 82)"/>
          <ellipse cx="10" cy="90" rx="10" ry="5" fill="#27AE60" transform="rotate(-10 10 90)"/>
          <ellipse cx="90" cy="90" rx="10" ry="5" fill="#27AE60" transform="rotate(10 90 90)"/>
          <path d="M4 88 Q10 84 16 88" stroke="#1A9950" strokeWidth="2" fill="none"/>
          <path d="M84 88 Q90 84 96 88" stroke="#1A9950" strokeWidth="2" fill="none"/>
          <circle cx="50" cy="44" r="26" fill="#2ECC71"/>
          <circle cx="36" cy="30" r="7" fill="#27AE60"/>
          <circle cx="64" cy="30" r="7" fill="#27AE60"/>
          <circle cx="34" cy="28" r="10" fill="white"/>
          <circle cx="66" cy="28" r="10" fill="white"/>
          <circle cx="35" cy="29" r="6" fill="#FFD600"/>
          <circle cx="67" cy="29" r="6" fill="#FFD600"/>
          <circle cx="35" cy="29" r="3.5" fill="#2D2D44"/>
          <circle cx="67" cy="29" r="3.5" fill="#2D2D44"/>
          <circle cx="36" cy="28" r="1.2" fill="white"/>
          <circle cx="68" cy="28" r="1.2" fill="white"/>
          <path d="M32 54 Q50 66 68 54" stroke="#1A9950" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <circle cx="46" cy="48" r="2" fill="#1A9950"/>
          <circle cx="54" cy="48" r="2" fill="#1A9950"/>
          <circle cx="32" cy="52" r="6" fill="#A8F0C8" opacity="0.7"/>
          <circle cx="68" cy="52" r="6" fill="#A8F0C8" opacity="0.7"/>
        </symbol>
      </defs>
    </svg>
  );
}

export function Character({ id, size = 80, className = "", animate = false }: CharacterProps) {
  if (id === "starbear") {
    return (
      <span
        className={`relative inline-block ${animate ? "animate-float" : ""} ${className}`.trim()}
        style={{ width: size, height: size }}
        aria-hidden
      >
        <Character id="bear" size={size} />
        <span
          className="absolute left-1/2 top-0 -translate-x-1/2 text-[length:var(--star-size)]"
          style={{ ["--star-size" as string]: `${size * 0.28}px` }}
        >
          ⭐
        </span>
      </span>
    );
  }

  const symbolId = CHARACTERS[id];
  const viewBox = VIEWBOXES[id] ?? "0 0 100 100";
  return (
    <svg
      viewBox={viewBox}
      width={size}
      height={size}
      className={`${animate ? "animate-float" : ""} ${className}`.trim()}
      aria-hidden
    >
      <use href={`#${symbolId}`} xlinkHref={`#${symbolId}`} />
    </svg>
  );
}
