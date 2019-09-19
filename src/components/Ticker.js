
import React from 'react';
import '../styles/Main.less';

export default ({ tickerData }) => (
  <div className={`ticker-wrap ${tickerData.speedName}`}>
    <div 
      className="ticker" 
      style={{animationDuration: tickerData.speed}}
    >
      {
        tickerData.items.map( item => (
          <div 
            key={item.key}
            className="ticker__item"
            style={{color: item.color}}
          >{item.text}</div>
        ))
      }
    </div>
  </div>
);