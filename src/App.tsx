import { BrowserRouter, Routes, Route } from "react-router"
import HomePage from "./pages"
import AdminPage from "./pages/admin"

export default function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='admin' element={<AdminPage />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}
