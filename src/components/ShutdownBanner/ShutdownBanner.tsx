import { ExternalLink } from '@/components';

export const ShutdownBanner = () => {
  return (
    <div
      className="w-full px-4 py-2 sm:px-6"
      style={{
        backgroundColor: '#7f1d1d',
        borderBottom: '1px solid #dc2626',
      }}
    >
      <div className="mx-auto flex max-w-[1300px] items-center justify-between gap-3">
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <svg
            className="shrink-0"
            style={{ width: '14px', height: '14px', color: '#fbbf24' }}
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>

          <span
            className="font-plex-sans text-[13px] font-bold uppercase tracking-wide sm:text-[14px] whitespace-nowrap"
            style={{ color: '#fbbf24' }}
          >
            Service Shutdown Notice
          </span>

          <span
            className="font-plex-sans text-[12px] font-medium leading-relaxed sm:text-[13px]"
            style={{ color: '#ffffff' }}
          >
            Fleek Hosting and Eliza Agents service will be permanently shut down
            on{' '}
            <span className="font-bold" style={{ color: '#fcd34d' }}>
              January 31, 2026
            </span>
            . All data and access will cease. If you need any help with
            migration{' '}
            <ExternalLink
              href="https://resources.fleek.xyz/requests/new/"
              className="font-bold underline hover:opacity-80 transition-opacity"
            >
              <span style={{ color: '#ffd79d' }}>contact support</span>
            </ExternalLink>
            .
          </span>
        </div>
      </div>
    </div>
  );
};
