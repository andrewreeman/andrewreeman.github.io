

const standardModalMessage = {
	title: "Incorrect",
	description: "Try again or use your head..."
}

const successModalMessage = {
	title: "Woo",
	description: "You have won the game! Enjoy all the presents"
}

const states = [
	{title: "Type in the code you are given...", code: 450, modal: standardModalMessage},
	{title: "Polka cube", code: 647, modal: standardModalMessage},
	{title: "Watch TV and put your feet up", code: 259, modal: standardModalMessage},
	{title: "Hammer time", code: 471, modal: standardModalMessage},	
	{title: "Literature review", code: 944, modal: standardModalMessage},	
	{title: "Meter readings", code: 447, modal: standardModalMessage},	
	{title: "101 No.1 Hits for Piano Buskers", code: 676, modal: standardModalMessage},	
	{title: "Put on a shirt", code: 838, modal: successModalMessage}	
]

// enumurate states 
for(let i =0; i < states.length; i++) {
	states[i].index = i
}

function getStateWithCode(code) {
	return states.find((state) => {return state.code === code } )
}

function nextState(currentState) {
	if(!currentState){
		return states[0]		
	}

	const index = currentState.index
	if(index < states.length-1) {
		const nextStateIndex = index + 1
		const nextState = states[nextStateIndex]
		return {
			...nextState,
			oldState: currentState,			
		}
	}	
	else {
		return states[states.length-1]
	}
}

function checkResult(result, state) {	
	if(result === state.code) {
		const newState = nextState(state)

		if(newState) {			
			newState.success = true
			render(newState)
		}
		else {
			window.location = "/selinwin"
		}		
		return
	}
		

	if(state.index === 0) {		
		console.log("State index is 0")
		let possibleState = getStateWithCode(result)
		console.log(`Possible state with code: ${possibleState}`)
		if(possibleState)  {
			let newState = nextState(possibleState)
			render(newState)
			return
		}		
	}
	
	const modalTitle = document.getElementById("modal-title")
	modalTitle.innerHTML = state.modal.title

	const modalDescription = document.getElementById("modal-description")
	modalDescription.innerHTML = state.modal.description

	$('#modal-dialog').modal('show')	
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
		
		const userNumber = parseInt(userValue) 

		if(!userNumber) {
			input.value = ""
			return
		}

		checkResult(userNumber, state)			
	}
	
	button.addEventListener("click", state.onClick)

	if(state.success) {
	 	$("#puzzle-content").effect( "bounce", {times:3}, 600 )
	}
}

$(document).ready(() => {	
	const currentState = nextState(null)

	const modalDismissButton = document.getElementById("modal-dialog-ok")
	modalDismissButton.addEventListener("click", () => {
		$('#modal-dialog').modal('hide')
	})

	render(currentState)	
})

