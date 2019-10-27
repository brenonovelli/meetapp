module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Breno Novelli',
          email: 'breno@breno.com.br',
          password_hash:
            '$2a$08$Ahq5.owgGQ/9WazGGxfQMOh8BfU7C7stMmyrCrkBa2hXMWPUTuZza',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Gabriela Marra',
          email: 'gabi@gabi.com.br',
          password_hash:
            '$2a$08$Ahq5.owgGQ/9WazGGxfQMOh8BfU7C7stMmyrCrkBa2hXMWPUTuZza',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Rafael Damasceno',
          email: 'rafael@rafael.com.br',
          password_hash:
            '$2a$08$Ahq5.owgGQ/9WazGGxfQMOh8BfU7C7stMmyrCrkBa2hXMWPUTuZza',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Thiago Limão',
          email: 'thiago@thiago.com.br',
          password_hash:
            '$2a$08$Ahq5.owgGQ/9WazGGxfQMOh8BfU7C7stMmyrCrkBa2hXMWPUTuZza',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Bart Marra',
          email: 'bart@bart.com.br',
          password_hash:
            '$2a$08$Ahq5.owgGQ/9WazGGxfQMOh8BfU7C7stMmyrCrkBa2hXMWPUTuZza',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
