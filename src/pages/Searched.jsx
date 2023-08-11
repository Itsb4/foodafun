import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Searched() {
	const [searchedRecipes, setSearchedRecipes] = useState([]);
	const [foundError, setFoundError] = useState(false);
	const params = useParams();

	const getSearched = async (name) => {
		const data = await fetch(
			`https://api.spoonacular.com/recipes/complexSearch?apiKey=${
				import.meta.env.VITE_FOODIE_API_KEY
			}&number=9&query=${name}`
		);
		const recipes = await data.json();
		setSearchedRecipes(recipes.results);
		if (recipes.results === undefined) {
			setFoundError(true);
		} else {
			setFoundError(false);
		}
		// console.log(recipes.results);
	};

	useEffect(() => {
		getSearched(params.query);
	}, [params.query]);

	return (
		<div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-12">
			{foundError === true ? (
				<h1 className="text-2xl text-center my-14">
					Something went wrong!
				</h1>
			) : (
				searchedRecipes.map((item) => {
					return (
						<div className="card" key={item.id}>
							<Link to={`/recipe/${item.id}`}>
								<img
									className="w-full rounded-[2rem]"
									src={item.image}
									alt={item.title}
								/>
								<h4 className="text-center p-4">
									{item.title}
								</h4>
							</Link>
						</div>
					);
				})
			)}
		</div>
	);
}
