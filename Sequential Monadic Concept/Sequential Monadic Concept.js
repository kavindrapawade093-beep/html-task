const openBtn = document.getElementById("openModuleBtn");
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");
const page3ImageContainer = document.getElementById("page3ImageContainer");
const page3Title = document.getElementById("page3Title");
const page3Question = document.getElementById("page3Question");

const genderError = document.getElementById("genderError");
const ageError = document.getElementById("ageError");
const errorMsg = document.getElementById("errorMsg");

let genderSelected = false;
let ageSelected = false;
let sliderTouched = false;


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
};




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
};



const page4 = document.getElementById("page4");
const page4Question = document.getElementById("page4Question");

// PAGE 3 → PAGE 4
document.getElementById("continueBtnPage3").onclick = () => {
    page3.style.display = "none";

    const imgData = images[currentImageIndex];
    page4Question.innerHTML = `How likely would you be to buy <b>${imgData.title} Snack Bars</b> in the future?`;

    // ✅ RESET SLIDER
    document.getElementById("likelihoodSlider").value = 3;

    page4.style.display = "block";
};


// PAGE 4 ← PAGE 3 (view product again)
document.getElementById("viewProductBtn").onclick = () => {
    page4.style.display = "none";
    showPage3();
};

// PAGE 4 ← PAGE 3 (Back)
document.getElementById("backBtnPage4").onclick = () => {
    page4.style.display = "none";
    page3.style.display = "block";
};

// PAGE 4 → NEXT IMAGE → PAGE 3
const page5 = document.getElementById("page5");
const page5Question = document.getElementById("page5Question");

function resetStars() {
    document.querySelectorAll(".stars").forEach(group => {
        group.dataset.value = "";
        group.querySelectorAll("span").forEach(star => {
            star.classList.remove("active");
        });
    });
};

const slider = document.getElementById("likelihoodSlider");

slider.addEventListener("input", () => {
    sliderTouched = true;
    document.getElementById("page4ErrorMsg").style.display = "none";
});



document.getElementById("continueBtnPage4").onclick = () => {
    if (!sliderTouched) {
        document.getElementById("page4ErrorMsg").style.display = "block";
        return;
    }

    sliderTouched = false; // reset for next image
    page4.style.display = "none";

    const imgData = images[currentImageIndex];
    page5Question.innerHTML =
        `Please rate <b>${imgData.title} Snack Bars</b> on the following attributes.`;

    resetStars();
    page5.style.display = "block";
};


const imgModalPage5 = document.getElementById("imgModalPage5");
const modalImagePage5 = document.getElementById("modalImagePage5");
const closeModalPage5 = document.getElementById("closeModalPage5");
const viewProductBtnPage5 = document.getElementById("viewProductBtnPage5");

// OPEN MODAL
viewProductBtnPage5.onclick = () => {
    const imgData = images[currentImageIndex];
    modalImagePage5.src = imgData.src;
    modalImagePage5.alt = imgData.title;
    imgModalPage5.style.display = "flex";
};

// CLOSE MODAL (X)
closeModalPage5.onclick = () => {
    imgModalPage5.style.display = "none";
};

// CLOSE MODAL (click outside image)
imgModalPage5.onclick = (e) => {
    if (e.target === imgModalPage5) {
        imgModalPage5.style.display = "none";
    }
};

document.getElementById("backBtnPage5").onclick = () => {
    page5.style.display = "none";
    page4.style.display = "block";
};


document.getElementById("continueBtnPage5").onclick = () => {

    let allAnswered = true;

    document.querySelectorAll(".stars").forEach(group => {
        if (!group.dataset.value) {
            allAnswered = false;
        }
    });

    if (!allAnswered) {
        document.getElementById("page5ErrorMsg").style.display = "block";
        return;
    }

    document.getElementById("page5ErrorMsg").style.display = "none";
    page5.style.display = "none";

    currentImageIndex++;

    if (currentImageIndex < images.length) {
        showPage3();
    } else {
        alert("All concepts completed!");
    }
};


