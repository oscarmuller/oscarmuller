document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('entry-form');
    const languageBtn = document.getElementById('language-btn');
    let currentLanguage = 'en';

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = {
            fullName: document.getElementById('full-name').value,
            address: document.getElementById('address').value,
            insuranceInfo: document.getElementById('insurance-info').value,
            phoneNumber: document.getElementById('phone-number').value
        };

        if (validateForm(formData)) {
            saveToDatabase(formData);
        } else {
            alert('Please fill in all fields correctly.');
        }
    });

    languageBtn.addEventListener('click', function() {
        currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
        switchLanguage(currentLanguage);
    });

    function validateForm(data) {
        return data.fullName && data.address && data.insuranceInfo && data.phoneNumber;
    }

    function saveToDatabase(data) {
        // Placeholder for database saving logic
        console.log('Saving to database:', data);
    }

    function switchLanguage(language) {
        fetch(`languages/${language}.json`)
            .then(response => response.json())
            .then(translations => {
                document.querySelector('h1').textContent = translations.title;
                document.querySelector('label[for="full-name"]').textContent = translations.fullName;
                document.querySelector('label[for="address"]').textContent = translations.address;
                document.querySelector('label[for="insurance-info"]').textContent = translations.insuranceInfo;
                document.querySelector('label[for="phone-number"]').textContent = translations.phoneNumber;
                document.querySelector('button[type="submit"]').textContent = translations.submit;
                languageBtn.textContent = translations.languageBtn;
            });
    }
});
