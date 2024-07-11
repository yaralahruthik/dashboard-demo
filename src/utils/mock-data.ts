function generateFakeData(numOfWeeks: number) {
  const data = [];

  for (let week = 1; week <= numOfWeeks; week++) {
    const newData = {
      week: week,
      plumbing: Math.floor(Math.random() * 200),
      finance: Math.floor(Math.random() * 100),
      human_resource: Math.floor(Math.random() * 80),
      operations: Math.floor(Math.random() * 20),
      admin: Math.floor(Math.random() * 10),
      cleaning: Math.floor(Math.random() * 5),
    };
    data.push(newData);
  }

  return data;
}

export const TICKETS_OVER_TIME_DATA = generateFakeData(20);
