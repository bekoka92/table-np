/*
 * - Author: Ulugbek Nuriddinov (bekoka92@gmail.com)
 * - File: table-np.js
 * - URL: https://github.com/bekoka92/table-np
*/

var inputelement = [];

$.fn.getCursorPosition = function()
{
  if(this.lengh == 0) return -1;
  return $(this)[0].selectionStart;
}

$(document).ready(function() {

  $(document).on('focusin', '.inedit', function() {
    inputelement = $(this);
  });

  $(document).on('focusout', '.inedit', function() {
    inputelement = [];
  });

  $(document).keydown(function (e) {
    if (inputelement && inputelement.length > 0) {
      if (!e.ctrlKey && e.keyCode == 37) {
        var val = $(inputelement).val();
        var st = $(inputelement).getCursorPosition();

        if(st == null) {
          npud_input(inputelement, 'left');
          return false;
        }
        else if(val.length == 0 && st == 0) {
          npud_input(inputelement, 'left');
          return false;
        }
        else if(val.length > 0 && st == 0) {

          npud_input(inputelement, 'left');
          return false;
        }
      }
      else if (e.keyCode == 38) {
        npud_input(inputelement, 'up');
      }
      else if (!e.ctrlKey && e.keyCode == 39) {
        var val = $(inputelement).val();
        var st = $(inputelement).getCursorPosition();

        if(st == null) {
          npud_input(inputelement, 'right');
          return false;
        }
        else if(val.length == 0 && st == 0) {
          npud_input(inputelement, 'right');
          return false;
        }
        else if(st >= val.length) {
          npud_input(inputelement, 'right');
          return false;
        }
      }
      else if (e.keyCode == 40) {
        npud_input(inputelement, 'down');
      }
    }
  });

});


function npud_input(inputelement, type)
{
  if (inputelement && inputelement != undefined && inputelement.length > 0)
  {
    if (type == 'right') {
      var $next = $(inputelement).parent().next().find('input.inedit');
      var $select = $(inputelement).parent().next().find('select.inedit');
      if ($next.length > 0) {
        $next.select().focus();
      }
      else if ($select.length > 0) {
        $select.focus();
      }
    }

    else if (type == 'left') {
      var $prev = $(inputelement).parent().prev().find('input.inedit');
      var $select = $(inputelement).parent().prev().find('select.inedit');
      if ($prev.length > 0) {
        $prev.select().focus();
      }
      else if ($select.length > 0) {
        $select.focus();
      }
    }

    else if (type == 'up') {
      var indexof = $(inputelement).parent().index();

      if(indexof > 0) {
        var $up = $(inputelement).closest('tr').prev().children().eq(indexof).find('input.inedit');
        if ($up.length > 0) {
          $up.select().focus();
        }
      }
    }

    else if (type == 'down') {
      var indexof = $(inputelement).parent().index();

      if(indexof > 0) {
        var $up = $(inputelement).closest('tr').next().children().eq(indexof).find('input.inedit');
        if ($up.length > 0) {
          $up.select().focus();
        }
      }
    }
  }
}
