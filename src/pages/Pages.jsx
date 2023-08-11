import Cuisine from "./Cuisine";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import Searched from "./Searched";
import Recipe from "./Recipe";
import { AnimatePresence } from "framer-motion";

export default function Pages() {
	return (
		<AnimatePresence mode="wait">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/cuisine/:type" element={<Cuisine />} />
				<Route path="/search/:query" element={<Searched />} />
				<Route path="/recipe/:name" element={<Recipe />} />
			</Routes>
		</AnimatePresence>
	);
}
