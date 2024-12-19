import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useParams } from 'react-router-dom';

// Contexto para gerenciar os Pokémons e o Carrinho
const PokemonContext = createContext();

const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [cart, setCart] = useState([]);

  // Carregar os Pokémons de uma API externa
  useEffect(() => {
    const fetchPokemons = async () => {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
      const data = await res.json();
      setPokemons(data.results);
    };

    fetchPokemons();
  }, []);

  // Carregar o carrinho do localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Salvar o carrinho no localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (pokemon) => {
    setCart([...cart, pokemon]);
  };

  const removeFromCart = (pokemonId) => {
    setCart(cart.filter((item) => item.name !== pokemonId));
  };

  return (
    <PokemonContext.Provider value={{ pokemons, cart, addToCart, removeFromCart }}>
      {children}
    </PokemonContext.Provider>
  );
};

const Home = () => {
  const { pokemons, addToCart } = useContext(PokemonContext);

  return (
    <div>
      <h1>Catálogo de Pokémons</h1>
      <div className="pokemon-list">
        {pokemons.map((pokemon) => (
          <div key={pokemon.name} className="pokemon-card">
            <Link to={`/pokemon/${pokemon.name}`}>
              <h2>{pokemon.name}</h2>
            </Link>
            <button onClick={() => addToCart(pokemon)}>Adicionar ao Carrinho</button>
          </div>
        ))}
      </div>
      <Link to="/cart">Ir para o Carrinho</Link>
    </div>
  );
};

const PokemonDetails = () => {
  const { id } = useParams();
  const { pokemons, addToCart } = useContext(PokemonContext);
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
      setPokemonDetails(data);
    };

    fetchDetails();
  }, [id]);

  if (!pokemonDetails) return <div>Carregando...</div>;

  return (
    <div>
      <h1>{pokemonDetails.name}</h1>
      <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
      <p>Habilidades: {pokemonDetails.abilities.map((a) => a.ability.name).join(', ')}</p>
      <button onClick={() => addToCart(pokemonDetails)}>Adicionar ao Carrinho</button>
      <Link to="/">Voltar</Link>
    </div>
  );
};

const CartPage = () => {
  const { cart, removeFromCart } = useContext(PokemonContext);

  return (
    <div>
      <h1>Carrinho de Compras</h1>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul>
          {cart.map((pokemon) => (
            <li key={pokemon.name}>
              {pokemon.name}
              <button onClick={() => removeFromCart(pokemon.name)}>Remover</button>
            </li>
          ))}
        </ul>
      )}
      <button>Finalizar Compra</button>
      <Link to="/">Voltar para o Catálogo</Link>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <PokemonProvider>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/pokemon/:id" component={PokemonDetails} />
          <Route path="/cart" component={CartPage} />
        </Switch>
      </PokemonProvider>
    </Router>
  );
};

export default App;
