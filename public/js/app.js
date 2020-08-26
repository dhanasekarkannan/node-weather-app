console.log('client side java script file loaded');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = search.value;
    console.log(address);
    message1.textContent = "Loading ...";
    message2.textContent = "";
    fetch('http://localhost:8000/weather?address=' + address).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                message1.textContent = data.error;
                message2.textContent = "";
            } else {
                console.log(data);
                console.log(data.forecast);
                message2.textContent = data.forecast;
                console.log(data.location);
                message1.textContent = data.location;
            }


        });

    });

});

