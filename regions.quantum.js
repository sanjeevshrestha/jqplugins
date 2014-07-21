/**
 * @version     1.0.0
 * @package     jqplugins
 * @copyright   Copyright (C) 2014. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 * @filename    regions.quantum.js
 *
 * JQuery Plugin to load regions and subregions
 */

(function ($, undefined) {

    'use strict';

    $.fn.regions=function(options)
    {
        var me=this;
        this.settings = $.extend({
            url: "/",
            url_param:'id',
            load_to:"#filter_region",
            afterload:"liszt:updated"

        }, options );
        $.ajaxSetup({

            dataType:'JSON',

            fail:function(){
                console.log('Ajax request Failed');
            }

        });

        $(me).on('change',function(e){
            var data={};
            data[me.settings.url_param]=$(me).val();
            data['format']='json';
            $.ajax({url:me.settings.url,type:'GET',data:data}).done(function(data){

                $(me.settings.load_to).children().remove();
                if(data.length)
                {
                    for(var i=0;i<data.length;i++)
                    {
                        var dt=data[i];

                        var o = new Option(dt.title, dt.value);
                        $(o).html(dt.title);
                        $(o).val(dt.value);
                        $(me.settings.load_to).append(o);
                    }
                }

                $(me.settings.load_to).trigger(me.settings.afterload);



            }).fail(function(data){
                    console.log(data);

                })
        });


    }


})(jQuery);
