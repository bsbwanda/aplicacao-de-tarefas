import React, { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import PokemonCard from '../components/PokemonCard';

const Home = () => {
  const { pokemons, addToCart } = useContext(PokemonContext);

  return (
    <div>
      <h1>Catálogo de Pokémons</h1>
      <div className="pokemon-list">
        {pokemons.map((pokemon, index) => (
          <PokemonCard
            key={index}
            pokemon={pokemon}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
