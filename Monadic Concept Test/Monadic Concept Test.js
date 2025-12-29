
const openBtn = document.getElementById("openModuleBtn");
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");
const page3ImageContainer = document.getElementById("page3ImageContainer");
const page3Title = document.getElementById("page3Title");
const page3Question = document.getElementById("page3Question");

const page4 = document.getElementById("page4");
const page4Title = document.getElementById("page4Title");
const page4Question = document.getElementById("page4Question");
const page4RatingContainer = document.getElementById("page4RatingContainer");



const page5 = document.getElementById("page5");
const page5Title = document.getElementById("page5Title");
const page5Question = document.getElementById("page5Question");
const page5RatingContainer = document.getElementById("page5RatingContainer");

const page6 = document.getElementById("page6");
const page6Slider = document.getElementById("page6Slider");
const continueBtnPage6 = document.getElementById("continueBtnPage6");


const genderError = document.getElementById("genderError");
const ageError = document.getElementById("ageError");
const errorMsg = document.getElementById("errorMsg");

let genderSelected = false;
let ageSelected = false;

// Page 3 images with respective questions
const images = [
    {
        src: "https://release.decipherinc.com/survey/selfserve/53d/demo/monadic/BelgianChoc.png",
        title: "Belgian Chocolate",
        question: "Please look at this concept for Belgian Chocolat Snack Bars. We will be asking you a series of questions to find out your opinion of this concept."
    },
    {
        src: "https://release.decipherinc.com/survey/selfserve/53d/demo/monadic/TurkishFig.png",
        title: "Turkish Fig",
        question: "Please look at this concept for Turkish Fig and Date Snack Bars. We will be asking you a series of questions to find out your opinion of this concept."
    },
    {
        src: "https://release.decipherinc.com/survey/selfserve/53d/demo/monadic/CanadianBlueberry.png",
        title: "Canadian Blueberry",
        question: " Please look at this concept for Canadian Blueberry Snack Bars. We will be asking you a series of questions to find out your opinion of this concept."
    }

];
let currentImageIndex = 0;

// Open survey
openBtn.onclick = () => {
    page1.style.display = "block";
    openBtn.style.display = "none";
};

// Gender selection
document.querySelectorAll(".gender").forEach(g => {
    g.onclick = () => {
        if (g.classList.contains("active")) {
            g.classList.remove("active");
            genderSelected = false;
        } else {
            document.querySelectorAll(".gender").forEach(x => x.classList.remove("active"));
            g.classList.add("active");
            genderSelected = true;
        }
        genderError.style.display = "none";
        errorMsg.style.display = "none";
    };
});


document.querySelectorAll(".age-btn").forEach(a => {
    a.onclick = () => {
        if (a.classList.contains("active")) {
            a.classList.remove("active");
            ageSelected = false;
        } else {
            document.querySelectorAll(".age-btn").forEach(x => x.classList.remove("active"));
            a.classList.add("active");
            ageSelected = true;
        }
        ageError.style.display = "none";
        errorMsg.style.display = "none";
    };
});
// Page 1 → Page 2
document.getElementById("continueBtnPage1").onclick = () => {
    let valid = true;
    if (!genderSelected) { genderError.style.display = "block"; valid = false; }
    if (!ageSelected) { ageError.style.display = "block"; valid = false; }
    if (!valid) { errorMsg.style.display = "block"; return; }
    page1.style.display = "none";
    page2.style.display = "block";
};

// Page 2 ← Page 1
document.getElementById("backBtnPage2").onclick = () => {
    page2.style.display = "none";
    page1.style.display = "block";
};

