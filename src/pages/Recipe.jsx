import { useEffect, useState, Suspense } from "react";
import { useParams } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import "./style.css";

export default function Recipe() {
	const [recipeDetails, setRecipeDetails] = useState({});
	const [foundError, setFoundError] = useState(false);
	const [activeTab, setActiveTab] = useState("instructions");
	const params = useParams();

	const fetchDetails = async (name) => {
		const data = await fetch(
			`https://api.spoonacular.com/recipes/${name}/information?apiKey=${
				import.meta.env.VITE_FOODIE_API_KEY
			}`
		);
		const details = await data.json();
		if (details.code !== 200) {
			setFoundError(false);
		} else {
			setFoundError(true);
		}
		setRecipeDetails(details);
		// console.log(details);
	};

	useEffect(() => {
		fetchDetails(params.name);
	}, [params.name]);

	return (
		<div className="flex my-8 lg:mt-40 lg:mb-20">
			{foundError !== true ? (
				<Suspense fallback={<FaSpinner />}>
					<div className="w-full block lg:flex">
						<div className="mb-14 lg:mb-0">
							<h2 className="mb-12 font-medium text-2xl">
								{recipeDetails.title}
							</h2>
							<img
								className="rounded-xl w-3/4 lg:w-full"
								src={recipeDetails.image}
								alt={recipeDetails.title}
							/>
						</div>
						<div className="info w-full lg:w-1/2 lg:my-0 lg:ml-16">
							<div className="flex">
								<button
									className={
										activeTab === "instructions"
											? "active"
											: ""
									}
									onClick={() => setActiveTab("instructions")}
								>
									Instructions
								</button>
								<button
									className={
										activeTab === "ingredients"
											? "active"
											: ""
									}
									onClick={() => setActiveTab("ingredients")}
								>
									Ingredients
								</button>
							</div>
							{activeTab === "instructions" && (
								<section className="mt-8 instructions ">
									<h3
										className="text-2xl w-full lg:w-auto"
										dangerouslySetInnerHTML={{
											__html: recipeDetails.summary,
										}}
									></h3>
									<h3
										className="text-2xl w-full lg:w-auto"
										dangerouslySetInnerHTML={{
											__html: recipeDetails.instructions,
										}}
									></h3>
								</section>
							)}
							{activeTab === "ingredients" && (
								<ul className="mt-8">
									{recipeDetails.extendedIngredients.map(
										(ingredient) => (
											<li
												className="text-[1.2rem] leading-10 list-disc"
												key={ingredient.id}
											>
												{ingredient.original}
											</li>
										)
									)}
								</ul>
							)}
						</div>
					</div>
				</Suspense>
			) : (
				<h1 className="text-2xl text-center my-8">
					Something went wrong!
				</h1>
			)}
		</div>
	);
}
