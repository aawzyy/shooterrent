function CategoryRole({ setSelectProject }) {
    const role = [
        {
            'id' : 1,
            'name' : 'Pelanggan'
        },
        {
            id : 2,
            name : 'Fotografer'
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
				Silahkan Pilih Peran
			</option>

			{role?.map((option, key) => (
				<option className="text-normal sm:text-md" key={key}>
					{option.name}
				</option>
			))}
		</select>
	);
}

export default CategoryRole;
