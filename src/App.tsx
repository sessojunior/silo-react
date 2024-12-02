import { BrowserRouter, Routes, Route } from "react-router"
import HomePage from "./pages"
import AdminPage from "./pages/admin"
import ProfilesPage from "./pages/admin/profiles"
import TasksPage from "./pages/admin/tasks"
import ServicesPage from "./pages/admin/services"

export default function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='admin' element={<AdminPage />} />
					<Route path='admin/profiles' element={<ProfilesPage />} />
					<Route path='admin/services' element={<ServicesPage />} />
					<Route path='admin/tasks' element={<TasksPage />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}
