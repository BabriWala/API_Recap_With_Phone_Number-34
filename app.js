const loadPhones = async(searchText, datalimit)=>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, datalimit)
}

const displayPhones = (phones, datalimit) =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    // console.log(phones);
    // console.log(phones.data);
    // phones.foreEach(phone=>{
    //     console.log(phone)
    // });
    // display only 20 phones
    const showAll = document.getElementById('show-all');
    if(datalimit && phones.length > 10){
        phones = phones.slice(0,10);
        showAll.classList.remove('d-none');
    }else{
        showAll.classList.add('d-none');
    }
    
    
    // display no phones found
    const noPhone = document.getElementById('no-found-message');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }else{
        noPhone.classList.add('d-none');
    }

    // display all phones
    phones.forEach(phone =>{
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
            <div class="card p-4">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.slug}</p>
                </div>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary">Show Details</button>
            </div>
        `;
        console.log(phone.slug)
        phoneContainer.appendChild(phoneDiv);
    });
    toggleSpinner(false);
}
// loadPhones();

const processSearch = (datalimit) =>{
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, datalimit);
}

// document.getElementById('btn-search').addEventListener('click', ()=>{
//     processSearch(10);
// })

document.getElementById('search-field').addEventListener('keypress', function (e){
    console.log(e.key);
    if(e.key === 'Enter'){
        processSearch(10);
    }
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }else{
        loaderSection.classList.add('d-none');
    }
}

// not the best way
document.getElementById('show-all-button').addEventListener('click', ()=>{
    processSearch();
})

const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
}