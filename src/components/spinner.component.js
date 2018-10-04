import React from 'react';
import SpinnerImg from '../images/spinner.gif';

const Spinner = () => {
  return (
    <img
      src={SpinnerImg}
      alt="Loading..."
      style={{width: 64, margin: '40px auto', display: 'block'}}
      />
  )
}

export default Spinner;
