$('document').ready(function(){
    var arr = [];

    //Loop through Menu items, add to obj
    jQuery('.content-links li').each(function(){
        var idName = $(this).attr('id'),
            pageName = idName.slice(0, -3) + '.html';
        arr.push({
            id: idName,
            page: pageName
        })
    });

    //Clicking on a Menu Item
    $('.content-links li a').click(function(e){
        e.preventDefault();

        removeActiveLinks();
        $(this).parent().toggleClass('active');

        var clickedId = $(this).parent().attr('id'),
            counter = -1;
        $.each(arr, function(index, value){
            counter++;
            if(value.id == clickedId){
                $('#content-area').load("pages/"+ arr[counter].page);
            }
        });
    });

    //Clicking on Top Logo
    $('#home-pg').click(function(e){
        e.preventDefault();
        removeActiveLinks();
        $('#content-area').load("pages/home.html");
    });

    function removeActiveLinks(){
        $('.content-links li').removeClass('active');
    }
});


