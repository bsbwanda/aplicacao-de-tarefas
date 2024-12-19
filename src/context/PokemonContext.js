import React, { createContext, useState, useEffect } from 'react';

// Criando o contexto global para Pokémons e Carrinho
export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [cart, setCart] = useState([]);

  // Carregar os Pokémons de uma API externa ao carregar a aplicação
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
    setCart(cart.filter((item) => item.id !== pokemonId));
  };

  return (
    <PokemonContext.Provider value={{ pokemons, cart, addToCart, removeFromCart }}>
      {children}
    </PokemonContext.Provider>
  );
};
