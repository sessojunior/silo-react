import { Link } from "react-router"

export default function HomePage() {
	return (
		<div>
			<h1>Home Page</h1>
			<p>
				<Link to='/admin'>Ir para a página administrativa</Link>
			</p>
		</div>
	)
}
