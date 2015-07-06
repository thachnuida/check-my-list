'use strict';

// Configuring the Articles module
angular.module('checklists').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		// Menus.addMenuItem('topbar', 'Checklists', 'checklists', 'dropdown', '/checklists(/create)?');
		Menus.addMenuItem('topbar', 'List Checklists', 'checklists');
		Menus.addMenuItem('topbar', 'New Checklist', 'checklists/create');
	}
]);