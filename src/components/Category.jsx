import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import "./popular.css";

export default function Category() {
	return (
		<div className="flex m-8 justify-center">
			<NavLink
				className={
					"slink flex flex-col justify-center items-center no-underline w-24 h-24 cursor-pointer mr-8 rounded-[50%] scale-[0.8]"
				}
				to={"/cuisine/Italian"}
			>
				<FaPizzaSlice className="text-[white] text-2xl svg" />
				<h4 className="text-[white] text-[0.8rem] ">Italian</h4>
			</NavLink>
			<NavLink
				className={
					"slink flex flex-col justify-center items-center no-underline w-24 h-24 cursor-pointer mr-8 rounded-[50%] scale-[0.8]"
				}
				to={"/cuisine/American"}
			>
				<FaHamburger className="text-[white] text-2xl svg" />
				<h4 className="text-[white] text-[0.8rem] ">American</h4>
			</NavLink>
			<NavLink
				className={
					"slink flex flex-col justify-center items-center no-underline w-24 h-24 cursor-pointer mr-8 rounded-[50%] scale-[0.8]"
				}
				to={"/cuisine/Thai"}
			>
				<GiNoodles className="text-[white] text-2xl svg" />
				<h4 className="text-[white] text-[0.8rem] ">Thai</h4>
			</NavLink>
			<NavLink
				className={
					"slink flex flex-col justify-center items-center no-underline w-24 h-24 cursor-pointer mr-8 rounded-[50%] scale-[0.8]"
				}
				to={"/cuisine/Japanese"}
			>
				<GiChopsticks className="text-[white] text-2xl svg" />
				<h4 className="text-[white] text-[0.8rem] ">Japanese</h4>
			</NavLink>
		</div>
	);
}
