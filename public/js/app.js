 const weatherForm  = document.querySelector('form');
 const search = document.querySelector('input');
 const message1 = document.querySelector('#message1');
 const message2 = document.querySelector('#message2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value;
    message1.textContent = 'Loding...';
    message2.textContent = '';
    if(location !== undefined){
        url = '/weather?address=' + location
        fetch(url).then((response) => {
            response.json().then((data) => {
                if(data.error){
                    message1.textContent = data.error;
                }else{
                    message1.textContent = 'The current temperature in ' +  data.location + ' is ' + data.forecast + '. It feels like ' + data.feelslike + '.';
                    message2.textContent = 'The humdity is ' + data.humidity;
                }
            });
        });
    };
 });
