const toggle = document.querySelector("input[type='checkbox']")
const root = document.querySelector(':root')
const text = document.querySelectorAll('.toggle-button p')
const button = document.querySelector('button')
const dropDown= document.querySelector('.dropdown')
const dropDownMenu= document.querySelector('.dropdown-menu')
const newbie= document.querySelector('.newbie')
const junior= document.querySelector('.junior')
const options= document.querySelectorAll('.options')

//console.log(toggle)

const getTheme = () =>{
    let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' ;
    localStorage.getItem('get.theme') ? theme = localStorage.getItem('get.theme') : null;

    if (theme === 'dark'){
        toggle.checked = true
        text[0].classList.add('hide')
        text[1].classList.remove('hide')
        loadTheme(theme)
    }else{
        toggle.checked = false
        text[1].classList.add('hide')
        text[0].classList.remove('hide')
        loadTheme(theme)
    }
    return theme
}

const loadTheme = theme => {
    root.setAttribute('color-scheme', `${theme}`)
}

toggle.addEventListener('click', () => {
    let theme = getTheme()
    if (theme === 'dark'){
        theme = 'light'
        toggle.checked = false
        text[1].classList.add('hide')
        text[0].classList.remove('hide')
    }else{
        theme = 'dark'
        toggle.checked = true 
        text[0].classList.add('hide')
        text[1].classList.remove('hide')

    }
    loadTheme(theme)
    localStorage.setItem('get.theme', `${theme}`)

})

window.addEventListener('DOMContentLoaded', () => {
    loadTheme(getTheme())
})

document.addEventListener('click', e => {
    const isDropDownButton = e.target.matches('button') 
    if(isDropDownButton) {
        dropDownMenu.classList.toggle('show')
    }else{
        dropDownMenu.classList.remove('show')
    }
})

options.forEach(option => {
    option.addEventListener('click', e => {
        if(option.value.toLowerCase() === 'newbie'){
            newbie.classList.remove('hide')
            newbie.classList.remove('none')
            junior.classList.add('hide')
            junior.classList.add('none')

        }else if(option.value.toLowerCase() === 'junior'){
            junior.classList.remove('hide')
            junior.classList.remove('none')
            newbie.classList.add('hide')
            newbie.classList.add('none')
        }
    })
})
