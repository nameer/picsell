export function easeInOut(t, easeInFactor = 5, easeOutFactor = 4) {
  if (t < 0.5) {
    return Math.pow(2 * t, easeInFactor) / 2;
  } else {
    return (2 - Math.pow(-2 * t + 2, easeOutFactor)) / 2;
  }
}

/**
 * Eases in and out a value over a duration and executes a callback function.
 *
 * @param {function} callback - A function to call with the interpolated value.
 * @param {number} duration - The duration of the animation in milliseconds.
 * @param {number} end - The ending value of the animation.
 * @param {number} start - The starting value of the animation.
 */
export default function easeInOutAnimation(
  callback,
  duration,
  end,
  start = 0
) {
  let startTime = 0;
  let animationFrameId= null;

  function animate(currentTime) {
    if (startTime === 0) startTime = currentTime;
    const elapsedTime = currentTime - startTime; // Clamping with lower bound as 0 since initially the diff is less than 0
    const progress = Math.min(elapsedTime / duration, 1); // Clamp progress between 0 and 1

    // Apply ease-in-out easing function
    const easedProgress = easeInOut(progress);

    // Interpolate between start and end values
    const value = start + (end - start) * easedProgress;

    // Call the callback with the interpolated value
    callback(value);

    // Continue animation if not finished
    if (progress < 1) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      // Ensure the final value is set
      callback(end);
    }
  }

  animationFrameId = requestAnimationFrame(animate);

  return () => {
    if (typeof animationFrameId === 'number')
      cancelAnimationFrame(animationFrameId);
  };
}
