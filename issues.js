

const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues"

const icons = {
    high: "assets/Open-Status.png",
    medium: "assets/Open-Status.png",
    low: "assets/Closed- Status .png"
};



async function loadIssues() {

    showSpinner(true)

    const res = await fetch(API)

    const data = await res.json()

    displayIssues(data.data)

    document.getElementById("issueCount").innerText =
        `${data.data.length} Issues`

    showSpinner(false)

}



function displayIssues(issues) {

    const container = document.getElementById("issuesContainer")

    container.innerHTML = ""

    issues.forEach(issue => {

        const card = document.createElement("div")

        card.className =
            "bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"

        card.onclick = () => showIssue(issue.id)



        if (issue.status === "open") {
            card.style.borderTop = "4px solid #10B981"
        } else {
            card.style.borderTop = "4px solid #8B5CF6"
        }




        let priorityColor = "#9CA3AF"
        let priorityBG = "#F3F4F6"

        if (issue.priority === "high") {
            priorityColor = "#EF4444"
            priorityBG = "#FEE2E2"
        }

        if (issue.priority === "medium") {
            priorityColor = "#F59E0B"
            priorityBG = "#FEF3C7"
        }




        const icon = icons[issue.priority] || "assets/default.png"




        const labels = `

<span class="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border"
style="border-color:#FCA5A5;color:#EF4444;background:#FEF2F2">
 BUG
</span>

<span class="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border"
style="border-color:#FCD34D;color:#D97706;background:#FFFBEB">
 HELP WANTED
</span>

`



        card.innerHTML = `

<div class="p-5">

<div class="flex justify-between items-center">

<div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">

<img src="${icon}" class="w-4 h-4">

</div>

<span class="px-4 py-1 rounded-full text-xs font-semibold"
style="background:${priorityBG};color:${priorityColor}">
${issue.priority.toUpperCase()}
</span>

</div>



<h2 class="font-semibold text-md mt-3 text-gray-800">

${issue.title}

</h2>



<p class="text-gray-500 text-sm mt-2">

${issue.description}

</p>



<div class="flex gap-3 mt-4">

${labels}

</div>



<div class="border-t mt-5 pt-4 text-sm text-gray-500">

<p>

#1 by ${issue.author}

</p>

<p class="mt-1">

${issue.createdAt}

</p>

</div>

</div>

`

        container.appendChild(card)

    })

}



async function filterIssues(type) {

    const res = await fetch(API)

    const data = await res.json()

    const filtered = data.data.filter(issue => issue.status === type)

    displayIssues(filtered)

    document.getElementById("issueCount").innerText =
        `${filtered.length} Issues`

}



async function searchIssue() {

    const text = document.getElementById("searchText").value

    const res = await fetch(
        `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
    )

    const data = await res.json()

    displayIssues(data.data)

    document.getElementById("issueCount").innerText =
        `${data.data.length} Issues`

}



function setActiveTab(type) {

    document.getElementById("allTab").classList.remove("tab-active")
    document.getElementById("openTab").classList.remove("tab-active")
    document.getElementById("closedTab").classList.remove("tab-active")



    if (type === "all") {

        document.getElementById("allTab").classList.add("tab-active")

        loadIssues()

    }



    if (type === "open") {

        document.getElementById("openTab").classList.add("tab-active")

        filterIssues("open")

    }



    if (type === "closed") {

        document.getElementById("closedTab").classList.add("tab-active")

        filterIssues("closed")

    }

}


async function showIssue(id) {

    const res = await fetch(
        `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    )

    const data = await res.json()

    const issue = data.data

    const modalContent =
        document.getElementById("modalContent")




    let priorityColor = "#9CA3AF"

    if (issue.priority === "high") {
        priorityColor = "#EF4444"
    }

    if (issue.priority === "medium") {
        priorityColor = "#F59E0B"
    }




    const statusBadge =
        issue.status === "open"
            ? `<span class="badge badge-success">Opened</span>`
            : `<span class="badge badge-neutral">Closed</span>`



    modalContent.innerHTML = `

<div class="flex gap-4 items-start">

<div class="w-12 h-12 bg-gray-200 rounded"></div>

<div>

<h2 class="text-xl font-bold">

${issue.title}

</h2>

<div class="flex items-center gap-2 mt-1 text-sm text-gray-500">

${statusBadge}

<span>Opened by ${issue.author}</span>

<span>•</span>

<span>${issue.createdAt}</span>

</div>

</div>

</div>



<div class="flex gap-2 mt-4">

<span class="px-3 py-1 rounded-full text-xs border"
style="border-color:#FCA5A5;color:#EF4444;background:#FEF2F2">

 BUG

</span>

<span class="px-3 py-1 rounded-full text-xs border"
style="border-color:#FCD34D;color:#D97706;background:#FFFBEB">

 HELP WANTED

</span>

</div>



<p class="mt-4 text-gray-600">

${issue.description}

</p>



<div class="grid grid-cols-2 gap-4 mt-6 bg-gray-100 p-4 rounded">

<div>

<p class="text-sm text-gray-500">

Assignee:

</p>

<p class="font-semibold">

${issue.author}

</p>

</div>


<div>

<p class="text-sm text-gray-500">

Priority:

</p>

<span class="px-3 py-1 rounded-full text-xs font-semibold"
style="background:#FEE2E2;color:${priorityColor}">

${issue.priority.toUpperCase()}

</span>

</div>

</div>



<div class="modal-action">

<form method="dialog">

<button class="btn btn-primary">

Close

</button>

</form>

</div>

`

    document.getElementById("issueModal").showModal()

}

function showSpinner(show) {

    const spinner = document.getElementById("spinner")

    if (show) {
        spinner.classList.remove("hidden")
    } else {
        spinner.classList.add("hidden")
    }

}



loadIssues()