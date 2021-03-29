
exports.up = (knex) => {
  return knex.schema.createTable("events", table => {
      table.increments("id").primary();
      table.string("tile", 255).notNullable();
      table.text("description").notNullable();
      table.dateTime("date").notNullable()
  })
};

exports.down = (knex) => {
  return knex.schema.dropTable("events")
};
