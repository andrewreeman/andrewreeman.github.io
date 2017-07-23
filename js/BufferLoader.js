function BufferLoader(audioContext, audioSources, finishedLoading) {
	if(!(this instanceof BufferLoader)) {
		return new BufferLoader(audioContext, audioSources, finishedLoading)
	}
	let audioUrlCount = audioSources.length
	let bufferList = []

	this.audioContext = audioContext
	this.audioSources = audioSources
	this.finishedLoading = finishedLoading

	this.load = () => {
		if(audioSources.length == 0){
			finishedLoading([])	
			return
		}	

		for (var i = 0; i < audioSources.length; i++) {
			let audioSource = audioSources[i]
			let request = new XMLHttpRequest()

			request.open('GET', audioSource.url, true)
			request.responseType = 'arraybuffer'
			request.onload = onRequestLoaded(audioContext, request, audioSource.id)
			request.send()		
		}			
	}


	function onRequestLoaded(audioContext, request, id) {
		return () => {
			if(!audioContext) { return }
			if(!request) { return }
			console.log(request)
			audioContext.decodeAudioData(request.response, onDecodedAudioBuffer(audioContext, id), onDecodedAudioBufferError)
			console.log("Request loaded")		
		}	
	}

	function onDecodedAudioBuffer(audioContext, id){
		return (buffer) => {
			if(!audioContext) { return }
			if(!buffer){ return }
		
			audioUrlCount -= 1
			bufferList.push( {id: id, buffer: buffer} )

			if( audioUrlCount == 0 ){
				finishedLoading( audioContext, bufferList )
				return
			}



			// let source = audioContext.createBufferSource()
			// source.buffer = buffer
			// source.connect(audioContext.destination)
			// source.start(0)			
		}
	}


	function onDecodedAudioBufferError() {
		console.log("Error decoding audio buffer")
	}
}
