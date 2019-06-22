
import React from 'react';
import '../styles/Ticker.less';

const Ticker = () => (
  <div className="ticker-wrap">
    <div className="ticker">
      <div className="ticker__item">Letterpress chambray brunch.</div>
      <div className="ticker__item">Vice mlkshk crucifix beard chillwave meditation hoodie asymmetrical Helvetica.</div>
      <div className="ticker__item">Ugh PBR&B kale chips Echo Park.</div>
      <div className="ticker__item">Gluten-free mumblecore chambray mixtape food truck. </div>
    </div>
</div>
)

export default Ticker;

// <p>The difficulty with CSS was getting the animation to transform the entire items 100% yet include an offset that was only the width of the browser (and not the items full width).</p>
// <p>Setting the start of the animation to anything less than zero (e.g. -100%) is unreliable as it is based on the items width, and may not offset the full width of the browser or creates too large an offset</p>
// <p>Padding left on the wrapper allows us the correct initial offset, but you still get a 'jump' as it then loops too soon. (The full text does not travel off-screen)</p>
// <p>This is where adding display:inline-block to the item parent, where the natural behaviour of the element exists as inline, gives an opportunity to add padding-right 100% here. The padding is taken from the parent (as its treated as inline) which usefully is the wrapper width.</p>
// <p><b>Magically*</b> we now have perfect 100% offset, a true 100% translate (width of items) and enough padding in the element to ensure all items leave the screen before it repeats! (width of browser)</p>
// <p>*Why this works: The inside of an inline-block is formatted as a block box, and the element itself is formatted as an atomic inline-level box. <br>Uses `box-sizing: content-box`<br>
// Padding is calculated on the width of the containing box.<br>
// So as both the ticker and the items are formatted as nested inline, the padding must be calculated by the ticker wrap.</p>

