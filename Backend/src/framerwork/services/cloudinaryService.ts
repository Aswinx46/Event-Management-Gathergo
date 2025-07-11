import { v2 as cloudinary } from 'cloudinary'
import { ImageBufferType } from '../../domain/entities/bufferType/ImageBufferType'
import { PassThrough } from 'stream'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
// export default cloudinary

export const uploadImageToCloudinary = (input: ImageBufferType): Promise<string> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                public_id: `${input.fileName}-${Date.now()}`,
                resource_type: 'image',
                type: 'authenticated'
            },
            (error, result) => {
                if (error) reject(error)
                if (!result?.secure_url) return reject(new Error('Upload Failed, no URL Returned'))
                resolve(result.secure_url)
            }
        );
        const stream = new PassThrough()
        stream.end(input.imageBuffer)
        stream.pipe(uploadStream)
    })
}

export const uploadMultipleImages = async (files: ImageBufferType[]): Promise<string[]> => {
    return Promise.all(files.map(uploadImageToCloudinary));
};

export const generateSignedImageUrl = (publicId: string): string => {
    return cloudinary.url(publicId, {
        type: "authenticated",
        resource_type: 'image',
        sign_url: true,
        secure: true,
        expires_at: Math.floor(Date.now() / 1000) + 60 * 5,
    })
}