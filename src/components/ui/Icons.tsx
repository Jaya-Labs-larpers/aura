import type { SocialIcon as SocialName } from "@/content/site";

type IconProps = { className?: string };

const SOCIAL_PATHS: Record<SocialName, string> = {
  facebook:
    "M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v9h4v-9h3l.5-4h-3.5V8.8c0-.5.3-.8.5-.8Z",
  instagram:
    "M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.9-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM12 3.6c2.7 0 3 0 4.1.1 2.7.1 4 1.4 4.1 4.1.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c-.1 2.7-1.4 4-4.1 4.1-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-2.7-.1-4-1.4-4.1-4.1C3.7 15 3.6 14.7 3.6 12s0-3 .1-4.1C3.8 5.2 5.1 3.9 7.8 3.8 8.9 3.6 9.3 3.6 12 3.6ZM12 2c-2.7 0-3.1 0-4.1.1C4.2 2.2 2.2 4.2 2.1 7.9 2 8.9 2 9.3 2 12s0 3.1.1 4.1c.1 3.7 2.1 5.7 5.8 5.8 1 .1 1.4.1 4.1.1s3.1 0 4.1-.1c3.7-.1 5.7-2.1 5.8-5.8.1-1 .1-1.4.1-4.1s0-3.1-.1-4.1C21.8 4.2 19.8 2.2 16.1 2.1 15.1 2 14.7 2 12 2Z",
  tiktok:
    "M16.6 2h-3.4v13.4a2.9 2.9 0 1 1-2-2.8V9.1a6.3 6.3 0 1 0 5.4 6.3V8.6a8 8 0 0 0 4.4 1.4V6.6a4.5 4.5 0 0 1-4.4-4.6Z",
  whatsapp:
    "M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z",
  telegram:
    "M21.4 3.6 2.9 10.7c-1.3.5-1.2 1.2-.2 1.5l4.7 1.5 1.8 5.6c.2.6.4.8.8.8s.6-.2.9-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.7c.3-1.3-.5-1.9-1.4-1.8ZM9.3 14l8.9-5.6c.4-.3.8-.1.5.2l-7.3 6.6-.3 3.3L9.3 14Z",
  linkedin:
    "M6.9 21H3V8.9h3.9V21ZM4.9 7.2a2.3 2.3 0 1 1 0-4.5 2.3 2.3 0 0 1 0 4.5ZM21 21h-3.9v-5.9c0-1.4 0-3.2-2-3.2s-2.2 1.5-2.2 3.1v6H9V8.9h3.7v1.7h.1a4.1 4.1 0 0 1 3.7-2c3.9 0 4.6 2.6 4.6 5.9V21Z",
};

export function SocialIcon({ name, className = "h-4 w-4" }: IconProps & { name: SocialName }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d={SOCIAL_PATHS[name]} />
    </svg>
  );
}

export function TripadvisorIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 0 0 4.072 1.598 6 6 0 0 0 6-5.998 5.982 5.982 0 0 0-1.957-4.432L24 6.648h-4.35a13.573 13.573 0 0 0-7.644-2.353zM12 6.255c1.531 0 3.063.303 4.504.903C13.943 8.138 12 10.43 12 13.1c0-2.671-1.942-4.962-4.504-5.942A11.72 11.72 0 0 1 12 6.256zM6.002 9.157a4.059 4.059 0 1 1 0 8.118 4.059 4.059 0 0 1 0-8.118zm11.992.002a4.057 4.057 0 1 1 .003 8.115 4.057 4.057 0 0 1-.003-8.115zm-11.992 1.93a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256zm11.992 0a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256z" />
    </svg>
  );
}

export function ArrowIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CalendarIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5" strokeLinecap="round" />
    </svg>
  );
}

export function ClockIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden="true">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M5 12.5 9.5 17 19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}

// Space/feature tag icons (EventTags): capacity, climate, entertainment and setting flags on the Events page.

export function UsersIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <circle cx="9" cy="8.2" r="3.2" />
      <path d="M3.5 19.5v-1.3a4 4 0 0 1 4-4h3a4 4 0 0 1 4 4v1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M15.8 5.3a3.2 3.2 0 0 1 0 5.9M18.7 19.5v-1.3a4 4 0 0 0-2.7-3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SnowflakeIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} strokeLinecap="round" aria-hidden="true">
      <path d="M12 3v18M4.9 7.5l14.2 9M19.1 7.5 4.9 16.5" />
      <path d="M12 6.2 9.9 4.5M12 6.2l2.1-1.7M12 17.8l-2.1 1.7M12 17.8l2.1 1.7" />
      <path d="M7.4 9.1 5.2 7.9M7.4 9.1l-1.2 2.2M16.6 9.1l2.2-1.2M16.6 9.1l1.2 2.2M7.4 14.9l-2.2 1.2M7.4 14.9l-1.2-2.2M16.6 14.9l2.2 1.2M16.6 14.9l-1.2 2.2" />
    </svg>
  );
}

