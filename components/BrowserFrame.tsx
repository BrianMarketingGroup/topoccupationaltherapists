interface BrowserFrameProps {
  url?: string;
  children: React.ReactNode;
}

export default function BrowserFrame({
  url = "topoccupationaltherapists.com",
  children,
}: BrowserFrameProps) {
  return (
    <div className="rounded-xl overflow-hidden shadow-[0_24px_70px_-20px_rgba(5,17,26,0.55)] border border-gold/30">
      {/* Chrome bar — pale glass with a gold hairline */}
      <div className="bg-pearl border-b border-gold/30 px-4 py-3 flex items-center gap-3">
        {/* Camera dot — single gold lens */}
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-gold shadow-[0_0_8px_rgba(217,169,78,0.5)]" />
          <div className="h-3 w-3 rounded-full bg-navy/15" />
          <div className="h-3 w-3 rounded-full bg-navy/15" />
        </div>

        {/* URL bar */}
        <div className="flex-1 flex items-center gap-2 bg-white border border-gold/20 rounded-md px-3 py-1 text-xs text-navy/55">
          <svg className="h-3 w-3 text-gold-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="text-navy/70 font-medium">{url}</span>
        </div>
      </div>

      {/* Content */}
      <div className="bg-pearl overflow-hidden">{children}</div>
    </div>
  );
}
