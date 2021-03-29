
exports.up = (knex) => {
  return knex.schema.createTable("users", table =>{
      table.increments("id").primary();
      table.string("email", 128).notNullable();
      table.string("username", 64).notNullable();
      table.string("firstName", 45).notNullable();
      table.string("lastName", 45).notNullable();
      table.string("password").notNullable();
      table.dateTime("createdAt").notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("users")
};
