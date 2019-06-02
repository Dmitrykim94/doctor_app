document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.querySelector('input[id="name"]').value;
        const email = document.querySelector('input[id="email"]').value;
        const password = document.querySelector('input[id="exampleInputPassword1"]').value;
        const address = document.querySelector('input[id="address"]').value;
        const timeFrom = document.querySelector('input[id="availableTimeFrom"]').value;
        const timeTo = document.querySelector('input[id="availableTimeTo"]').value;
        const type = document.querySelector('input[id="type"]').value;
        // const 
        const p = document.querySelector('p');
        // console.log('ssssssssssssssssssssss');
        
        let res = await fetch('/reg', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                address:address,
                timeFrom,
                timeTo,
                type
            })
        });
        let response = await res.json();
        // console.log(response);
        
        if (response.error)
            p.innerHTML = `<p>${response.error}</p>`
        else if (response.url)
            window.location = response.url
    })
});