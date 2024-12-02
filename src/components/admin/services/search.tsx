import React, { useState } from "react"

const SearchServices = ({ onSearch }: { onSearch: (term: string) => void }) => {
	const [searchTerm, setSearchTerm] = useState<string>("")

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setSearchTerm(value)
		onSearch(value) // Atualiza a busca no componente de lista
	}

	return (
		<div className='mb-4'>
			<label htmlFor='search' className='block text-gray-700 font-bold mb-2'>
				Buscar Serviço
			</label>
			<input type='text' id='search' value={searchTerm} onChange={handleSearch} placeholder='Digite o nome do serviço' className='py-2 px-4 border rounded' />
		</div>
	)
}

export default SearchServices
