import fileUpload, { UploadedFile } from 'express-fileupload';

const filesUpload = fileUpload;
type UploadFile = UploadedFile;

export { filesUpload, UploadFile };
