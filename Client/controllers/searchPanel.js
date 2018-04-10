angular.module('PowerGed')
    .controller('searchPanel', function ($scope, $http, basesService, syncTreeView, modalAlertService) {
        $('.tooltipped').tooltip({ delay: 50 });
        $scope.searchPanelWidth = { 'margin-left': '290px' };

        $scope.selectSearchTypeChange = function () {
            if ($scope.searchType == "0") { /* Por Índice */
                basesService.getBaseConfiguration(syncTreeView.baseName, function (response) {
                    $scope.fields = response;
                });
            }
        }

        $scope.$on('handleSyncSearchPanel', function () {
            $scope.visible = !$scope.visible;
        });

        $scope.$on('handleUpdateContainerWidth', function () {
            $scope.searchPanelWidth['margin-left'] = syncTreeView.containerWidth.containerWidth + 'px';
        })

        $scope.hidePanel = function () { $scope.visible = false; }

        $scope.clear = function () {
            var inputs = document.querySelectorAll('.searchInput');
            for (var index in inputs) {
                var input = inputs[index];
                input.value = '';
            }
        }

        $scope.search = function () {
            getParameters($scope.searchType, function (searchParameters) {
                if(typeof searchParameters != Array) {
                    searchParameters = [searchParameters];
                }

                $http.get(config.urls.base + '/search', {
                    params: {
                        baseName: syncTreeView.baseName,
                        parameters: searchParameters,
                        searchType: $scope.searchType
                    }

                }).then(function (result) {
                    if (result.data.length > 0) {
                        $scope.visible = false;
                        syncTreeView.updateTreeSearchResult(result.data);
                    } else {
                        modalAlertService.showAlert('A Pesquisa não obteve nenhum resultado', 'info');
                    }
                }).catch(function (err) {
                    modalAlertService.showAlert('Algo deu errado :(', 'danger');
                });
            });
        }

        function getParameters(searchType, callback) {
            var searchParameters = [];

            if (searchType == 1) {
                callback({ 'q': $scope.fullTextSearchParameter });
            } else {
                var inputs = document.querySelectorAll('.searchInput');

                for (var index in inputs) {
                    var input = inputs[index];
                    if (input.value && input.value != '') {
                        if (input.value.includes('&')) {
                            var splittedStr = input.value.split('&');
                            for (var index in splittedStr) {
                                searchParameters.push({
                                    $and: [
                                        { "fields.name": input.name },
                                        { "fields.value": splittedStr[index] }
                                    ]
                                });
                            }

                        } else {
                            searchParameters.push({
                                $and: [
                                    { "fields.name": input.name },
                                    { "fields.value": input.value }
                                ]
                            });
                        }
                    }
                }
                callback(searchParameters);
            }
        }
    })