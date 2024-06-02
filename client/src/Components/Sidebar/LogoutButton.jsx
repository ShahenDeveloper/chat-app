import { RiLogoutBoxLine } from "react-icons/ri";
import UseLogout from "../../hooks/UseLogout";
function LogoutButton() {
  const { loading, logout } = UseLogout()

  return (
    <div className=" mt-auto">
      {!loading ? <RiLogoutBoxLine onClick={logout} className="w-6 h-6 cursor-pointer text-white"/> : (
        <span className="loading loading-spinner loading-lg"></span>
      )
      }
    </div>
  )
}

export default LogoutButton
