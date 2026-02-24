let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

let total = document.getElementById('total');
let interviewCount = document.getElementById('interviewCount');
let rejectCount = document.getElementById('rejectCount');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectFilterBtn = document.getElementById('reject-filter-btn');

const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filtered-section');
const totalCounter = document.getElementById("totalCounter");



// delet
filterSection.addEventListener("click", function (e) {
  if (e.target.closest(".btn-delete")) {
    const card = e.target.closest(".card");
    card.remove(); // 
  }
});

// counts
totalCounter.innerText = allCardSection.children.length;


function calculateCount() {
    // Count only real job cards, ignore "No Jobs Available"
    const cards = Array.from(allCardSection.children).filter(
        card => !card.classList.contains('empty-card')
    );
    total.innerText = cards.length;
    interviewCount.innerText = interviewList.length;
    rejectCount.innerText = rejectedList.length;
}

// Call once initially
calculateCount();


// Toggle

function toggleStyle(id) {
    // Reset all
    allFilterBtn.classList.add('bg-white', 'text-black');
    interviewFilterBtn.classList.add('bg-white', 'text-black');
    rejectFilterBtn.classList.add('bg-white', 'text-black');

    allFilterBtn.classList.remove('bg-blue-500', 'text-white');
    interviewFilterBtn.classList.remove('bg-blue-500', 'text-white');
    rejectFilterBtn.classList.remove('bg-blue-500', 'text-white');

    // Add style selected
    const selected = document.getElementById(id);
    selected.classList.remove('bg-white', 'text-black');
    selected.classList.add('bg-blue-500', 'text-white');

    currentStatus = id;

    // Show or hide sections based
    if (id === 'interview-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderInterview();
    } else if (id === 'reject-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderRejected();
    } else if (id === 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    }
}

// Event delegate

mainContainer.addEventListener('click', function(event) {
    const card = event.target.closest('.card');
    if (!card || card.classList.contains('empty-card')) return;

    const jobTitle = card.querySelector('.cardTitle').innerText;
    const notes = card.querySelector('.notes').innerText;

    if (event.target.classList.contains('interview-btn')) {
        card.querySelector('.status').innerText = 'Interview';

        const jobInfo = { jobTitle, notes };
        if (!interviewList.find(j => j.jobTitle === jobTitle)) {
            interviewList.push(jobInfo);
        }
        rejectedList = rejectedList.filter(j => j.jobTitle !== jobTitle);

        if (currentStatus === 'reject-filter-btn') renderRejected();
    } else if (event.target.classList.contains('reject-btn')) {
        card.querySelector('.status').innerText = 'Rejected';

        const jobInfo = { jobTitle, notes };
        if (!rejectedList.find(j => j.jobTitle === jobTitle)) {
            rejectedList.push(jobInfo);
        }
        interviewList = interviewList.filter(j => j.jobTitle !== jobTitle);

        if (currentStatus === 'interview-filter-btn') renderInterview();
    } else if (event.target.classList.contains('btn-delete')) {
        // Remove from lists
        interviewList = interviewList.filter(j => j.jobTitle !== jobTitle);
        rejectedList = rejectedList.filter(j => j.jobTitle !== jobTitle);

        // Remove card from DOM
        card.remove();

        // Show No Jobs card if none left
        showEmptyCard();
    }

    calculateCount();
});

// Render filtered lists

function renderInterview() {
    filterSection.innerHTML = '';
    if (interviewList.length === 0) {
        showEmptyCardInFilter();
        return;
    }

    interviewList.forEach(job => {
        const div = document.createElement('div');
        div.className = 'card flex justify-between rounded p-8 bg-white';
        div.innerHTML = `
            <div class="space-y-6">
                <div>
                    <p class="cardTitle text-xl font-bold">${job.jobTitle}</p>
                </div>
                <button class="status light bg-gray-200 px-4 py-2 rounded">Interview</button>
                <p class="notes">${job.notes}</p>
                <div class="flex gap-5">
                    <button class="interview-btn border-2 border-green-400 text-green-400 font-bold px-3 py-1 rounded cursor-pointer hover:bg-green-400 hover:text-white">Interview</button>
                    <button class="reject-btn border-2 border-red-400 text-red-400 font-bold px-3 py-1 rounded cursor-pointer hover:bg-red-400 hover:text-white">Rejected</button>
                </div>
            </div>
            <div>
                <button class="btn-delete rounded-full h-10 border-gray-100 bg-white w-10 border p-1 justify-center cursor-pointer"><i class="fa-regular fa-trash-can"></i></button>
            </div>
        `;
        filterSection.appendChild(div);
    });
}

function renderRejected() {
    filterSection.innerHTML = '';
    if (rejectedList.length === 0) {
        showEmptyCardInFilter();
        return;
    }

    rejectedList.forEach(job => {
        const div = document.createElement('div');
        div.className = 'card flex justify-between rounded p-8 bg-white';
        div.innerHTML = `
            <div class="space-y-6">
                <div>
                    <p class="cardTitle text-xl font-bold">${job.jobTitle}</p>
                </div>
                <button class="status light bg-gray-200 px-4 py-2 rounded">Rejected</button>
                <p class="notes">${job.notes}</p>
                <div class="flex gap-5">
                    <button class="interview-btn border-2 border-green-400 text-green-400 font-bold px-3 py-1 rounded cursor-pointer hover:bg-green-400 hover:text-white">Interview</button>
                    <button class="reject-btn border-2 border-red-400 text-red-400 font-bold px-3 py-1 rounded cursor-pointer hover:bg-red-400 hover:text-white">Rejected</button>
                </div>
            </div>
            <div>
                <button class="btn-delete rounded-full h-10 border-gray-100 bg-white w-10 border p-1 justify-center cursor-pointer"><i class="fa-regular fa-trash-can"></i></button>
            </div>
        `;
        filterSection.appendChild(div);
    });
}


// empty card = no jobs

function showEmptyCard() {
    const cards = Array.from(allCardSection.children).filter(
        card => !card.classList.contains('empty-card')
    );
    const existingEmpty = allCardSection.querySelector('.empty-card');
    if (cards.length === 0 && !existingEmpty) {
        const div = document.createElement('div');
        div.className = 'card rounded p-10 py-30 bg-white flex items-center justify-center empty-card';
        div.innerHTML = `
            <div class="flex flex-col items-center text-center">
                <img src="./doc-img.png" alt="">
                <p class="text-xl font-bold mt-4">No Jobs Available</p>
                <p class="text-gray-500">Check back soon for new job opportunities</p>
            </div>
        `;
        allCardSection.appendChild(div);
    } else if (cards.length > 0 && existingEmpty) {
        existingEmpty.remove();
    }
}

// Empty card = filtered section
function showEmptyCardInFilter() {
    filterSection.innerHTML = `
        <div class="card rounded p-10 py-30 bg-white flex items-center justify-center empty-card">
            <div class="flex flex-col items-center text-center">
                <img src="./doc-img.png" alt="">
                <p class="text-xl font-bold mt-4">No Jobs Available</p>
                <p class="text-gray-500">Check back soon for new job opportunities</p>
            </div>
        </div>
    `;
}
