'use strict';

//Checklists service used to communicate Checklists REST endpoints
angular.module('checklists').factory('Checklists', ['$resource', '$http',
	function($resource, $http) {
		var Checklists = $resource('checklists/:checklistId', {
      checklistId: '@key'
		}, {
			update: {
				method: 'PUT'
			}
		});

    /**
     * Update item value of checklist
     */
    Checklists.prototype.updateItem = function(item) {
      return $http.put('/checklists/' + this.key + '/' + item._id, { isCheck: item.isCheck });
    };

    return Checklists;
	}
]);