var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

const images = ["candle", "gift", "santa", "candy", "gingerbread_men", "sleigh", "candy_cane", "hat", "snowflake", "christmas_ball", "ice_skate", "snowman", "christmas_tree", "jingle_bell", "sock", "deer", "mitten", "star", "firework", "penguin"];

const standardModalMessage = {
	title: "Incorrect",
	description: "Try again or use your head..."
};

const successModalMessage = {
	title: "Woo",
	description: "You have won the game! Click ok to see your prize..."
};

const getCode = string => {
	const decrypted = CryptoJS.AES.decrypt(string.toString(), "Secret Passphrase");
	const result = parseInt(decrypted.toString(CryptoJS.enc.Utf8));
	return result;
};

const states = [{ title: "Enter the the code you are given...", code: getCode("U2FsdGVkX18l9WB6qn+v49pVdJ06nLs7PoWxJucIdHY="), modal: standardModalMessage }, { title: "Polka cube", code: getCode("U2FsdGVkX18Kn+nVxnUImapnwvLbmlC5DqtCL5gm+0A="), modal: standardModalMessage }, { title: "Watch TV and put your feet up", code: getCode("U2FsdGVkX197sHWEgTdq/eKYQiOgk5Tra/XY+t0km14="), modal: standardModalMessage }, { title: "Hammer time", code: getCode("U2FsdGVkX18XF2Byk/IUwqJ/dtSZ9gGA5KrLOpviAsA="), modal: standardModalMessage }, { title: "Literature review", code: getCode("U2FsdGVkX18Y0gIOIk6Y9dEyAySI3kojWBphQRATiT8="), modal: standardModalMessage }, { title: "Meter readings", code: getCode("U2FsdGVkX19nSObeDR3v5Ddt3lC/dpBtZLZCWR12g2s="), modal: standardModalMessage }, { title: "101 No.1 Hits for Piano Buskers", code: getCode("U2FsdGVkX1/hpRbv9h4ZtdRSgFekj+BlIk0yQeClrcU="), modal: standardModalMessage }, { title: "Put on a shirt", code: getCode("U2FsdGVkX1/H6nsqzXkgaIghImxjB3O0my1zG6pchtQ="), modal: successModalMessage }];

// enumurate states 
for (let i = 0; i < states.length; i++) {
	states[i].index = i;
}

$(document).ready(() => {
	let currentState = nextState(null);

	try {
		if (typeof Storage !== "undefined") {
			if (localStorage.lastState) {
				const lastState = JSON.parse(localStorage.lastState);

				// check valid
				if (lastState.code && lastState.title) {
					currentState = lastState;
				}
			}
		}
	} catch (e) {
		console.error(e);
		currentState = nextState(null);
	}

	const modalDismissButton = document.getElementById("modal-dialog-ok");
	modalDismissButton.addEventListener("click", () => {
		$('#modal-dialog').modal('hide');
	});

	initInputs();
	initResetButton();

	render(currentState);
});

// Functions
function getStateWithCode(code) {
	return states.find(state => {
		return state.code === code;
	});
}

function nextState(currentState) {
	if (!currentState) {
		return states[0];
	}

	const index = currentState.index;
	if (index < states.length - 1) {
		const nextStateIndex = index + 1;
		const nextState = states[nextStateIndex];
		return _extends({}, nextState, {
			oldState: currentState
		});
	} else {
		return null;
		// return states[states.length-1]
	}
}

function checkResult(result, state) {
	if (result === state.code) {
		const newState = nextState(state);

		if (newState) {
			newState.success = true;
			render(newState);
		} else {
			const modalTitle = document.getElementById("modal-title");
			modalTitle.innerHTML = state.modal.title;

			const modalDescription = document.getElementById("modal-description");
			modalDescription.innerHTML = state.modal.description;

			const okbutton = document.getElementById("modal-dialog-ok");
			okbutton.focus();

			$('#modal-dialog').modal('show');

			okbutton.addEventListener("click", () => {
				window.location = "/selinwin";
			});
		}
		return;
	}

	if (state.index === 0) {
		let possibleState = getStateWithCode(result);
		if (possibleState) {
			let newState = nextState(possibleState);
			render(newState);
			return;
		}
	}

	const modalTitle = document.getElementById("modal-title");
	modalTitle.innerHTML = state.modal.title;

	const modalDescription = document.getElementById("modal-description");
	modalDescription.innerHTML = state.modal.description;

	const okbutton = document.getElementById("modal-dialog-ok");
	okbutton.focus();

	$('#modal-dialog').modal('show');
}

function render(state) {
	const title = document.getElementById("puzzle-title");
	title.innerHTML = state.title;

	renderInputs();
	renderImages();

	const button = document.getElementById("puzzle-submit");
	if (state.oldState && state.oldState.onClick) {
		button.removeEventListener("click", state.oldState.onClick);
	}

	state.onClick = () => {
		const userNumber = getUserInput();

		if (!userNumber) {
			return;
		}

		checkResult(userNumber, state);
	};

	button.addEventListener("click", state.onClick);

	if (state.success) {
		$("#puzzle-content").effect("bounce", { times: 3 }, 600);
	}

	if (typeof Storage !== "undefined") {
		console.log("Storing last state");
		localStorage.setItem("lastState", JSON.stringify(state));
	}
}

function renderImages() {
	renderImage("selin-image-1");
	renderImage("selin-image-2");
	renderImage("selin-image-3");
}

function renderImage(imageId) {
	const image = document.getElementById(imageId);
	const randomIndex = Math.floor(Math.random() * images.length);

	image.src = `/media/xmas/${images[randomIndex]}.svg`;
}

function renderInputs() {
	resetInputs();
}

function resetInputs() {
	$(".puzzle-number-input").val("0");
	document.getElementById("puzzle-input-1").focus();
}

function getUserInput() {
	const input1Value = document.getElementById("puzzle-input-1").value;
	const input2Value = document.getElementById("puzzle-input-2").value;
	const input3Value = document.getElementById("puzzle-input-3").value;

	const string = `${input1Value}${input2Value}${input3Value}`;

	return parseInt(string);
}

function initInputs() {
	const input1 = document.getElementById("puzzle-input-1");
	const input2 = document.getElementById("puzzle-input-2");
	const input3 = document.getElementById("puzzle-input-3");
	const button = document.getElementById("puzzle-submit");

	$(".puzzle-number-input").keyup(evnt => {
		const intValue = parseInt(evnt.originalEvent.key);
		if (intValue !== 0 && !intValue) {
			evnt.target.value = 0;
			return;
		}

		evnt.target.value = intValue;

		if (evnt.target.id === "puzzle-input-1") {
			input2.focus();
		}

		if (evnt.target.id === "puzzle-input-2") {
			input3.focus();
		}

		if (evnt.target.id === "puzzle-input-3") {
			button.focus();
		}
	});
}

function initResetButton() {
	const resetButton = document.getElementById("puzzle-reset");
	resetButton.addEventListener("click", () => {
		$("#modal-reset-question").modal("show");
	});

	const noResetButton = document.getElementById("modal-reset-no");
	noResetButton.addEventListener("click", () => {
		$("#modal-reset-question").modal("hide");
	});

	const yesResetButton = document.getElementById("modal-reset-yes");
	yesResetButton.addEventListener("click", () => {
		$("#modal-reset-question").modal("hide");

		localStorage.removeItem("lastState");
		window.location.reload();
	});
}
