module.exports = {
  clean: async db => {
    try {
      const tableNames = Object.keys(db)
      .filter(model => !['Sequelize', 'sequelize'].includes(model))
      .map(modelName => db[modelName].tableName)
    await db.sequelize.query(`TRUNCATE TABLE ${tableNames.join(', ')}`)
    } catch (error) {
      throw new Error(error)
    }
  },
}