// Snack selection
document.querySelectorAll(".snack-btn").forEach(btn => {
    btn.onclick = () => {
        if (btn.classList.contains("none")) {
            document.querySelectorAll(".snack-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        } else {
            document.querySelector(".snack-btn.none").classList.remove("active");
            btn.classList.toggle("active");
        }
    };
});

// Page 2 → Page 3
document.getElementById("continueBtnPage2").onclick = () => {
    const selected = document.querySelectorAll(".snack-btn.active");
    if (selected.length === 0) {
        document.getElementById("snackError").style.display = "block";
        document.getElementById("snackErrorMsg").style.display = "block";
        return;
    }
    page2.style.display = "none";
    showPage3();
};

// Page 3 ← Page 2
document.getElementById("backBtnPage3").onclick = () => {
    page3.style.display = "none";
    page2.style.display = "block";
    currentImageIndex = (currentImageIndex + 1) % images.length; // Next image will show next time
};

// Page 3 → Continue
document.getElementById("continueBtnPage3").onclick = () => {
    alert("Survey step completed. Proceed to next step!");
    currentImageIndex = (currentImageIndex + 1) % images.length;
    page3.style.display = "none"; // Can navigate to next page here
};

// Function to show Page 3 with current image and question
function showPage3() {
    page3.style.display = "block";
    page3ImageContainer.innerHTML = "";
    const imgData = images[currentImageIndex];
    page3Title.textContent = imgData.title;
    page3Question.textContent = imgData.question;
    const img = document.createElement("img");
    img.src = imgData.src;
    img.alt = imgData.title;
    page3ImageContainer.appendChild(img);
}



// ------------------ Page 3 → Page 4 ------------------
document.getElementById("continueBtnPage3").onclick = () => {
    page3.style.display = "none";
    page4.style.display = "block";

    // Set the product name dynamically
    const imgData = images[currentImageIndex];
    document.getElementById("productName").textContent = imgData.title;
};

// Page 4 ← Page 3
document.getElementById("backBtnPage4").onclick = () => {
    page4.style.display = "none";
    page3.style.display = "block";
};

// Rating button selection
document.querySelectorAll(".rating-options").forEach(group => {
    group.querySelectorAll("button").forEach(btn => {
        btn.onclick = () => {

            const errorBox = document.getElementById("page4ErrorMsg");

            // Toggle select / deselect
            if (btn.classList.contains("active")) {
                btn.classList.remove("active");
            } else {
                group.querySelectorAll("button").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
            }

            // If this group now has a rating → clear its error
            if (group.querySelector(".active")) {
                group.classList.remove("error");
            }

            // Hide banner if ALL are fixed
            const hasAnyError = Array.from(document.querySelectorAll(".rating-options"))
                .some(g => !g.querySelector(".active"));

            if (!hasAnyError) {
                errorBox.style.display = "none";
            }
        };
    });
});


// Submit ratings
document.getElementById("continueBtnPage4").onclick = () => {
    const allGroups = document.querySelectorAll(".rating-options");
    const errorBox = document.getElementById("page4ErrorMsg");
    let hasError = false;

    allGroups.forEach(group => {
        if (!group.querySelector(".active")) {
            group.classList.add("error");
            hasError = true;
        } else {
            group.classList.remove("error");
        }
    });

    if (hasError) {
        errorBox.style.display = "block";
        return;
    }

    errorBox.style.display = "none";

    // Collect ratings
    const ratings = {};
    allGroups.forEach(group => {
        ratings[group.dataset.attribute] =
            group.querySelector(".active").textContent;
    });

    console.log("Ratings submitted:", ratings);
    page4.style.display = "none";
    page5.style.display = "block";

    // Set Page 5 product name
    document.getElementById("page5ProductName").textContent =
        images[currentImageIndex].title + " Snack Bars";

};

// Open modal on Page 4
document.getElementById("viewProductAgain").onclick = (e) => {
    e.preventDefault();

    const imgData = images[currentImageIndex];
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("modalImage");

    modalImg.src = imgData.src;
    modal.style.display = "block";
};

document.getElementById("closeModal").onclick = () => {
    document.getElementById("imgModal").style.display = "none";
};


// Page 5: View product again
document.querySelector("#page5 .view-btn").onclick = (e) => {
    e.preventDefault();

    const imgData = images[currentImageIndex];
    document.getElementById("modalImagePage5").src = imgData.src;
    document.getElementById("imgModalPage5").style.display = "block";
};

document.getElementById("closeModalPage5").onclick = () => {
    document.getElementById("imgModalPage5").style.display = "none";
};


/* ===============================
PAGE 5 STAR RATING LOGIC
================================ */
document.querySelectorAll("#page5 .stars").forEach(starGroup => {
    const stars = starGroup.querySelectorAll("span");

    stars.forEach((star, index) => {
        star.addEventListener("click", () => {

            // Clear all stars in this row
            stars.forEach(s => s.classList.remove("active"));

            // Activate clicked + previous stars
            for (let i = 0; i <= index; i++) {
                stars[i].classList.add("active");
            }
        });
    });
});

document.getElementById("backBtnPage5").onclick = () => {
    page5.style.display = "none";
    page4.style.display = "block";
};



document.getElementById("continueBtnPage5").onclick = () => {

    const starGroups = document.querySelectorAll("#page5 .stars");
    let hasError = false;

    starGroups.forEach(group => {
        if (!group.querySelector(".active")) {
            hasError = true;
        }
    });

    if (hasError) {
        alert("Please rate all items before continuing.");
        return;
    }

    // Collect Page 5 star ratings
    const page5Ratings = [];
    starGroups.forEach((group, index) => {
        page5Ratings.push({
            question: index + 1,
            rating: group.querySelectorAll(".active").length
        });
    });

    console.log("Page 5 Ratings:", page5Ratings);

    alert("Survey completed successfully!");
    page5.style.display = "none";
};


// Page 5 → Page 6
document.getElementById("continueBtnPage5").onclick = () => {

    const starGroups = document.querySelectorAll("#page5 .stars");
    let hasError = false;

    starGroups.forEach(group => {
        if (!group.querySelector(".active")) hasError = true;
    });

    if (hasError) {
        alert(" There were problems with some of the data you entered in the survey. You will find the questions with errors below; please follow the instructions attached to each question.Please select an answer.Please rate all items before continuing.");
        return;
    }

    page5.style.display = "none";
    page6.style.display = "block";

    // Set product name dynamically
    document.getElementById("page6ProductName").textContent =
        images[currentImageIndex].title + " Snack Bars";
};

// Enable Continue when slider moves
page6Slider.addEventListener("input", () => {
    continueBtnPage6.disabled = false;
});

// Page 6 ← Page 5
document.getElementById("backBtnPage6").onclick = () => {
    page6.style.display = "none";
    page5.style.display = "block";
};

// Submit Page 6
document.getElementById("continueBtnPage6").onclick = () => {
    page6.style.display = "none";
    page7.style.display = "block";

    document.getElementById("page7ProductName").textContent =
        images[currentImageIndex].title + " Snack Bars";
};




// ===============================
// PAGE 6 VIEW PRODUCT MODAL
// ===============================
document.getElementById("page6ViewProduct").onclick = () => {

    const imgData = images[currentImageIndex];

    const modal = document.getElementById("imgModalPage6");
    const modalImg = document.getElementById("modalImagePage6");

    modalImg.src = imgData.src;
    modal.style.display = "block";
};

// Close modal Page 6
document.getElementById("closeModalPage6").onclick = () => {
    document.getElementById("imgModalPage6").style.display = "none";
};

document.getElementById("backBtnPage7").onclick = () => {
    page7.style.display = "none";
    page6.style.display = "block";
};


document.getElementById("page7ViewProduct").onclick = () => {
    const imgData = images[currentImageIndex];
    document.getElementById("modalImagePage7").src = imgData.src;
    document.getElementById("imgModalPage7").style.display = "block";
};

document.getElementById("closeModalPage7").onclick = () => {
    document.getElementById("imgModalPage7").style.display = "none";
};


document.getElementById("continueBtnPage7").onclick = () => {
    const selected = document.querySelector('input[name="overall"]:checked');
    if (!selected) {
        alert("There were problems with some of the data you entered in the survey. You will find the questions with errors below; please follow the instructions attached to each question.Please select an answer.");
        return;
    }

    page7.style.display = "none";
    page8.style.display = "block";

    document.getElementById("page8ProductName").textContent =
        images[currentImageIndex].title + " Snack Bars";

    updateStatement();
};


/* ===============================
   PAGE 8 – STATEMENT CARDS
================================ */

const statementsPage8 = [
    "I would consider switching",
    "This product feels premium",
    "This product fits my lifestyle",
    "I would purchase this product"
];

let stmtIndex = 0;
const statementBox = document.getElementById("statementBox");

// Move statements
document.getElementById("stmtNext").onclick = () => {
    if (!isStatementAnswered()) {
        alert("Please select an answer before continuing.");
        return;
    }
    saveStatementAnswer();
    stmtIndex = (stmtIndex + 1) % statementsPage8.length;
    updateStatement();
};

document.getElementById("stmtPrev").onclick = () => {
    stmtIndex = (stmtIndex - 1 + statementsPage8.length) % statementsPage8.length;
    updateStatement();
};

// Update statement text
function updateStatement() {
    statementBox.textContent = statementsPage8[stmtIndex];
    document.querySelectorAll('input[name="stmtRating"]').forEach(r => r.checked = false);
}

// Validation
function isStatementAnswered() {
    return document.querySelector('input[name="stmtRating"]:checked');
}

// Store answers
const page8Responses = {};

function saveStatementAnswer() {
    const selected = document.querySelector('input[name="stmtRating"]:checked');
    page8Responses[statementsPage8[stmtIndex]] = selected.parentElement.textContent.trim();
}

// Back
document.getElementById("backBtnPage8").onclick = () => {
    document.getElementById("page8").style.display = "none";
    document.getElementById("page7").style.display = "block";
};

// Continue
document.getElementById("continueBtnPage8").onclick = () => {
    if (!isStatementAnswered()) {
        alert("There were problems with some of the data you entered in the survey. You will find the questions with errors below; please follow the instructions attached to each question.Please select an answer..");
        return;
    }

    saveStatementAnswer();

    page8.style.display = "none";
    page9.style.display = "block";

    document.getElementById("page9Image").src =
        images[currentImageIndex].src;
};



document.getElementById("page8ViewProduct").onclick = () => {
    const imgData = images[currentImageIndex];
    document.getElementById("modalImagePage8").src = imgData.src;
    document.getElementById("imgModalPage8").style.display = "block";
};

document.getElementById("closeModalPage8").onclick = () => {
    document.getElementById("imgModalPage8").style.display = "none";
};


/* ===============================
   PAGE 9 – IMAGE MARKING
================================ */

let currentMarker = "appeal";
let isDrawing = false;
let startX, startY;

const wrapper = document.getElementById("heatmapWrapper");

// Marker selection
document.querySelectorAll(".marker-btn").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".marker-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentMarker = btn.dataset.type;
    };
});

