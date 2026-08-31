import React, { useState } from 'react';

interface SponsorCardProps {
  imageUrls: string[];
  alt: string;
  fallbackComponent: React.ReactNode;
  aspectClass?: string;
  borderColor?: string;
}

const SponsorImageCard: React.FC<SponsorCardProps> = ({
  imageUrls,
  alt,
  fallbackComponent,
  aspectClass = 'aspect-square',
  borderColor = 'border-neutral-800',
}) => {
  const [currentSrcIndex, setCurrentSrcIndex] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);

  const handleImageError = () => {
    if (currentSrcIndex < imageUrls.length - 1) {
      setCurrentSrcIndex((prev) => prev + 1);
    } else {
      setImgFailed(true);
    }
  };

  if (imgFailed) {
    return <>{fallbackComponent}</>;
  }

  return (
    <div
      className={`w-full ${aspectClass} rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-xl border ${borderColor} bg-black flex items-center justify-center`}
    >
      <img
        src={imageUrls[currentSrcIndex]}
        alt={alt}
        onError={handleImageError}
        className="w-full h-full object-cover block"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

// Sponsor 1: Stylish Fashion Studio Logo Card (1035 x 999 ~ square)
export const StylishFashionStudioCard: React.FC = () => {
  const fallback = (
    <div
      className="w-full aspect-square rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-xl border border-neutral-800"
      style={{
        background: 'radial-gradient(circle at center, #1c1c1c 0%, #0d0d0d 70%, #050505 100%)',
      }}
    >
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255, 215, 0, 0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full">
        <svg
          viewBox="0 0 240 240"
          className="w-36 h-36 sm:w-40 sm:h-40 drop-shadow-[0_4px_16px_rgba(212,175,55,0.35)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2B2" />
              <stop offset="25%" stopColor="#E5B94E" />
              <stop offset="50%" stopColor="#9E721D" />
              <stop offset="75%" stopColor="#F7DF87" />
              <stop offset="100%" stopColor="#C9972C" />
            </linearGradient>
            <linearGradient id="goldDress" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#FFF4BC" />
              <stop offset="30%" stopColor="#E5BE53" />
              <stop offset="70%" stopColor="#AA7E22" />
              <stop offset="100%" stopColor="#F9E292" />
            </linearGradient>
            <radialGradient id="innerBlackGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1a1a1a" />
              <stop offset="90%" stopColor="#0a0a0a" />
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>
          </defs>
          <circle cx="120" cy="115" r="76" fill="url(#innerBlackGlow)" />
          <circle cx="120" cy="115" r="76" stroke="url(#goldRing)" strokeWidth="5" strokeLinecap="round" />
          <path
            d="M 120 48 C 114 48, 110 53, 112 59 C 113 63, 117 65, 120 67 L 120 73"
            stroke="url(#goldDress)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="98" cy="79" r="3.5" fill="url(#goldDress)" />
          <circle cx="142" cy="79" r="3.5" fill="url(#goldDress)" />
          <path
            d="M 98 79 C 108 75, 120 73, 120 73 C 120 73, 132 75, 142 79"
            stroke="url(#goldDress)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 112 79 C 116 83, 124 83, 128 79 C 127 88, 124 96, 127 105 C 122 108, 118 108, 113 105 C 116 96, 113 88, 112 79 Z"
            fill="url(#goldDress)"
          />
          <path
            d="M 113 105 C 106 118, 92 134, 76 148 C 85 149, 96 142, 102 135 C 96 147, 85 160, 68 168 C 88 166, 102 153, 111 138 C 112 152, 116 168, 122 182 C 126 168, 130 152, 129 138 C 138 153, 152 166, 172 168 C 155 160, 144 147, 138 135 C 144 142, 155 149, 164 148 C 148 134, 134 118, 127 105 Z"
            fill="url(#goldDress)"
          />
          <path
            d="M 114 112 C 95 125, 78 140, 70 155 C 65 165, 72 170, 80 168 C 88 165, 84 158, 86 150 C 94 138, 106 126, 116 118 Z"
            fill="url(#goldDress)"
            opacity="0.95"
          />
        </svg>

        <div className="mt-3 space-y-0.5">
          <h4
            className="font-serif font-bold text-3xl sm:text-4xl tracking-wide uppercase"
            style={{
              background: 'linear-gradient(180deg, #FFF6D0 0%, #E8C468 45%, #C2932B 80%, #9B6F17 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(212,175,55,0.2)',
              fontFamily: "'Playfair Display', 'Cinzel', 'Georgia', serif",
            }}
          >
            Stylish
          </h4>
          <p
            className="text-base sm:text-lg italic font-medium tracking-wider"
            style={{
              background: 'linear-gradient(180deg, #FDE69E 0%, #D4AA44 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: "'Playfair Display', 'Baskerville', italic, serif",
            }}
          >
            Fashion Studio
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <SponsorImageCard
      imageUrls={[
        '/assets/sponsor-1.jpeg',
        '/sponsor-1.jpeg',
        '/assets/stylish-fashion-studio.jpeg',
      ]}
      alt="Stylish Fashion Studio"
      fallbackComponent={fallback}
      aspectClass="aspect-square"
      borderColor="border-neutral-800"
    />
  );
};

// Sponsor 2: Kamju CREATIVES Logo Card (1536 x 1024 ~ 3:2 landscape or square fit)
export const KamjuCreativesCard: React.FC = () => {
  const fallback = (
    <div
      className="w-full aspect-square rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-xl border border-neutral-800"
      style={{
        background: 'radial-gradient(circle at center, #0B1021 0%, #070A14 65%, #030408 100%)',
      }}
    >
      <div className="absolute w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -top-10 -right-10" />
      <div className="absolute w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -bottom-10 -left-10" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 my-auto">
          <svg
            viewBox="0 0 160 160"
            className="w-24 h-24 sm:w-28 sm:h-28 drop-shadow-[0_4px_20px_rgba(0,180,255,0.25)] shrink-0"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="kamjuGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFE07A" />
                <stop offset="40%" stopColor="#E5B242" />
                <stop offset="70%" stopColor="#A8791C" />
                <stop offset="100%" stopColor="#C99427" />
              </linearGradient>
              <linearGradient id="kamjuCyanBlue" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F0FF" />
                <stop offset="45%" stopColor="#0099FF" />
                <stop offset="80%" stopColor="#4361EE" />
                <stop offset="100%" stopColor="#7209B7" />
              </linearGradient>
              <linearGradient id="kamjuPurplePink" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2B66FF" />
                <stop offset="40%" stopColor="#7209B7" />
                <stop offset="75%" stopColor="#B5179E" />
                <stop offset="100%" stopColor="#F72585" />
              </linearGradient>
            </defs>

            <path
              d="M 36 28 C 44 28, 54 30, 54 44 L 54 84 C 46 88, 38 98, 32 114 L 32 38 C 32 32, 34 28, 36 28 Z"
              fill="url(#kamjuGold)"
            />
            <path
              d="M 32 32 L 54 32 L 54 75 C 44 85, 34 105, 32 132 L 32 32 Z"
              fill="url(#kamjuGold)"
            />
            <path
              d="M 58 84 C 64 68, 76 46, 108 34 C 124 28, 134 28, 134 28 C 134 28, 118 48, 98 76 C 86 92, 70 102, 58 84 Z"
              fill="url(#kamjuCyanBlue)"
            />
            <path
              d="M 68 76 C 84 94, 108 124, 136 132 C 120 136, 98 134, 82 122 C 66 110, 58 92, 68 76 Z"
              fill="url(#kamjuPurplePink)"
            />
          </svg>

          <div className="text-left space-y-1">
            <h4 className="font-sans font-bold text-4xl sm:text-5xl text-white tracking-tight leading-none">
              Kamju
            </h4>
            <p
              className="text-xs sm:text-sm font-bold tracking-[0.28em] uppercase pt-1"
              style={{
                color: '#E5B94E',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              CREATIVES
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <SponsorImageCard
      imageUrls={[
        '/assets/sponsor-2.jpeg',
        '/sponsor-2.jpeg',
        '/assets/kamju-creatives.jpeg',
      ]}
      alt="Kamju Creatives"
      fallbackComponent={fallback}
      aspectClass="aspect-square"
      borderColor="border-neutral-800"
    />
  );
};

// Sponsor 3: The Chourasiya's Sweets & Namkeen Logo Card (1088 x 969 ~ square)
export const TheChourasiyasCard: React.FC = () => {
  const fallback = (
    <div
      className="w-full aspect-square rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-xl bg-white border border-neutral-200"
    >
      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full text-black">
        <svg
          viewBox="0 0 260 160"
          className="w-40 sm:w-48 h-24 sm:h-28 drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 112 36 L 115 16 L 122 28 L 130 10 L 138 28 L 145 16 L 148 36 Z"
            fill="#111111"
          />
          <path
            d="M 129 4 L 131 4 L 131 8 L 134 8 L 134 10 L 131 10 L 131 13 L 129 13 L 129 10 L 126 10 L 126 8 L 129 8 Z"
            fill="#111111"
          />
          <circle cx="115" cy="14" r="2" fill="#111111" />
          <circle cx="122" cy="26" r="1.8" fill="#111111" />
          <circle cx="138" cy="26" r="1.8" fill="#111111" />
          <circle cx="145" cy="14" r="2" fill="#111111" />
          <path
            d="M 110 37 C 120 40, 140 40, 150 37 L 149 41 C 139 44, 121 44, 111 41 Z"
            fill="#111111"
          />
          <ellipse
            cx="130"
            cy="80"
            rx="38"
            ry="40"
            stroke="#111111"
            strokeWidth="3.5"
            fill="none"
          />
          <ellipse
            cx="130"
            cy="80"
            rx="33"
            ry="35"
            stroke="#111111"
            strokeWidth="1.2"
            fill="none"
          />
          <text
            x="130"
            y="91"
            textAnchor="middle"
            fontFamily="'Playfair Display', 'Cinzel', 'Times New Roman', serif"
            fontSize="32"
            fontWeight="bold"
            letterSpacing="1"
            fill="#111111"
          >
            CR
          </text>
          <path
            d="M 88 44 C 96 52, 102 64, 102 78 C 102 88, 98 98, 90 106 C 82 96, 80 82, 82 70 C 84 58, 86 50, 88 44 Z"
            fill="#111111"
          />
          <path
            d="M 172 44 C 164 52, 158 64, 158 78 C 158 88, 162 98, 170 106 C 178 96, 180 82, 178 70 C 176 58, 174 50, 172 44 Z"
            fill="#111111"
          />
          <path
            d="M 130 124 C 118 124, 104 126, 92 134 C 80 142, 68 140, 60 134 C 68 130, 78 132, 88 126 C 102 118, 118 116, 130 116 C 142 116, 158 118, 172 126 C 182 132, 192 130, 200 134 C 192 140, 180 142, 168 134 C 156 126, 142 124, 130 124 Z"
            fill="#111111"
          />
          <circle cx="130" cy="138" r="3" fill="#111111" />
        </svg>

        <div className="mt-1 space-y-1 w-full">
          <span
            className="block text-xl sm:text-2xl italic text-neutral-800"
            style={{ fontFamily: "'Playfair Display', 'Brush Script MT', 'Baskerville', cursive, serif" }}
          >
            The
          </span>
          <div className="relative inline-block">
            <h4
              className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900"
              style={{
                fontFamily: "'Playfair Display', 'Cinzel Decorative', 'Georgia', serif",
              }}
            >
              Chourasiya’s
            </h4>
            <svg
              className="absolute w-4 h-4 text-neutral-900 top-0.5 right-[5.2rem] sm:right-[6.2rem] pointer-events-none"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17 8C8 10 5 19 5 19C5 19 14 16 16 7C17 2.5 17 8 17 8Z" />
              <path d="M7 17L13 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <p
            className="text-base sm:text-lg font-serif tracking-wide text-neutral-800 font-medium"
            style={{ fontFamily: "'Playfair Display', 'Times New Roman', serif" }}
          >
            Sweets & Namkeen
          </p>
          <p
            className="text-xs sm:text-sm font-serif tracking-widest text-neutral-600 font-semibold"
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
          >
            Since 2015
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <SponsorImageCard
      imageUrls={[
        '/assets/sponsor-3.jpeg',
        '/sponsor-3.jpeg',
        '/assets/chourasiyas.jpeg',
      ]}
      alt="The Chourasiya's Sweets & Namkeen"
      fallbackComponent={fallback}
      aspectClass="aspect-square"
      borderColor="border-neutral-200"
    />
  );
};
