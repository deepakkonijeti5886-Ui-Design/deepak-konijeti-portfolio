import React, { useEffect, useState } from 'react';

interface DeepakFaceAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isSpeaking?: boolean;
  isWalking?: boolean;
  showBadge?: boolean;
  usePhoto?: boolean;
  className?: string;
  onClick?: () => void;
}

export const DeepakFaceAvatar: React.FC<DeepakFaceAvatarProps> = ({
  size = 'md',
  isSpeaking = false,
  isWalking = false,
  showBadge = true,
  usePhoto = false,
  className = '',
  onClick
}) => {
  const [blink, setBlink] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);
  const [customPhotoSrc, setCustomPhotoSrc] = useState<string | null>(() => {
    return localStorage.getItem('deepak_custom_portrait');
  });

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ dataUrl: string }>;
      if (customEvent.detail?.dataUrl) {
        setCustomPhotoSrc(customEvent.detail.dataUrl);
      }
    };
    window.addEventListener('update-deepak-portrait', handleUpdate);
    return () => window.removeEventListener('update-deepak-portrait', handleUpdate);
  }, []);

  // Periodic natural eye blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 160);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  // Subtle mouth flutter when speaking
  useEffect(() => {
    if (!isSpeaking) {
      setMouthOpen(false);
      return;
    }
    const mouthInterval = setInterval(() => {
      setMouthOpen((prev) => !prev);
    }, 180);
    return () => clearInterval(mouthInterval);
  }, [isSpeaking]);

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28'
  };

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none ${className} ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {/* Outer Pulse Ring when walking or speaking */}
      {(isWalking || isSpeaking) && (
        <span className="absolute -inset-1 rounded-full bg-[#2B63F6]/30 animate-ping opacity-60 pointer-events-none" />
      )}

      {/* Main Avatar Container with dynamic walking bob */}
      <div
        className={`${sizeClasses[size]} relative rounded-full overflow-hidden border-2 border-white dark:border-[#2B63F6] shadow-lg bg-gradient-to-b from-[#222733] to-[#12141A] transition-transform duration-200 ${
          isWalking ? 'animate-bounce' : ''
        } ${isSpeaking ? 'scale-105 ring-2 ring-[#2B63F6]' : ''}`}
      >
        {customPhotoSrc || usePhoto ? (
          <img
            src={customPhotoSrc || '/assets/hero_center.png'}
            alt="Deepak Konijeti"
            className="w-full h-full object-cover object-[50%_14%]"
          />
        ) : (
          <svg
            viewBox="100 80 200 240"
            className="w-full h-full object-cover transform scale-110 translate-y-1"
          >
          <defs>
            <linearGradient id="avatarSkin" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C48858" />
              <stop offset="50%" stopColor="#B37545" />
              <stop offset="100%" stopColor="#965D32" />
            </linearGradient>
            <linearGradient id="avatarShirt" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="50%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
          </defs>

          {/* Background studio tint */}
          <rect x="100" y="80" width="200" height="240" fill="#1C212D" />

          {/* Shoulders & Shirt Collar */}
          <path
            d="M120 320 C120 280 150 255 170 245 L230 245 C250 255 280 280 280 320 Z"
            fill="url(#avatarShirt)"
          />
          <path d="M170 245 L200 285 L180 290 L160 255 Z" fill="#F8FAFC" opacity="0.9" />
          <path d="M230 245 L200 285 L220 290 L240 255 Z" fill="#F8FAFC" opacity="0.9" />

          {/* Neck */}
          <path d="M175 200 L175 255 L225 255 L225 200 Z" fill="url(#avatarSkin)" />
          <path d="M175 240 Q200 255 225 240 Z" fill="#783F1D" opacity="0.4" />

          {/* Face Oval */}
          <ellipse cx="200" cy="180" rx="55" ry="68" fill="url(#avatarSkin)" />

          {/* Ears */}
          <ellipse cx="144" cy="182" rx="7" ry="14" fill="#B37545" />
          <ellipse cx="256" cy="182" rx="7" ry="14" fill="#B37545" />

          {/* Styled Hair */}
          <path
            d="M142 165 C142 105 168 95 200 95 C232 95 258 105 258 165 C254 135 238 116 200 120 C162 116 146 135 142 165 Z"
            fill="#121316"
          />
          <path
            d="M156 112 Q175 98 200 112 Q225 98 244 112 Q252 106 250 125 C230 115 170 115 156 112"
            fill="#27272A"
          />

          {/* Eyebrows */}
          <path
            d="M162 154 Q178 148 190 154"
            stroke="#121316"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M210 154 Q222 148 238 154"
            stroke="#121316"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Eyes (with blinking support) */}
          {blink ? (
            <>
              <line x1="168" y1="168" x2="186" y2="168" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="214" y1="168" x2="232" y2="168" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Left Eye */}
              <ellipse cx="177" cy="167" rx="7.5" ry="5.5" fill="#FFFFFF" />
              <circle cx="178" cy="167" r="4" fill="#0F172A" />
              <circle cx="179" cy="165" r="1.3" fill="#FFFFFF" />

              {/* Right Eye */}
              <ellipse cx="223" cy="167" rx="7.5" ry="5.5" fill="#FFFFFF" />
              <circle cx="222" cy="167" r="4" fill="#0F172A" />
              <circle cx="223" cy="165" r="1.3" fill="#FFFFFF" />
            </>
          )}

          {/* Nose */}
          <path
            d="M198 165 L196 188 Q200 192 204 188"
            stroke="#783F1D"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />

          {/* Lips / Mouth (animates when speaking) */}
          {mouthOpen ? (
            <ellipse cx="200" cy="208" rx="8" ry="5" fill="#5A2411" stroke="#8A4A28" strokeWidth="1.5" />
          ) : (
            <path
              d="M188 206 Q200 214 212 206"
              stroke="#8A4A28"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          )}

          {/* Glasses matching Deepak's real photo */}
          <circle cx="177" cy="167" r="14" fill="none" stroke="#C084FC" strokeWidth="2.2" opacity="0.85" />
          <circle cx="223" cy="167" r="14" fill="none" stroke="#C084FC" strokeWidth="2.2" opacity="0.85" />
          <path d="M191 167 Q200 163 209 167" fill="none" stroke="#C084FC" strokeWidth="2.2" opacity="0.85" />
          <path d="M163 167 L146 163" fill="none" stroke="#C084FC" strokeWidth="2" opacity="0.75" />
          <path d="M237 167 L254 163" fill="none" stroke="#C084FC" strokeWidth="2" opacity="0.75" />

          {/* Trimmed Beard & Mustache */}
          <path
            d="M148 180 C148 215 165 242 200 242 C235 242 252 215 252 180 C252 210 232 235 200 235 C168 235 148 210 148 180 Z"
            fill="#121316"
            opacity="0.9"
          />
          <path d="M184 200 Q200 206 216 200 Q200 211 184 200 Z" fill="#121316" />
          <ellipse cx="200" cy="226" rx="14" ry="9" fill="#121316" />
        </svg>
      )}
      </div>

      {/* Online indicator green beacon */}
      {showBadge && (
        <span
          className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-[#14161B] shadow flex items-center justify-center"
          title="Deepak Bot Online (Deterministic Guide)"
        >
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        </span>
      )}
    </div>
  );
};
