export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('musicLinks')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('musicLinks').insert([
        {
          id: 1,
          name: 'Hook Theory',
          url: 'https://www.hooktheory.com/',
        },
        {
          id: 2,
          name: 'Soundcloud',
          url: 'https://soundcloud.com/',
        },
        {
          id: 3,
          name: 'Audio Joiner',
          url: 'https://clideo.com/merge-audio',
        },
      ])
    })
}
