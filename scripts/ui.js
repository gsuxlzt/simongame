$("#start").click(()=>{game.gameStart();});

$(".play").each(function(){
	let $this = $(this);
	$this.click(()=>{
		let sound = $this.attr('data-sound');
		$this.addClass(sound);
		setTimeout(()=>{
			$this.removeClass(sound);
		},300);
		game.playerMove(sound);
	})
})

$("#strict").click(function(){
	$(this).toggleClass('strict-on');
	game.isStrict = game.isStrict === true ? false : true;
})