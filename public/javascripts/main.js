"use strict";
/**
 * ------------------------------------------------------------------------------------------------------
 * Variables
 * ------------------------------------------------------------------------------------------------------
 **/
var itemsQuantity = 0;
var itemsType;
var itemsList = [];

/**
 * ------------------------------------------------------------------------------------------------------
 * Custom Functions
 * ------------------------------------------------------------------------------------------------------
 **/

$.fn.extend({
  donetyping: function(callback, timeout) {
    timeout = timeout || 1e3; // 1 second
    var timeoutReference,
    doneTyping = function(el) {
      if ( !timeoutReference ) return;
      timeoutReference = null;
      callback.call(el);
    };
    return this.each(function(i, el) {
      var $el = $(el);
      $el.is(':input') && $el.on('keyup keypress paste', function(e) {
        if ( e.type === 'keyup' && e.keyCode !== 8 ) return;
        if ( timeoutReference ) clearTimeout(timeoutReference);
        timeoutReference = setTimeout(function() {
          doneTyping(el);
        }, timeout);
      }).on('blur', function() {
        doneTyping(el);
      });
    });
  }
});

/**
 * ------------------------------------------------------------------------------------------------------
 * Main Functions
 * ------------------------------------------------------------------------------------------------------
 **/

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function changeItemsType(type) {
  itemsType = type;
  $('#quantity').removeAttr('disabled').css('border', '1px solid #ff0000');
  $('.main-block .item-wrapper').html('');
  if ( itemsQuantity > 0 ) {
    for ( var i = 0; i < itemsQuantity; i++ ) {
      if ( i < 3 ) {
        $('.main-block .item-wrapper').each(function() {
          $(this).append('<div class="item item-a">Item ' + itemsType + [i + 1] + '</div>');
        });
      }
      itemsList.push(itemsType + [i + 1])
    }
  }
};

function sendItemsQuantity() {

  var data = { itemsQuantity: ++itemsQuantity, itemsType: itemsType, itemsList: itemsList };

  $.ajax({
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    cache: false,
    url: '/itemsQuantity',
    success: function(data) {
      location.reload(true);
    }
  });
}

/**
 * ------------------------------------------------------------------------------------------------------
 * Events
 * ------------------------------------------------------------------------------------------------------
 **/

$(document).mouseup(function(e) {
  var el = $('.dropdown-block');
  if ( !el.is(e.target) && el.has(e.target).length === 0 && el.hasClass('visible') ) {
    el.removeClass('visible');
  }
});

$('.options-button').on('click', function() {
  $('.dropdown-block').toggleClass('visible');
});

$('#quantity').donetyping(function() {
  if ( isNumeric($(this).val()) ) {
    itemsQuantity = $(this).val();
    changeItemsType(itemsType);
    sendItemsQuantity();
  } else {
    alert('Input should be number!')
  }
});