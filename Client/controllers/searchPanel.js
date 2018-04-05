angular.module('PowerGed')
    .controller('searchPanel', function ($scope, $http, basesService, syncTreeView, modalAlertService) {
        $('.tooltipped').tooltip({ delay: 50 });
        $scope.searchParameters = [];
        $scope.searchPanelWidth = { 'margin-left': '290px' };

        $scope.selectSearchTypeChange = function () {
            if ($scope.searchType == "0") { /* Por Índice */
                basesService.getBaseConfiguration(syncTreeView.baseName, function (response) {
                    $scope.fields = response;
                });
            }
        }

        function addParameter(name, value) {
            $scope.searchParameters.push({
                $and: [
                    { "field.name": name },
                    { "field.value": value }
                ]
            });
        }

        function getParameters(callback) {
            var inputs = document.querySelectorAll('.searchInput');

            for (var index in inputs) {
                var input = inputs[index];
                if (input.value && input.value != '') {
                    if (input.value.includes('&')) {
                        var splittedStr = input.value.split('&');
                        for (var index in splittedStr) {
                            addParameter(input.name, splittedStr[index]);
                        }

                    } else {
                        addParameter(input.name, input.value);
                    }
                }
            }
            callback();
        }

        $scope.$on('handleSyncSearchPanel', function () {
            $scope.visible = !$scope.visible;
        });

        $scope.$on('handleUpdateContainerWidth', function () {
            $scope.searchPanelWidth['margin-left'] =  syncTreeView.containerWidth.containerWidth + 'px';
        })

        $scope.hidePanel = function () { $scope.visible = false; }

        $scope.clear = function () {
            var inputs = document.querySelectorAll('.searchInput');
            for (var index in inputs) {
                var input = inputs[index];
                input.value = '';
            }

            $scope.searchParameters = [];
        }

        $scope.search = function () {
            getParameters(function () {
                $http.get(config.urls.base + '/search', {
                    params: {
                        baseName: syncTreeView.baseName,
                        parameters: $scope.searchParameters
                    }
                }).then(function (result) {
                    $scope.searchParameters = [];
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
    })