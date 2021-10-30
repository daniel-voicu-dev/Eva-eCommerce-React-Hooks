import React from 'react'; 

import "./LitElements"
import './sass/app.sass';


function App() {
  return (
    <div className="App">
      <header></header>
      <main>
        <div className="loader">
          <ion-icon name="refresh"></ion-icon>
        </div>
        <section id="Login" className="app-login">
          <h1>Login Page</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in dapibus est. Quisque risus arcu, venenatis eu mauris et, elementum viverra tellus. Donec eu consectetur tellus, sed rhoncus massa. Fusce cursus, massa placerat tempus rutrum, ante est finibus augue, non volutpat erat odio eget dolor. Suspendisse ac fermentum elit, quis varius leo. Proin vestibulum lorem a purus scelerisque, eu luctus metus rutrum. Nulla facilisi. Phasellus sit amet pharetra justo, a porta turpis. Integer ut augue bibendum, fringilla nulla at, accumsan enim. Nullam et sapien quis diam accumsan dignissim ut ac magna. </p>
        </section>
        
        
        <form className="list">                  
          <div className="item"><df-input type="email" name="username" label="Username" value="" className="testClass" required></df-input></div>
          <div className="item"><df-input type="password" name="password" label="Password" value="" ></df-input></div>
          <df-quantity min="1" max="10" step="2" name="Quantity" class="item"></df-quantity>
          <df-quantity min="2" step="2" name="Quantity" class="item"></df-quantity>
          <df-select name="Countries2" label="Country" value="" required>            
            <div>1</div>
            <div>2</div>
          </df-select>  
          <button type="button">Submit</button>
        </form>        
      </main>
      <aside id="minicart" className="minicart"></aside> 
      <footer></footer>
    </div>
  );
}

export default App;
