import { useState, useEffect } from "react"
import { Link } from "react-router"
import { supabase } from "../../../utils/supabase"

export default function ProfilesPage() {
	const [profiles, setProfiles] = useState<any[]>([])
	const [error, setError] = useState<any>(null)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		fetchProfiles()
	}, [])

	async function fetchProfiles() {
		try {
			const { data, error } = await supabase.from("profiles").select("*")
			if (error) {
				throw error
			}
			if (data) {
				setProfiles(data)
			}
		} catch (error) {
			setError(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<h1>Users Page</h1>
			<p>
				<Link to='/'>Ir para a página inicial</Link>
			</p>
			{loading && <p>Carregando...</p>}
			{error && <p>{error.message}</p>}
			{profiles.length === 0 ? (
				<p>Nenhum usuário encontrado.</p>
			) : (
				<>
					<table>
						<thead>
							<tr>
								<th>Nome</th>
								<th>Sexo</th>
							</tr>
						</thead>
						<tbody>
							{profiles.map((profile) => (
								<tr key={profile.id}>
									<td>{profile.name}</td>
									<td>{profile.gender}</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			)}
		</div>
	)
}
