import multer from "multer" 


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // cria um nome unico para o arquivo que esta sendo salvo
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
})


 
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
    // verifica que o arquivo enviado é uma imagem jpeg, png ou gif
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Arquivo não é uma imagem!'), false);
    }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10MB
}).single('image'); // 'image' é o campo onde o arquivo será enviado

export { upload };