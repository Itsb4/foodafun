import Category from "./components/Category";
import Pages from "./pages/Pages";
import Search from "./components/Search";
import { BrowserRouter, Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";
import "./App.css";

function App() {
	return (
		<div className="wrapper">
			<BrowserRouter>
				<div className="flex justify-start items-center px-0 py-16">
					<Link
						className="link no-underline text-2xl font-normal"
						to={"/"}
					>
						<GiKnifeFork className="svg" />
						FoodaFun
					</Link>
				</div>
				<Search />
				<Category />
				<Pages />
			</BrowserRouter>
		</div>
	);
}

export default App;
