const DeleteServices = ({ service, onConfirm, onCancel }: { service: any; onConfirm: () => void; onCancel: () => void }) => {
	if (!service) return null // Não renderiza nada se não houver serviço para deletar

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
			<div className='bg-white p-6 rounded shadow-md w-96'>
				<h2 className='text-xl font-bold mb-4'>Confirmar Exclusão</h2>
				<p className='mb-4'>
					Tem certeza que deseja excluir o serviço <strong>{service.name}</strong>?
				</p>
				<div className='flex justify-end gap-4'>
					<button onClick={onCancel} className='bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700'>
						Cancelar
					</button>
					<button onClick={onConfirm} className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700'>
						Confirmar
					</button>
				</div>
			</div>
		</div>
	)
}

export default DeleteServices
