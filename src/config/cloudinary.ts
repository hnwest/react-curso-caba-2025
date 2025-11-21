// filepath: src/config/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

// Configuración (usa solo cloud_name y api_key en el cliente; api_secret nunca aquí)
cloudinary.config({
  cloud_name: 'dbzilzkh7',
  api_key: '843833845229858',
  // api_secret: '<your_api_secret>' // NO usar en el cliente
});

export default cloudinary;