import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router";
import AdminLayout from "./layouts/AdminLayout";
import ThemeProvider from "./contexts/ThemeContext";
import FileUpload from "./components/FileUpload/Upload";
import './App.css';
import Login from "./pages/Login";
function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="overview" />} />
            <Route path="overview" element={<div>Overview...</div>} />
            <Route path="contest" element={<FileUpload />} />
            <Route path="Submissions" element={<div>Submissions...<Link to="test">test</Link></div>} />
            <Route path="Settings" element={<div>Settings</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;