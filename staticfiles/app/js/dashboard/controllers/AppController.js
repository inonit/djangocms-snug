/**
 * Main App Controller
 */

'use strict';

module.exports = function ($scope, $mdBottomSheet, $mdSidenav, $mdDialog) {
    // Toolbar search toggle
    $scope.toggleSearch = function (element) {
        $scope.showSearch = !$scope.showSearch;
    };

    // Sidenav toggle
    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };

    // Menu items
    $scope.menu = [{
        link: '',
        title: 'Dashboard',
        icon: 'action:ic_dashboard_24px' // we have to use Google's naming convention for the IDs of the SVGs in the spritesheet
    }, {
        link: '',
        title: 'Friends',
        icon: 'social:ic_group_24px'
    }, {
        link: '',
        title: 'Messages',
        icon: 'communication:ic_message_24px'
    }];
    $scope.admin = [{
        link: '',
        title: 'Trash',
        icon: 'action:ic_delete_24px'
    }, {
        link: 'showListBottomSheet($event)',
        title: 'Settings',
        icon: 'action:ic_settings_24px'
    }];

    // Mock activity
    $scope.activity = [{
        what: 'Brunch this weekend?',
        who: 'Ali Conners',
        avatar: 'svg-1',
        when: '3:08PM',
        notes: " I'll be in your neighborhood doing errands"
    }, {
        what: 'Summer BBQ',
        who: 'to Alex, Scott, Jennifer',
        avatar: 'svg-2',
        when: '3:08PM',
        notes: "Wish I could come out but I'm out of town this weekend"
    }, {
        what: 'Oui Oui',
        who: 'Sandra Adams',
        avatar: 'svg-3',
        when: '3:08PM',
        notes: "Do you have Paris recommendations? Have you ever been?"
    }, {
        what: 'Birthday Gift',
        who: 'Trevor Hansen',
        avatar: 'svg-4',
        when: '3:08PM',
        notes: "Have any ideas of what we should get Heidi for her birthday?"
    }, {
        what: 'Recipe to try',
        who: 'Brian Holt',
        avatar: 'svg-5',
        when: '3:08PM',
        notes: "We should eat this: Grapefruit, Squash, Corn, and Tomatillo tacos"
    },];

    // Bottomsheet & Modal Dialogs
    $scope.alert = '';
    $scope.showListBottomSheet = function ($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
            template: '<md-bottom-sheet class="md-list md-has-header"><md-list><md-list-item class="md-2-line" ng-repeat="item in items" role="link" md-ink-ripple><md-icon md-svg-icon="{{item.icon}}" aria-label="{{item.name}}"></md-icon><div class="md-list-item-text"><h3>{{item.name}}</h3></div></md-list-item> </md-list></md-bottom-sheet>',
            controller: 'ListBottomSheetController',
            targetEvent: $event
        }).then(function (clickedItem) {
            $scope.alert = clickedItem.name + ' clicked!';
        });
    };

    $scope.showAdd = function (ev) {
        $mdDialog.show({
            controller: 'DialogController',
            template: '<md-dialog aria-label="Form"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>First Name</label> <input ng-model="user.firstName"> </md-input-container> <md-input-container flex> <label>Last Name</label> <input ng-model="user.lastName"> </md-input-container> </div> <md-input-container flex> <label>Message</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
            targetEvent: ev,
        })
            .then(function (answer) {
                $scope.alert = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.alert = 'You cancelled the dialog.';
            });
    };
};
