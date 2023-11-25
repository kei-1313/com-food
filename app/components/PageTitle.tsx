"use client"

type Props = {
  title: string
}

const PageTitle = (props: Props) => { 
	return (
		<div>
      <h2 className="text-[36px] max-md:text-[24px]  font-bold text-center">{ props.title }</h2>
    </div>
	)
}

export default PageTitle

