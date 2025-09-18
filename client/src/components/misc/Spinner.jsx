import '../../css/colors.css';
import '../../css/misc/spinner.css';


const Spinner = ({ size = 48, ariaLabel = 'Loading' }) => {
  const style = {
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
  };

  return (
    <div className="spinner-wrapper" role="status" aria-label={ariaLabel}>
      <div className="spinner" style={style}></div>
    </div>
  );
};

export default Spinner;


//  USAGE EXAMPLE:
// ---------------
// 1. Import the Spinner component where needed
// 2. Use the <Spinner /> component in your JSX, optionally passing a size prop
// 3. The size prop can be a number (in pixels) or a string (with units like %, em, rem, etc.)
// 4. The default size is 48px if no size prop is provided

// import Spinner from './components/misc/Spinner';
// // ...
// <Spinner size={32} />