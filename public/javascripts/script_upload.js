$('.new_Btn').on("click" , function () {
        $('#uploadedFile').click();
    });
	
$('#uploadedFile').change( function(event) {
	var filename = $(this).val().split('\\').pop();
	var filesize = this.files[0].size /(1024*1024);
	$("#selectedFile").html(filename+" ( "+ Math.round(filesize * 100) / 100 +" MB)");
    $("#preview").fadeIn("fast").attr('src',URL.createObjectURL(event.target.files[0]));
});