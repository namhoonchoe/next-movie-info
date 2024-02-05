import { scrollToR, scrollTol } from "@/utils/utilFunctions";
 
type ImageSliderProps = { 
  targetRef:any
}

const ImageSlider:React.FC<ImageSliderProps> = ({targetRef}) => {
 
  return (
    <div className="absolute flex justify-between transform -translate-y-1/2 -left-4 -right-4 top-1/2">
      <button
        onClick={() => {
          scrollTol(targetRef.current);
          console.log(targetRef.current);
        }}
        className="btn btn-sm  btn-circle shadow-sm"
      >
        ❮
      </button>
      <button
        onClick={() => {
          scrollToR(targetRef.current);
          console.log(targetRef.current);
        }}
        className="btn btn-sm  btn-circle shadow-sm"
      >
        ❯
      </button>
    </div>
  );
}

export default ImageSlider;