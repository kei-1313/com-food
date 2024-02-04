import SupabaseListener from "../components/SupabaseListener"

const authLayout = ({ children }: { children: React.ReactNode })  => {
	return (
		<div>
      <SupabaseListener/>
      <div>{children}</div>
    </div>
	)
}

export default authLayout