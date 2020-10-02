$('.carousel').carousel();
$('#dropdownMenuLink').on('show.bs.dropdown', function () {
    // do something...
})

// Jquery

var $quotesSlider = $('#quotes');

function makeRequest(urlRequest, callback) {
    let loader = `<div class='loader'/>`;
    $('#' + urlRequest).append(loader);

    $.ajax({
        type: 'GET',
        url: 'https://smileschool-api.hbtn.info/' + urlRequest,
        success: function(data) {
            $('.loader').remove();
            callback(data);
        }
    });
}

makeRequest('quotes', (quotes) => {
    $.each(quotes, function(i, quote){
        let html = '';
        html += `<div class='carousel-item ${i === 0 ? 'active' : ''}' >`;
        html += `<div class='d-flex justify-content-center align-items-center flex-wrap'>`;
        html += `<img width='160' height='160' class='rounded-circle' src='${quote.pic_url}' />`;
        html += `<blockquote>`; 
        html += `<cite class='font-style'>${quote.text}</cite>`;
        html += `<h2 class='pros-title'>${quote.name}</h2>`;
        html += `<cite>${quote.title}</cite>`;
        html += `</blockquote>`;
        html += `</div>`;
        html += `</div>`;

        $quotesSlider.append(html);
    })
});