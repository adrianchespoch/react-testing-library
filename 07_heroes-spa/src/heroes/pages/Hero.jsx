import { useMemo } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { getHeroById } from '../helpers';

export const Hero = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Si hubiera 1 cambio en el state q redibuje este FC se tiene memo el hero. El padre podria redibujar al hijo si cambia su state
  const hero = useMemo(() => getHeroById(id), [id]);

  const handleNavigateBack = () => {
    navigate(-1); // retrocede 1 history en el navegador (url)
  };

  if (!hero) return <Navigate to="/" />;

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          src={`/assets/heroes/${id}.jpg`}
          alt={hero.superhero}
          className="img-thumbnail animate__animated animate__fadeInLeft"
        />
      </div>

      <div className="col-8">
        <h3>{hero.superhero}</h3>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Alter ego: </b> {hero.alter_ego}
          </li>
          <li className="list-group-item">
            <b>Publisher: </b> {hero.publisher}
          </li>
          <li className="list-group-item">
            <b>First Appearance: </b> {hero.first_appearance}
          </li>
        </ul>

        <h5 className="mt-3">Characters</h5>
        <p>{hero.characters}</p>

        <button className="mt-3 btn btn-primary" onClick={handleNavigateBack}>
          Regresar
        </button>
      </div>
    </div>
  );
};
