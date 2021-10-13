/*getting variables*/

const toggle = document.querySelector("input[type='checkbox']")
const root = document.querySelector(':root')
const text = document.querySelectorAll('.toggle-button p')
const button = document.querySelector('.main-button')
const dropDown= document.querySelector('.dropdown')
const dropDownMenu= document.querySelector('.dropdown-menu')
const strike = document.querySelectorAll('.strike')
const containers= document.querySelectorAll('.container')
const cards= document.querySelectorAll('.card')
const options= document.querySelectorAll('.options')
const titles= document.querySelectorAll('.title')
const search = document.querySelector('.search-bar')

/*light and dark mode toggle*/

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
        dropDownMenu.classList.toggle('flex')
        setTimeout(() => {
            dropDownMenu.classList.toggle('show')
        }, 1);
        button.classList.toggle('rotate')
        
    }else{
        dropDownMenu.classList.remove('show')
        setTimeout(() => {
            dropDownMenu.classList.remove('flex')
        }, 300);
        button.classList.remove('rotate')
    }

})

/*creating the sorting method when using the 'sort by' button*/


options.forEach(option => {
    option.addEventListener('click', e => {
        let word = search.search.value.toLowerCase().trim()
        switch(option.value){
            case 'all':
                button.textContent = 'All'
                containers.forEach(container => {
                    container.classList.add('hide')
                    setTimeout(() => {
                        container.classList.remove('none')
                    },250)
                    setTimeout(() => {
                        container.classList.remove('hide')
                        filterFunc(word)
                    },300)
                })
                break
            case 'newbie':
                button.textContent = 'Newbie'
                containers.forEach(container => {
                    if (container.classList.contains('newbie')){
                        container.classList.add('hide')
                        setTimeout(() => {
                            container.classList.remove('none')
                        },250)
                        setTimeout(() => {
                            container.classList.remove('hide')
                            filterFunc(word)
                        },300)
                    }else{
                        container.classList.add('hide')
                        setTimeout(() => {
                            container.classList.add('none')
                            filterFunc(word)
                        },300)
                    }
                })
                break
            case 'junior':
                button.textContent = 'Junior'
                containers.forEach(container => {
                    if (container.classList.contains('junior')){
                        container.classList.add('hide')
                        setTimeout(() => {
                            container.classList.remove('none')
                        },250)
                        setTimeout(() => {
                            container.classList.remove('hide')
                            filterFunc(word)
                        },300)
                    }else{
                        container.classList.add('hide')
                        setTimeout(() => {
                            container.classList.add('none')
                            filterFunc(word)
                        },300)
                    }
                })
                break
            case 'intermediate':
                break
            case 'advanced':
                break
            case 'guru':
                break

        }
    })
})


/*creating the searching input function when using the search input*/


const filterFunc = word => {
    const children = Array.from(titles);
    const filter = children.filter( title => !title.textContent.toLowerCase().includes(word))
    filter.forEach(card => card.parentElement.parentElement.classList.add('none'))

    const unfilter = children.filter( title => title.textContent.toLowerCase().includes(word))
    unfilter.forEach(card => card.parentElement.parentElement.classList.remove('none'))

    containers.forEach(container => {

        let cards = container.children[1].children;
        const cardChildren = Array.from(cards);
        
        let result = cardChildren.every(e => e.classList.contains('none'));

        if(button.textContent === 'Sort By'){
            if(result){
                container.classList.add('none')
            }else{
                container.classList.remove('none')
            }

        }else if(button.textContent === 'All'){
            if(result){
                container.classList.add('none')
            }else{
                container.classList.remove('none')
            }

        }else if(button.textContent === 'Newbie' && container.classList.contains('newbie')){
            if(result){
                container.classList.add('none')
            }else{
                container.classList.remove('none')
            }
        }else if(button.textContent === 'Junior' && container.classList.contains('junior')){
            if(result){
                container.classList.add('none')
            }else{
                container.classList.remove('none')
            } 
        }else if(button.textContent === 'Intermediate' && container.classList.contains('intermediate')){
            if(result){
                container.classList.add('none')
            }else{
                container.classList.remove('none')
            } 
        }else if(button.textContent === 'Advanced' && container.classList.contains('advanced')){
            if(result){
                container.classList.add('none')
            }else{
                container.classList.remove('none')
            } 
        }else if(button.textContent === 'Guru' && container.classList.contains('guru')){
            if(result){
                container.classList.add('none')
            }else{
                container.classList.remove('none')
            } 
        }else{
            container.classList.add('none')
        }

    })
}

search.addEventListener('keyup', e=>{
    e.preventDefault()
    let word = search.search.value.toLowerCase().trim()
    filterFunc(word)
})

search.addEventListener('submit', e=>{
    e.preventDefault()
    let word = search.search.value.toLowerCase().trim()
    filterFunc(word)
})


//fix sort
//fix enter submit