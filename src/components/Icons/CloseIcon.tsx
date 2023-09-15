export const CloseIcon = ({ color = "black" }: { color: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.46447 15.5355L15.5355 8.46446"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M8.46447 8.46447L15.5355 15.5355"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );
};
