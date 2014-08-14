/**
 * dxw's simple date input polyfill
 */

jQuery(function ($) {
    'use strict';

    if (typeof Modernizr === 'undefined' || typeof Modernizr.inputtypes === 'undefined') {
        console.warn('date-polyfill: Modenizr must be loaded including the inputtypes option')
        return
    }

    if (Modernizr.inputtypes.date) {
        // Our work here is done
        return
    }

    $('input[type="date"]').each(function () {
        var $this = $(this)
          , humanInput = $(document.createElement('input'))
          , format = $this.attr('data-format')

        humanInput.attr('type', 'date')

        // Copy some attributes
        humanInput.attr('class', $this.attr('class'))

        // Set up datepicker
        humanInput.datepicker({
            altField: $this,
            altFormat: 'yy-mm-dd',
            dateFormat: format ? format : 'd MM yy',
        })

        // Set current date if it's already populated
        humanInput.datepicker('setDate', Date.parse($this.val()))

        // Add classes
        humanInput.addClass('date-polyfill-new-field')
        $this.addClass('date-polyfill-original-field')

        $this.css('display', 'none')

        // Add it to the DOM
        $this.before(humanInput)
    })
})
