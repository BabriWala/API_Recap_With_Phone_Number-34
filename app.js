const loadPhones = async()=>{
    const url = 'https://openapi.programming-hero.com/api/phones?search=iphone';
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data)
}

const displayPhones = phones =>{
    const phoneContainer = document.getElementById('phoneContainer');
    // console.log(phones);
    console.log(phones.data);
    // phones.foreEach(phone=>{
    //     console.log(phone)
    // });
}


loadPhones();