import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "./popular.css";
import { Link } from "react-router-dom";

export default function Veggies() {
	const [veggie, setVeggie] = useState([]);

	useEffect(() => {
		fetchVeggieRecipes();
	}, []);

	const fetchVeggieRecipes = async () => {
		const check = localStorage.getItem("veggie");
		// console.log(check);

		if (check !== null) {
			setVeggie(JSON.parse(check));
		} else {
			const response = await fetch(
				`https://api.spoonacular.com/recipes/random?apiKey=${
					import.meta.env.VITE_FOODIE_API_KEY
				}&number=12&tag=vegetarian`
			);
			const data = await response.json();
			localStorage.setItem("veggie", JSON.stringify(data.recipes));
			console.log(data);
			setVeggie(data.recipes);
		}
	};

	return (
		<section>
			<div className="wrapper mx-5 sm:m-10 flex flex-col justify-center sm:justify-normal text-center sm:text-left">
				<h3 className="text-xl font-medium sm:font-normal">
					Trending Vegetarian Picks
				</h3>
				<Splide
					options={{
						perPage: 3,
						arrows: false,
						pagination: false,
						drag: "free",
						gap: "4rem",
					}}
					className="flex sm:block justify-around"
				>
					{veggie.map((recipe) => (
						<SplideSlide key={recipe.id} className="mx-56 sm:mx-0">
							<div
								className="card w-80 sm:w-full rounded-xl overflow-hidden relative"
								key={recipe.id}
							>
								<Link to={`/recipe/${recipe.id}`}>
									<p className="absolute z-10 w-full bottom-10 drop-shadow-lg shadow-black text-white text-center font-semibold text-base flex justify-center items-center">
										{recipe.title}
									</p>
									<img
										className="bg-transparent rounded-xl absolute left-0 w-full h-full object-cover"
										src={recipe.image}
										alt={recipe.title}
									/>
								</Link>
							</div>
						</SplideSlide>
					))}
				</Splide>
			</div>
		</section>
	);
}
