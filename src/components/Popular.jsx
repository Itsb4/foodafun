import { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import "@splidejs/react-splide/css";
import "./popular.css";

export default function Popular() {
	const [popular, setPopular] = useState([]);

	useEffect(() => {
		fetchPopularRecipes();
	}, []);

	const fetchPopularRecipes = async () => {
		const check = localStorage.getItem("popular");

		if (check !== null) {
			setPopular(JSON.parse(check));
		} else {
			const response = await fetch(
				`https://api.spoonacular.com/recipes/random?apiKey=${
					import.meta.env.VITE_FOODIE_API_KEY
				}&number=9`
			);
			const data = await response.json();
			localStorage.setItem("popular", JSON.stringify(data.recipes));
			setPopular(data.recipes);
		}
	};

	return (
		<div className="">
			<div className="wrapper m-5">
				<h3 className="text-xl">Popular Picks</h3>
				<Splide
					options={{
						perPage: 3,
						arrows: false,
						pagination: false,
						drag: "free",
						gap: "4rem",
					}}
				>
					{popular.map((recipe) => (
						<SplideSlide key={recipe.id}>
							<div
								className="card rounded-xl overflow-hidden relative"
								key={recipe.id}
							>
								<Link to={`/recipe/${recipe.id}`}>
									<p className="absolute z-10 w-full bottom-10 text-white text-center font-semibold text-base flex justify-center items-center">
										{recipe.title}
									</p>
									<img
										className="rounded-xl absolute left-0 w-screen h-fit object-cover"
										src={recipe.image}
										alt={recipe.title}
									/>
								</Link>
							</div>
						</SplideSlide>
					))}
				</Splide>
			</div>
		</div>
	);
}
