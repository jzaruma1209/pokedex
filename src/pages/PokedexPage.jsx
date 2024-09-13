import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useFetch from '../hooks/useFetch';
import PokeCard from '../components/PokedexPage/PokeCard';
import SelectType from '../components/PokedexPage/SelectType';
import './styles/PokedexPage.css';
import Header from '../shared/Header';
import Pagination from '../components/PokedexPage/Pagination';

const PokedexPage = () => {
	const trainer = useSelector((slices) => slices.trainer);
	const [pokemons, getPokemons, getTypePokemons] = useFetch();
	const [searchedName, setSearchedName] = useState('');
	const [typeSelected, setTypeSelected] = useState('allPokemons');
	const [pokemonsPerPage, setPokemonsPerPage] = useState(20);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		if (typeSelected === 'allPokemons') {
			const url = 'https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0';
			getPokemons(url);
		} else {
			getTypePokemons(typeSelected);
		}
	}, [typeSelected]);

	const inputName = useRef();

	const handleSearch = (e) => {
		e.preventDefault();
		setSearchedName(inputName.current.value.trim().toLowerCase());
		setCurrentPage(1);
		e.target.reset();
	};
	const callbackFilter = (poke) => {
		const filterName = poke.name.includes(searchedName);
		return filterName;
	};

	const lastIndex = currentPage * pokemonsPerPage;
	const firstIndex = lastIndex - pokemonsPerPage;
	const nPages = Math.ceil(pokemons?.results.length / pokemonsPerPage);

	return (
		<div>
			<Header />
			<section className="pokedexpage ">
				<span className="pokedex__welcome">
					<p className="pokedex__welcome-red">Welcome {trainer}</p>, here you will find your favorite pokemons
				</span>
				<div className="pokedex__filters-container">
					<div className="pokedex__form-container">
						<form className="pokedex__form" onSubmit={handleSearch}>
							<input className="pokedex__form-input" placeholder="Search a Pokémon" type="text" ref={inputName} />
							<button className="pokedex__form-btn">Search</button>
						</form>
					</div>
					<div className="pokedex__select-container">
						<SelectType setTypeSelected={setTypeSelected} />
					</div>
				</div>

				<section className="pokemons__container flex-container">
					{pokemons && !pokemons.results.some(callbackFilter) ? (
						<h2 className="pokedex__error">There is no Pokemon that match the filter</h2>
					) : (
						pokemons?.results
							.filter(callbackFilter)
							.map((poke) => <PokeCard key={poke.url} poke={poke} />)
							.slice(firstIndex, lastIndex)
					)}
				</section>
			</section>
			<Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
		</div>
	);
};

export default PokedexPage;
