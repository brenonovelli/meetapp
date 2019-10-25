module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'files',
      [
        {
          name: 'bigdata.png',
          path: 'ff2837fcda6fed0ef38b37221b7254a5.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'cloud_aws.png',
          path: '0fcdd2bb4a852a54601a52b8af6f2d9d.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'data-science-programing.png',
          path: 'd8ab7e1d62fefc1d8087c4d6f2d9b44c.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'devops.png',
          path: 'a64bedd266f56f3de2d8c306901ad06b.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'dracula-theme.png',
          path: '747f8042f5bee31a46b9c74760e4cc98.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'frontend-newbie.png',
          path: '17b23610cc32aafd78c6f961a8b4e2eb.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'gostack_bootcamp.png',
          path: 'ff5504d51d764a4bff254a4d7da59d2f.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'graphs.png',
          path: '004bdab8f74e2e6e585b23e81f511824.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'macbook.png',
          path: 'b885f928d8887d5d3e4a1fcfae7504b1.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'patterns.png',
          path: 'cd6e55c41803862dd9a5c0a2a9eb2195.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'pqp_sql.png',
          path: 'bc261d9b6e528707df92325cc4814dd0.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'grupo-de-pessoas-diversas-tendo-uma-reuniao-de-negocios.png',
          path: 'fc7f6639e8f9b642020f24f59c708323.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('files', null, {});
  },
};
