export default (fn) => {
    let running = false;
  
    return () => {
      if (running) return;
  
      running = true;
  
      window.requestAnimationFrame(() => {
        // @ts-ignore  
        fn.apply(this, arguments); 
        running = false;
      });
    };
};