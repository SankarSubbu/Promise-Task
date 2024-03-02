const apiBaseUrl = "https://api.publicapis.org/entries";
const apiSelect = document.getElementById("apiSelect");
const fetchDataBtn = document.getElementById("fetchDataBtn");
const DataContainer = document.getElementById("dataContainer");
fetchDataBtn.addEventListener("click", async () => {
  const selectedApi = apiSelect.value;
  const url = `${apiBaseUrl}/${selectedApi}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();

    DataContainer.innerHTML = "";

    if (data.entries) {
      data.entries.forEach((entry) => {
        const card = createCard(entry.API);
        DataContainer.appendChild(card);
      });
    } else {
      console.error("Unexpected API response format");
    }
  } catch (error) {
    console.error("Error fethcing data:", error);
    DataContainer.innerHTML =
      '<p class="alert alert-danger">Failed to retrieve data.</p>';
  }
});

function createCard(title) {
  const card = document.createElement("div");
  card.classList.add("col-md-4", "mb-3", "card");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = title;

  const cardLink = document.createElement("a");
  cardLink.classList.add("btn", "btn-primary");
  cardLink.textContent = "Explore";
  cardLink.href = `#`; // Replace with actual link if available

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardLink);
  card.appendChild(cardBody);

  return card;
}
