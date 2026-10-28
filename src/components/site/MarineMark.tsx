/** Small editorial linework inspired by the printed menu. */
export function MarineMark({ className }: { className?: string }) {
  return <svg viewBox="0 0 180 70" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" className={className}>
    <path d="M25 35C57 2 115 8 148 35C115 62 57 68 25 35ZM25 35L6 16V54L25 35ZM123 20C115 30 115 40 123 50M58 16L76 4L94 13M57 53L76 65L93 56M33 35H105" />
    <circle cx="132" cy="32" r="2" /><path d="M50 27L60 35L50 43M66 24L79 35L66 46M83 22L96 35L83 48" />
  </svg>;
}
