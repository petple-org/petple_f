// ❌ S3 Presigned URL 방식은 더 이상 사용하지 않습니다.
// 이미지 업로드는 /src/utils/imageUpload.ts의 imageUpload(), multipleImageUpload() 함수를 사용하세요.

/*
import baseInstance from "./axios";

const getPresignedUrl = async ({
  fileName,
  fileType,
}: {
  fileName: string;
  fileType: string;
}) => {
  try {
    const response = await baseInstance.get(
      `/images/s3/presigned-url?fileName=${fileName}&fileType=${fileType}`
    );
    return response.data.presignedUrl;
  } catch (error) {
    throw error;
  }
};

export { getPresignedUrl };
*/
