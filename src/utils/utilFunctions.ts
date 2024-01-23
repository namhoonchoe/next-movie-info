export function getOneDecimalPlaceNumber(target: number) {
  if (target) {
    return Number(target.toFixed(1));
  }
}

export function runningTimeConverter(inputNumber: number) {
  if (inputNumber) {
    const Hour = Math.floor(inputNumber / 60);
    const Minute = inputNumber % 60;
    return `${Hour}시간 ${Minute}분 `;
  }
}

export function releaseYear(releaseDate:string) {
  if (releaseDate) {
    return releaseDate.slice(0,4);
  }
}
