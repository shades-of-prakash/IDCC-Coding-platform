import { BrowserRouter, Routes, Route, useParams, Outlet, Navigate } from "react-router";
import AdminLayout from "./layouts/AdminLayout";
import ThemeProvider from "./contexts/ThemeContext";
import './App.css'
const Testing=()=>{
  return <div>Testing...</div>
}
function App() {
  return <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/users" element={<div>Home</div>}></Route>
              <Route path="/admin" element={<AdminLayout/>}>
                  <Route index element={<Navigate to="home" />} />
                  <Route path="home" element={<div>Home</div>}></Route>
                  <Route path="dashboard" element={<Testing/>}></Route>
              </Route>
            </Routes>
        </BrowserRouter>
  </ThemeProvider>
}

export default App
