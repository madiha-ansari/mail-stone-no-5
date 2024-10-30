var form = document.getElementById("resume_form");
var resumeDisplayElement = document.getElementById("resume_display");
var shareableLink = document.getElementById("shareable_link");
var shareableLinkElement = document.getElementById("shareable");
var downloadPdfButton = document.getElementById("download_pdf");
// handle form submit
form.addEventListener("submit", function (event) {
    event.preventDefault();
    // collect input values
    var username = document.getElementById("UserName").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phoneNo = document.getElementById("Phone").value;
    var education = document.getElementById("Education").value;
    var experience = document.getElementById("Experience").value;
    var skills = document.getElementById("Skills").value;
    // save data local storge
    var dataResume = {
        name: name,
        email: email,
        phoneNo: phoneNo,
        education: education,
        experience: experience,
        skills: skills,
    };
    localStorage.setItem(username, JSON.stringify(dataResume));
    // generate the resume
    var resumeHtml = "\n<h2><b>editable Resume</b></h2>\n<h3>Personal Information</h3>\n<ul>\n       <li><b>Name: </b><span contenteditable=\"true\">".concat(name, "</span></li>\n       <li><b>Email: </b>  <span contenteditable=\"true\">").concat(email, "</span></li>\n       <li><b>Phone no : </b> <span contenteditable=\"true\">").concat(phoneNo, "</span></li>\n</ul>\n<h2><b>Education</b></h2>\n<p  contenteditable=\"true\">").concat(education, "</p>\n<h2><b>Experience</b></h2>\n<p contenteditable=\"true\" >").concat(experience, "</p>\n<h2><b>Skills</b></h2>\n<p  contenteditable=\"true\">").concat(skills, "</p>");
    // dispplay the generate resume
    resumeDisplayElement.innerHTML = resumeHtml;
    var shareableURL = "".concat(window.location.origin).concat(window.location.pathname, "?username=").concat(encodeURIComponent(username));
    //    display the link
    shareableLink.style.display = "block";
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
// button pdf click the open the pdf file
downloadPdfButton.addEventListener("click", function () {
    window.print();
});
window.addEventListener("DOMContentLoaded", function () {
    var urlPrams = new URLSearchParams(window.location.search);
    var username = urlPrams.get("username");
    if (username) {
        var savedRseume = localStorage.getItem(username);
        if (savedRseume) {
            var resume = JSON.parse(savedRseume);
            document.getElementById("userName").value = username;
            document.getElementById("name").value = resume.name;
            document.getElementById("email").value = resume.email;
            document.getElementById("Phone").value = resume.phoneNo;
            document.getElementById("Education").value = resume.education;
            document.getElementById("Experience").value = resume.experience;
            document.getElementById("Skills").value = resume.skills;
        }
    }
});
