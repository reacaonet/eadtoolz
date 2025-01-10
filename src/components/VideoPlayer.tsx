import React from 'react';
import { Channel } from '../types/channel';

interface VideoPlayerProps {
  channel: Channel;
  onClose: () => void;
}

export function VideoPlayer({ channel, onClose }: VideoPlayerProps) {
  return (
    <div className="fixed inset-0 bg-black z-50">
      <div className="absolute top-4 right-4">
        <button
          onClick={onClose}
          className="text-white hover:text-red-500"
        >
          Fechar
        </button>
      </div>
      
      <video
        className="w-full h-full"
        controls
        autoPlay
        src={channel.url}
      >
        Seu navegador não suporta o elemento de vídeo.
      </video>
    </div>
  );
}