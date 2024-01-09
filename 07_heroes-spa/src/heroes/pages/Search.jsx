import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../components';
import { getHeroesByName } from '../helpers';

export const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Procesar las query params <- x si viene >1
  const { q = '' } = queryString.parse(location.search);

  const { searchText, onInputChange } = useForm({ searchText: q });

  const heroes = getHeroesByName(q);

  const handleSubmit = e => {
    e.preventDefault();
    if (!searchText.trim()) return;

    // Enviar los query params: Agregar los QP a la url sin refresh
    navigate(`?q=${searchText}`);
  };

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />

          <form onSubmit={handleSubmit} role="searchForm" data-testid="searchForm">
            <input
              type="text"
              placeholder="Search a hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />

            <button className="btn btn-primary mt-3">Search</button>
          </form>
        </div>

        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {!q ? (
            <div className="alert alert-info" aria-label="search">
              Search for an hero
            </div>
          ) : (
            !heroes.length && (
              <div aria-label="nothing" className="alert alert-danger">
                Nothing to do: {q}
              </div>
            )
          )}

          {heroes.map(hero => (
            <HeroCard key={hero.id} {...hero} />
          ))}
        </div>
      </div>
    </>
  );
};
