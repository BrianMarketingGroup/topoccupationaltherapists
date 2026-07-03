/** Brand icon mark — matches the favicon (app/icon.svg) and
 *  the recognition award artwork so the brand mark is consistent everywhere.
 *  Geometric, minimal; renders in gold via currentColor. */
export default function CheckeredFlag({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 40 26"
      className={className}
      style={style}
      aria-hidden="true"
      fill="none"
    >
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M23 3 C27 3 30 6.5 30 10.5 C30 13 28.5 14.8 26.5 15.8 C25.4 16.4 25.1 17.5 25.6 18.4 C26.1 19.3 25.4 20.2 24.4 20 C21.5 19.3 19.5 16.8 19.5 13.8 C19.5 12 20.3 10.5 21.6 9.6 C22.5 9 22.9 8.1 22.7 7 C22.5 5.6 21.3 4.6 19.9 4.6" />
        <path d="M11,9 A4,4 0 0,1 11,17" strokeWidth="1.8" />
        <path d="M7,6 A7,7 0 0,1 7,20" strokeWidth="1.8" opacity="0.75" />
        <path d="M3,3 A10,10 0 0,1 3,23" strokeWidth="1.6" opacity="0.5" />
      </g>
    </svg>
  );
}
