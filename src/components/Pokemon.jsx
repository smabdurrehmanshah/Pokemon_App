import { useEffect, useState } from "react";
import "./Pokemon.css";
import { PokemonCard } from "./PokemonCard";

export const Pokemon = () => {
  const [pokemons, setPokemons] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const API = "https://pokeapi.co/api/v2/pokemon?limit=50";

  const fetchPokemons = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();

      const detailedData = data.results.map(async (currPokemon) => {
        const response = await fetch(currPokemon.url);
        const data = await response.json();
        return data;
      });

      const detailedPokemonsData = await Promise.all(detailedData);
      setPokemons(detailedPokemonsData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const handleSearchInput = (event) => {
    setSearch(event.target.value);
  };

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  const searchedPokemons = pokemons.filter((currPokemon) =>
    currPokemon.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <>
      <header>
        <h1>Lets Catch Pokémon</h1>
      </header>

      <div className="search-input">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={search}
          onChange={handleSearchInput}
        />
      </div>

      <ul className="pokemon-cards">
        {searchedPokemons.map((currPokemon) => {
          return <PokemonCard key={currPokemon.id} pokemonData={currPokemon} />;
        })}
      </ul>
    </>
  );
};
