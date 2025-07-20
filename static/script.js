document.addEventListener("DOMContentLoaded", function() {
    const singleReviewBtn = document.getElementById("singleReviewBtn");
    const multipleReviewBtn = document.getElementById("multipleReviewBtn");
    const singleReviewSection = document.getElementById("singleReviewSection");
    const multipleReviewSection = document.getElementById("multipleReviewSection");

    singleReviewBtn.addEventListener("click", function() {
        singleReviewSection.classList.remove("hidden");
        multipleReviewSection.classList.add("hidden");
    });

    multipleReviewBtn.addEventListener("click", function() {
        multipleReviewSection.classList.remove("hidden");
        singleReviewSection.classList.add("hidden");
    });

    document.getElementById("analyzeSingleBtn").addEventListener("click", function() {
        const reviewText = document.getElementById("reviewText").value;

        fetch("/analyze_single", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ review: reviewText })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById("singleReviewResult").innerText = `Review: "${data.review}" is ${data.status}`;
        })
        .catch(error => console.error("Error:", error));
    });

    document.getElementById("analyzeMultipleBtn").addEventListener("click", function() {
        const urlInput = document.getElementById("urlInput").value;
        const fileInput = document.getElementById("fileUpload").files[0];

        let formData = new FormData();
        if (urlInput) formData.append("url", urlInput);
        if (fileInput) formData.append("file", fileInput);

        fetch("/analyze_multiple", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById("multipleReviewResults");
            resultDiv.innerHTML = "";

            if (data.error) {
                resultDiv.innerHTML = `<p style="color:red;">${data.error}</p>`;
            } else {
                data.forEach(review => {
                    const p = document.createElement("p");
                    p.innerHTML = `Review: "${review.review}" is <strong>${review.status}</strong>`;
                    resultDiv.appendChild(p);
                });
            }
        })
        .catch(error => console.error("Error:", error));
    });
});
