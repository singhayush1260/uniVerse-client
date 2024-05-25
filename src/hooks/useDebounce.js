
const useDebounce=(fn,delay)=>{
let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        let context = this;
        let args = arguments;
        fn.apply(context, args);
      }, delay);
    };
}
export default useDebounce;


