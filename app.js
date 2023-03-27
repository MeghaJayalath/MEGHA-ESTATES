//-------------------- front part --------------------//
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".front-part",
    start: "top",
    end: "100%",
    scrub: "true",
    pin: true,
  },
});

tl.fromTo(
  ".front-part",
  {
    clipPath: "circle(5%)",
  },
  {
    clipPath: "circle(1000%)",
    duration: 3.5,
  }
);

tl.fromTo(
  ".welcome-logo",
  {
    scale: 1.5,
  },
  {
    scale: 0,
    opacity: 0,
    duration: 1.5,
  },
  "-=1.8"
);

tl.fromTo(
  ".title",
  {
    opacity: 0,
  },
  {
    opacity: 1,
    duration: 0.3,
  },
  "-=0.8"
);

tl.fromTo(
  ".sub-title, nav",
  {
    opacity: 0,
  },
  {
    opacity: 1,
    duration: 0.5,
  }
);

//Dark Mode
const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark")
})

//-------------------- second part --------------------//
// Property type
$( function() {
  $( "#type" ).selectmenu();
} );

// Range slider for Price
$( function() {
  $( "#slider-range1" ).slider({
  range: true,
  min: 350000,
  max: 1000000,
  values: [ 350000, 1000000 ],
  slide: function( event, ui ) {
      $( "#price__amount" ).val( "£" + ui.values[ 0 ] + " - £" + ui.values[ 1 ] );
  }
  });
  $( "#price__amount" ).val( "£" + $( "#slider-range1" ).slider( "values", 0 ) +
  " - £" + $( "#slider-range1" ).slider( "values", 1 ) );
} );

// Range slider for Bedrooms 
$( function() {
  $( "#slider-range2" ).slider({
  range: true,
  min: 2,
  max: 10,
  values: [ 2, 10 ],
  slide: function( event, ui ) {
      $( "#bedrooms__amount" ).val( + ui.values[ 0 ] +" to " + ui.values[ 1 ] );
  }
  });
  $( "#bedrooms__amount" ).val($( "#slider-range2" ).slider( "values", 0 ) +
" to " + $( "#slider-range2" ).slider( "values", 1 ) );
} );

// Date added
$( function() {
  $( "#date" ).selectmenu();
} );

// Postcode
$( function() {
  $( "#code" ).selectmenu();
} );


//-------------------- third part --------------------//
// Add/Remove, to/from favourites list by a click
function move() {
    const heart = document.querySelectorAll(".heart");
    for (let i = 0; i < heart.length; i++) {
        (function(i) {
            const selectedHeart = heart[i];
            const checkDivId = $(selectedHeart).closest(".section_3");
            const article = $(selectedHeart).closest("article");
            const likeUnlikePost = function() {
                if (selectedHeart.classList.contains('like')) {
                    selectedHeart.classList.remove('like');
                    selectedHeart.classList.add('unlike');
                } else {
                    selectedHeart.classList.remove('unlike');
                    selectedHeart.classList.add('like');
                }

                if (checkDivId.attr('id') === "div2") {
                    article.detach().appendTo("#div1");
                }else {
                    article.detach().appendTo("#div2");
                }
            };
            selectedHeart.addEventListener('click', likeUnlikePost);
        })(i);
    }
}

// Drag & drop function
function allowDrop(ev)
  {
          ev.preventDefault();
  }

function drag(ev)
  {
          ev.dataTransfer.setData("Text",ev.target.id);
  }

function drop(ev)
  {
          ev.preventDefault();
          var data=ev.dataTransfer.getData("Text");
          ev.target.appendChild(document.getElementById(data));
  }
// 

// Favourites section open & close function in other devices
$(document).ready(function(){
  $('#fav').click(function(){
    $('#div1').css("display","block");
  });
  $('#x_close').click(function(){
    $('#div1').css("display","none");
  });
}); 
// 

$(function() {
	$( "#search" ).on("click", function(){
		
		var propType = $("#type").val();
	    // var maxBed =  $("#spinner").val();
      //   var minBed =  $("#spinner2").val();
		var date =  $("#date").val();
		var minPrice = $("#slider-range1").slider("option", "values")[0];
		var maxPrice = $("#slider-range1").slider("option", "values")[1];
    var minBeds = $("#slider-range2").slider("option", "values")[0];
		var maxBeds = $("#slider-range2").slider("option", "values")[1];
    var code =  $("#code").val();
		
    let idCount = 1

		var output="";
      for (var i in data.properties) {
        if (( propType == data.properties[i].type) || (propType=="Any"))
        // if (( minBed >= data.properties[i].bedrooms && maxBed <= data.properties[i].bedrooms ))
        if (( date == data.properties[i].added.month) || (date=="Anytime"))
        if (( data.properties[i].price >= minPrice && data.properties[i].price <= maxPrice ))
        if (( data.properties[i].bedrooms >= minBeds && data.properties[i].bedrooms <= maxBeds ))
        if (( code == data.properties[i].code) || (code=="Any"))
        {
          {
            {
              {
                {
                  output+=`
                <article class="card draggable" id="drag${idCount}" draggable="true" ondragstart="drag(event)"  onclick="move(this)">
                  <div class="card__wrapper">
                
                    <figure class="card__feature">
                      <img src="${data.properties[i].picture}" class="card__img" alt="Estates" width="275" height="240">
                    </figure>
                
                    <div class="card__box">
                
                      <header class="card__item card__header">
                        <h6 class="card__item card__item--small card__label">${data.properties[i].bedrooms} bedroom ${data.properties[i].type} for £${data.properties[i].price}</h6>
                        <h2 class="card__item card__item--small card__title">${data.properties[i].location}</h2>
                      </header>
                
                      <hr class="card__item card__divider">
                
                      <section class="card__item card__body">
                        <p>${data.properties[i].description}</p>
                      </section>
                      
                      <div class="card_btns">
                      <a href="${data.properties[i].url}" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" class="eye" fill="none" viewBox="0 0 24 24" style="pointer-events: painted;"  onclick="viewContent()">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg></a>
                        <svg xmlns="http://www.w3.org/2000/svg" class="heart" viewBox="0 0 24 24">
                          <path stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                      </div>
            
                    </div>
                
                  </div>
                </article>
                `;
                } 
              } 
            } 
          } 
        }
        idCount++; 
      }
      // output+="</ul>";
      document.getElementById( "div2" ).innerHTML = output;
      });
});