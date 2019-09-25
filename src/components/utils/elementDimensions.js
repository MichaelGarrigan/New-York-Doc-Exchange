
import React, {useState, useCallback, useLayoutEffect} from 'react';

// A hook to retrieve the height and width of an element with an event listener

export default () => {
  const [dimensions, setDimensions] = useState({width: 960, height: 500});
  const [node, setNode] = useState(null);

  const sizeRef = useCallback(node => {
      setNode(node);
  }, []);

  useLayoutEffect(() => {
    if (node) {
      const measure = () =>
        window.requestAnimationFrame(() => {
          let {width, height} = node.getBoundingClientRect();

          let maxWidth1000 = width > 1000 ? 1000 : width;

          console.log('w:', width, maxWidth1000)

          setDimensions({ 
            width: Math.round(maxWidth1000), 
            height: Math.round(height),
            // maxWidth1000: Math.round(maxWidth1000) 
          })
        });
      
      measure();

      window.addEventListener("resize", measure);

      return () => { window.removeEventListener("resize", measure); };
      }
  }, [node]);

  return ({ sizeRef, dimensions });
}
