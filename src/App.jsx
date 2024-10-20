import NotesPage from "./pages/NotesPage";
import NoteProvider from "./Context/NoteContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <>
      <div id="app">
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<PrivateRoutes />}>
                <Route
                  path="/"
                  element={
                    <NoteProvider>
                      <NotesPage />
                    </NoteProvider>
                  }
                />
              </Route>
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </>
  );
}

export default App;
