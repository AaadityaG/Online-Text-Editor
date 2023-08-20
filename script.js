let optionsButtons = document.querySelectorAll(".option-button");  // all buttons 
let advancedOptionButton = document.querySelectorAll(".adv-option-button");  // all selects 

// two selects to choose fontname and fontsize 
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");

// writing Area
let writingArea = document.getElementById("text-input");

// for creating link under a text
let linkButton = document.getElementById("createLink");  

// all align buttons
let alignButtons = document.querySelectorAll(".align");

// spacing (indentations)
let spacingButtons = document.querySelectorAll(".spacing");

// bold button
let formatButtons = document.querySelectorAll(".format");

// super script and subscript tags
let scriptButtons = document.querySelectorAll(".script");

// font array to have options of multiple fonts 
let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "Cursive",
];


const intializer = () => {
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);

    // targeting fontName select and adding all the fonts in it
    fontList.map((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    // targetting fonrSize and adding all the sizes in it 
    for (let i = 1; i <= 7; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }

    // default size of paragraphs
    fontSizeRef.value = 3;
};


const modifyText = (command, defaultUi, value) => {

    // used for executing a command specified on the 
    // editable section that is being selected by the user
    document.execCommand(command, defaultUi, value);
};

optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);
    });
});

advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value);
    });
});

linkButton.addEventListener("click", () => {
    let userLink = prompt("Enter a URL?");
    // by using regex we check wether the given text is look like some link
    if (/http/i.test(userLink)) {
        modifyText(linkButton.id, false, userLink);
    } else {
        userLink = "https://" + userLink;
        modifyText(linkButton.id, false, userLink);
    }
});

// adds event listener to all buttons
const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            if (needsRemoval) {
                let alreadyActive = false;
                if (button.classList.contains("active")) {
                    alreadyActive = true;
                }
                highlighterRemover(className);
                if (!alreadyActive) {
                    button.classList.add("active");
                }
            } else {
                button.classList.toggle("active");
            }
        });
    });
};

// removes event listener to all buttons
const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    });
};

// calling function
window.onload = intializer();