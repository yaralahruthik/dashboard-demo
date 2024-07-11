'use server';

import { faker } from '@faker-js/faker';
import { db } from '.';
import { usersQuery } from '@/schema';

function generateSeedData(count: number) {
  const seedData = [];

  for (let i = 0; i < count; i++) {
    seedData.push({
      userName: faker.internet.userName(),
      phoneNo: faker.phone.number(),
      userQueryBody: faker.lorem.paragraph(),
      userQueryMode: faker.helpers.arrayElement(['email', 'phone', 'chat']),
      userQueryDatetimeUTC: faker.date.past(),
      isQueryFlag: faker.datatype.boolean(),
      ticketId: faker.string.uuid(),
      queryResponseBody: faker.lorem.paragraphs(),
      queryResponseDatetimeUTC: faker.date.recent(),
      predAssignment: faker.person.fullName(),
      predAssignmentConfScore: faker.number
        .float({ min: 0, max: 1, precision: 0.001 })
        .toString(),
      predAssignmentManualFlag: faker.datatype.boolean(),
      predPriorityManualFlag: faker.datatype.boolean(),
      manualAssignment: faker.person.fullName(),
      manualAssignmentDatetimeUTC: faker.date.recent(),
      manualPriority: faker.helpers.arrayElement(['Low', 'Medium', 'High']),
      manualPriorityDatetimeUTC: faker.date.recent(),
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

const seedData = generateSeedData(10);

export async function seed() {
  await db.insert(usersQuery).values([...seedData]);
}
