export function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />
    ),
    compare: <path d="M5 4v16M12 8v12M19 2v18M2 20h20" />,
    menu: <path d="M3 6h18M3 12h18M3 18h18" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
    chevron: <path d="m6 9 6 6 6-6" />,
    filter: <path d="M3 6h18M6 12h12M9 18h6" />,
    copy: (
      <>
        <rect x="8" y="8" width="12" height="13" rx="2" />
        <path d="M16 8V3H3v13h5" />
      </>
    ),
    box: <path d="m12 2 9 5v10l-9 5-9-5V7l9-5Zm0 10v10M3 7l9 5 9-5M7 4l10 6" />,
    water: <path d="M12 2C9 7 5 11 5 15a7 7 0 0 0 14 0c0-4-4-8-7-13Z" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.water}
    </svg>
  );
}
