export const calcTimeEstimate = (distance: number, speed: number) => {
  const prepareTime = 1; // minutes
  const estimateTimeMinutes = (distance / speed) * 60;
  const estimateTimePrepared = estimateTimeMinutes + prepareTime;

  if (estimateTimePrepared < 1) return "1 phút";

  return Math.round(estimateTimePrepared); // minutes
};

export const randomDistanceTimeEstimate = () => {
  const distanceRandom = Math.random() * 10; // km
  const speed = 200; // km/h
  const timeEstimate = calcTimeEstimate(distanceRandom, speed);
  return { timeEstimate, distanceRandom: `${distanceRandom.toFixed(2)} km` };
};
