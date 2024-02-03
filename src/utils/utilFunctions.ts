export function getOneDecimalPlaceNumber(target: number) {
    const refinedNumber = Number(target.toFixed(2))*10
    return  Math.floor(refinedNumber) / 10  ;
  
}

export function runningTimeConverter(inputNumber: number) {
  if (inputNumber) {
    const Hour = Math.floor(inputNumber / 60);
    const Minute = inputNumber % 60;
    return `${Hour}시간 ${Minute}분 `;
  }
}

export function releaseYear(releaseDate: string) {
  if (releaseDate) {
    return releaseDate.slice(0, 4);
  }
}

/**스크롤 버튼 조작 함수 */

export const scrollToR = (element:any) => {
  const step = element.offsetWidth/3 
  element.scrollLeft += step;
};

export const scrollTol = (element: any) => {
  const step = element.offsetWidth/3 

  element.scrollLeft -= step;
};
