import { BrowserRouter, Routes, Route, useParams, Outlet,Link, Navigate } from "react-router";
import AdminLayout from "./layouts/AdminLayout";
import ThemeProvider from "./contexts/ThemeContext";
import FileUpload from "./components/FileUpload/Upload";
import './App.css'
function App() {
  return <ThemeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/users" element={<div>Home</div>}></Route>
              <Route path="/admin" element={<AdminLayout/>}>
                  <Route index element={<Navigate to="overview" />} />
                  <Route path="overview" element={<div>Overview...</div>}></Route>
                  <Route path="contest" element={<FileUpload/>}>
                          
                  </Route>
                  <Route path="Submissions" element={<div>Submissions...<Link to="test">test</Link></div>}></Route>
                  <Route path="Settings" element={<div>Settings</div>}></Route>
              </Route>
            </Routes>
        </BrowserRouter>
  </ThemeProvider>
}

export default App
