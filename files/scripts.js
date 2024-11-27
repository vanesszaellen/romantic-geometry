document.getElementById("survey-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting

    const form = event.target;
    let allFieldsFilled = true;

    // Check if all text inputs and radio buttons are filled
    form.querySelectorAll("input[type=text], input[type=radio]").forEach(input => {
        if (input.type === "text" && input.value.trim() === "") {
            allFieldsFilled = false;
        }
        if (input.type === "radio") {
            const group = form.querySelectorAll(`input[name="${input.name}"]`);
            if (![...group].some(radio => radio.checked)) {
                allFieldsFilled = false;
            }
        }
    });

    // Check textarea
    const openEnded = document.getElementById("open-ended").value.trim();
    if (!openEnded) {
        allFieldsFilled = false;
    }

    // Alert and stop if the form is incomplete
    if (!allFieldsFilled) {
        alert("Please fill out all fields before submitting!");
        return;
    }

    // Calculate scores
    const sections = ["intimacy", "commitment", "passion"];
    const results = {};
    let totalScore = 0;
    let totalQuestions = 0;

    sections.forEach(section => {
        let sectionScore = 0;
        let questions = 0;
        form.querySelectorAll(`input[name^="${section}"]`).forEach(input => {
            if (input.checked) {
                sectionScore += parseInt(input.value, 10);
                questions++;
            }
        });
        results[section] = Math.round((sectionScore / (questions * 6)) * 100); // Rounded percentage
        totalScore += sectionScore;
        totalQuestions += questions;
    });

    const totalPercentage = Math.round((totalScore / (totalQuestions * 6)) * 100);

    // Display results
    const resultsContainer = document.getElementById("results-container");
    resultsContainer.innerHTML = `
        <div style="border: 1px solid #000; padding: 20px; border-radius: 5px; display: inline-block; background-color: #f9f9f9;">
            <h3 style="text-align: center; margin-bottom: 10px;">Your Results</h3>
            <table style="width: 100%; border-collapse: collapse; text-align: left;">
                <tr>
                    <td><strong>Intimacy:</strong></td>
                    <td style="text-align: right;">${results.intimacy}%</td>
                </tr>
                <tr>
                    <td><strong>Commitment:</strong></td>
                    <td style="text-align: right;">${results.commitment}%</td>
                </tr>
                <tr>
                    <td><strong>Passion:</strong></td>
                    <td style="text-align: right;">${results.passion}%</td>
                </tr>
                <tr>
                    <td><strong>Consummate Love:</strong></td>
                    <td style="text-align: right;">${totalPercentage}%</td>
                </tr>
            </table>
        </div>
    `;
});