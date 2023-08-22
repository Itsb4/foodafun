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

		if (check !== null && check !== "undefined") {
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
			<div className="wrapper mx-5 sm:m-10 flex flex-col justify-center sm:justify-normal text-center sm:text-left">
				<h3 className="text-xl font-medium sm:font-normal">
					Popular Picks
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
					{popular.map((recipe) => (
						<SplideSlide key={recipe.id} className="mx-60 sm:mx-0">
							<div
								className="card w-80 sm:w-full rounded-xl overflow-hidden relative"
								key={recipe.id}
							>
								<Link to={`/recipe/${recipe.id}`}>
									<p className="recipe-title absolute z-10 left-1/2 bottom-0 text-white w-full text-center font-semibold text-base h-2/5 flex justify-center items-center">
										{recipe.title}
									</p>
									<img
										className="rounded-xl absolute left-0 w-full h-full object-cover"
										src={recipe.image}
										alt={recipe.title}
									/>
									<div className="z-[3] absolute w-full h-full blur-text"></div>
								</Link>
							</div>
						</SplideSlide>
					))}
				</Splide>
			</div>
		</div>
	);
}
