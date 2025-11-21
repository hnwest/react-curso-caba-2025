
export const uploadImage = async (file: File, preset: string = 'preset-publico') => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', preset);

    const response = await fetch(`https://api.cloudinary.com/v1_1/dbzilzkh7/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data.secure_url; // URL de la imagen subida
  } catch (error) {
    console.error('Error subiendo imagen:', error);
    throw error;
  }
};