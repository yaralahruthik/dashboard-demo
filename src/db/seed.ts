'use server';

import { faker } from '@faker-js/faker';
import { db } from '.';
import { usersQuery } from '@/schema';
import { revalidatePath } from 'next/cache';

function generateSeedData(count: number) {
  const seedData = [];

  for (let i = 0; i < count; i++) {
    const userQueryDate = faker.date.past();
    const queryResponseDate = new Date(
      userQueryDate.getTime() + faker.number.int({ min: 1, max: 20 }) * 1000,
    );

    const predAssignmentHelper = faker.helpers.arrayElement([
      'plumbing',
      'finance',
      'human_resource',
      'operations',
      'admin',
      'cleaning',
      'other',
    ]);

    seedData.push({
      userName: faker.internet.userName(),
      phoneNo: faker.phone.number(),
      userQueryBody: faker.lorem.paragraph(),
      userQueryMode: faker.helpers.arrayElement(['email', 'phone', 'chat']),
      userQueryDatetimeUTC: userQueryDate,
      isQueryFlag: faker.datatype.boolean({ probability: 0.8 }),
      ticketId: faker.string.uuid(),
      queryResponseBody: faker.lorem.paragraphs(),
      queryResponseDatetimeUTC: queryResponseDate,
      predAssignment: predAssignmentHelper,
      predAssignmentConfScore: faker.number
        .float({ min: 0, max: 1, multipleOf: 0.01 })
        .toString(),
      predAssignmentManualFlag: faker.datatype.boolean(),
      predPriority: faker.helpers.arrayElement(['Low', 'Medium', 'High']),
      predPriorityConfScore: faker.number
        .float({ min: 0, max: 1, multipleOf: 0.01 })
        .toString(),
      predPriorityManualFlag: faker.datatype.boolean(),
      manualAssignment: null,
      manualAssignmentDatetimeUTC: null,
      manualPriority: null,
      manualPrioryDatetimeUTC: null,
      ticketStatus: faker.helpers.arrayElement([
        'Open',
        'Closed',
        'In Progress',
      ]),
      ticketStatusClosedDatetimeUTC: faker.date.recent(),
      comments: faker.lorem.sentences(),
      executive: faker.helpers.arrayElement([
        'Unassigned',
        faker.person.fullName(),
        faker.person.fullName(),
      ]),
    });
  }

  return seedData;
}

const seedData = generateSeedData(100);

export async function seed() {
  await db.insert(usersQuery).values([...seedData]);
  revalidatePath('/');
}
