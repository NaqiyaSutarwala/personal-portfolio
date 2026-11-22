import type { ReactNode } from "react";

const ART: Record<string, ReactNode> = {
  medituri: (
    <>
      <g className="drift-a">
        <g transform="rotate(-38 180 170)">
          <rect className="f-light" x="70" y="122" width="220" height="96" rx="48" />
          <path className="f-ink" d="M118 122h62v96h-62a48 48 0 0 1 0-96z" />
        </g>
      </g>
      <g className="drift-b">
        <circle className="f-haldi" cx="286" cy="262" r="48" />
        <path className="s-ink" d="M254 262h64" />
      </g>
      <g className="drift-c">
        <circle className="f-kesar" cx="84" cy="74" r="28" />
        <circle className="f-ink" cx="306" cy="72" r="14" />
      </g>
    </>
  ),
  crewmates: (
    <>
      <g className="drift-a">
        <path className="f-ink" d="M60 310V152l92-76 92 76v158z" />
        <rect className="f-haldi" x="94" y="170" width="46" height="46" rx="6" />
        <path className="f-guava" d="M164 310v-76a26 26 0 0 1 52 0v76z" />
      </g>
      <g className="drift-b">
        <path className="f-light" d="M224 50h106a20 20 0 0 1 20 20v54a20 20 0 0 1-20 20h-70l-30 28v-28h-6a20 20 0 0 1-20-20V70a20 20 0 0 1 20-20z" />
        <path className="s-ink" d="M236 84h82M236 110h50" />
      </g>
      <circle className="f-kesar drift-c" cx="304" cy="268" r="30" />
    </>
  ),
  acquaintdb: (
    <>
      <g className="drift-a">
        <rect className="f-ink" x="52" y="262" width="256" height="54" rx="10" />
        <path className="s-light" d="M80 289h150" />
      </g>
      <g className="drift-b">
        <rect className="f-guava" x="80" y="200" width="220" height="54" rx="10" />
        <path className="s-ink" d="M108 227h100" />
      </g>
      <g className="drift-c">
        <path className="f-light" d="M180 40l130 56-130 56L50 96z" />
        <path className="f-ink" d="M106 130v38q74 46 148 0v-38l-74 32z" />
        <path className="s-ink" d="M310 96v70" />
      </g>
    </>
  ),
  dukkan: (
    <>
      <g className="drift-a">
        <path className="s-ink" d="M128 138V98a52 52 0 0 1 104 0v40" />
        <path className="f-light" d="M78 126h204l22 190H56z" />
        <path className="s-ink" d="M130 196q50 64 100 0" />
      </g>
      <g className="drift-b">
        <path className="f-ink" d="M274 46h62v62l-70 70-62-62z" />
        <circle className="f-haldi" cx="308" cy="74" r="11" />
      </g>
      <circle className="f-haldi drift-c" cx="66" cy="72" r="32" />
    </>
  ),
  thymos: (
    <>
      <path
        className="f-ink drift-a"
        d="M180 308C-12 190 24 52 116 52c34 0 54 20 64 42 10-22 30-42 64-42 92 0 128 138-64 256z"
      />
      <path className="s-guava pulse-line drift-b" d="M22 176h88l26-54 40 104 32-74 18 24h112" pathLength="100" />
      <circle className="f-haldi drift-c" cx="308" cy="292" r="30" />
    </>
  ),
  "practice-suite": (
    <>
      <g className="drift-a">
        <rect className="f-ink" x="46" y="70" width="180" height="234" rx="18" transform="rotate(-9 136 187)" />
      </g>
      <g className="drift-b">
        <rect className="f-light" x="108" y="62" width="184" height="242" rx="18" />
        <path className="s-ink" d="M140 114h120M140 154h78" />
        <path className="f-sky" d="M142 270v-42h30v42zM186 270v-66h30v66zM230 270v-92h30v92z" />
      </g>
      <g className="drift-c">
        <circle className="f-kesar" cx="300" cy="78" r="38" />
        <path className="s-ink" d="M284 78l12 12 22-24" />
      </g>
    </>
  ),
  dodare: (
    <>
      <g className="drift-a">
        <circle className="f-ink" cx="166" cy="192" r="130" />
        <circle className="f-haldi" cx="166" cy="192" r="94" />
        <circle className="f-ink" cx="166" cy="192" r="56" />
        <circle className="f-light" cx="166" cy="192" r="22" />
      </g>
      <g className="drift-b">
        <path className="s-light" d="M166 192L300 58" />
        <path className="f-light" d="M278 82V38l26-26v40h40l-26 30z" />
      </g>
      <circle className="f-kesar drift-c" cx="322" cy="294" r="26" />
    </>
  ),
};

export function ProjectArt({ id }: { id: string }) {
  return (
    <svg className="project-art" viewBox="0 0 360 360" aria-hidden="true">
      {ART[id] ?? <circle className="f-ink drift-a" cx="180" cy="180" r="110" />}
    </svg>
  );
}
