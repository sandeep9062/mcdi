import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
    // Define as many "endpoints" as you need
    Image: f({ image: { maxFileSize: "4MB" } })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete. URL:", file.ufsUrl);
            return { url: file.ufsUrl };
        }),

    Video: f({ video: { maxFileSize: "128MB" } })
        .onUploadComplete(async ({ file }) => {
            return { url: file.ufsUrl };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
