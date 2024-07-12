document.addEventListener('DOMContentLoaded', () => {
    async function getAllRoles(){
        const response = await fetch('/roles')
        const data = await response.json()
        console.log(data)
    }
    getAllRoles()
})