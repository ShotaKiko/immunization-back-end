exports.up = function(knex, Promise) {
  return knex.schema.createTable('patient_immunizations', tbl => {
    tbl.primary(['patientId', 'immunizationId', 'appointmentDate']);
    if (knex.client.config.client === 'pg') {
      tbl
        .uuid('patientId')
        .notNullable()
        .references('id')
        .inTable('patients')
        .onDelete('CASCADE');
      tbl
        .uuid('immunizationId')
        .notNullable()
        .references('id')
        .inTable('immunizations')
        .onDelete('CASCADE');
      tbl.date('appointmentDate').notNullable();
      tbl
        .uuid('providerId')
        .notNullable()
        .references('id')
        .inTable('providers')
        .onDelete('SET NULL');
    } else {
      tbl
        .integer('patientId')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('patients')
        .onDelete('CASCADE');
      tbl
        .integer('immunizationId')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('immunizations')
        .onDelete('CASCADE');
      tbl.date('appointmentDate').notNullable();
      tbl
        .integer('providerId')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('providers')
        .onDelete('SET NULL');
    }
    tbl.datetime('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('patient_immunizations');
};
