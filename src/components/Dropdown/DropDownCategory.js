function DropDownCategory({ setSelectProject, defafaultVal }) {
    const role = [
        {
            id: 1,
            name: "Pernikahan"
        },
        {
            id: 2,
            name: "Ulang Tahun"
        },
        {
            id: 3,
            name: "Kelulusan"
        },
        {
            id: 4,
            name: "Liburan"
        },
        {
            id: 5,
            name: "Bayi"
        },
        {
            id: 6,
            name: "Produk"
        },
        {
            id: 7,
            name: "Makanan"
        }
    ]

	return (
		<select
			onChange={(e) => {
                const data = e.target.value
                return(
				    setSelectProject(data)
                )
			}}
			className="mb-5 mt-2 w-full px-4 sm:px-6 py-2 border dark:border-secondary-dark rounded-lg text-sm sm:text-md dark:font-medium bg-secondary-light dark:bg-ternary-dark text-primary-dark dark:text-ternary-light"
        >
			<option value={setSelectProject} className="text-sm sm:text-md">
				Silahkan Pilih
			</option>

			{role?.map((option, key) => (
				<option className="text-normal sm:text-md" key={key} value={option.id}>
					{option.name}
				</option>
			))}
		</select>
	);
}

export default DropDownCategory;
