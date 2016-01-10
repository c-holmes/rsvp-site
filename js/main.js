$('document').ready(function(){
    var arr = [];
    var currentPg = 'Home-pg';

    loopThroughLinks();

    //Loop through Menu items, add to objs
    function loopThroughLinks() {
        arr = [];
        jQuery('.content-links li').each(function () {
            var idName = $(this).attr('id'),
                pageName = idName.slice(0, -3) + '.html';
            arr.push({
                id: idName,
                page: pageName
            })
        });
        //console.log(arr);

        updateClickableLinks();
    }

    function updateClickableLinks(){
        //Menu Item Clicked
        $('.content-links li a').on("click", function(e){
            e.preventDefault();

            getContent($(this));

        });
    }

    function getContent(thisObj){

        var clickedId = $(thisObj).parents('.link').attr('id'),
            counter = -1;
        console.log(clickedId);
        $.each(arr, function(index, value){
            counter++;
            if(value.id == clickedId){
                $('#content-area').load("pages/"+ arr[counter].page, function() {
                    //after content is loaded
                    setActivePg(thisObj);
                });
            }
        });
    }

    function setActivePg(thisObj){
        var clickedId = $(thisObj).parents('.link').attr('id');

        removeActivePg();
        $(thisObj).parent().toggleClass('active');

        currentPg = clickedId;
        console.log(currentPg);

        //show submenu on appropriate pages
        var subMenuPgs = ["details-pg", "venue-pg", "schedule-pg", "transportation-pg", "gifts-pg", "menu-pg", "directions-pg"];
        var page = '.content-container';

        if(currentPg == "details-pg"){
            $(page).removeClass('show-sub-menu');
            $(page).addClass('panel-sub-menu');
        } else if($.inArray(currentPg,subMenuPgs) > -1){
            $(page).removeClass('panel-sub-menu');
            $(page).addClass('show-sub-menu');
        } else{
            $(page).removeClass('show-sub-menu panel-sub-menu');
        }

        //if(currentPg == "details-pg"){
        //    $('.sub-menu').show();
        //} else if($.inArray(currentPg,subMenuPgs) > -1){
        //    $('.sub-menu').show();
        //} else{
        //    $('.sub-menu').hide();
        //}
    }

    //Clicking on Top Logo
    $('#home-pg').click(function(e){
        e.preventDefault();
        removeActivePg();
        $('.content-container').removeClass('show-sub-menu panel-sub-menu');
        $('#content-area').load("pages/home.html");
    });

    function removeActivePg(){
        $('.content-links li').removeClass('active');
    }
});

