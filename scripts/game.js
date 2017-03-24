let game = {
	count: 0,
	current: [],
	played: [],
	choices: ['TL','TR','BL','BR'],
	sounds: {
		TL: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
		TR: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
		BL: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
		BR: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
	},
	isStrict: false,
	gameStart(){
		this.gameClear();
	},
	gameClear(){
		this.current = [];
		this.count = 0;
		$("#alert-div").fadeOut("fast");
		$(".play").each(function(){
			let sound = $(this).attr('data-sound');
			$(this).removeClass(sound);
		});
		this.begin();
	},
	begin() {
		this.count++;
		this.makeTurn();
	},
	playSound(sound) {
		console.log('this happend');
		this.sounds[sound].play();
	},
	makeTurn() {
		let rand = Math.floor(Math.random()*4);
		this.current.push(this.choices[rand]);
		let len = this.current.length
		let count = len > 9 ? len : `0${len}`;
		$('#count').html(count);
		this.loopMoves();
	},
	loopMoves() {
		const _this = this;
		let count = 0;
		let loop = setInterval(()=>{
			_this.playMoves(_this.current[count]);
			count++;
			if (count >= _this.current.length) clearInterval(loop);
		}, 600);
		this.resetPlayed();
	},
	playMoves(move) {
		$(`[data-sound=${move}]`).addClass(move);
		this.playSound(move);
		setTimeout(()=>{
			$(`[data-sound=${move}]`).removeClass(move);
		}, 400);
	},
	resetPlayed(){
		this.played = [];
	},
	playerMove(move){
		this.played.push(move);
		let curr = this.played.length-1;
		if(this.played[curr] !== this.current[curr]) {
			$('#count').html('!!');
			
			if (this.isStrict) setTimeout(()=>{
				let len = this.current.length
				let count = len > 9 ? len : `0${len}`;
				$("#count").html(count);	
				this.gameStart();
			},500);
			else setTimeout(()=>{
				let len = this.current.length
				let count = len > 9 ? len : `0${len}`;
				$("#count").html(count);
				this.loopMoves();
			},500);
		}
		else {
			this.playSound(move);
			let check = this.current.length == this.played.length;
			if (check) {
				if (this.count === 20) {
					$("#alert-div").fadeIn('fast');
					$(".play").each(function(){
					let sound = $(this).attr('data-sound');
					$(this).addClass(sound);
					})
				}
				else setTimeout(()=>{
					this.begin();
				},500);
			}
		}
	}
}


