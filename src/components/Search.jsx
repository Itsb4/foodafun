import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Search() {
	const [input, setInput] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate(`/search/${input}`);
	};

	return (
		<form className="my-0 mx-80 " onSubmit={handleSubmit}>
			<div className="input-area relative w-full">
				<FaSearch className="svg absolute top-1/2 left-0 " />
				<input
					type="text"
					name="name"
					id="name"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					className="border-none text-2xl py-4 px-12 rounded-2xl outline-none w-full"
				/>
			</div>
		</form>
	);
}
