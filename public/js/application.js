$(document).ready(function($){
	var file1=$('#file1');
	var file2=$('#file2');
	var textarea1=$('#textarea1');
	var textarea2=$('#textarea2');
	var template = $('#template');
	var result= $('#result');
	var	text1 ="";
	var	text2 ="";
	$('#nav>li>a').click(function(e){
		e.preventDefault();
		var id = $(this).attr('data');
		$('.active').removeClass('active');
		$(this).parent().addClass('active');
		$('.actives').hide().removeClass('actives');
		$('#'+id).show().addClass('actives');

	});
	function onChangeInput(e){
 		var data = new FormData();
 		var write = $(this).attr('data');
 		data.append('file',this.files[0]);
 		$.ajax({
 			url: '/upload/',
 			type: 'post',
 			async:true,
 			data: data,
 			contentType: false,
    		processData: false,
 		})
 		.done(function() {
 			console.log("success");
 		})
 		.fail(function() {
 			console.log("error");
 		})
 		.always(function(res) {	
 			
 			if(write == 'text1')
 				text1 = res;
 			else
 				text2 = res;
 		});	
 	}

	
 	file1.on('change', onChangeInput);
 	file2.on('change', onChangeInput);
 	


	$('#button').click(function(e){
		e.preventDefault;
		if (textarea1.val() != '' && textarea2.val() != ''){
			text1 = textarea1.val();
			text2 = textarea2.val();	
		}
		

		if (text1 != '' && text2 != ''){
			result.html('<img src="image/loadding.gif" width="26px" />');
			result.show();
			var data= {'text1' : text1, 'text2': text2};
	 		$.ajax({
	 			url: '/compare/',
	 			type: 'post',
	 			async:true,
	 			data: data,
		 		})
		 		.done(function() {
		 			console.log("success");
		 		})
		 		.fail(function() {
		 			console.log("error");
		 			text1='';
		 			text2='';
		 		})
		 		.always(function(res) {
		 			result.html('');
		 			var aux= res.split('\n');
		 			for (var i=0; i< aux.length-1; i++){
		 				var label =  template.children('span').clone();
		 				var conten = template.children('div').clone();
		 				label.html(i);
		 				if (aux[i] == ' ' || aux[i] == '')
		 					conten.html('&nbsp;');
		 				else
		 					conten.html(aux[i]);	
		 				
		 				result.append(label);
		 				result.append(conten);
		 			}
		 
		 		});
		}else{
			alert('Please complete the TextArea or InputFile');
		}
	});
	
});
