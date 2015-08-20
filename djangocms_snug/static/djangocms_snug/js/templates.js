angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("auth/templates/login.html","<h1>Login state</h1>\n");
$templateCache.put("dashboard/templates/dashboard.html","<section layout=\"row\" flex>\n    <md-sidenav layout=\"column\" class=\"md-sidenav-left md-whiteframe-z2\" md-component-id=\"left\"\n                md-is-locked-open=\"$mdMedia(\'gt-md\')\">\n        <md-toolbar class=\"md-hue-2\">\n            <span flex></span>\n\n            <div layout=\"row\" layout-align=\"start center\">\n                <md-icon class=\"md-avatar\" md-svg-icon=\"avatars:svg-1\"></md-icon>\n                <span flex></span>\n            </div>\n            <span flex></span>\n\n            <div class=\"md-body-2\">Firstname Lastname</div>\n            <div class=\"md-body-1\">email@domainname.com</div>\n        </md-toolbar>\n        <md-list>\n            <md-list-item class=\"md-2-line\" ng-repeat=\"item in menu\" role=\"link\" md-ink-ripple>\n                <md-icon md-svg-icon=\"{{ item.icon }}\" aria-label=\"{{ item.title }}\"></md-icon>\n                <div class=\"md-list-item-text\">\n                    <span class=\"md-body-2\">{{ item.title }}</span>\n                </div>\n            </md-list-item>\n            <md-divider></md-divider>\n            <md-subheader class=\"md-no-sticky\">Management</md-subheader>\n            <md-list-item class=\"md-2-line\" ng-repeat=\"item in admin\" role=\"link\" md-ink-ripple>\n                <md-icon md-svg-icon=\"{{ item.icon }}\" aria-label=\"{{ item.title }}\"></md-icon>\n                <div class=\"md-list-item-text\">\n                    <span class=\"md-body-2\">{{ item.title }}</span>\n                </div>\n            </md-list-item>\n        </md-list>\n    </md-sidenav>\n    <div layout=\"column\" class=\"relative\" layout-fill role=\"main\">\n        <md-button class=\"md-fab md-fab-bottom-right\" aria-label=\"Add\" ng-click=\"showAdd($event)\">\n            <md-icon md-svg-icon=\"content:ic_add_24px\" aria-label=\"Plus\"></md-icon>\n        </md-button>\n        <md-toolbar class=\"animate-show md-tall md-whiteframe-z1\" ng-show=\"!showSearch\">\n            <div class=\"md-toolbar-tools\">\n                <md-button class=\"md-icon-button\" ng-click=\"toggleSidenav(\'left\')\" hide-gt-md aria-label=\"Menu\">\n                    <md-icon md-svg-icon=\"navigation:ic_menu_24px\" aria-label=\"Menu\"></md-icon>\n                </md-button>\n                <h3>\n                    Dashboard\n                </h3>\n                <span flex></span>\n                <md-button class=\"md-icon-button\" aria-label=\"Search\" ng-click=\"toggleSearch()\">\n                    <md-icon md-svg-icon=\"action:ic_search_24px\" aria-label=\"Search\"></md-icon>\n                </md-button>\n                <md-button class=\"md-icon-button\" aria-label=\"Open Settings\" ng-click=\"showListBottomSheet($event)\">\n                    <md-icon md-svg-icon=\"navigation:ic_more_vert_24px\" aria-label=\"More\"></md-icon>\n                </md-button>\n            </div>\n            <span flex></span>\n            <md-tabs md-stretch-tabs=\"always\" md-selected=\"data.selectedIndex\">\n                <md-tab id=\"tab1\" aria-controls=\"tab1-content\">\n                    Latest\n                </md-tab>\n                <md-tab id=\"tab2\" aria-controls=\"tab2-content\">\n                    Favorites\n                </md-tab>\n            </md-tabs>\n        </md-toolbar>\n        <md-toolbar ng-show=\"showSearch\" class=\"animate-show md-hue-1 md-whiteframe-z1\">\n            <div class=\"md-toolbar-tools\">\n                <md-button class=\"md-icon-button\" ng-click=\"toggleSearch()\" aria-label=\"Menu\">\n                    <md-icon md-svg-icon=\"navigation:ic_arrow_back_24px\" aria-label=\"Back\"></md-icon>\n                </md-button>\n                <h3 role=\"button\" ng-click=\"toggleSearch()\">\n                    Back\n                </h3>\n                <span flex=\"5\"></span>\n                    <span ng-controller=\"DemoController as ctrl\" flex>\n                        <md-autocomplete md-theme=\"input\"\n                                         md-input-name=\"autocompleteField\"\n                                         md-no-cache=\"ctrl.noCache\"\n                                         md-selected-item=\"ctrl.selectedItem\"\n                                         md-search-text=\"ctrl.searchText\"\n                                         md-items=\"item in ctrl.querySearch(ctrl.searchText)\"\n                                         md-item-text=\"item.display\"\n                                         placeholder=\"Search\">\n                            <md-item-template>\n                                <span md-highlight-text=\"ctrl.searchText\">{{ item.display }}</span>\n                            </md-item-template>\n                            <div ng-messages=\"searchForm.autocompleteField.$error\"\n                                 ng-if=\"searchForm.autocompleteField.$touched\">\n                                <div ng-message=\"required\">You <b>must</b> have a favorite state.</div>\n                                <div ng-message=\"minlength\">Your entry is not long enough.</div>\n                                <div ng-message=\"maxlength\">Your entry is too long.</div>\n                            </div>\n                        </md-autocomplete>\n                    </span>\n            </div>\n        </md-toolbar>\n        <md-content flex>\n            <ui-view layout=\"column\" layout-fill layout-padding>\n                <div class=\"inset\" hide-sm></div>\n                <ng-switch on=\"data.selectedIndex\" class=\"tabpanel-container\">\n                    <div role=\"tabpanel\"\n                         id=\"tab1-content\"\n                         aria-labelledby=\"tab1\"\n                         ng-switch-when=\"0\"\n                         md-swipe-left=\"next()\"\n                         md-swipe-right=\"previous()\"\n                         layout=\"row\" layout-align=\"center center\">\n                        <div flex-gt-sm=\"90\" flex-gt-md=\"80\">\n                            <h2 class=\"md-title inset\">Latest Activity</h2>\n                            <md-card>\n                                <md-list>\n                                    <md-list-item class=\"md-3-line\" ng-repeat=\"item in activity | filter:search\">\n                                        <md-icon class=\"md-avatar\" hide-sm\n                                                 md-svg-icon=\"avatars:{{ item.avatar }}\"></md-icon>\n                                        <div class=\"md-list-item-text\">\n                                            <h3>{{ item.what }}</h3>\n                                            <h4>{{ item.who }}</h4>\n\n                                            <p>{{ item.notes }}</p>\n                                        </div>\n                                        <md-divider md-inset hide-sm ng-if=\"!$last\"></md-divider>\n                                        <md-divider hide-gt-sm ng-if=\"!$last\"></md-divider>\n                                    </md-list-item>\n                                    <md-divider></md-divider>\n                                    <md-list-item>\n                                        <md-button class=\"md-primary\">\n                                            <md-icon md-svg-icon=\"navigation:ic_arrow_forward_24px\"\n                                                     aria-label=\"Forward\"></md-icon>\n                                            <span>More</span>\n                                        </md-button>\n                                    </md-list-item>\n                                </md-list>\n                            </md-card>\n                        </div>\n                    </div>\n                    <div role=\"tabpanel\"\n                         id=\"tab2-content\"\n                         aria-labelledby=\"tab2\"\n                         ng-switch-when=\"1\"\n                         md-swipe-left=\"next()\"\n                         md-swipe-right=\"previous()\"\n                         layout=\"row\" layout-align=\"center center\">\n                        <div flex-gt-sm=\"90\" flex-gt-md=\"80\">\n                            <h2 class=\"md-title inset\">Favorites</h2>\n                            <md-card>\n                                <md-list>\n                                    <md-list-item class=\"md-3-line\"\n                                                  ng-repeat=\"item in activity | filter:search | orderBy:\'-what\'\">\n                                        <md-icon class=\"md-avatar\" hide-sm\n                                                 md-svg-icon=\"avatars:{{ item.avatar }}\"></md-icon>\n                                        <div class=\"md-list-item-text\">\n                                            <h3>{{ item.what }}</h3>\n                                            <h4>{{ item.who }}</h4>\n\n                                            <p>{{ item.notes }}</p>\n                                        </div>\n                                        <md-divider md-inset hide-sm ng-if=\"!$last\"></md-divider>\n                                        <md-divider hide-gt-sm ng-if=\"!$last\"></md-divider>\n                                    </md-list-item>\n                                    <md-divider></md-divider>\n                                    <md-list-item>\n                                        <md-button class=\"md-primary\">\n                                            <md-icon md-svg-icon=\"navigation:ic_arrow_forward_24px\"\n                                                     aria-label=\"Forward\"></md-icon>\n                                            <span>More</span>\n                                        </md-button>\n                                    </md-list-item>\n                                </md-list>\n                            </md-card>\n                        </div>\n                    </div>\n                </ng-switch>\n            </ui-view>\n        </md-content>\n    </div>\n</section>\n");}]);