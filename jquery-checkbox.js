(function($){
    var globalClassname = 'rounded-checkbox-button';

    // list of button background colors
    var bgcolors = ['9afe66', 'ff9934', 'cc99fe', '66cbff'];

    // default button style
    var roundedCheckboxCSS = {
        display:'block',
        fontSize:13,
        fontWeight:'bold',
        height:17,
        width:200,
        background:'#55ff66',
        borderRadius:4,

        paddingTop:3,
        paddingBottom:3,
        paddingRight:3,
        paddingLeft:7,

        marginTop:0,
        marginBottom:4

//        boxShadow:'0px 1px 1px 1px #ccc'
    }



    $.fn.roundedCheckboxButton = function(options){
        var opts = $.extend({}, $.fn.roundedCheckboxButton.defaults, options);

        var button_count = 0;
        return this.each(function(){
            var $this = $(this);

            $this
                .addClass( globalClassname )
                .css(opts.buttonCSS)
                ;

            var checkbox = $(this).find('input[type="checkbox"]');
            var val = checkbox.val();

            // hide checkbox
            checkbox.hide();

            // get checkbox state

            var checkboxState = checkbox.prop("checked") === true ? 'checkbox-checked' : 'checkbox-clear';

            var checkImage = $('<span></span>');
            checkImage.addClass('icon-checkbox ' + checkboxState).css({
                margin:'0 7px 0 0',
                'float':'left'
            });

            $this.prepend(checkImage).append(val);

            button_count = button_count >= opts.backgroundColors.length ? 0 : button_count;
            $this.css({backgroundColor:'#'+opts.backgroundColors[button_count]});

            button_count++;

            if($(this).hasClass('selected')){
                if($(this).hasClass('start'))
                    $(this).removeClass('start');
                else{
                    $(this).find('.icon-checkbox').toggleClass('checkbox-clear').toggleClass('checkbox-checked');
                }
            }


            $this.click(
                function() {
                    $(this).find('.icon-checkbox').toggleClass('checkbox-clear').toggleClass('checkbox-checked');

                    ( checkbox.prop("checked") === true )
                        ?checkbox.removeAttr("checked")
                        :checkbox.attr("checked", "checked")
                        ;

                    opts.id = $this.attr('id');
                    opts.selected = $(this).find('.icon-checkbox').hasClass('checkbox-checked');

                    if( typeof opts.onchange == 'function' )
                        opts.onchange();
                }
            );
        });
    };

    //
    // plugin defaults
    //
    $.fn.roundedCheckboxButton.defaults = {
        backgroundColors:bgcolors,
        buttonCSS:roundedCheckboxCSS,
        onchange:function() { }
    };

    $.fn.roundedCheckboxButton.getCheckboxValues = function(filter) {
        var vals = [];
        filter = typeof filter != 'undefined' ? filter : '';
        $('.' + globalClassname + ' input[type="checkbox"]' + filter).each(
            function() {
                var $this = $(this);
                vals.push( $this.val() );
            }
        );

        return vals;
    }

})(jQuery);