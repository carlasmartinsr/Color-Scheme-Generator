const toggle = document.querySelector("#toggle-theme");
const header = document.querySelector("header")
const body = document.querySelector("body")
const btnGetColorScheme = document.getElementById("btn-get-color-scheme")
const colorSchemesOptions = document.querySelector("#color-schemes-options")
const modalContent = document.querySelector("#modal-content")
const colorPicker = document.getElementById("color-picker")
const sectionColorScheme = document.getElementById("color-output-section")
const modal= document.getElementById("modal");
const btnModal = document.getElementById("btn-modal")
const closeModal = document.getElementById("close")
let colorSchemeHTML=""
let btnCopyColor


// Theme

function toggleClasses(elements, className) {
   elements.forEach((element) => {
      element.classList.toggle(className);
  });
}

function toggleHoverFocusActive(element) {
  element.classList.toggle("hover", !element.classList.contains("hover"));
  element.classList.toggle("active", !element.classList.contains("active"));
  element.classList.toggle("focus", !element.classList.contains("focus"));
}


function switchTheme() {
  body.classList.toggle("dark-theme-contrast-light") 
  toggleClasses(
    [header, colorSchemesOptions],"dark-theme-contrast-dark");
  toggleClasses(
      [btnGetColorScheme, btnModal],"btn-dark-theme");  
  toggleHoverFocusActive(btnGetColorScheme)
  toggleHoverFocusActive(btnModal)
  modalContent.classList.toggle("modal-dark-theme") 
  closeModal.classList.toggle("close-dark-theme")       
}

toggle.addEventListener("click", switchTheme);



btnGetColorScheme.addEventListener("click", function (e) {
  e.preventDefault()
  colorSchemeHTML =""
  sectionColorScheme.innerHTML=""
  const hex = colorPicker.value.slice(1)
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${hex}&format=json&mode=${colorSchemesOptions.value}`
  )
    .then((res) => res.json())
    .then((data) => 
    { 
      data.colors.forEach((color,index) => {
        const colorHex = color.hex.value
        
        colorSchemeHTML +=
        `<div class="color-container" id="rectangle">
            <div class="color-item" id ="color-${index +1}" style="background-color: ${colorHex};" data-hex="${colorHex}">
            </div> 
            <div class="color-info"> 
              <p id="scheme-color-${index +1}" class = "color-hex-number">${colorHex}</p>
              <button class="btn-copy-color" data-color="${colorHex}" > <i class="fa-regular fa-copy id=copy-color"></i></button> 
            </div> 
        </div>`;
        
    });
     


//Modal

  sectionColorScheme.innerHTML=colorSchemeHTML
  btnCopyColor = document.querySelectorAll(".btn-copy-color")

  btnCopyColor.forEach(btn=>{
      btn.addEventListener("click", function(){
        const copyColor =this.dataset.color;
        console.log(copyColor)
        const copyContent = async () => {
          try {
            await navigator.clipboard.writeText(copyColor);
            console.log('Content copied to clipboard');
             modal.style.display="block";
          } catch (err) {
          console.error('Failed to copy: ', err);
          }
        }
      copyContent()
    })
  })})
  
});

closeModal.onclick = ()=> modal.style.display="none"

window.onclick = () =>{
  if (modal.style.display === "block") {
    modal.style.display="none"
  }
}

btnModal.addEventListener("click",()=> modal.style.display ="none")