// Start drawing
wrapper.addEventListener("mousedown", e => {
    isDrawing = true;
    const rect = wrapper.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;

    const box = document.createElement("div");
    box.className = "mark-box";
    box.dataset.type = currentMarker;
    box.style.left = startX + "px";
    box.style.top = startY + "px";

    box.style.background =
        currentMarker === "appeal"
            ? "rgba(76,175,80,0.6)"
            : "rgba(244,67,54,0.6)";

    wrapper.appendChild(box);
    wrapper.currentBox = box;
});

// Draw box
wrapper.addEventListener("mousemove", e => {
    if (!isDrawing) return;

    const rect = wrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const box = wrapper.currentBox;
    box.style.width = Math.abs(x - startX) + "px";
    box.style.height = Math.abs(y - startY) + "px";
    box.style.left = Math.min(x, startX) + "px";
    box.style.top = Math.min(y, startY) + "px";
});

// End drawing
wrapper.addEventListener("mouseup", () => {
    isDrawing = false;
    wrapper.currentBox = null;
});

// Back
document.getElementById("backBtnPage9").onclick = () => {
    page9.style.display = "none";
    page8.style.display = "block";
};

// Continue
document.getElementById("continueBtnPage9").onclick = () => {
    const marks = document.querySelectorAll(".mark-box");
    if (marks.length === 0) {
        alert("Please mark at least one area on the image.");
        return;
    }

    console.log("Heatmap regions:", marks.length);
    alert("Survey completed successfully 🎉");
    page9.style.display = "none";
};



// PAGE 9 → PAGE 10
document.getElementById("continueBtnPage9").onclick = () => {
    const marks = document.querySelectorAll(".mark-box");
    if (marks.length === 0) {
        alert("Please mark at least one area on the image.");
        return;
    }

    page9.style.display = "none";
    page10.style.display = "block";
};

// PAGE 10 ← PAGE 9
document.getElementById("backBtnPage10").onclick = () => {
    page10.style.display = "none";
    page9.style.display = "block";
};

// PAGE 10 VIEW PRODUCT
document.getElementById("page10ViewProduct").onclick = () => {
    const imgData = images[currentImageIndex];
    document.getElementById("modalImagePage10").src = imgData.src;
    document.getElementById("imgModalPage10").style.display = "block";
};

document.getElementById("closeModalPage10").onclick = () => {
    document.getElementById("imgModalPage10").style.display = "none";
};

// FINISH SURVEY
document.getElementById("finishBtnPage10").onclick = () => {
    const text = document.getElementById("page10Text").value.trim();

    if (!text) {
        alert("Please tell us what you dislike most about the concept.");
        return;
    }

    console.log("Dislike feedback:", text);
    alert("Survey completed successfully 🎉");

    page10.style.display = "none";
};



