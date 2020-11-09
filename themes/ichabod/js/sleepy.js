const sleepyBtn = document.getElementById( 'sleepy-button' );
const closeSleepy = document.getElementById( 'close-sleepy' );

/**
 * Reveal the Legend of Sleepy Hollow.
 */
const showStory = () => {
  const story = document.getElementById( 'sleepy-hollow' );

  story.style.display = 'block';
};

/**
 * Conceal the Legend of Sleepy Hollow.
 */
const hideStory = () => {
  const story = document.getElementById( 'sleepy-hollow' );

  story.style.display = 'none';
  sleepyBtn.style.display = 'none';
};

// Initialize key listener position.
let ichabodCurrent = 0;

/**
 * Check user key inputs for secret code.
 * If code is entered, make the Legend of Sleepy Hollow available to read.
 *
 * @param {Event} e JavaScript event object.
 */
const keyHandler = e => {
  const btn = document.getElementById( 'sleepy-button' );

  const code = [
    'p', 'u', 'm', 'p', 'k', 'i', 'n',
  ];

  if ( code.indexOf( e.key ) < 0 || e.key !== code[ichabodCurrent] ) {
    ichabodCurrent = 0;
  }

  ichabodCurrent += 1;

  if ( code.length === ichabodCurrent ) {
    ichabodCurrent = 0;

    btn.style.display = 'block';
  }
};

// Listen for click on show story button.
sleepyBtn.addEventListener( 'click', () => {
  showStory();
} );

// Listen for click on close story button.
closeSleepy.addEventListener( 'click', () => {
  hideStory();
} );

// Listen for secret code.
document.addEventListener( 'keydown', keyHandler, false );
