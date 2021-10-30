import { LitElement, html } from "lit-element"
import {isValidEmail} from "../utilities.js"
import {v4 as uuidv4} from "uuid"

import "./../sass/CustomElements/df-input.sass"

export class DefaulInput extends LitElement {
  static get properties() { 
    return {          
      name: {type: String, attribute: "name"},
      type: {type: String, attribute: "type"},
      value: {type: String, attribute: "value", reflect: true},

      class: {type: String, attribute: "class"},
      id: {type: String, attribute: "id"},
      label: {type: String, attribute: "label"},
      placeholder: {type: Boolean},     
      mask: {type: String, attribute:"mask"},      

      error: {type: Boolean},
      focus: {type: Boolean},
     
      required: {type: Boolean, attribute: "required", reflect: true},
      readonly: {type: Boolean, attribute: "readonly", reflect: true},
      disabled: {type: Boolean, attribute: "disabled", reflect: true},
      password: {type: Boolean},      
    };
  }  
  constructor() {    
    super();            
    this.placeholder = this.hasAttribute("placeholder");    
  }

  firstUpdated() {   
    if(this.label === undefined) {
      this.label = this.placeholder ? this.getAttribute("placeholder") : "";
    }
    if(this.class === undefined) {
      this.class = "";
    }
    if(this.name === undefined) {
      console.log("You must set up a [name] attribute for the input", this);      
    }
    if(this.type === undefined) {
      console.log("You must set up a [type] attribute for the input", this);      
    }
    if(this.id === undefined) {
      this.id = uuidv4();
    }
    if(this.value === undefined) {
      this.value = "";
    }
    if(this.type === "password") {
      this.password = true;
    } else {
      this.password = false;
    }    
    if(this.value !== "") {
      this.focus = true;
    }    
  }

  createRenderRoot() {
    return this;
  }

  onKeyUp(e) {
    this.dispatchEvent(new Event('keyup',{bubbles: true, cancelable: true}));
    this.value = e.target.value;  
    
    if(this.value === "" && !this.required) {
      this.error = false;
      return;
    } 
    
    if(this.type === "text" || this.type === "password") {
      if(this.mask !== null) {
        let regex = RegExp(this.mask);      
        if(regex.test(this.value)) {
          this.error = false;
        } else {
          this.error = true;
        }
      } else {
        if(this.value !== "") {
          this.error = false;
        }
      }
      
    }         
    if(this.type === "email") {      
      if(isValidEmail(this.value)) {
        this.error = false;
      } else {
        this.error = true;
      }  
    }

    if(this.type === "number") {
      let regex = RegExp("^[0-9/]+$");     
      if(regex.test(this.value)) {
        this.error = false;
      } else {
        this.error = true;
      }
    }
  }
  onKeyDown(e) {
    if(this.type === "number") {
      let regex = RegExp("^[0-9/]*$");  
      if(!regex.test(e.key)) {
        e.preventDefault();
      } 
    }
  }
  onFocusIn(e) {
    this.focus = true
  }
  onBlur(e) {
    this.dispatchEvent(new Event("blur", {bubbles: true,cancelable: true}));
    if(this.value === "") {      
      this.focus = false;
      if(this.required) {
        this.error = true;
      } 
    }
  }
  onTogglePassword(e) {  
    if(this.password === true) {
      this.password = false;
      this.querySelector(".df-input__input").type="text";
    } else {
      this.password = true;
      this.querySelector(".df-input__input").type="password"
    }    
  }
  
  
  render() {    

    return html`
    <div class="df-input ${this.class} ${this.focus ? "focus" : ""} ${this.error ? "alert" : ""}">  
      ${this.placeholder && this.focus ? "" : html`<label class="df-input__label" for=${this.id}__element>${this.label}</label>  `}
      <input type="${this.type==="password" ? "password" : "text"}" ?readonly=${this.readonly} ?disabled=${this.disabled} name="${this.name}" id="${this.id}__element" class="df-input__input" value="${this.value}" @keydown=${e=>this.onKeyDown(e)} @keyup=${e=>this.onKeyUp(e)} @focusin=${(e)=>this.onFocusIn(e)} @blur=${(e)=>this.onBlur(e)} autocomplete="no" />     
      ${this.type==="password" ? 
        this.password === true ? 
          html`<button type="button" @click=${e=>this.onTogglePassword(e)} class="btn-icon df-input__icon"><ion-icon name="eye"></ion-icon></button>` : 
          html`<button type="button" @click=${e=>this.onTogglePassword(e)} class="btn-icon df-input__icon"><ion-icon name="eye-off"></ion-icon></button>` : 
          ""}      
    </div> 
    `;
  }
}
customElements.define('df-input', DefaulInput);