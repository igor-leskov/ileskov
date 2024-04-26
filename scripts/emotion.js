const reactions = document.querySelectorAll('.reactions > div');
const reactionsParent = document.querySelector('.reactions')

reactions.forEach(reaction => {
	reaction.addEventListener('click', function(){
		
		reactionsParent.classList.add('wave');
		
		reactions.forEach(reaction =>{
			reaction.classList.remove('active');
		})
		
		reaction.classList.add('active')
		
		setTimeout(function(){
			reactionsParent.classList.remove('wave');
		},875)
	})
	
})

// demo heart reaction
setTimeout(function(){
	const heartReaction = document.querySelector('.reactions div.love');
	reactionsParent.classList.add('wave');
	heartReaction.classList.add('active');
	setTimeout(function(){
		reactionsParent.classList.remove('wave');
	},875)
},2000)
