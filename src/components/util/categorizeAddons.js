export const categorizeAddons = (addons) => {
  return addons.reduce((acc, addon) => {
    const { addonCategory } = addon;

    if (!acc[addonCategory.name]) {
      acc[addonCategory.name] = [];
    }

    acc[addonCategory.name].push(addon);
    return acc;
  }, {});
};
