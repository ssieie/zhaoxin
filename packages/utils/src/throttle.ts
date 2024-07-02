export function throttle(
  func: Function,
  wait: number,
  options?: Record<"leading" | "trailing", boolean>,
) {
  let timeout: number|null, context: any, args: any;
  let previous: number = 0;
  if (!options) {
    options = {
      leading: false,
      trailing: false,
    };
  }

  let later = function () {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    func.apply(context, args);
    if (!timeout) context = args = null;
  };

  let throttled: any = function () {
    let now = new Date().getTime();
    if (!previous && options.leading === false) previous = now;
    let remaining = wait - (now - previous);
    // @ts-ignore
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = window.setTimeout(later, remaining);
    }
  };

  throttled.cancel = function () {
    clearTimeout(timeout!);
    previous = 0;
    timeout = null;
  };

  return throttled;
}
