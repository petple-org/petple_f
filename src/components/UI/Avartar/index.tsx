import useUserStore from "@/zustand/userStore";
import style from "./avartar.module.css";
import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DEFAULT_PROFILE_IMAGE = "/images/profile.png";

interface AvartarProps {
  onClick?: () => void;
  className?: string | null;
  image?: string | null;
  alt?: string;
  creator?: {
    id: number;
    name: string;
    email: string;
    nickname: string;
    profileImage: string;
  };
}

const Avartar: FC<AvartarProps> = (props) => {
  const { onClick, className, alt, creator, image } = props;
  const { user } = useUserStore();
  const { nickname } = useParams<string>();
  const navigate = useNavigate();

  // 이미지 유효성 검증
  const validImage = image && image.trim() !== ""
    ? image
    : DEFAULT_PROFILE_IMAGE;

  const handleAvatarClick = async () => {
    if (!creator) return;
    if (user?.nickname === creator.nickname || nickname) {
      return navigate("/profile");
    }

    return navigate(`/profile/${creator.nickname}`);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    // 먼저 .png를 시도하고, 실패하면 .webp 시도 (빌드 시 최적화됨)
    if (target.src.endsWith('.png')) {
      target.src = '/images/profile.webp';
    } else if (!target.src.includes('/images/profile')) {
      target.src = DEFAULT_PROFILE_IMAGE;
    }
  };

  return (
    <>
      <a onClick={onClick || handleAvatarClick} className={style.a}>
        <img
          src={validImage}
          onError={handleImageError}
          className={`${style.image} ${className}`}
          alt={alt ?? "프로필 이미지"}
          loading="lazy"
          decoding="async"
        />
      </a>
    </>
  );
};

export default Avartar;
