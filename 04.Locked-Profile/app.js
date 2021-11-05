function lockedProfile() {
    createElement();

    document.getElementById(`main`).addEventListener(`click`, onToggle);

    function onToggle(event) {
        const button = event.target;
        const profile = button.parentNode;
        const moreInformation = profile.getElementsByTagName(`div`)[0];
        const lockStatus = profile.querySelector(`input[type="radio"]:checked`).value;

        if (lockStatus === `unlock`) {
            if (button.textContent === `Show more`) {
                moreInformation.style.display = `inline-block`;
                button.textContent = `Hide it`;
            } else if (button.textContent === `Hide it`) {
                moreInformation.style.display = `none`;
                button.textContent = `Show more`;
            }
        }
    }
}

const main = document.getElementById(`main`);

async function getProfiles() {
    const urlProfiles = `http://localhost:3030/jsonstore/advanced/profiles`;

    const res = await fetch(urlProfiles);
    const data = await res.json();

    return data;
}

async function createElement() {
    main.replaceChildren();

    const data = await getProfiles();

    Object.entries(data).forEach(profile => {

        let profileDiv = document.createElement(`div`);
        profileDiv.classList.add(`profile`);

        let name = profile[1].username;
        let age = profile[1].age;
        let email = profile[1].email;

        profileDiv.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
<label>Lock</label>
<input type="radio" name="user1Locked" value="lock" checked>
<label>Unlock</label>
<input type="radio" name="user1Locked" value="unlock"><br>
<hr>
<label>Username</label>
<input type="text" name="user1Username" value="${name}" disabled readonly />
<div id="user1HiddenFields">
<hr>
<label>Email:</label>
<input type="email" name="user1Email" value="${email}" disabled readonly />
<label>Age:</label>
<input type="email" name="user1Age" value="${age}" disabled readonly />
</div>
<button>Show more</button>`;

        main.appendChild(profileDiv);
    });

}