export const formatTimeLeft = (estimateTime: number) => {
    const secondsLeft = Math.max(0, (estimateTime - Date.now()) / 1000);
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = Math.floor(secondsLeft % 60);
    return `${minutes}m ${seconds}s`;
};