document.querySelectorAll(".stars").forEach(starGroup => {
    const stars = starGroup.querySelectorAll("span");

    stars.forEach((star, index) => {
        star.onclick = () => {
            // reset
            stars.forEach(s => s.classList.remove("active"));

            // activate selected + before
            for (let i = 0; i <= index; i++) {
                stars[i].classList.add("active");
            }

            // store value (optional)
            starGroup.dataset.value = index + 1;
        };
    });
});



const page6 = document.getElementById("page6");
const page6Question = document.getElementById("page6Question");
const page6Text = document.getElementById("page6Text");
const viewProductBtnPage6 = document.getElementById("viewProductBtnPage6");

const imgModalPage6 = document.getElementById("imgModalPage6");
const modalImagePage6 = document.getElementById("modalImagePage6");
const closeModalPage6 = document.getElementById("closeModalPage6");

// Open Page 6 modal
viewProductBtnPage6.onclick = () => {
    const imgData = images[currentImageIndex]; // current concept
    modalImagePage6.src = imgData.src;         // set image
    modalImagePage6.alt = imgData.title;
    imgModalPage6.style.display = "flex";      // show modal
};

// Close modal (X button)
closeModalPage6.onclick = () => {
    imgModalPage6.style.display = "none";
};

// Close modal (click outside image)
imgModalPage6.onclick = (e) => {
    if (e.target === imgModalPage6) {
        imgModalPage6.style.display = "none";
    }
};


// Page 5 → Page 6
document.getElementById("continueBtnPage5").onclick = () => {
    let allAnswered = true;
    document.querySelectorAll(".stars").forEach(group => {
        if (!group.dataset.value) allAnswered = false;
    });
    if (!allAnswered) {
        document.getElementById("page5ErrorMsg").style.display = "block";
        return;
    }

    document.getElementById("page5ErrorMsg").style.display = "none";
    page5.style.display = "none";

    const imgData = images[currentImageIndex];
    page6Question.innerHTML = `What is it you like most about <b>${imgData.title} Snack Bars</b>?`;
    page6Text.value = ""; // reset textarea
    page6.style.display = "block";
};

// Page 6 ← Page 5
document.getElementById("backBtnPage6").onclick = () => {
    page6.style.display = "none";
    page5.style.display = "block";
};

// Page 6 view product modal




// Page 6 → Next concept or finish
document.getElementById("continueBtnPage6").onclick = () => {
    if (!page6Text.value.trim()) {
        document.getElementById("page6ErrorMsg").style.display = "block";
        return;
    }

    document.getElementById("page6ErrorMsg").style.display = "none";
    page6.style.display = "none";

    currentImageIndex++;

    if (currentImageIndex < images.length) {
        showPage3(); // next concept
    } else {
        // All concepts done → show Page 7
        page7.style.display = "block";
    }
};



// <!-- PAGE 7 -->



const conceptsContainer = document.querySelector("#page7 .concept-list");
const concepts = document.querySelectorAll("#page7 .concept");
const ranks = document.querySelectorAll("#page7 .rank");

const originalPositions = new Map();
concepts.forEach(c => {
    originalPositions.set(c.dataset.title, { parent: c.parentNode, next: c.nextSibling });
    c.draggable = true;

    c.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", c.dataset.title);
    });
});

function updateOpacity() {
    concepts.forEach(c => {
        // If concept is in a rank box (has opacity 0.5), keep it full opacity
        let inRank = Array.from(ranks).some(rank => rank.contains(c));
        c.style.opacity = inRank ? 1 : 1;
    });
}

