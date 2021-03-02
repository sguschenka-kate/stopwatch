const timeConvertion = (sec) => {
  let seconds = sec;
  let minutes = Math.floor(sec / 60);
  seconds = seconds % 60;
  const hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  return `${hours < 10 ? `0` + hours : hours} : ${minutes < 10 ? `0` + minutes : minutes} : ${seconds < 10 ? `0` + seconds : seconds}`;
}

export {
  timeConvertion
}