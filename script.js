const loadData = async (isShowAll) => {
    toggleSpinner(true);
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools')
    const jsonData = await res.json();
    const data = jsonData.data.tools;
    displayData(data, isShowAll)



}

const displayData = (data, isShowAll) => {
    const cardContainer = document.getElementById('card-container');
    if (!isShowAll) {
        data = data.slice(0, 6);
    }
    cardContainer.innerText = '';


    for (let singleData of data) {
        // console.log(singleData)


        const div = document.createElement('div');
        div.classList = `card w-96 bg-base-100 shadow-xl`;
        div.innerHTML = `
       <figure class="px-10 pt-10">
                        <img  onclick="cardDetails('${singleData.id}')" src="${singleData.image}" alt="image" class="rounded-xl" />
                    </figure>
                    <div class="card-body  text-left">
                    <h1 class="text-xl font-bold  ">Features</h1>
                        <ol class="list-decimal ml-4">
                        <li>${singleData.features[0]}</li>
                        <li>${singleData.features[1]}</li>
                        <li>${singleData.features[2]}</li>
                        </ol>
                        <hr>
                        <h2 class="text-xl font-bold text-left ">${singleData.name}</h2>
                       <p>${singleData.published_in
            }</p>
                    </div>
       `
        cardContainer.appendChild(div);


    }
    toggleSpinner(false)
}

showAllCards = () => {
    toggleSpinner(true)
    loadData(true)
    const showAllButton = document.getElementById('show-all-btn');
    showAllButton.classList.add('hidden');
}

const toggleSpinner = (isLoading) => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('hidden');
    }
    else {
        spinner.classList.add('hidden');
    }
}

const cardDetails = async (id) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    const data = await res.json();
    const details = data.data;
    showDetailsModal(details)
}


const showDetailsModal = (details) => {
    console.log(details);
    const modalTitle = document.getElementById('modal-title');
    modalTitle.innerText = details.description;

    const price = document.getElementById('price');
    price.innerText = details.pricing[0].price;
    const plan = document.getElementById('plan');
    plan.innerText = details.pricing[0].plan;


    const price2 = document.getElementById('price-2');
    price2.innerText = details.pricing[1].price;
    const plan2 = document.getElementById('plan-2');
    plan2.innerText = details.pricing[1].plan;

    const price3 = document.getElementById('price-3');
    price3.innerText = details.pricing[2].price;
    const plan3 = document.getElementById('plan-3');
    plan3.innerText = details.pricing[2].plan;


    const features = document.getElementById('features')
    features.classList.add('list-decimal')
    features.innerHTML = `
    <li>${details.features['1'].feature_name}</li>
    <li>${details.features['2'].feature_name}</li>
    <li>${details.features['3'].feature_name}</li>
    `

    const intregations = document.getElementById('integrations');
    intregations.classList.add('list-decimal')
    intregations.innerHTML = `<li>${details.integrations[0]
        }</li>
    <li>${details.integrations[1]}</li>
    <li>${details.integrations[2]}</li>`


    const modalImage = document.getElementById('modal-image');
    modalImage.src = `${details.image_link[0]}`

    const example1 = document.getElementById('example-1');
    example1.innerText = `${details.input_output_examples[0].input}`;

    const example2 = document.getElementById('example-2');
    example2.innerText = `${details.input_output_examples[0].output}`;

    // const closeModal = document.getElementById('close-modal');
    // closeModal.addEventListener('click', function () {
    //     const modal = document.getElementById('my_modal');
    //     modal.style.display = "none";

    // })

    my_modal.showModal()

}

loadData()