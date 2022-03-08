export const handleChange = (e, form, setForm) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    })
};

export const imageHandleChange = (e, setPicFile, imageRef) => {
    const file = e.target.files[0]
    if(file.name.endsWith('.jpg') || file.name.endsWith('.jpeg')){
      setPicFile(file)
    } else if (file.name.endsWith('.png')){
      setPicFile(file)
    } else {
      alert("The image file you have chosen is not an appropriate image file. Please upload a file ending in '.jpg', '.jpeg', or '.png'.")
      imageRef.current.value=""
    }
};

export const handlePicSubmit = (e, cbFunc, picFile) => {
    e.preventDefault()
    if(picFile instanceof File){
      const url = `${process.env.REACT_APP_CLOUDINARY_URL}`
      const formData = new FormData();
      formData.append('file', picFile)
      formData.append('upload_preset', 'gearlist-upload')

      const configPicObj = {
        method: "POST",
        body: formData
      }
    
    fetch(url, configPicObj)
    .then(r => {
      if(r.ok) {
        r.json()
        .catch(error => console.log(error))
        .then(data => {
          cbFunc(data)
        })
      }
    })
  }
};
