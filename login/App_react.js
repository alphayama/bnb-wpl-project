import React, {Component} from 'react';


class App extends Component {
    

      componentDidMount(){

        fetch('http://localhost:3000/login', {
          method: "POST",
          headers : { 
            'Content-Type': 'application/json',
             'Accept': 'application/json'
          },
          body: JSON.stringify( {  // you will get user information from login form

            "email": "user1@gmail.com",
            "password": "123",

          } )
        })
        .then( res => res.json() )
        .then( (data) => { 
            console.log(data);

            let inMemoryToken = data.token;
            console.log(inMemoryToken);

            localStorage.setItem('user', JSON.stringify(data));

            
        })
        .catch((error) => {
          console.log(error.message);
        
        });


        //request to a protected route
        const localstorage_user = JSON.parse(localStorage.getItem('user'))

        fetch( "http://localhost:3000/welcome/", {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-auth-token': localstorage_user.token
                
            }

        })
        .then( res => res.json() )
        .then( res => console.log( res ) );
      


      } 

      render () {
         return (
            <div>Homepage...</div>

        );
 
      }
}

export default App;
