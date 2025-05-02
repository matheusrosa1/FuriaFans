export const getCroppedImg = (imageSrc: string, croppedAreaPixels: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = "anonymous"; // Para evitar problemas de CORS

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        return reject(new Error('Failed to get canvas context'));
      }

      // Define o tamanho do canvas
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      // 🔥 Aqui que arrumamos:
      // Preenche o fundo do canvas com transparente
      ctx.fillStyle = "rgba(0,0,0,0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Desenha a imagem cortada
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        canvas.width,
        canvas.height
      );

      // Gera o base64 da imagem recortada
      const base64Image = canvas.toDataURL('image/png');
      resolve(base64Image);
    };

    image.onerror = (error) => {
      reject(error);
    };
  });
};
