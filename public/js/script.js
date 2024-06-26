//axios.default.timeout = 10000
document.addEventListener('DOMContentLoaded', () => {
  let elems = document.querySelectorAll('.sidenav')
  M.Sidenav.init(elems)
})

const chooseFile = document.getElementById("file")
const chooseFile1 = document.getElementById("file1")
const chooseStreaming = document.getElementById("streaming")
const imgPreview = document.getElementById("img-preview")
const uploadBtn = document.getElementById("uploadbtn")
const streamBtn = document.getElementById("streambtn")

chooseFile.addEventListener('change', event => {
  const file = event.target.files[0]

  if (file) {
    const reader = new FileReader()

    reader.addEventListener('load', e => {
      imgPreview.innerHTML = ''
      const image = document.createElement('img')
      image.src = e.target.result
      image.style.width = '100%'
      imgPreview.append(image)

      imgPreview.style.display = 'block'
    })

    reader.readAsDataURL(file)
  }
})

uploadBtn.addEventListener('click', async () => {
  const file = chooseFile.files[0]
  const file1 = chooseFile1.files[0]
  if (file){
    const formData = new FormData()
    formData.append('file', file)
    formData.append('file1', file1)
    console.log(formData)
    try {
      const { data } = await axios.post('http://127.0.0.1:8000/imagearuco', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
  
      console.log(data)
      document.getElementById('result').src = data.buffer
      const div = document.getElementById("corners")
      div.getElementsByTagName("p")[0].innerHTML = JSON.stringify(data.markers)
      document.getElementById("corners").style.visibility = "visible"


    } catch (error) {
      console.error(error)
    }
  }
})


streamBtn.addEventListener('click', async () => {
  const stream = chooseStreaming.innerText
  console.log(stream)

})
