


let jobs =
JSON.parse(localStorage.getItem("jobs")) || [];


const jobForm =
document.getElementById("jobForm");

const jobList =
document.getElementById("jobList");

const searchInput =
document.getElementById("searchInput");

// STATS

const appliedCount =
document.getElementById("appliedCount");

const interviewCount =
document.getElementById("interviewCount");

const offerCount =
document.getElementById("offerCount");

const rejectedCount =
document.getElementById("rejectedCount");



jobForm.addEventListener("submit", (e) => {

e.preventDefault();

const company =
document.getElementById("company").value;

const role =
document.getElementById("role").value;

const status =
document.getElementById("status").value;

const job = {

id: Date.now(),
company,
role,
status

};

jobs.push(job);

saveData();
render();
updateStats();

jobForm.reset();

});



function saveData(){

localStorage.setItem(
"jobs",
JSON.stringify(jobs)
);

}



function render(data = jobs){

jobList.innerHTML = "";

data.forEach(j => {

const div =
document.createElement("div");

div.classList.add("job-card");

div.innerHTML = `

<h3>${j.company}</h3>
<p>${j.role}</p>
<p>Status: ${j.status}</p>

<button onclick="deleteJob(${j.id})">
Delete
</button>

`;

jobList.appendChild(div);

});

}

// ================= DELETE =================

function deleteJob(id){

jobs =
jobs.filter(j => j.id !== id);

saveData();
render();
updateStats();

}



searchInput.addEventListener("keyup", () => {

const keyword =
searchInput.value.toLowerCase();

const filtered =
jobs.filter(j =>
j.company.toLowerCase().includes(keyword) ||
j.role.toLowerCase().includes(keyword)
);

render(filtered);

});



function updateStats(){

appliedCount.textContent =
jobs.filter(j => j.status === "Applied").length;

interviewCount.textContent =
jobs.filter(j => j.status === "Interview").length;

offerCount.textContent =
jobs.filter(j => j.status === "Offer").length;

rejectedCount.textContent =
jobs.filter(j => j.status === "Rejected").length;

}



render();
updateStats();