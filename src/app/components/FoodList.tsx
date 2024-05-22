"use client";

import React, { useReducer } from "react";
import foods from "../foods.json";
import { v4 as uuid } from "uuid";
import FoodBox from "./FoodCard";
import AddFoodForm from "./FoodAddForm";
import Search from "./Search";
import { Button } from "antd";

interface Food {
	name: string;
	calories: number;
	image: string;
	servings: number;
}

interface State {
	foodList: Food[];
	filteredFoodList: Food[];
	showForm: boolean;
}

const initialState: State = {
	foodList: foods,
	filteredFoodList: foods,
	showForm: false,
};

type Action =
	| { type: "ADD_FOOD"; payload: Food }
	| { type: "DELETE_FOOD"; payload: number }
	| { type: "FILTER_FOOD"; payload: string }
	| { type: "TOGGLE_FORM" };

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case "ADD_FOOD": {
			const updatedFoodList = [action.payload, ...state.foodList];
			return { ...state, foodList: updatedFoodList, filteredFoodList: updatedFoodList };
		}
		case "DELETE_FOOD": {
			const newFoodList = state.foodList.filter((_, i) => i !== action.payload);
			return { ...state, foodList: newFoodList, filteredFoodList: newFoodList };
		}
		case "FILTER_FOOD": {
			const filteredList = state.foodList.filter(food =>
				food.name.toLowerCase().includes(action.payload.toLowerCase())
			);
			return { ...state, filteredFoodList: filteredList };
		}
		case "TOGGLE_FORM": {
			return { ...state, showForm: !state.showForm };
		}
		default:
			return state;
	}
}

const FoodList: React.FC = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const handleAddFood = (newFood: Omit<Food, "id">) => {
		dispatch({ type: "ADD_FOOD", payload: newFood });
	};

	const handleDelete = (index: number) => {
		dispatch({ type: "DELETE_FOOD", payload: index });
	};

	const handleSearch = (query: string) => {
		dispatch({ type: "FILTER_FOOD", payload: query });
	};

	return (
		<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
			<Button
				type="primary"
				onClick={() => dispatch({ type: "TOGGLE_FORM" })}
				style={{ marginBottom: "20px" }}>
				{state.showForm ? "Hide Form" : "Add New Food"}
			</Button>
			<AddFoodForm
				visible={state.showForm}
				onAddFood={handleAddFood}
				onClose={() => dispatch({ type: "TOGGLE_FORM" })}
			/>
			<Search onSearch={handleSearch} />
			<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
				{state.filteredFoodList.map((food, index) => (
					<FoodBox
						key={uuid()}
						name={food.name}
						calories={food.calories}
						image={food.image}
						servings={food.servings}
						onDelete={() => handleDelete(index)}
					/>
				))}
			</div>
		</div>
	);
};

export default FoodList;
