const handleActionEdit = (id) => {
    const el = document.getElementById(id)
    const inputName = document.getElementById("inputName")
    const inputDesc = document.getElementById("inputDesc")
    const updateTime = new Date();


    document.getElementById("buttonInsert").disabled = true;
    document.getElementById("buttonEdit").disabled = false;

    document.getElementById("buttonEdit").onclick = () => { handleSubmitEdit(id) }
    //document.getElementById("buttonEdit").setAttribute('onclick',`handleSubmitEdit(${menuId})`)
}
const handleInsertMenu = async () => {
    const inputName = document.getElementById("inputName")
    const inputDesc = document.getElementById("inputDesc")

    const resp = await fetch('http://localhost:8080/api/cars', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            make: inputName.value,
            model: inputDesc.value,
            updatedAt: new Date()
        })
    })

    location.reload()
}
const handleSubmitEdit = async (id) => {
    const inputName = document.getElementById("inputName")
    const inputDesc = document.getElementById("inputDesc")

    const resp = await fetch(`http://localhost:8080/api/cars/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            make: inputName.value,
            model: inputDesc.value,
            updatedAt: new Date()
        })
    })

    location.reload()
}

const handleDelete = async (id) => {
    alert('Are you sure?')

    const resp = await fetch(`http://localhost:8080/api/cars/${id}`, {
        method: 'DELETE',
    })
    location.reload()
}

