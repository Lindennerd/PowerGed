angular.module('PowerGed')
    .controller('searchPanel', function ($scope, $http, basesService, syncTreeviewContainer, modalAlertService, loadingService) {

        $scope.searchPanelWidth = { 'margin-left': '290px' };
        $scope.searchParameters = [];

        $scope.selectSearchTypeChange = function () {
            if ($scope.searchType == "0") {
                basesService.getBaseConfiguration(syncTreeviewContainer.baseName, function (response) {
                    $scope.fields = response;
                });
            }
        }

        $scope.$on('handleSyncSearchPanel', function () {
            $scope.visible = !$scope.visible;
        });

        $scope.$on('handleUpdateContainerWidth', function () {
            $scope.searchPanelWidth['margin-left'] = syncTreeviewContainer.containerWidth.containerWidth + 'px';
        });

        $scope.hidePanel = function () { $scope.visible = false; }

        $scope.clear = function () {
            $scope.searchParameters = [];
            $scope.fieldName = '';
            $scope.fieldValue = '';
        }

        $scope.search = function () {
            getParameters($scope.searchType, function (searchParameters) {
                loadingService.start('treeview-loading');
                $http.get(config.urls.base + '/search', {
                    params: {
                        baseName: syncTreeviewContainer.baseName,
                        parameters: JSON.stringify(searchParameters),
                        searchType: $scope.searchType
                    }

                }).then(function (result) {
                    loadingService.stop('treeview-loading');
                    if (result.data.length > 0) {
                        $scope.visible = false;
                        syncTreeviewContainer.viewSearchResult(result.data, $scope.fields,
                            $scope.searchType === 1 ? searchParameters : null);
                    } else {
                        modalAlertService.showAlert('A Pesquisa não obteve nenhum resultado', 'info');
                    }
                }).catch(function (err) {
                    loadingService.stop('treeview-loading');
                    modalAlertService.showAlert('Algo deu errado :(', 'danger');
                });
            });
        }

        $scope.addField = function () {
            $scope.searchParameters.push({
                fieldName: $scope.fieldName,
                fieldValue: $scope.fieldValue
            });

            $scope.fieldName = '';
            $scope.fieldValue = '';
        }

        function getParameters(searchType, callback) {
            if (searchType == 1) {
                callback({ 'q': $scope.fullTextSearchParameter });
            } else {
                callback($scope.searchParameters.map(function (par, index) {
                    return {
                        $and: [
                            { "fields.name": par.fieldName },
                            { "fields.value": par.fieldValue }
                        ]
                    }
                }));
            }
        }
    });