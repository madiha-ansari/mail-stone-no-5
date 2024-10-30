var form = document.getElementById("resume_form") as HTMLFormElement;
var resumeDisplayElement = document.getElementById("resume_display") as HTMLDivElement;
var shareableLink = document.getElementById("shareable_link") as HTMLDivElement;
var shareableLinkElement = document.getElementById("shareable") as HTMLAnchorElement;
var downloadPdfButton = document.getElementById("download_pdf") as HTMLButtonElement;

// handle form submit
form.addEventListener("submit", (event: Event) => {
    event.preventDefault()
    // collect input values
    var username = (document.getElementById("UserName") as HTMLInputElement).value;
    var name = (document.getElementById("name") as HTMLInputElement).value;
    var email = (document.getElementById("email") as HTMLInputElement).value;
    var phoneNo = (document.getElementById("Phone") as HTMLInputElement).value;
    var education = (document.getElementById("Education") as HTMLTextAreaElement).value;
    var experience = (document.getElementById("Experience") as HTMLTextAreaElement).value;
    var skills = (document.getElementById("Skills") as HTMLTextAreaElement).value;

    // save data local storge
    const dataResume = {
        name,
        email, phoneNo,
        education,
        experience, skills,
    }

    localStorage.setItem(username, JSON.stringify(dataResume))

    // generate the resume
    var resumeHtml = `
<h2><b>editable Resume</b></h2>
<h3>Personal Information</h3>
<ul>
       <li><b>Name: </b><span contenteditable="true">${name}</span></li>
       <li><b>Email: </b>  <span contenteditable="true">${email}</span></li>
       <li><b>Phone no : </b> <span contenteditable="true">${phoneNo}</span></li>
</ul>
<h2><b>Education</b></h2>
<p  contenteditable="true">${education}</p>
<h2><b>Experience</b></h2>
<p contenteditable="true" >${experience}</p>
<h2><b>Skills</b></h2>
<p  contenteditable="true">${skills}</p>`;

    // dispplay the generate resume
    resumeDisplayElement.innerHTML = resumeHtml;
    const shareableURL = `${window.location.origin}${window.location.pathname}?username=${encodeURIComponent(username)}`;
    //    display the link
    shareableLink.style.display = "block";
    shareableLinkElement.href = shareableURL
    shareableLinkElement.textContent = shareableURL;
});

// button pdf click the open the pdf file
downloadPdfButton.addEventListener("click", () => {
    window.print();
});

window.addEventListener("DOMContentLoaded", () => {
    const urlPrams = new URLSearchParams(window.location.search)
    const username = urlPrams.get("username")
    if (username) {
        const savedRseume = localStorage.getItem(username)
        if (savedRseume) {
            const resume = JSON.parse(savedRseume);
            (document.getElementById("userName") as HTMLInputElement).value = username;
            (document.getElementById("name") as HTMLInputElement).value = resume.name;
            (document.getElementById("email") as HTMLInputElement).value = resume.email;
            (document.getElementById("Phone") as HTMLInputElement).value = resume.phoneNo;
            (document.getElementById("Education") as HTMLTextAreaElement).value = resume.education;
            (document.getElementById("Experience") as HTMLTextAreaElement).value = resume.experience;
            (document.getElementById("Skills") as HTMLTextAreaElement).value = resume.skills
        }
    }
});