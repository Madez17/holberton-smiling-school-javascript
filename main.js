$('.carousel').carousel('pause');
$('#dropdownMenuLink').on('show.bs.dropdown', function () {
    // do something...
})

// Jquery

var $quotesSlider = $('#quotes');
var $popularTutorialsSlider = $('#popular-tutorials');

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

makeRequest('popular-tutorials', (tutorials) => {
    let size = 4;

    let resizeScreen  = () => {
        if (window.matchMedia('(min-width:577px) and (max-width: 768px)').matches) {
            size = 2;
        }
        
        else if (window.matchMedia('(max-width: 576px)').matches) {
            size = 1;
        }
    }

    window.addEventListener('resize', resizeScreen);

    if ($('#popular-tutorials .carousel-item').length !== 0) {
        const totalCards = $('#popular-tutorials .carousel-item .row').children().length;
        const newCarouselItems = Math.ceil(totalCards / size) - $('#popular-tutorials .carousel-item').length;

    } else {
        let html = '';
        let htmlContainer = '';
        let activeStars = 0;
        let start = 0;
        let end = 0;
    
        console.log(Math.ceil(tutorials.length / size))
        for (let i = 0; i < Math.ceil(tutorials.length / size); i++) {
            start = size * i;
            end = size * (i+1);
            htmlContainer = '';
            htmlContainer += `<div class='carousel-item ${i === 0 ? 'active' : ''}'>`
            htmlContainer += `<div class='row' />`;
            htmlContainer += `</div>`;

            for (let j = start; j < end; j++) {
                if (j === tutorials.length) {
                    break;
                }
    
                html += `<div class='col-sm-6 col-md-3'>`;
                html += `<p>${j}</p>`;    
                html += `<div class='card-video d-flex flex-column justify-content-center'>`;
                
                html += `<div class="image-inf">`;
                html += `<img src='${tutorials[j].thumb_url}' alt='Image Name' class='photo img-fluid' width='225' height='154' />`;
                html += `<img src='images/play.png' alt="Play button" class="play-button"  width="64" height="64" />`;
                html += `</div>`;
                
                html += `<blockquote class='pl-4 pr-4'>`;
                html += `<h2 class='pros-title section-card-title'>${tutorials[j].title}</h2>`;                          
                html += `<p class='section-card-text'>${tutorials[j]['sub-title']}</p>`;
                html += `</blockquote>`;
                
                
                html += `<div class='recomendations align-items-center d-flex pl-4 pr-4'>`;
                html += `<img src='${tutorials[j].author_pic_url}' alt='Phillip Massey' width='30' height='30' class='perfil rounded-circle' />`;
                html += `<h3 class="pros-title">${tutorials[j].author}</h3>`;
                html += `</div>`;
                
                html += `<div class='cardfooter d-flex flex-wrap justify-content-between pl-4 pr-4'>`;
                
                html += `<div class='stars'>`;
                for (activeStars; activeStars < tutorials[j].star; activeStars++) {
                    html += `<img src='images/star_on.png' width='15' height='15' />`;
                }
                for (let h = 5 - activeStars; h > 0; h--) {
                    html += `<img src='images/star_off.png' width='15' height='15' />`;
                }
                html += `</div>`;
                
                html += `<div class="hour">`;
                html += `<p>${tutorials[j].duration}</p>`;
                html += `</div>`;
                
                html += `</div>`;
                
                html += `</div>`;
                html += `</div>`;
                
                activeStars = 0;
                
            }
            $popularTutorialsSlider.append(htmlContainer);
           
            $('#popular-tutorials .carousel-item .row').last().append(html);
            html = '';
            
        }
    }

    
    
});