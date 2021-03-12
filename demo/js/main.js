menu.forEach(element => {
    let $li = $(`<li>${element.title}</li>`);
    $li.on('click',()=>{
        $.ajax({
            type:'get',
            dataType:'html',
            url:element.template,
            success: data => {
                $('.dg').html('');
                $('.right').html(data);
                $li.css('backgroundColor','silver').siblings().css('backgroundColor','white')
            }
        })
    })
    $('.left ul').append($li);
})