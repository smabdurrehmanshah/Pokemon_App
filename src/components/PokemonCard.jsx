import "./Pokemon.css";

export const PokemonCard = ({ pokemonData }) => {
  return (
    <li className="pokemon-card">
      <figure>
        <img
          src={pokemonData.sprites.other.dream_world.front_default}
          alt={pokemonData.name}
        />
      </figure>
      <h2 className="capitalize">{pokemonData.name}</h2>

      <div className="pokemon-types">
        <p className="capitalize">
          {pokemonData.types
            .map((currPokemon) => currPokemon.type.name)
            .join(", ")}
        </p>
      </div>

      <div className="grid-three-cols">
        <p>
          <span>Height:</span> {pokemonData.height}
        </p>
        <p>
          <span>Weight:</span> {pokemonData.weight}
        </p>
        <p>
          <span>Speed:</span> {pokemonData.stats[5].base_stat}
        </p>
      </div>

      <div className="grid-three-cols">
        <div>
          <p>{pokemonData.base_experience}</p>
          <span>Experience</span>
        </div>

        <div>
          <p>{pokemonData.stats[1].base_stat}</p>
          <span>Attack</span>
        </div>

        <div>
          <p>
            {pokemonData.abilities
              .map((currPokemon) => currPokemon.ability.name)
              .slice(0, 1)}
          </p>
          <span>Abilities</span>
        </div>
      </div>
    </li>
  );
};
