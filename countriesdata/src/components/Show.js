import { useState } from 'react';
import CountryDetail from './CountryDetail';

const Show = ({country}) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  if (!show) return <button onClick={handleShow}>SHOW</button>

  return (
    <>
      <button onClick={handleShow}>HIDE</button>
      <CountryDetail country={country} />
    </>
  );
}

export default Show;