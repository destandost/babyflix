/** All Sprout Valley SVG symbols — kept inside sprout-valley per project rules. */
export function FarmSvgDefs() {
  return (
    <svg style={{ display: "none" }} aria-hidden>
      <defs>
        <symbol id="crop-seed" viewBox="0 0 44 60">
          <ellipse cx="22" cy="48" rx="10" ry="6" fill="#8D6E63" />
          <circle cx="22" cy="38" r="6" fill="#A1887F" />
        </symbol>
        <symbol id="crop-sprout" viewBox="0 0 44 60">
          <rect x="20" y="30" width="4" height="22" fill="#66BB6A" />
          <ellipse cx="22" cy="26" rx="8" ry="10" fill="#81C784" />
        </symbol>
        <symbol id="crop-growing" viewBox="0 0 44 60">
          <rect x="20" y="22" width="4" height="30" fill="#43A047" />
          <ellipse cx="14" cy="20" rx="10" ry="8" fill="#66BB6A" />
          <ellipse cx="30" cy="20" rx="10" ry="8" fill="#66BB6A" />
        </symbol>
        <symbol id="crop-wheat-ready" viewBox="0 0 44 60">
          <rect x="21" y="18" width="2" height="28" fill="#FFD54F" />
          <ellipse cx="22" cy="14" rx="12" ry="10" fill="#FFEB3B" stroke="#F9A825" strokeWidth="1" />
        </symbol>
        <symbol id="crop-corn-mid" viewBox="0 0 44 60">
          <rect x="20" y="20" width="4" height="28" fill="#43A047" />
          <ellipse cx="22" cy="28" rx="8" ry="12" fill="#FFEB3B" />
        </symbol>
        <symbol id="crop-corn-ready" viewBox="0 0 44 60">
          <rect x="20" y="16" width="4" height="32" fill="#388E3C" />
          <ellipse cx="22" cy="26" rx="10" ry="14" fill="#FFEB3B" stroke="#F9A825" strokeWidth="1" />
        </symbol>
        <symbol id="crop-carrot-ready" viewBox="0 0 44 60">
          <polygon points="22,8 28,40 16,40" fill="#FF9800" />
          <ellipse cx="22" cy="8" rx="10" ry="6" fill="#66BB6A" />
        </symbol>
        <symbol id="crop-strawberry-ready" viewBox="0 0 44 60">
          <path d="M22 12 Q12 28 22 48 Q32 28 22 12Z" fill="#E91E63" />
          <circle cx="18" cy="22" r="2" fill="#FFEB3B" />
          <circle cx="26" cy="24" r="2" fill="#FFEB3B" />
        </symbol>
        <symbol id="crop-tomato-ready" viewBox="0 0 44 60">
          <circle cx="22" cy="32" r="14" fill="#F44336" />
          <ellipse cx="22" cy="16" rx="8" ry="5" fill="#4CAF50" />
        </symbol>
        <symbol id="crop-sunflower-ready" viewBox="0 0 44 60">
          <circle cx="22" cy="24" r="10" fill="#5D4037" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <ellipse
              key={deg}
              cx="22"
              cy="12"
              rx="4"
              ry="10"
              fill="#FFC107"
              transform={`rotate(${deg} 22 24)`}
            />
          ))}
          <rect x="20" y="28" width="4" height="24" fill="#388E3C" />
        </symbol>
        <symbol id="crop-pumpkin-ready" viewBox="0 0 44 60">
          <ellipse cx="22" cy="36" rx="16" ry="14" fill="#FF6F00" />
          <rect x="20" y="18" width="4" height="8" fill="#5D4037" />
        </symbol>
        <symbol id="crop-watermelon-ready" viewBox="0 0 44 60">
          <ellipse cx="22" cy="36" rx="18" ry="14" fill="#4CAF50" />
          <path d="M8 36 Q22 22 36 36" fill="#E91E63" opacity="0.6" />
        </symbol>
        <symbol id="ani-chicken" viewBox="0 0 60 50">
          <ellipse cx="30" cy="32" rx="18" ry="14" fill="#FFEB3B" />
          <circle cx="30" cy="18" r="12" fill="#FFF59D" />
          <polygon points="42,18 52,16 42,22" fill="#FF9800" />
          <circle cx="26" cy="16" r="2" fill="#212121" />
        </symbol>
        <symbol id="ani-cow" viewBox="0 0 60 50">
          <ellipse cx="30" cy="30" rx="22" ry="16" fill="#ECEFF1" />
          <ellipse cx="22" cy="28" rx="6" ry="8" fill="#212121" />
          <ellipse cx="38" cy="28" rx="6" ry="8" fill="#212121" />
          <circle cx="30" cy="16" r="10" fill="#ECEFF1" />
        </symbol>
        <symbol id="ani-sheep" viewBox="0 0 60 50">
          <ellipse cx="30" cy="30" rx="20" ry="16" fill="#FAFAFA" stroke="#BDBDBD" strokeWidth="2" />
          <circle cx="30" cy="16" r="10" fill="#9E9E9E" />
        </symbol>
        <symbol id="ani-pig" viewBox="0 0 60 50">
          <ellipse cx="30" cy="30" rx="20" ry="16" fill="#F8BBD0" />
          <circle cx="30" cy="16" r="11" fill="#F48FB1" />
          <ellipse cx="26" cy="18" rx="3" ry="4" fill="#F06292" />
          <ellipse cx="34" cy="18" rx="3" ry="4" fill="#F06292" />
        </symbol>
        <symbol id="prod-egg" viewBox="0 0 32 32">
          <ellipse cx="16" cy="18" rx="10" ry="12" fill="#FFFDE7" stroke="#F9A825" strokeWidth="2" />
        </symbol>
        <symbol id="prod-milk" viewBox="0 0 32 32">
          <rect x="10" y="8" width="12" height="20" rx="3" fill="#E3F2FD" stroke="#0288D1" strokeWidth="2" />
        </symbol>
        <symbol id="prod-wool" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="12" fill="#FAFAFA" stroke="#9E9E9E" strokeWidth="2" />
        </symbol>
        <symbol id="prod-bacon" viewBox="0 0 32 32">
          <rect x="6" y="12" width="20" height="10" rx="4" fill="#E91E63" stroke="#C2185B" strokeWidth="2" />
        </symbol>
        <symbol id="mach-bakery" viewBox="0 0 48 48">
          <rect x="4" y="16" width="40" height="28" rx="4" fill="#FFCCBC" stroke="#BF360C" strokeWidth="2" />
          <rect x="14" y="6" width="20" height="14" rx="2" fill="#FF7043" />
        </symbol>
        <symbol id="mach-dairy" viewBox="0 0 48 48">
          <rect x="8" y="14" width="32" height="30" rx="4" fill="#E3F2FD" stroke="#0288D1" strokeWidth="2" />
          <rect x="16" y="4" width="16" height="12" rx="2" fill="#B3E5FC" />
        </symbol>
        <symbol id="mach-juicer" viewBox="0 0 48 48">
          <rect x="10" y="20" width="28" height="24" rx="4" fill="#C8E6C9" stroke="#388E3C" strokeWidth="2" />
          <ellipse cx="24" cy="14" rx="12" ry="8" fill="#FF9800" />
        </symbol>
        <symbol id="mach-jamjar" viewBox="0 0 48 48">
          <rect x="14" y="18" width="20" height="26" rx="3" fill="#FCE4EC" stroke="#E91E63" strokeWidth="2" />
          <rect x="12" y="10" width="24" height="10" rx="2" fill="#F48FB1" />
        </symbol>
        <symbol id="prod-bread" viewBox="0 0 32 32">
          <ellipse cx="16" cy="18" rx="12" ry="8" fill="#D7CCC8" stroke="#8D6E63" strokeWidth="2" />
        </symbol>
        <symbol id="prod-cake" viewBox="0 0 32 32">
          <rect x="6" y="14" width="20" height="14" rx="2" fill="#F48FB1" />
          <circle cx="16" cy="10" r="6" fill="#E91E63" />
        </symbol>
        <symbol id="prod-pancake" viewBox="0 0 32 32">
          <ellipse cx="16" cy="20" rx="12" ry="6" fill="#FFE082" stroke="#FF8F00" strokeWidth="2" />
        </symbol>
        <symbol id="prod-cheese" viewBox="0 0 32 32">
          <polygon points="16,6 28,26 4,26" fill="#FFD54F" stroke="#F9A825" strokeWidth="2" />
        </symbol>
        <symbol id="prod-butter" viewBox="0 0 32 32">
          <rect x="8" y="10" width="16" height="14" rx="2" fill="#FFF9C4" stroke="#F9A825" strokeWidth="2" />
        </symbol>
        <symbol id="prod-icecream" viewBox="0 0 32 32">
          <polygon points="16,8 24,24 8,24" fill="#F8BBD0" />
          <polygon points="16,24 10,30 22,30" fill="#D7CCC8" />
        </symbol>
        <symbol id="prod-carrot-juice" viewBox="0 0 32 32">
          <rect x="10" y="6" width="12" height="22" rx="3" fill="#FF9800" opacity="0.9" />
        </symbol>
        <symbol id="prod-berry-juice" viewBox="0 0 32 32">
          <rect x="10" y="6" width="12" height="22" rx="3" fill="#E91E63" opacity="0.9" />
        </symbol>
        <symbol id="prod-watermelon-juice" viewBox="0 0 32 32">
          <rect x="10" y="6" width="12" height="22" rx="3" fill="#4CAF50" opacity="0.9" />
        </symbol>
        <symbol id="prod-jam" viewBox="0 0 32 32">
          <rect x="8" y="10" width="16" height="18" rx="2" fill="#E91E63" />
        </symbol>
        <symbol id="prod-tomato-sauce" viewBox="0 0 32 32">
          <rect x="8" y="10" width="16" height="18" rx="2" fill="#F44336" />
        </symbol>
      </defs>
    </svg>
  );
}

export function SvgIcon({ id, size = 32, className = "" }: { id: string; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} className={className} aria-hidden>
      <use href={`#${id}`} />
    </svg>
  );
}
