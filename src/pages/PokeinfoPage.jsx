import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Header from '../shared/Header';
import './styles/PokeinfoPage.css';

const PokeinfoPage = () => {
	const { name } = useParams();
	const [pokemon, getPokemon] = useFetch();
	useEffect(() => {
		const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
		getPokemon(url);
	}, [name]);

	return (
		<article>
			<Header />
			<header>
				<img src={pokemon?.sprites.other['official-artwork'].front_default} alt={pokemon?.name} />
			</header>
			<section>
				<span>
					<h2>numero</h2>
				</span>
				<h2>{pokemon?.name}</h2>
				<div>
					<span>
						<h3>peso</h3>
					</span>
					<span>
						<h3>altura</h3>
					</span>
				</div>
				<ul className="">
					{pokemon?.types.map((typeInfo) => (
						<li className="" key={typeInfo.type.url}>
							{typeInfo.type.name}
						</li>
					))}
				</ul>
				<ul className="">
					{pokemon?.abilities.map((abilityInfo) => (
						<li className="" key={abilityInfo.ability.url}>
							{abilityInfo.ability.name}
						</li>
					))}
				</ul>
			</section>
		</article>
	);
};

export default PokeinfoPage;
