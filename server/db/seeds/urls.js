export async function seed(knex) {
  await knex('musicLinks')
    .del()
    .then(() => {
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
