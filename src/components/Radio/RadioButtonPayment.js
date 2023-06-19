function RadioButtonPayment({ setSelectProject }) {
    const role = [
        {
            "code": "bca",
            "name": "BCA",
            "payment_type": "bank_transfer"
        },
        {
            "code": "bni",
            "name": "BNI",
            "payment_type": "bank_transfer"
        },
        {
            "code": "bri",
            "name": "BRI",
            "payment_type": "bank_transfer"
        },
        // {
        //     "code": "mandiri",
        //     "name": "Mandiri",
        //     "payment_type": "echannel"
        // },
        // {
        //     "code": "permata",
        //     "name": "Permata",
        //     "payment_type": "permata"
        // }
    ]

	return (
        <>
        {role.map((val,ky) => (
            <div class="flex items-center mb-4 mt-2">
                <input
                    onChange={(e) => {
                    setSelectProject(e.target.value);
                }}
                id="country-option-2"
                type="radio" name="bank"
                value={JSON.stringify(val)} 
                class="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" aria-labelledby="country-option-2" aria-describedby="country-option-2"/>
                <label for="country-option-2" class="text-sm font-medium text-gray-900 ml-2 block">
                    {val.name}
                </label>
            </div>
        ))}
        </>
	);
}

export default RadioButtonPayment;
