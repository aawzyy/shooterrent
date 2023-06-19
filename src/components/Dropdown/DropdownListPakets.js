function DropdwonPackets({ setSelectProject, ListData }) {
    const role = []

	return (
		<select
			onChange={(e) => {
                const data = e.target.value
                return(
				    setSelectProject(data)
                )
			}}
			className="mb-1 mt-2 w-full px-4 sm:px-6 py-2 border dark:border-secondary-dark rounded-lg text-sm sm:text-md dark:font-medium bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
		>
			<option value={setSelectProject} className="text-sm sm:text-md">
				Silahkan Pilih
			</option>

			{ListData?.sort((a, b) => a.id - b.id)?.map((option, key) => {
				return(
                    <option className="text-normal sm:text-md" key={key} value={JSON.stringify(option)}>
					    {option?.name}
				    </option>
                )
            })}
		</select>
	);
}

export default DropdwonPackets;
