import type { ReactNode } from "react";

const ART: Record<string, ReactNode> = {
  frontend: (
    <>
      <rect x="12" y="14" width="54" height="72" rx="6" />
      <path d="M12 28h54M22 42h34M22 52h22" />
      <rect x="72" y="36" width="18" height="50" rx="5" />
      <rect className="solid" x="22" y="64" width="28" height="12" rx="6" />
    </>
  ),
  backend: (
    <>
      <path d="M50 30v20M24 70V50h52v20" />
      <rect className="solid" x="34" y="12" width="32" height="20" rx="5" />
      <rect x="10" y="68" width="28" height="20" rx="5" />
      <rect x="62" y="68" width="28" height="20" rx="5" />
    </>
  ),
  database: (
    <>
      <ellipse className="solid" cx="50" cy="26" rx="28" ry="11" />
      <path d="M22 26v50c0 14 56 14 56 0V26M22 43c0 14 56 14 56 0M22 60c0 14 56 14 56 0" />
    </>
  ),
  ui: (
    <>
      <circle className="solid" cx="31" cy="31" r="17" />
      <rect x="56" y="14" width="32" height="34" rx="4" />
      <path d="M14 86l17-30 17 30zM58 64h30M58 78h20" />
    </>
  ),
  devops: (
    <>
      {[14, 40, 66].map((y) => (
        <g key={y}>
          <rect x="14" y={y} width="72" height="20" rx="4" />
          <circle className="solid" cx="27" cy={y + 10} r="4" />
          <path d={`M46 ${y + 10}h28`} />
        </g>
      ))}
    </>
  ),
  integrations: (
    <>
      <path d="M28 28l44 44M72 28L28 72" />
      <circle className="solid" cx="50" cy="50" r="15" />
      {[24, 76].flatMap((x) =>
        [24, 76].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="11" />),
      )}
    </>
  ),
};

export function LayerArt({ id }: { id: string }) {
  return (
    <svg className="layer-art" viewBox="0 0 100 100" aria-hidden="true">
      {ART[id] ?? <circle cx="50" cy="50" r="28" />}
    </svg>
  );
}
