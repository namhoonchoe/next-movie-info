
const SearchIcon : React.FC<IconPropTypes> = ({
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
        d="M10 2.5a7.5 7.5 0 0 1 5.964 12.048l4.743 4.745a1 1 0 0 1-1.32 1.497l-.094-.083-4.745-4.743A7.5 7.5 0 1 1 10 2.5Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z"
        fill={fill}
      />
    </svg>
  );
};

export default SearchIcon;
