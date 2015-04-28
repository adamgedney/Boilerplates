$(function(){

    // Usage: var searchFilter = new Filter('.o-filters__selects select','.o-filters__radios input[type=radio]');
    // searchFilter.open();

    function Filter(selects, radios){

        //Public properties
        this.$selects = $(selects);
        this.$radios  = $(radios);

        // Scoped properties
        var something = '';



    }// Filters

    /**
     * Open Filters
     */
    Filter.prototype.open = function(){
        this.$selects.each(function(){
            // do something to them
        });
    };

});// $ ready