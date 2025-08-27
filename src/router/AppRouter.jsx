import { Route, Routes } from "react-router-dom"
import Nav from "../components/Nav/Nav.jsx";
import {
    HomePage,
    ProfilePage,
    LoginPage,
    RegisterPage,
} from "../pages/index.js";
import { PrivateRoute } from "./PrivateRoute.jsx";
import Gallery from "../components/Gallery/Gallery.jsx";
import CreatePage from "../pages/CreatePage.jsx";

const AppRouter = () => {
  return <>
    <Routes>
        <Route path="/" element={<Nav></Nav>}>
            <Route index element={ <HomePage></HomePage> }></Route>
            <Route path="/create" element={<CreatePage/>}></Route>
            <Route path="/mascotas" element={<Gallery />} />
            <Route path="login" element={ <LoginPage></LoginPage> }></Route>
            <Route path="register" element= { <RegisterPage></RegisterPage>} ></Route>
            <Route path="profile" element= {
                <PrivateRoute>
                    <ProfilePage></ProfilePage>
                </PrivateRoute>
            } ></Route>
        </Route>
    </Routes>
  
  </>
}

export default AppRouter