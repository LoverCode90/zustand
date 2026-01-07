interface ButtonProps {
  label: string;
  textColor?: string;
  bgColor?: string;
  onClick?: () => void;
}

export default function Button({
  label,
  textColor,
  bgColor,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`mx-auto px-4 py-2 cursor-pointer rounded font-medium ${
        bgColor ? bgColor : "bg-blue-600"
      }`}
    >
      <span className={`${textColor ? textColor : "text-white"}`}>{label}</span>
    </button>
  );
}
