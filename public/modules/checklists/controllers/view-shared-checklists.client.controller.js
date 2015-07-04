'use strict';

// Checklists controller
angular.module('checklists').controller('ViewSharedChecklistsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Checklists',
	function($scope, $stateParams, $location, Authentication, Checklists) {
		$scope.authentication = Authentication;

		// Get checklist data
		$scope.checklist = Checklists.get({checklistId: $stateParams.checklistId});

    // Catche item value change and call API to update
    $scope.changeItemValue = function(item) {
      $scope.checklist.updateItem(item);
    };
	}
]);