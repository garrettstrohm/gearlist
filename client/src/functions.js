export const handleChange = (e, form, setForm) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    })
}