sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/ui/core/format/DateFormat",
	"sap/ui/table/TablePersoController",
	"./DemoPersoService"
], function(Controller, JSONModel, MessageToast, DateFormat, TablePersoController, DemoPersoService) {
	"use strict";

	return Controller.extend("sap.ui.table.sample.Basic.Controller", {

		onInit: function() {
			var oThis = this;
			// set explored app's demo model on this sample
			var oJSONModel = this.initSampleDataModel();
			this.getView().setModel(oJSONModel);
			// init and activate controller
			this._oTPC = new TablePersoController({
				table: oThis.getView().byId("productsTable"),
				//specify the first part of persistence ids e.g. 'demoApp-productsTable-dimensionsCol'
				componentName: "demoApp",
				persoService: DemoPersoService
			});
		},

		initSampleDataModel: function() {
			var oModel = new JSONModel();

			var oDateFormat = DateFormat.getDateInstance({
				source: {
					pattern: "timestamp"
				},
				pattern: "dd/MM/yyyy"
			});

			jQuery.ajax(jQuery.sap.getModulePath("sap.ui.demo.mock", "/products.json"), {
				dataType: "json",
				success: function(oData) {
					var aTemp1 = [];
					var aTemp2 = [];
					var aSuppliersData = [];
					var aCategoryData = [];
					for (var i = 0; i < oData.ProductCollection.length; i++) {
						var oProduct = oData.ProductCollection[i];
						if (oProduct.SupplierName && jQuery.inArray(oProduct.SupplierName, aTemp1) < 0) {
							aTemp1.push(oProduct.SupplierName);
							aSuppliersData.push({
								Name: oProduct.SupplierName
							});
						}
						if (oProduct.Category && jQuery.inArray(oProduct.Category, aTemp2) < 0) {
							aTemp2.push(oProduct.Category);
							aCategoryData.push({
								Name: oProduct.Category
							});
						}
						oProduct.DeliveryDate = (new Date()).getTime() - (i % 10 * 4 * 24 * 60 * 60 * 1000);
						oProduct.DeliveryDateStr = oDateFormat.format(new Date(oProduct.DeliveryDate));
						oProduct.Heavy = oProduct.WeightMeasure > 1000 ? "true" : "false";
						oProduct.Available = oProduct.Status == "Available" ? true : false;
					}

					oData.Suppliers = aSuppliersData;
					oData.Categories = aCategoryData;

					oModel.setData(oData);
				},
				error: function() {
					jQuery.sap.log.error("failed to load json");
				}
			});

			return oModel;
		},

		formatAvailableToObjectState: function(bAvailable) {
			return bAvailable ? "Success" : "Error";
		},

		formatAvailableToIcon: function(bAvailable) {
			return bAvailable ? "sap-icon://accept" : "sap-icon://decline";
		},

		handleDetailsPress: function(oEvent) {
			MessageToast.show("Details for product with id " + this.getView().getModel().getProperty("ProductId", oEvent.getSource().getBindingContext()));
		},

		onPersoButtonPressed: function() {
			this._oTPC.openDialog();
		}

	});

});