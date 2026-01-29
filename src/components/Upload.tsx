'use client';

import { ChangeEvent, useState } from 'react';

export const CloudinaryUpload = ({ onUploadComplete, onError }: any) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      // 1. Get signature from your internal API
      const sigResponse = await fetch('/api/sign-cloudinary', { method: 'POST' });
      const { signature, timestamp } = await sigResponse.json();

      // 2. Prepare Form Data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
      formData.append('signature', signature);
      formData.append('timestamp', timestamp.toString());
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

      // 3. Upload to Cloudinary
      const endpoint = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
      const res = await fetch(endpoint, { method: 'POST', body: formData });
      
      const data = await res.json();
      onUploadComplete(data.secure_url);
    } catch (err) {
      onError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <input type="file" onChange={handleUpload} disabled={loading} />
  );
};