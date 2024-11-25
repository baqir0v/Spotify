import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse } from 'cloudinary';
import * as path from "path"
import * as dotenv from "dotenv"

const dotenvPath = path.join(__dirname, "..", "..", ".env")
dotenv.config({ path: dotenvPath })

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

@Injectable()
export class CloudinaryService {
    async uploadFile(buffer: Buffer): Promise<any> {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { resource_type: 'auto' },
                (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                },
            );
            stream.end(buffer); 
        });
    }
}
