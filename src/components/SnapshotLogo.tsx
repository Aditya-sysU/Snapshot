import React from 'react';

interface SnapshotLogoProps {
  className?: string;
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  showText?: boolean;
}

export const SnapshotLogo: React.FC<SnapshotLogoProps> = ({
  className = '',
  size = 42,
  color = 'currentColor',
  strokeWidth = 1.8,
  showText = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={typeof size === 'number' ? size * 0.65 : 'auto'}
        viewBox="0 0 160 104"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        {/* Stylized camera body frame contour with top viewfinder step and rounded base */}
        <path
          d="M 52 28 C 70 24 86 24 94 28 C 98 30 100 37 101 44 C 103 45 125 45 131 52 C 135 56 135 90 134 94 C 133 97 125 98 100 98 C 70 98 56 100 50 100"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Large stylized 'S' on the left forming the camera grip and first letter */}
        <path
          d="M 47 24 C 41 24 33 27 30 36 C 27 46 36 54 44 61 C 52 68 53 77 50 87 C 47 96 36 99 30 96 C 26 94 28 86 31 82 C 34 77 36 71 36 71 M 47 24 C 54 24 57 32 55 42 C 53 48 48 51 44 54"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Crescent Shutter / Lens Arc on the right of text */}
        <path
          d="M 72 45 C 85 43 96 54 96 66 C 96 79 84 89 73 87"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Text 'NAP' on top row */}
        <g stroke={color} strokeWidth={strokeWidth * 0.75} strokeLinecap="round" strokeLinejoin="round">
          {/* N */}
          <path d="M 60 52 L 60 62 M 60 52 L 64.5 62 M 64.5 52 L 64.5 62" />
          {/* A */}
          <path d="M 68 62 L 70.5 52 L 73 62 M 68.8 59 L 72.2 59" />
          {/* P */}
          <path d="M 76.5 62 L 76.5 52 C 78.5 52 80 53 80 55.5 C 80 58 78.5 59 76.5 59" />
        </g>

        {/* Text 'HOT' on bottom row */}
        <g stroke={color} strokeWidth={strokeWidth * 0.75} strokeLinecap="round" strokeLinejoin="round">
          {/* H */}
          <path d="M 60 68 L 60 78 M 64.5 68 L 64.5 78 M 60 73 L 64.5 73" />
          {/* O */}
          <ellipse cx="70.5" cy="73" rx="2.5" ry="5" />
          {/* T */}
          <path d="M 75 68 L 81 68 M 78 68 L 78 78" />
        </g>

        {/* Subtle camera baseline detail */}
        <path
          d="M 52 98 C 80 96 110 97 129 95"
          stroke={color}
          strokeWidth={strokeWidth * 0.7}
          strokeLinecap="round"
        />
      </svg>

      {showText && (
        <span className="font-brand font-black tracking-wider text-lg text-black uppercase">
          SNAPSHOT
        </span>
      )}
    </div>
  );
};
