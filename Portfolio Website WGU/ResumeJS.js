document.addEventListener('DOMContentLoaded', function() {

    const dateDiv = document.getElementById('current-date');

    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    const formattedDate = now.toLocaleDateString(undefined, options);

    dateDiv.textContent = formattedDate;
});

console.log("resume page laoded");