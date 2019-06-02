document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.querySelector('input[id="name"]').value;
        const password = document.querySelector('input[id="exampleInputPassword1"]').value;
        const cardBody = document.querySelector('p');
        let res = await fetch('/login', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                password: password
            })
        });

        let response = await res.json();
        console.log(response);
        
        if(response.error){
            cardBody.innerHTML = `
            <p>${response.error}</p>`
        }
        else if (response.url)
            window.location = response.url
    })
    
});