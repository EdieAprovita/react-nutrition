import Image from "next/image";
import styles from "./page.module.css";
import FoodList from "./components/FoodList";

export default function Home() {
	return (
		<main className={styles.main}>
			<h1>Food List</h1>
			<FoodList />
		</main>
	);
}
