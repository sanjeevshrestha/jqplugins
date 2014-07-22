/**
 * MyReviews Plugin
 * Package Bewise Reviews
 */

(function ($, undefined) {

    'use strict';

    $.fn.myreviews = function (options) {
        //Set me to this instance of plugin
        var me = this;

        /**
         * Default settings
         * @type {*}
         */
        this.settings = $.extend({
            url: "/",
            selector: '.reviewlink',
            param: 'id',
            reviewdataselector: 'review-id',
            vendordataselector: 'vendor-id'
        }, options);

        /**
         * Setup some defaults,
         */
        $.ajaxSetup({

            dataType: 'JSON',

            fail: function () {
                console.log('Ajax request Failed');
            }

        });

        /**
         * The search button,Post it with data and format=json
         */
        $(me).on('click', me.settings.selector, function (e) {

            var t = e.currentTarget;

            var loadergif=jQuery('<div class="loader"></div>');

            loadergif.insertAfter(t);

//            jQuery(t).appendAfter(loadergif);


            var settings = me.settings;

            var data = {};
            data[settings.param] = $(t).data(settings.reviewdataselector);

            data['format'] = 'json';

            $.ajax({url: settings.url, type: 'GET', data: data}).done(function (resp) {

                loadergif.remove();

                if (resp.status == true) {
                    bootbox.dialog(resp.content,[{
                        "label" : "Ok",
                        "class" : "btn-success"
                    }],{header: resp.title});

                    $('div.rateit').rateit();
                }
                else {
                    bootbox.alert('There was error loading the review. Please try again');
                }

            });
        });


    }


})(jQuery);