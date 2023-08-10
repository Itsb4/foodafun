import { motion } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function Cuisine() {
	const [cuisine, setCuisine] = useState([]);
	const [foundError, setFoundError] = useState(false);
	const params = useParams();

	const getCuisine = async (name) => {
		const data = await fetch(
			`https://api.spoonacular.com/recipes/complexSearch?apiKey=${
				import.meta.env.VITE_FOODIE_API_KEY
			}&number=7&cuisine=${name}`
		);
		const recipes = await data.json();
		setCuisine(recipes.results);
		if (recipes.results === undefined) {
			setFoundError(true);
		} else {
			setFoundError(false);
		}
		console.log(recipes.results);
	};

	useEffect(() => {
		getCuisine(params.type);
	}, [params.type]);

	return (
		<motion.div
			animate={{ opacity: 1 }}
			initial={{ opacity: 0 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
			className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-12"
		>
			{foundError === true ? (
				<h1 className="text-2xl text-center my-14">
					Something went wrong!
				</h1>
			) : (
				cuisine.map((item) => {
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
		</motion.div>
	);
}
