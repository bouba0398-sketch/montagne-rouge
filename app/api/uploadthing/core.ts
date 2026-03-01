import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  inscriptionDocs: f({
    image: { maxFileSize: "16MB", maxFileCount: 6 },
    pdf:   { maxFileSize: "16MB", maxFileCount: 6 },
  })
    .middleware(async () => ({}))
    .onUploadComplete(async ({ file }) => ({
      url:  file.ufsUrl,
      name: file.name,
      size: file.size,
      type: file.type,
    })),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
