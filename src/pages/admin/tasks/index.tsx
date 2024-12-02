import { useState, useEffect } from "react"
import { Link } from "react-router"
import { supabase } from "../../../utils/supabase"

export default function TasksPage() {
	const [tasks, setTasks] = useState<any[]>([])
	const [error, setError] = useState<any>(null)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		fetchTasks()
	}, [])

	async function fetchTasks() {
		try {
			const { data, error } = await supabase.from("tasks").select("*")
			if (error) {
				throw error
			}
			if (data) {
				setTasks(data)
			}
		} catch (error) {
			setError(error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<h1>Tasks Page</h1>
			<p>
				<Link to='/'>Ir para a página inicial</Link>
			</p>
			{loading && <p>Carregando...</p>}
			{error && <p>{error.message}</p>}
			{tasks.length === 0 ? (
				<p>Nenhuma tarefa cadastrada.</p>
			) : (
				<>
					<table>
						<thead>
							<tr>
								<th>Nome</th>
								<th>Descrição</th>
							</tr>
						</thead>
						<tbody>
							{tasks.map((task) => (
								<tr key={task.id}>
									<td>{task.name}</td>
									<td>{task.description}</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			)}
		</div>
	)
}
