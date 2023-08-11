import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "./popular.css";

export default function Veggies() {
	const [veggie, setVeggie] = useState([]);

	useEffect(() => {
		fetchVeggieRecipes();
	}, []);

	const fetchVeggieRecipes = async () => {
		const check = localStorage.getItem("veggie");

		if (check) {
			setVeggie(JSON.parse(check));
		} else {
			const response = await fetch(
				`https://api.spoonacular.com/recipes/random?apiKey=${
					import.meta.env.VITE_FOODIE_API_KEY
				}&number=7&tag=vegetarian`
			);
			const data = await response.json();
			localStorage.setItem("veggie", JSON.stringify(data.recipes));
			// console.log(data);
			setVeggie(data.recipes);
		}
	};

	return (
		<div className="">
			<div className="wrapper m-10">
				<h3 className="text-xl">Trending Vegetarian Picks</h3>
				<Splide
					options={{
						perPage: 3,
						arrows: false,
						pagination: false,
						drag: "free",
						gap: "4rem",
					}}
				>
					{veggie.map((recipe) => (
						<SplideSlide key={recipe.id}>
							<div
								className="card rounded-xl overflow-hidden relative"
								key={recipe.id}
							>
								<p className="absolute z-10 w-full bottom-10 drop-shadow-lg shadow-black text-white text-center font-semibold text-base flex justify-center items-center">
									{recipe.title}
								</p>
								<img
									className="bg-transparent rounded-xl absolute left-0 w-screen h-fit object-cover"
									src={recipe.image}
									alt={recipe.title}
								/>
							</div>
						</SplideSlide>
					))}
				</Splide>
			</div>
		</div>
	);
}
