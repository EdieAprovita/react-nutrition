import React from "react";
import { Input } from "antd";

interface SearchProps {
	onSearch: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
	return (
		<Input
			placeholder="Search for food..."
			onChange={e => onSearch(e.target.value)}
			style={{ marginBottom: "20px", width: "300px" }}
		/>
	);
};

export default Search;
