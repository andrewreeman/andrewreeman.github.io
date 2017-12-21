

const standardModalMessage = {
	title: "Oops!",
	description: "You have not entered the correct code"
}

const successModalMessage = {
	title: "Woo!",
	description: "You have won the game! Enjoy all the presents"
}

const states = [
	{title: "Type in the code you are given...", code: 354, modal: standardModalMessage},
	{title: "Next location...", code: 746, modal: standardModalMessage},
	{title: "Final location...", code: 746, modal: successModalMessage}	
]

function nextState(currentState) {
	if(!currentState){
		return {
			...states[0],
			index: 0
		}
	}

	const index = currentState.index
	if(index < states.length-1) {
		const nextStateIndex = index + 1
		const nextState = states[nextStateIndex]
		return {
			...nextState,
			oldState: currentState,
			index: nextStateIndex
		}
	}

	return null
}

function render(state) {
	const title = document.getElementById("puzzle-title")	
	title.innerHTML = state.title

	const input = document.getElementById("puzzle-input")
	input.value = ""
	
	const button = document.getElementById("puzzle-submit")	
	console.log(state)
	if(state.oldState && state.oldState.onClick) {		
		button.removeEventListener("click", state.oldState.onClick)
	}

	state.onClick = () => {
		const userValue = input.value

		console.log(userValue)

		const userNumber = parseInt(userValue) 

		if(!userNumber) {
			input.value = ""
			return
		}

		
		if(userNumber === state.code) {
			const newState = nextState(state)

			if(newState) {
				render(newState)
			}
			else {
				window.location = "/selinwin"
			}
		}
		else {
			const modalTitle = document.getElementById("modal-title")
			modalTitle.innerHTML = state.modal.title

			const modalDescription = document.getElementById("modal-description")
			modalDescription.innerHTML = state.modal.description

			$('#modal-dialog').modal('show')
		}	
	}
	
	button.addEventListener("click", state.onClick)
}

$(document).ready(() => {	
	const currentState = nextState(null)

	const modalDismissButton = document.getElementById("modal-dialog-ok")
	modalDismissButton.addEventListener("click", () => {
		$('#modal-dialog').modal('hide')
	})

	render(currentState)	
})

