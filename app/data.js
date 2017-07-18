'use strict';

var totalItems,
    itemsType ,
    itemsListing;

module.exports = {
    parseIndexViewData: function( req ) {
        var
            pageSize = 3,
            currentPage = 1,
            items = [],
            itemsArrays = [],
            itemsList = [],
            pageCount;
        if ( totalItems === 0 ) {
            pageCount = 1;
        } else if ( (totalItems / pageSize) % 2 ) {
            pageCount = this.gaussRound( totalItems / pageSize );
        } else {
            pageCount = totalItems / pageSize;
        }

        for (var i = 1; i < totalItems; i++) {
            items.push({
                name: 'Item',
                type: itemsType,
                number: i
            });
        }

        while (items.length > 0) {
            itemsArrays.push(items.splice(0, pageSize));
        }
        if( req !== null ) {
            if (typeof req.query.page !== 'undefined') {
                currentPage = +req.query.page;
            }
        }

        itemsList = itemsArrays[+currentPage - 1];

        return {
            items: itemsList,
            pageSize: pageSize,
            totalItems: totalItems,
            pageCount: pageCount,
            currentPage: currentPage,
            itemsList: itemsListing,
            title: 'Test Task'
        };
    },
    gaussRound: function( num, decimalPlaces ) {
        var d = decimalPlaces || 0,
            m = Math.pow(10, d),
            n = +(d ? num * m : num).toFixed(8),
            i = Math.floor(n), f = n - i,
            e = 1e-8,
            r = (f > 0.5 - e && f < 0.5 + e) ?
                ((i % 2 === 0) ? i : i + 1) : Math.round(n);
        return d ? r / m : r;
    },
    dataSet: function( totalItemsToSet, itemsTypeToSet, itemsListingToSet ) {
        totalItems = totalItemsToSet;
        itemsType = itemsTypeToSet;
        itemsListing = itemsListingToSet;
    }
};