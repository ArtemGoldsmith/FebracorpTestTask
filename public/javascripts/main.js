var itemsQuantity = 0;
var itemsType;

$('.options-button').on('click', function() {
  $('.dropdown-block').toggleClass('visible');
});

function changeItemsType(type) {
  itemsType = type;
  $('#quantity').removeAttr('disabled').css('border', '1px solid #ff0000');
  $('.main-block .item-wrapper').html('');
  console.log(itemsType);
  if ( itemsQuantity > 0 ) {
    for ( i = 0; i < 3; i++ ) {
      $('.main-block .item-wrapper').each(function() {
        $(this).append('<div class="item item-a">Item ' + itemsType + [i+1] + '</div>');
      });
    }
  }
}

$('#quantity').on('input', function() {
  itemsQuantity = $(this).val();
  changeItemsType(itemsType);
  sendItemsQuantity();
});

function sendItemsQuantity() {

  var data = { itemsQuantity: itemsQuantity, itemsType: itemsType };

  $.ajax({
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    url: 'http://localhost:3000/endpoint',
    success: function(data) {
      console.log('success');
      console.log(JSON.stringify(data));
    }
  });
}

$(document).mouseup(function(e) {
  var el = $('.dropdown-block');
  if ( !el.is(e.target) && el.has(e.target).length === 0 && el.hasClass('visible') ) {
    el.removeClass('visible');
  }
});