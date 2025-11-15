import { useNavigate } from "react-router";

interface BackButtonProps {
  to?: string;
  onClick?: () => void;
}

export default function BackButton({ to, onClick }: BackButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    else if (to) navigate(to);
    else navigate(-1);
  };

  return (
    <div onClick={handleClick} className="flex items-center gap-1 w-fit cursor-pointer">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="url(#chevronGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <defs>
          <linearGradient id="chevronGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1874A5" />
            <stop offset="100%" stopColor="#A31AF2" />
          </linearGradient>
        </defs>
        <polyline points="15 18 9 12 15 6" />
      </svg>

      <span className="relative top-[1.5px] bg-[linear-gradient(90deg,#1874A5,#A31AF2)] bg-clip-text text-transparent w-auto font-semibold text-[14px] leading-[100%] tracking-[0]">
        Back
      </span>
    </div>
  );
}
