const Billing = require("../models/Billing");

const billingService = {
  createBilling: async (billingData) => {
    const existing = await Billing.findOne({ userId: billingData.userId });
    if (existing)
      throw new Error("Ya existe información de facturación para este usuario");

    const billing = new Billing(billingData);
    await billing.save();
    return {
      message: "Facturación creada correctamente",
      billing,
    };
  },

  getBillingByUserId: async (userId) => {
    const billing = await Billing.findOne({ userId });
    if (!billing)
      throw new Error(
        "No se encontró información de facturación para este usuario"
      );
    return billing;
  },

  updateBilling: async (userId, updatedData) => {
    const billing = await Billing.findOneAndUpdate({ userId }, updatedData, {
      new: true,
    });
    if (!billing)
      throw new Error(
        "No se encontró información de facturación para actualizar"
      );
    return {
      message: "Facturación actualizada correctamente",
      billing: billing,
    };
  },

  deleteBilling: async (id) => {
    const billing = await Billing.findOneAndDelete(id);
    if (!billing)
      throw new Error(
        "No se encontró información de facturación para eliminar"
      );
    return {
      message: "Información de facturación eliminada correctamente",
    };
  },
};

module.exports = billingService;
