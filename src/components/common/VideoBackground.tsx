import React from 'react';

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  overlayClassName?: string;
  children?: React.ReactNode;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({ src, poster, overlayClassName = '', children }) => {
  return (
    <div className="absolute inset-0">
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        className="w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className={`absolute inset-0 ${overlayClassName}`} />
      {children}
    </div>
  );
};
