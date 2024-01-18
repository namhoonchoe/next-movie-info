
const HeartIcon: React.FC<IconPropTypes> = ({
  width = "1.5rem",
  height = "1.5rem",
  fill = "#1C1B1F",
})=> {
  return (
    <svg
    width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m12.82 5.58-.82.822-.824-.824a5.375 5.375 0 1 0-7.601 7.602l7.895 7.895a.75.75 0 0 0 1.06 0l7.902-7.897a5.376 5.376 0 0 0-.001-7.599 5.38 5.38 0 0 0-7.611 0Z"
        fill={fill}
      />
    </svg>
  );
};

export default HeartIcon;
