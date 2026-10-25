/* "J" + cursor de terminal. Misma marca que app/icon.svg, para los PNG */
export function JGMark({ px, round = true }: { px: number; round?: boolean }) {
  return (
    <svg width={px} height={px} viewBox="0 0 64 64">
      <rect width="64" height="64" rx={round ? 15 : 0} fill="#c6ff3d" />
      <path d="M30 13v23c0 8-5 12-13 12" fill="none" stroke="#0b0b0c" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="37" y="38" width="15" height="10" rx="2" fill="#0b0b0c" />
    </svg>
  );
}
