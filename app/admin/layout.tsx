import Sidebar from "@/app/components/Sidebar"
import SupabaseListener from "@/app/components/SupabaseListener"


const adminLayout = ({ children }: { children: React.ReactNode })  => {
	return (
    <div>
      <SupabaseListener/>
      <div className="flex">
        <div>
          <Sidebar/>
        </div>
        <div>{children}</div>
      </div>
    </div>
	)
}

export default adminLayout

