var socket = io();

        let form = document.getElementById('form');
        let input = document.getElementById('input');
        let messages = document.getElementById('mensajes');
        let body = document.getElementById('body');

        let introName = document.getElementsByClassName('Box_suscriptio');
        let name = document.getElementsByClassName('.name');
        let yourName =document.getElementById('yourName');  

        body.addEventListener('onload', function(){
            if (Notification.permission !== "granted")
                Notification.requestPermission();
        });

        
        function getNotification(msg) {
            if (Notification.permission !== "granted")
                Notification.requestPermission();
            else{
                const options = {
                    body: msg,
                    dir: "ltr"
                }

                const notification = new Notification("notification",options);
                notification.onclick = function() {
                    window.open("https://www.google.es/");
                };
            }    
        };

        form.addEventListener('submit', function(e){
            e.preventDefault();
            socket.emit('chat message', input.value);
            input.value = '';
        });

        socket.on("profil", (name, count) => {
            console.log(`${name}, ${count}`)

            for(let i in profiles){
                if (profiles[i] === null ){
                    profiles[count] = name;
                    place = count;
                    console.log(profiles[place]);
                }; 
                break;
            };
        });

        socket.on('chat message', function(msg) {
            let item = document.createElement('li');

            item.textContent = `${hal}: ${msg}`;
            messages.appendChild(item);
            window.scrollTo(0,document.body.scrollHeight);
            getNotification(msg);
        });