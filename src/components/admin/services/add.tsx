import React, { useState } from "react"
import { supabase } from "../../../utils/supabase"

const AddServices = ({ onServiceAdded }: { onServiceAdded: () => void }) => {
	const [name, setName] = useState("")
	const [success, setSuccess] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(false)

	async function addServices(name: string) {
		setLoading(true)
		try {
			if (!name.trim()) {
				throw new Error("O nome do serviço é obrigatório.")
			}

			// Verifica se o serviço já existe
			const { data: exists } = await supabase.from("services").select("*").eq("name", name).maybeSingle()
			if (exists) {
				throw new Error("Já existe um serviço com este nome.")
			}

			// Insere o novo serviço
			const { data: inserted, error } = await supabase.from("services").insert({ name }).select().single()
			if (error) {
				throw new Error("Ocorreu um erro. " + error.message)
			}
			if (inserted) {
				setSuccess(`Serviço '${inserted.name}' adicionado com sucesso!`)
				onServiceAdded() // Chama o callback para atualizar a lista
			}
		} catch (err: any) {
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}

	async function handleAddSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		if (name.trim()) {
			await addServices(name)
			setName("")
		}
	}

	return (
		<div>
			<form onSubmit={handleAddSubmit}>
				<div className='mb-4'>
					<label htmlFor='name' className='block text-gray-700 font-bold mb-2'>
						Nome do Serviço
					</label>
					<input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='Digite o nome do serviço' className='py-2 px-4 border rounded' />
				</div>
				<div>
					<button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
						{loading ? "Carregando..." : "Cadastrar"}
					</button>
				</div>
				{error && <p>{error}</p>}
				{success && <p>{success}</p>}
			</form>
		</div>
	)
}

export default AddServices
