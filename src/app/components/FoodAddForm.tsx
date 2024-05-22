import React, { useState } from "react";
import { Input, Button, Form, Modal } from "antd";

interface AddFoodFormProps {
	onAddFood: (food: {
		name: string;
		calories: number;
		image: string;
		servings: number;
	}) => void;
	visible: boolean;
	onClose: () => void;
}

const AddFoodForm: React.FC<AddFoodFormProps> = ({ onAddFood, visible, onClose }) => {
	const [name, setName] = useState("");
	const [calories, setCalories] = useState(0);
	const [image, setImage] = useState("");
	const [servings, setServings] = useState(0);

	const handleSubmit = () => {
		onAddFood({ name, calories, image, servings });
		setName("");
		setCalories(0);
		setImage("");
		setServings(0);
		onClose();
	};

	return (
		<Modal
			title="Add New Food"
			open={visible}
			onCancel={onClose}
			footer={[
				<Button key="cancel" onClick={onClose}>
					Cancel
				</Button>,
				<Button key="submit" type="primary" onClick={handleSubmit}>
					Add Food
				</Button>,
			]}>
			<Form>
				<Form.Item label="Name">
					<Input value={name} onChange={e => setName(e.target.value)} />
				</Form.Item>
				<Form.Item label="Calories">
					<Input
						type="number"
						value={calories}
						onChange={e => setCalories(Number(e.target.value))}
					/>
				</Form.Item>
				<Form.Item label="Image URL">
					<Input value={image} onChange={e => setImage(e.target.value)} />
				</Form.Item>
				<Form.Item label="Servings">
					<Input
						type="number"
						value={servings}
						onChange={e => setServings(Number(e.target.value))}
					/>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default AddFoodForm;
