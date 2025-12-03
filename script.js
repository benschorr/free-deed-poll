function formatDateForDeed(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "";

  const day = date.getDate();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  // Ordinal suffix
  const j = day % 10,
    k = day % 100;
  let suffix = "th";
  if (j === 1 && k !== 11) suffix = "st";
  else if (j === 2 && k !== 12) suffix = "nd";
  else if (j === 3 && k !== 13) suffix = "rd";

  return `${day}${suffix} day of ${month} ${year}`;
}

function setTodayAsDefaultDate() {
  const dateInput = document.getElementById("effectiveDate");
  if (!dateInput) return;
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  dateInput.value = `${yyyy}-${mm}-${dd}`;
}

function generateDeedPoll(event) {
  event.preventDefault();

  const currentName = document.getElementById("currentName").value.trim();
  const newName = document.getElementById("newName").value.trim();
  const address = document.getElementById("address").value.trim();
  const effectiveDate = document.getElementById("effectiveDate").value;
  const jurisdiction = document.getElementById("jurisdiction").value;

  const witness1Name = document.getElementById("witness1Name").value.trim();
  const witness1Address = document.getElementById("witness1Address").value.trim();
  const witness2Name = document.getElementById("witness2Name").value.trim();
  const witness2Address = document.getElementById("witness2Address").value.trim();

  if (!currentName || !newName || !address || !effectiveDate || !witness1Name || !witness1Address || !witness2Name || !witness2Address) {
    alert("Please fill in all required fields before generating your deed poll.");
    return;
  }

  const prettyDate = formatDateForDeed(effectiveDate);

  const deedText = `
<h3>Deed Poll</h3>

THIS DEED OF CHANGE OF NAME is made this ${prettyDate}.

BY ME, <strong>${currentName}</strong>, of <strong>${address.replace(/\n/g, ", ")}</strong>, currently residing in ${jurisdiction}.

1. I absolutely and entirely renounce, relinquish and abandon the use of my former name of <strong>${currentName}</strong> and, in place of that name, assume, adopt and determine to take and use from the date of this deed the name of <strong>${newName}</strong>.

2. I shall at all times hereafter in all records, deeds, documents and other writings, and in all actions and proceedings, as well as in all dealings and transactions and on all occasions whatsoever, use and subscribe the name of <strong>${newName}</strong> in place of my former name of <strong>${currentName}</strong>, so as to be known and distinguished by the name of <strong>${newName}</strong> only.

3. I authorise and require all persons at all times to describe, address and refer to me by the name of <strong>${newName}</strong> only.

IN WITNESS whereof I have hereunto signed my adopted and substituted name of <strong>${newName}</strong> and also my former name of <strong>${currentName}</strong> on the date written above.

<br><br>

Signed as a deed by:<br>
______________________________<br>
<strong>${newName}</strong><br>
(formerly known as ${currentName})

<br><br>

In the presence of:

<br><br>

<strong>Witness 1</strong><br>
Name: ${witness1Name}<br>
Address: ${witness1Address.replace(/\n/g, "<br>")}<br>
Signature: _____________________________

<br><br>

<strong>Witness 2</strong><br>
Name: ${witness2Name}<br>
Address: ${witness2Address.replace(/\n/g, "<br>")}<br>
Signature: _____________________________
`;

  const outputDiv = document.getElementById("deedPollOutput");
  outputDiv.innerHTML = deedText.trim();

  const printButton = document.getElementById("printButton");
  printButton.disabled = false;
}

function setupPrintButton() {
  const button = document.getElementById("printButton");
  if (!button) return;
  button.addEventListener("click", function () {
    window.print();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  setTodayAsDefaultDate();
  const form = document.getElementById("deedPollForm");
  form.addEventListener("submit", generateDeedPoll);
  setupPrintButton();
});

