import { useRef, useState } from "react"
import { Link } from "react-router"

import AddServices from "../../../components/admin/services/add"
import ListServices from "../../../components/admin/services/list"
import SearchServices from "../../../components/admin/services/search"
import EditServices from "../../../components/admin/services/edit"

export default function ServicesPage() {
	const listRef = useRef<any>(null)
	const [selectedService, setSelectedService] = useState<any>(null)

	const handleServiceAdded = () => {
		if (listRef.current) {
			listRef.current.fetchServices()
		}
	}

	const handleServiceUpdated = () => {
		setSelectedService(null)
		if (listRef.current) {
			listRef.current.fetchServices()
		}
	}

	const handleCancelEdit = () => {
		setSelectedService(null)
	}

	const handleSearch = (term: string) => {
		if (listRef.current) {
			listRef.current.updateFilter(term)
		}
	}

	return (
		<div>
			<h1>Services Page</h1>
			<p>
				<Link to='/'>Ir para a página inicial</Link>
			</p>

			<hr />
			<p>Adicionar serviço:</p>
			<AddServices onServiceAdded={handleServiceAdded} />

			<hr />
			<p>Procurar serviços:</p>
			<SearchServices onSearch={handleSearch} />

			<hr />
			<p>Lista de serviços:</p>
			<ListServices ref={listRef} onEdit={setSelectedService} />

			<hr />
			<p>Formulário para editar serviço:</p>
			{selectedService && <EditServices service={selectedService} onServiceUpdated={handleServiceUpdated} onCancel={handleCancelEdit} />}
		</div>
	)
}
