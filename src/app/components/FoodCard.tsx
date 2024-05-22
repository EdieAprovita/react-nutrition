import React from "react";
import { Card, Button } from "antd";
import Image from "next/image";

interface FoodBoxProps {
	name: string;
	calories: number;
	image: string;
	servings: number;
	onDelete: () => void;
}

const FoodBox: React.FC<FoodBoxProps> = ({
	name,
	calories,
	image,
	servings,
	onDelete,
}) => {
	return (
		<Card hoverable style={{ width: 240, margin: "16px" }}>
			<Image alt={name} src={image} width={240} height={160} />
			<h3>{name}</h3>
			<p>Calories: {calories}</p>
			<p>Servings: {servings}</p>
			<p>Total Calories: {calories * servings}</p>
			<Button type="primary" onClick={onDelete}>
				Delete
			</Button>
		</Card>
	);
};

export default FoodBox;
