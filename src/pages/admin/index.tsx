import { Link } from "react-router"

export default function AdminPage() {
	return (
		<div>
			<h1>Admin Page</h1>
			<p>
				<Link to='/'>Ir para a página inicial</Link> - <Link to='/admin/profiles'>Usuários</Link> - <Link to='/admin/services'>Serviços</Link>
			</p>
		</div>
	)
}
