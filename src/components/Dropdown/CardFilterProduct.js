function FilterDescAsc({ setSelectProject }) {
    const role = [
        {
            'id' : 1,
            'name' : 'Kecil',
            'value' : 'asc'
        },
        {
            id : 2,
            name : 'Besar',
            value : 'desc'
        }
    ]

	return (
		<select
			onChange={(e) => {
				setSelectProject(e.target.value);
			}}
			className="mb-5 mt-2 w-full px-4 sm:px-6 py-2 border dark:border-secondary-dark rounded-lg text-sm sm:text-md dark:font-medium bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
		>
			<option value={setSelectProject} className="text-sm sm:text-md">
				Silahkan Pilih
			</option>

			{role?.map((option, key) => (
				<option className="text-normal sm:text-md" key={key} value={option.value}>
					{option.name}
				</option>
			))}
		</select>
	);
}

export default FilterDescAsc;
