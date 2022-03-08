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
}