import baseInstance from "@/apis/axios";

/**
 * 단일 이미지 업로드
 * @param file - 업로드할 파일
 * @param category - 이미지 카테고리 (profiles, posts, pets)
 * @returns 업로드된 이미지 URL
 */
export const imageUpload = async (
  file: File,
  category: "profiles" | "posts" | "pets" = "profiles"
): Promise<string> => {
  try {
    // FormData 생성
    const formData = new FormData();
    formData.append("image", file);

    // 백엔드로 POST 요청
    const response = await baseInstance.post(
      `/images/upload/${category}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // 백엔드에서 반환한 이미지 URL
    return response.data.imageUrl;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};

/**
 * 다중 이미지 업로드
 * @param files - 업로드할 파일 배열
 * @param category - 이미지 카테고리 (posts가 기본값)
 * @returns 업로드된 이미지 URL 배열
 */
export const multipleImageUpload = async (
  files: File[],
  category: "profiles" | "posts" | "pets" = "posts"
): Promise<string[]> => {
  try {
    // FormData 생성
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("images", file);
    });

    // 백엔드로 POST 요청
    const response = await baseInstance.post(
      `/images/upload-multiple/${category}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // 백엔드에서 반환한 이미지 URL 배열
    return response.data.images.map((img: { url: string }) => img.url);
  } catch (error) {
    console.error("Multiple image upload failed:", error);
    throw error;
  }
};
