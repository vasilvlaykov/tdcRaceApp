import { html, render } from 'https://unpkg.com/lit-html?module';

let navLeft = document.querySelector('.rApp-navbar-left')
let navRight = document.querySelector('.rApp-navbar-right')
let hostButtons = document.querySelector('.rApp-host-nav-buttons')
let createRaceBtn = document.querySelector('.rApp-create-race-btn')
let appBody = document.querySelector('.rApp-body')
let racesList = document.querySelector('.rApp-list-of-races')
let myRacesBtn = document.querySelector('.rApp-my-races')
let publicRacesBtn = document.querySelector('.rApp-public-races')
let confirmNewRaceModal = document.querySelector('.rApp-confirm-modal')
let confirmNewRaceBtn = document.getElementById('confirmNewRaceBtn')
let declineNewRaceBtn = document.getElementById('declineNewRaceBtn')
let newRaceNameModalInput = document.querySelector('.rApp-give-name')
let newRaceNameModalError = document.querySelector('.rApp-modal-name-error')
let delRaceModal = document.querySelector('.rApp-confirm-modal-delete')
let confirmRaceDel = document.getElementById('confirmRaceDel')
let declineRaceDel = document.getElementById('declineRaceDel')
let pubRaceModal = document.querySelector('.rApp-confirm-modal-publish')
let confirmRacePub = document.getElementById('confirmRacePub')
let declineRacePub = document.getElementById('declineRacePub')


// raw data за тестване ****************

let joinRacesArr = [{ rName: 'Sustezanie', isPublic: true }, { rName: 'Sustezanie', isPublic: true }, { rName: 'Sustezanie', isPublic: true }, { rName: 'Sustezanie', isPublic: true }]
let hostMyRacesArr = [{ rName: 'Sustezanie moe', isPublic: false }, { rName: 'Sustezanie', isPublic: true }, { rName: 'Sustezanie', isPublic: false }, { rName: 'Sustezanie', isPublic: true }]
let hostPublicRacesArr = [{ rName: 'Sustezanie public', isPublic: true }, { rName: 'Sustezanie', isPublic: true }, { rName: 'Sustezanie', isPublic: true }, { rName: 'Sustezanie', isPublic: true }]

// ***************************************
renderRaceArray(joinRacesArr)

navLeft.addEventListener('click', function () {
    renderRaceArray(joinRacesArr)
    navLeft.style.background = '#43627e'
    navRight.style.background = '#1e3954'
    hostButtons.style.display = 'none'
    createRaceBtn.style.display = 'none'
    appBody.style.height = '85%'
})

navRight.addEventListener('click', function () {
    renderRaceArray(hostMyRacesArr)
    let delRaceBtn = document.querySelectorAll('.rApp-race-del-btn')
    navRight.style.background = '#43627e'
    navLeft.style.background = '#1e3954'
    hostButtons.style.display = 'flex'
    createRaceBtn.style.display = 'block'
    appBody.style.height = '75%'
    delRaceBtn.forEach(e => e.style.display = 'block')
})

myRacesBtn.addEventListener('click', function () {
    renderRaceArray(hostMyRacesArr)
    let delRaceBtn = document.querySelectorAll('.rApp-race-del-btn')
    delRaceBtn.forEach(e => e.style.display = 'block')
})

publicRacesBtn.addEventListener('click', function () {
    renderRaceArray(hostPublicRacesArr)
})

createRaceBtn.addEventListener('click', function () {
    // тук трябва да се превключи към играта, където играчът създава чекпойнтите,
    //след което се отваря пак телефона с един модален прозорез,
    //в който да напише името на състезанието и да избере дали да го запази или не
    /*
    *
    *
    */

    confirmNewRaceModal.style.display = 'flex'
})

confirmNewRaceBtn.addEventListener('click', function () {
    if (newRaceNameModalInput.value.length <= 0) {
        newRaceNameModalError.style.display = 'block'
    } else {
        newRaceNameModalError.style.display = 'none'
        let newRaceName = newRaceNameModalInput.value
        // стигне ли се до тук значи името е валидно и го запаметяваш в базата
        /*
        *
        *
        */
        confirmNewRaceModal.style.display = 'none'
    }
})

declineNewRaceBtn.addEventListener('click', function () {
    newRaceNameModalError.style.display = 'none'
    confirmNewRaceModal.style.display = 'none'
})

function createRaceCard(raceName, isPublic) {
    let raceCard = () => html`
    <div class="rApp-race">
        <div class="rApp-race-name">${raceName}</div>
        <div class="rApp-race-join-btn tooltip">
            <i class="fas fa-flag-checkered"></i>
            <span class="tooltiptext">Започни</span>
        </div>
        <div class="rApp-race-del-btn tooltip">
            <i class="fas fa-trash-alt"></i>
            <span class="tooltiptext">Изтрий</span>
        </div>
        <div class="rApp-race-publish-btn tooltip">
            <i class="fas fa-upload"></i>
            <span class="tooltiptext">Публикувай</span>
        </div>
    </div>
    `

    let tempChild = document.createElement('div');
    racesList.appendChild(tempChild)
    render(raceCard(), racesList.lastChild)

    racesList.lastChild.getElementsByClassName('rApp-race-join-btn')[0].addEventListener('click', function () {
        // start race
    })

    racesList.lastChild.getElementsByClassName('rApp-race-del-btn')[0].addEventListener('click', function () {
        // delete race
        delRaceModal.style.display = 'flex'
        confirmRaceDel.addEventListener('click', function () {
            // delete race
            /*
            *
            */

            delRaceModal.style.display = 'none'
        })

        declineRaceDel.addEventListener('click', function () {
            delRaceModal.style.display = 'none'
        })
    })

    racesList.lastChild.getElementsByClassName('rApp-race-publish-btn')[0].addEventListener('click', function () {
        // make race public
        pubRaceModal.style.display = 'flex'
        confirmRacePub.addEventListener('click', function () {
            // publish race
            /*
            *
            */

            pubRaceModal.style.display = 'none'
        })

        declineRacePub.addEventListener('click', function () {
            pubRaceModal.style.display = 'none'
        })
    })

    if (isPublic) {
        racesList.lastChild.getElementsByClassName('rApp-race-publish-btn')[0].style.display = 'none'
    }
}

function renderRaceArray(arr) {
    racesList.innerHTML = ''
    for (let i = 0; i < arr.length; i++) {
        createRaceCard(arr[i].rName, arr[i].isPublic)
    }
}