import { Outlet, Navigate } from "react-router-dom"

const PrivaRoutes = () => {
  return (
    <>
        {sessionStorage.getItem('uid') ?
            <Navigate to={'/'} />
            :
            <Outlet />}
    </>
  )
}

export default PrivaRoutes
