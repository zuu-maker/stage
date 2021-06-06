import React from 'react';



function Signup(props){
  return(
    <form className="form">
      <input type="text" placeholder="Username" />
      <input type="Email" placeholder="Email" />
      <input type="Password" placeholder="password" />

      <button type="submit">Sign up</button>
    </form>
  );
}

export default Signup;
