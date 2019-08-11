(function () {
    'use strict'

    var shoppingListModule = angular.module('ShoppingListCheckOff', []);

    shoppingListModule.controller('toBuyController', ToBuyController)
    shoppingListModule.controller('alreadyBoughtController', AlreadyBoughtController)
    shoppingListModule.service('shoppingListCheckOffService', ShoppingListCheckOffService)

    function ShoppingListCheckOffService() {
        var shoppingListService = this;

        shoppingListService.toBuyList = [
            { name: 'Apples', quantity: 6 },
            { name: 'Pears', quantity: 2 },
            { name: 'Oranges', quantity: 3 },
            { name: 'Peaches', quantity: 4 },
            { name: 'Melons', quantity: 5 },
        ];

        shoppingListService.boughtList = [];

        shoppingListService.getToBuyList = function () {
            return shoppingListService.toBuyList;
        }

        shoppingListService.getBoughtList = function () {
            return shoppingListService.boughtList;
        }

        shoppingListService.markAsBought = function (index) {
            shoppingListService.boughtList.push(shoppingListService.toBuyList[index]);
            shoppingListService.toBuyList.splice(index, 1);
        }
    }

    ToBuyController.$inject = ['shoppingListCheckOffService'];
    function ToBuyController(shoppingListCheckOffService) {
        var showToBuyList = this;
        showToBuyList.items = shoppingListCheckOffService.getToBuyList();

        showToBuyList.markAsBought = function (itemIndex) {
            shoppingListCheckOffService.markAsBought(itemIndex);
        };
    }

    AlreadyBoughtController.$inject = ['shoppingListCheckOffService'];
    function AlreadyBoughtController(shoppingListCheckOffService) {
        var alreadyBoughtList = this;
        alreadyBoughtList.items = shoppingListCheckOffService.getBoughtList();
    }
})();
