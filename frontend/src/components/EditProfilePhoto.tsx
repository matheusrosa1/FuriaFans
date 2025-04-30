import { EditProfilePhotoProps } from "@/interfaces/EditProfilePhotoProps";
import { getCroppedImg } from "@/utils/cropImage";
import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

export default function EditProfilePhoto({ onSave, onCancel }: EditProfilePhotoProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  const readFile = (file: File) => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result as string));
      reader.readAsDataURL(file);
    });
  };

  const generateCroppedImage = useCallback(async () => {
    try {
      const cropped = await getCroppedImg(
        imageSrc as string,
        croppedAreaPixels
      );
      if (cropped) {
        setCroppedImage(cropped); // Salva o preview primeiro
      }
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  return (
    <div className="flex flex-col items-center p-4">
      {!imageSrc && (
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-4"
        />
      )}

      {imageSrc && !croppedImage && (
        <>
          <div className="relative w-80 h-80">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={generateCroppedImage}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Recortar Imagem
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancelar
            </button>
          </div>
        </>
      )}

      {croppedImage && (
        <>
          <div className="flex flex-col items-center mt-6">
            <h3 className="text-lg font-semibold mb-2 text-white">Preview da Imagem Recortada:</h3>
            <img
              src={croppedImage}
              alt="Cropped"
              className="w-40 h-40 rounded-full object-cover border"
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={() => onSave(croppedImage)}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Confirmar
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancelar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
