import { useState, useRef } from 'react';

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageSelect: (file: File) => void;
}

export function ImageUpload({ currentImageUrl, onImageSelect }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState(currentImageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div
        onClick={handleImageClick}
        className="relative w-32 h-32 rounded-full overflow-hidden cursor-pointer group"
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Foto do perfil"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
            <span className="text-gray-400">
              <i className="fas fa-user text-3xl"></i>
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-white text-sm">Alterar foto</span>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
} 