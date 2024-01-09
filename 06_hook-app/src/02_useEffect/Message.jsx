import { useEffect, useState } from 'react';

export const Message = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // console.log('Menssage Mounted');
    const onMouseMove = ({ x, y }) => {
      setCoords({ x, y });
    };

    window.addEventListener('mousemove', onMouseMove);

    // // Desmonta el FC: Desaparece del HTML
    return () => {
      // console.log('Message UNMOUNTED');
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <>
      <h3 className="mt-4">Usuario ya existe</h3>

      {JSON.stringify(coords, null, 3)}
    </>
  );
};
