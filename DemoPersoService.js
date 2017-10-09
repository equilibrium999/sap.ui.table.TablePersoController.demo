sap.ui.define(['jquery.sap.global'],
	function(jQuery) {
		"use strict";

		// Very simple page-context personalization
		// persistence service, not for productive use!
		var DemoPersoService = {

			oData: {
				_persoSchemaVersion: "1.0",
				aColumns: [{
					id: "demoApp-productsTable-productCol",
					order: 2,
					text: "Product",
					visible: true
				}, {
					id: "demoApp-productsTable-supplierCol",
					order: 1,
					text: "Supplier",
					visible: true
				}, {
					id: "demoApp-productsTable-quantityCol",
					order: 0,
					text: "Quantity",
					visible: false
				}, {
					id: "demoApp-productsTable-weightCol",
					order: 3,
					text: "Heavy Weight",
					visible: true
				}, {
					id: "demoApp-productsTable-priceCol",
					order: 4,
					text: "Price",
					visible: true
				}]
			},

			getPersData: function() {
				var oDeferred = new jQuery.Deferred();
				if (!this._oBundle) {
					this._oBundle = this.oData;
				}
				var oBundle = this._oBundle;
				oDeferred.resolve(oBundle);
				return oDeferred.promise();
			},

			setPersData: function(oBundle) {
				var oDeferred = new jQuery.Deferred();
				this._oBundle = oBundle;
				oDeferred.resolve();
				return oDeferred.promise();
			},

			delPersData: function() {
				var oDeferred = new jQuery.Deferred();
				oDeferred.resolve();
				return oDeferred.promise();
			}
		};

		return DemoPersoService;

	}, /* bExport= */ true);