import Home from './pages/Home'
import PokemonDetail from './pages/PokemonDetail';
import PokemonList from './pages/PokemonList';
import SpeciesList from './pages/SpeciesList';
import SpeciesOverview from './pages/SpeciesOverview';



const routes = [
    { path: "/", element: <Home /> },
    { path: "/species", element: <SpeciesList /> },
    { path: "/species/:speciesId", element: <SpeciesOverview /> },
    { path: "/species/:speciesId/pokemons", element: <PokemonList /> },
    { path: "/species/:speciesId/pokemons/:pokemonId", element: <PokemonDetail /> },
];

export default routes;