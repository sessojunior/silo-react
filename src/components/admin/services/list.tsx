import { forwardRef, useImperativeHandle, useState, useEffect } from "react"
import { supabase } from "../../../utils/supabase"

const ListServices = forwardRef(({ onEdit, onDelete }: { onEdit: (service: any) => void; onDelete: (service: any) => void }, ref) => {
	const [services, setServices] = useState<any[]>([])
	const [filteredServices, setFilteredServices] = useState<any[]>([])
	const [error, setError] = useState<any>(null)
	const [loading, setLoading] = useState<boolean>(false)

	useImperativeHandle(ref, () => ({
		fetchServices,
		updateFilter,
	}))

	useEffect(() => {
		fetchServices()
	}, [])

	async function fetchServices() {
		setLoading(true)
		try {
			const { data, error } = await supabase.from("services").select("*")
			if (error) {
				throw error
			}
			if (data) {
				setServices(data)
				setFilteredServices(data)
			}
		} catch (err: any) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	function updateFilter(searchTerm: string) {
		if (!searchTerm.trim()) {
			setFilteredServices(services)
		} else {
			setFilteredServices(services.filter((service) => service.name.toLowerCase().includes(searchTerm.toLowerCase())))
		}
	}

	return (
		<div>
			{loading && <p>Carregando...</p>}
			{error && <p>{error.message}</p>}
			{filteredServices.length === 0 ? (
				<p>Nenhum serviço encontrado.</p>
			) : (
				<table>
					<thead>
						<tr>
							<th>Nome</th>
							<th>Ações</th>
						</tr>
					</thead>
					<tbody>
						{filteredServices.map((service) => (
							<tr key={service.id}>
								<td>{service.name}</td>
								<td>
									<button onClick={() => onEdit(service)} className='bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700'>
										Editar
									</button>
									<button onClick={() => onDelete(service)} className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700'>
										Excluir
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	)
})

export default ListServices
