document.addEventListener('DOMContentLoaded', () => {
    const { jsPDF } = window.jspdf;

    const resumeForm = document.getElementById('resumeForm');
    const resumeOutput = document.getElementById('resumeOutput');
    const shareLinkMessage = document.getElementById('shareLinkMessage');

    // Function to generate a unique URL
    function generateUniqueURL(username) {
        // Simulate a unique URL generation (could be more complex with a backend)
        const baseURL = "https://yourdomain.com/resume/";
        const uniqueHash = btoa(username + Date.now()); // Simple base64 encoding
        return `${baseURL}${uniqueHash}`;
    }

    // Generate Resume Button
    document.getElementById('generateResume').addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const education = document.getElementById('education').value;
        const experience = document.getElementById('experience').value;
        const skills = document.getElementById('skills').value;
        const photoInput = document.getElementById('photo');
        const photo = photoInput.files?.[0];

        if (photo) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const photoUrl = event.target.result;
                document.getElementById('resumePhoto').src = photoUrl;
                document.getElementById('resumePhoto').style.display = 'block';
            };
            reader.readAsDataURL(photo);
        } else {
            document.getElementById('resumePhoto').style.display = 'none';
        }

        document.getElementById('resumeName').innerText = name;
        document.getElementById('resumeEmail').innerText = email;
        document.getElementById('resumeEducation').innerText = education;
        document.getElementById('resumeExperience').innerText = experience;
        document.getElementById('resumeSkills').innerText = skills;

        // Generate and display the unique URL
        const uniqueURL = generateUniqueURL(username);
        shareLinkMessage.innerHTML = `Your resume is available at: <a href="${uniqueURL}" target="_blank">${uniqueURL}</a>`;

        resumeOutput.style.display = 'block';
    });

    // Download PDF Button
    document.getElementById('downloadPDF').addEventListener('click', () => {
        const doc = new jsPDF();
        doc.text('Resume', 10, 10);
        doc.text(`Name: ${document.getElementById('resumeName').innerText}`, 10, 20);
        doc.text(`Email: ${document.getElementById('resumeEmail').innerText}`, 10, 30);
        doc.text(`Education: ${document.getElementById('resumeEducation').innerText}`, 10, 40);
        doc.text(`Experience: ${document.getElementById('resumeExperience').innerText}`, 10, 50);
        doc.text(`Skills: ${document.getElementById('resumeSkills').innerText}`, 10, 60);

        const resumePhoto = document.getElementById('resumePhoto');
        if (resumePhoto.src) {
            doc.addImage(resumePhoto.src, 'JPEG', 10, 70, 50, 50);
        }

        doc.save('resume.pdf');
    });

    // Save Resume Button
    document.getElementById('saveResume').addEventListener('click', () => {
        const resumeData = {
            name: document.getElementById('resumeName').innerText,
            email: document.getElementById('resumeEmail').innerText,
            education: document.getElementById('resumeEducation').innerText,
            experience: document.getElementById('resumeExperience').innerText,
            skills: document.getElementById('resumeSkills').innerText,
            photo: document.getElementById('resumePhoto').src,
            url: shareLinkMessage.querySelector('a')?.href // Save the generated URL
        };
        localStorage.setItem('savedResume', JSON.stringify(resumeData));
        alert('Resume saved successfully!');
    });
});


