// Assuming "search product" is the ID of an input element
let searchData = document.getElementById("search product");
let rootId=document.getElementById("root")

let finalData=[];

// displaying the all the data and user search data
function displayApiData(data){
    console.log(data)
    let{product_badge,product_image,product_title,product_variants}=data
    let [{v1},{v2},{v3}]=product_variants
    console.log(v1)
    const productDiv = document.createElement('div');
    productDiv.classList.add('productContainer');
    if(product_badge !==""){
        para=document.createElement("p")
        para.textContent=product_badge
        para.classList.add("para")
        productDiv.appendChild(para)
    }
    else{
        para=document.createElement("p")
        para.textContent=" "
        para.classList.add("para1")
        productDiv.appendChild(para)
    }

    image=document.createElement("img")
    image.src=product_image
    image.alt=product_title
    image.classList.add("image")

    subDiv=document.createElement('div')
    subDiv.classList.add("sub_container")

    head3=document.createElement('h3')
    head3.textContent=product_title
    head3.classList.add("short_head")
    subDiv.appendChild(head3)

    ulcreate=document.createElement("ul")
    ulcreate.classList.add("ul_list")
    
    list1=document.createElement("li")
    list1.textContent=v1
    ulcreate.appendChild(list1)
    list2=document.createElement("li")
    list2.textContent=v2
    ulcreate.appendChild(list2)
    list3=document.createElement("li")
    list3.textContent=v3
    ulcreate.appendChild(list3)

    subDiv.appendChild(ulcreate)
    productDiv.appendChild(image)
    productDiv.appendChild(subDiv)
    rootId.appendChild(productDiv)
}


//render data one by one
function renderData(filterData) {
    rootId.textContent=""
    for (let result of filterData){
        displayApiData(result)
    }
}

//filtering data based on user search
function filterData(data, query) {
    const filteredData = data.filter(item =>
        item.product_title.toLowerCase().includes(query.toLowerCase())
    );
    renderData(filteredData);
}

// get api data function
async function getData() {
    let searchInput = searchData.value;
    console.log(searchInput);
    let url = "https://products-api-2ttf.onrender.com/api/products?search=" + searchInput;
    let options = {
        method: "GET"
    };
    let response = await fetch(url, options);
    let data = await response.json();
    return data;
}

// main function to get api data and search input
async function main() {
    data = await getData();
    data.data.map(item => {
        finalData.push(item);
      });
    renderData(finalData)
    searchData.addEventListener("keydown", searchApiData);  
}

main();

//user searching function
function searchApiData() { 
        let searchValue = searchData.value;
        filterData(finalData, searchValue)
}