export function MicIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <circle cx="8" cy="7" r="3.3" />
      <path d="M8.46 10.08 18.76 20.18 19.24 19.82 10.54 8.52Z" strokeLinejoin="round" />
      <path d="M6 6.2 10 7.8M6.6 8.4 9.6 9.6" strokeLinecap="round" />
    </svg>
  );
}

export function ScreenIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <rect x="3" y="4.5" width="18" height="12" rx="1.8" />
      <path d="M9 20.5h6M12 16.5v4" strokeLinecap="round" />
    </svg>
  );
}

export function FanIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="1.6" />
      <path d="M12 10.4c0-2.6-1.4-5.4-3.8-5.9-1.6-.3-2.3 1.3-1.4 2.6 1 1.6 3.2 2.9 5.2 3.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.6 12c2.6 0 5.4-1.4 5.9-3.8.3-1.6-1.3-2.3-2.6-1.4-1.6 1-2.9 3.2-3.3 5.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 13.6c0 2.6 1.4 5.4 3.8 5.9 1.6.3 2.3-1.3 1.4-2.6-1-1.6-3.2-2.9-5.2-3.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Event Services grid icons, after the ones in AURA's corporate events deck
// (Lucide-style thin strokes: wifi, clipboard, speaker, camera, flower, book,
// signpost, bulb, car). Same 24px viewBox / 1.5 stroke as the tag icons.
export function WifiIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M3 9.5a13 13 0 0 1 18 0M6.3 13a8.3 8.3 0 0 1 11.4 0M9.6 16.4a3.6 3.6 0 0 1 4.8 0" strokeLinecap="round" />
      <circle cx="12" cy="19.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ClipboardIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <rect x="5" y="4.5" width="14" height="17" rx="2" />
      <path d="M9 4.5V3.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M9 13.5l2 2 4-4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SpeakerIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <circle cx="12" cy="14" r="3" />
      <circle cx="12" cy="7.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CameraIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2.3l1.4-2h5.6l1.4 2h2.3A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5Z" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="3.2" />
    </svg>
  );
}

export function FlowerIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <circle cx="12" cy="9" r="2" />
      <path d="M12 7a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5ZM14 9a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0ZM10 9a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM12 11a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" />
      <path d="M12 16v6M12 20c-1.5-2-3.5-2.5-5-2 .5 1.6 2.4 3 5 2M12 20c1.5-2 3.5-2.5 5-2-.5 1.6-2.4 3-5 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BookIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M12 6.5c-1.6-1.4-4.2-2-8-2v13.5c3.8 0 6.4.6 8 2 1.6-1.4 4.2-2 8-2V4.5c-3.8 0-6.4.6-8 2ZM12 6.5V20" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SignpostIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M12 3v3M12 13v8M9 21h6" strokeLinecap="round" />
      <path d="M6.2 6h11.3l2.5 3.5-2.5 3.5H6.2L3.7 9.5Z" strokeLinejoin="round" />
    </svg>
  );
}

export function BulbIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M9 17.5v-1.3c0-1-.6-1.8-1.4-2.5A5.8 5.8 0 0 1 6 9.3 6 6 0 0 1 18 9.3c0 1.7-.7 3.3-1.6 4.4-.8.7-1.4 1.5-1.4 2.5v1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 20.5h5M10 17.5h4" strokeLinecap="round" />
    </svg>
  );
}

export function CarIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M4 16v-3.4c0-.6.2-1.1.5-1.6l1.9-2.8A2 2 0 0 1 8 7.3h8a2 2 0 0 1 1.6.9l1.9 2.8c.3.5.5 1 .5 1.6V16H4ZM5 11h14M4 16h16" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7.5" cy="16.5" r="1.8" />
      <circle cx="16.5" cy="16.5" r="1.8" />
    </svg>
  );
}

export function UmbrellaIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <path d="M3.3 13A8.7 8.7 0 0 1 20.7 13Z" strokeLinejoin="round" />
      <path d="M12 13v6.8a2 2 0 0 1-3.6 1.2M12 2.5v2" strokeLinecap="round" />
    </svg>
  );
}

export function LockIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2.2" />
      <path d="M8 11V7.5a4 4 0 0 1 8 0V11" strokeLinecap="round" />
    </svg>
  );
}

export function SunIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4.3" />
      <path d="M12 2.8v2.3M12 18.9v2.3M4.4 12H2M22 12h-2.4M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18" />
    </svg>
  );
}
