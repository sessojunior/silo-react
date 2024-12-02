import React, { useEffect, useState } from "react"
import { supabase } from "../../../utils/supabase"

const EditServices = ({ service, onServiceUpdated, onCancel }: { service: any; onServiceUpdated: () => void; onCancel: () => void }) => {
	const [name, setName] = useState("")
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState<string | null>(null)

	useEffect(() => {
		if (service) {
			setName(service.name)
		}
	}, [service])

	async function handleEditSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		if (!name.trim()) {
			setError("O nome do serviço é obrigatório.")
			return
		}

		setLoading(true)
		try {
			const { error } = await supabase.from("services").update({ name }).eq("id", service.id)
			if (error) {
				throw error
			}
			setSuccess("Serviço atualizado com sucesso!")
			onServiceUpdated()
		} catch (err: any) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	if (!service) {
		return <p>Selecione um serviço para editar.</p>
	}

	return (
		<div>
			<h1 className='text-xl font-bold mb-4'>Editar Serviço</h1>
			<form onSubmit={handleEditSubmit}>
				<div className='mb-4'>
					<label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
						Nome do Serviço
					</label>
					<input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Digite o novo nome do serviço' className='py-2 px-4 border rounded w-full' disabled={loading} />
				</div>
				<div className='flex gap-4'>
					<button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' disabled={loading}>
						{loading ? "Salvando..." : "Salvar Alterações"}
					</button>
					<button type='button' onClick={onCancel} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>
						Cancelar
					</button>
				</div>
				{error && <p className='text-red-500 mt-2'>{error}</p>}
				{success && <p className='text-green-500 mt-2'>{success}</p>}
			</form>
		</div>
	)
}

export default EditServices