ranks.forEach(rank => {
    rank.addEventListener("dragover", e => e.preventDefault());

    rank.addEventListener("drop", e => {
        e.preventDefault();
        const title = e.dataTransfer.getData("text/plain");
        const concept = Array.from(concepts).find(c => c.dataset.title === title);
        if (concept) {
            // Remove any previous content in rank
            while (rank.firstChild) rank.removeChild(rank.firstChild);

            // Move concept to rank box
            rank.appendChild(concept);
            rank.dataset.selected = title;

            // Update opacity of all concepts
            updateOpacity();

            // Add cross button
            let cross = document.createElement("span");
            cross.textContent = "×";
            cross.style.cssText = "position:absolute; top:0; right:0; cursor:pointer; font-size:18px; color:red;";
            rank.style.position = "relative";
            rank.appendChild(cross);

            cross.onclick = () => {
                // Remove from rank
                rank.removeChild(concept);
                rank.removeChild(cross);
                rank.dataset.selected = "";

                // Restore opacity of all
                updateOpacity();

                // Move back to original position
                const pos = originalPositions.get(title);
                if (pos.next) {
                    pos.parent.insertBefore(concept, pos.next);
                } else {
                    pos.parent.appendChild(concept);
                }
            };
        }
    });
});

document.getElementById("backBtnPage7").onclick = () => {
    // hide page 7
    page7.style.display = "none";

    // go back to last concept page 6
    currentImageIndex = images.length - 1;

    const imgData = images[currentImageIndex];
    page6Question.innerHTML =
        `What is it you like most about <b>${imgData.title} Snack Bars</b>?`;

    page6.style.display = "block";
};


document.getElementById("continueBtnPage7").onclick = () => {
    let allRanked = true;
    ranks.forEach(rank => {
        if (!rank.dataset.selected) allRanked = false;
    });

    if (!allRanked) {
        document.getElementById("page7ErrorMsg").style.display = "block";
        return;
    }

    page7.style.display = "none";
    page8Index = 0;
    showPage8();
    page8.style.display = "block";
};


// page-8
const page8 = document.getElementById("page8");
const page8Image = document.getElementById("page8Image");
const page8Title = document.getElementById("page8Title");
const page8Ratings = document.querySelectorAll("#page8 .option");


let page8Index = 0;
const page8Data = {};

function showPage8() {
    const img = images[page8Index];
    page8Image.src = img.src;
    page8Title.textContent = img.title;

    page8Ratings.forEach(opt => opt.classList.remove("active"));
    if (page8Data[page8Index] !== undefined) {
        page8Ratings[page8Data[page8Index]].classList.add("active");
    }

    // auto scroll to review after image loads
    setTimeout(scrollToReview, 300);
}

// rating click
page8Ratings.forEach((opt, i) => {
    opt.onclick = () => {
        // highlight selection
        page8Ratings.forEach(o => o.classList.remove("active"));
        opt.classList.add("active");

        // save rating
        page8Data[page8Index] = i;

        // ✅ IF LAST IMAGE → SHOW DONE MESSAGE
        if (page8Index === images.length - 1) {
            document.getElementById("page8DoneMsg").style.display = "flex";

            // hide arrows
            document.getElementById("prevPage8").style.display = "none";
            document.getElementById("nextPage8").style.display = "none";

            return;
        }

        // ⏩ otherwise auto move to next image
        setTimeout(() => {
            page8Index++;
            showPage8();
        }, 400);
    };
});



// image arrows
document.getElementById("prevPage8").onclick = () => {
    if (page8Index > 0) {
        page8Index--;
        showPage8();
    }
};

document.getElementById("nextPage8").onclick = () => {
    if (page8Index < images.length - 1) {
        page8Index++;
        showPage8();
    }
};


function scrollToReview() {
    document.getElementById("page8Ratings")
        .scrollIntoView({ behavior: "smooth", block: "start" });
}


// Back → Page 7
document.getElementById("backBtnPage8").onclick = () => {
    page8.style.display = "none";
    page7.style.display = "block";
};

// Finish survey
document.getElementById("finishBtnPage8").onclick = () => {
    console.log("Final rankings + ratings:", page8Data);

    // hide page 8
    page8.style.display = "none";

    // reset state if needed
    page8Index = 0;

    // show module button again
    openBtn.style.display = "inline-block";

    alert("Thank you! Survey completed successfully.");
};






