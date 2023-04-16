let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")
let mood = "create";
let temp;

function getTotal () { 
    if (price.value != "") {  
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value // we used + to convert from string to number
        total.innerHTML = result 
        total.style.background = '#040' 
    } else {  
        total.innerHTML = '';  
        total.style.background = '#a00d02';
    }
}

let dataPro;  
if (localStorage.product != null) { 
    dataPro = JSON.parse(localStorage.product); 
} else { 
    dataPro = []; 
}
submit.addEventListener("click", function (){ 
let newPro = {
    title:title.value,
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,  
    count:count.value,
    category:category.value,
    }
    if (title.value != "" && 
        price.value != "" && 
        taxes.value != "" && 
        ads.value != "" && 
        discount.value != "" && 
        category.value != "" &&
        newPro.count < 100 ) {
        if (mood == "create") { 
        if (newPro.count > 1 ) {
            for (let i=0; i < newPro.count;i++) {
            dataPro.push(newPro);  
            }       
        } else { 
        dataPro.push(newPro);  
        } 
        } else { 
        dataPro[temp]=newPro
        mood ="create";
        submit.innerHTML="Create";
        count.style.display="block";
        }
    clearData ()
    } else { 

    }
            localStorage.setItem("product",JSON.stringify(dataPro)) 
            showData ()
            // clearData ()
})
function clearData () {
    title.value = "",
    price.value = "",
    taxes.value = "",
    ads.value = "",
    discount.value = "",
    total.innerHTML = "",
    count.value = "",
    category.value = ""
}
function showData () {
    getTotal();
    let table = '' ;
    for (let i = 0; i<dataPro.length ; i++) { 
        table +=
        `
        <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})"id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;  
    let btnDelete = document.getElementById("deleteAll"); 
    if(dataPro.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All(${dataPro.length})</button>` 
    }else {
        btnDelete.innerHTML = "";
    }
}
showData() 

function deleteData (i) { 
    dataPro.splice(i,1); 
    localStorage.product = JSON.stringify(dataPro)
    showData() 
}

function deleteAll() {
    localStorage.clear() 
    dataPro.splice(0); 
    showData()  
}

function updateData(i) {  
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    taxes.value=dataPro[i].taxes;
    ads.value=dataPro[i].ads;
    discount.value=dataPro[i].discount;
    getTotal() 
    count.style.display = "none"  
    category.value=dataPro[i].category;
    submit.innerHTML = 'Update'; 
    mood = "update"; 
    temp = i;
    goUp();  
}

function goUp() {
    scrollTo({
    top : 0,
    behavior : "smooth"
})
};
let searchMood = "title"; 
function getSearchMood (id) {  
        let search = document.getElementById("search"); 
    if (id == "searchTitle") {
        searchMood = "title";
    } else { 
        searchMood = "category";
    }
    search.placeholder = "Search using " +  searchMood ; 
    search.focus();  
    search.value = "";  
}

function searchData(value) { 
    let table =''; 
    if (searchMood == "title") { 
        for (let i=0; i < dataPro.length; i++) {  
            if (dataPro[i].title.includes(value.toLowerCase())) {  
                table +=  
        `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})"id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>
        `
            }
        }
    } else {
        for (let i=0; i < dataPro.length; i++) {  
            if (dataPro[i].category.includes(value.toLowerCase())) { 
                table +=  
        `
        <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})"id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>
        `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
var moon = document.getElementById("moon");
moon.addEventListener("click", dark);
function dark() {
    document.body.style.backgroundColor = "#222";
    document.body.style.color = "#fff";
    title.style.background = "#111";
    price.style.background = "#111";
    taxes.style.background = "#111";
    ads.style.background = "#111";
    discount.style.background = "#111";
    count.style.background = "#111";
    category.style.background = "#111";
    search.style.background = "#111";
    title.style.border= "none"; 
    price.style.border= "none"; 
    taxes.style.border= "none"; 
    ads.style.border= "none"; 
    discount.style.border= "none"; 
    count.style.border= "none"; 
    category.style.border= "none"; 
    search.style.border= "none"; 
}
let sun = document.getElementById("sun");
sun.addEventListener("click", light);
function light() {
    document.body.style.backgroundColor = "#fff";
    document.body.style.color = "#222";
    title.style.background = "#fff";
    price.style.background = "#fff";
    taxes.style.background = "#fff";
    ads.style.background = "#fff";
    discount.style.background = "#fff";
    count.style.background = "#fff";
    category.style.background = "#fff";
    search.style.background = "#fff";
    title.style.border= "2px solid #7064b6"; 
    price.style.border= "2px solid #7064b6"; 
    taxes.style.border= "2px solid #7064b6"; 
    ads.style.border= "2px solid #7064b6"; 
    discount.style.border= "2px solid #7064b6"; 
    count.style.border= "2px solid #7064b6"; 
    category.style.border= "2px solid #7064b6"; 
    search.style.border= "2px solid #7064b6";
    title.style.color = "#222";
    price.style.color = "#222";
    taxes.style.color = "#222";
    ads.style.color = "#222";
    discount.style.color = "#222";
    count.style.color = "#222";
    category.style.color = "#222";
    search.style.color = "#222";
    total.style.color = "#fff"; 
}
