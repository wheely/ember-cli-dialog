module.exports = {
    normalizeEntityName: function() { },

    afterInstall: function() {
        return this.addBowerPackageToProject('ember-dialog', '1.1.2');
    }
};