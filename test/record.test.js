const mongoose = require('mongoose');

const { RecordModel } = require('../src/models');
const { RecordService } = require('../src/services');
const { mockData } = require('./mockData');

const { validateSchema } = require('../src/utils');
const { RecordSearchSchema } = require('../src/validations');

describe('Test request validation', () => {
  test('When all params are passed correctly, dont throw an error', async () => {
    const searchParams = {
      startDate: '2010-01-01',
      endDate: '2020-01-01',
      minCount: 2000,
      maxCount: 3000,
    };
    expect(() => validateSchema(RecordSearchSchema, searchParams)).not.toThrow();
  });

  test('When endDate is greater than today, then throw an error', async () => {
    const searchParams = {
      startDate: '2010-01-01',
      endDate: '2100-01-01',
      minCount: 2000,
      maxCount: 3000,
    };
    expect(() => validateSchema(RecordSearchSchema, searchParams)).toThrow();
  });

  test('When startDate is greater than endDate, then throw an error', async () => {
    const searchParams = {
      startDate: '2016-01-01',
      endDate: '2015-01-01',
      minCount: 2000,
      maxCount: 3000,
    };
    expect(() => validateSchema(RecordSearchSchema, searchParams)).toThrow();
  });

  test('When minCount or maxCount less than 0, then throw an error', async () => {
    let searchParams = {
      startDate: '2010-01-01',
      endDate: '2020-01-01',
      minCount: -2000,
      maxCount: 3000,
    };
    expect(() => validateSchema(RecordSearchSchema, searchParams)).toThrow();

    searchParams = {
      startDate: '2010-01-01',
      endDate: '2020-01-01',
      minCount: 2000,
      maxCount: -3000,
    };
    expect(() => validateSchema(RecordSearchSchema, searchParams)).toThrow();
  });

  test('When minCount is greater than maxCount, then throw an error', async () => {
    const searchParams = {
      startDate: '2010-01-01',
      endDate: '2020-01-01',
      minCount: 3000,
      maxCount: 2000,
    };
    expect(() => validateSchema(RecordSearchSchema, searchParams)).toThrow();
  });

  test('When startDate and endDate are same, dont throw an error', async () => {
    const searchParams = {
      startDate: '2015-01-01',
      endDate: '2015-01-01',
      minCount: 2000,
      maxCount: 3000,
    };
    expect(() => validateSchema(RecordSearchSchema, searchParams)).not.toThrow();
  });

  test('When minCount and maxCount are same, dont throw an error', async () => {
    const searchParams = {
      startDate: '2010-01-01',
      endDate: '2020-01-01',
      minCount: 2000,
      maxCount: 2000,
    };
    expect(() => validateSchema(RecordSearchSchema, searchParams)).not.toThrow();
  });
});

const toDate = (dateStr) => {
  const [year, month, day] = dateStr.split('-');
  return new Date(year, month - 1, day);
};

describe('Test record service', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    await RecordModel.insertMany(mockData);
  });

  afterAll(async () => {
    await RecordModel.deleteMany();
    await mongoose.connection.close();
  });

  test('When all params are passed correctly, dont throw an error', async () => {
    await expect(
      RecordService.search({
        startDate: toDate('2010-01-01'),
        endDate: toDate('2020-01-01'),
        minCount: 0,
        maxCount: 10000,
      }),
    ).resolves.not.toThrow();
  });

  test('Return all records', async () => {
    const records = await RecordService.search({
      startDate: toDate('2010-01-01'),
      endDate: toDate('2020-01-01'),
      minCount: 0,
      maxCount: 10000,
    });
    expect(records.length).toBe(5);
  });

  test('Filter records based on count', async () => {
    const records = await RecordService.search({
      startDate: toDate('2010-01-01'),
      endDate: toDate('2020-01-01'),
      minCount: 3000,
      maxCount: 5000,
    });
    expect(records.length).toBe(3);
  });

  test('Filter records based on date', async () => {
    const records = await RecordService.search({
      startDate: toDate('2016-01-01'),
      endDate: toDate('2017-01-01'),
      minCount: 0,
      maxCount: 10000,
    });
    expect(records.length).toBe(2);
  });

  test('Filter records based on date and count', async () => {
    const records = await RecordService.search({
      startDate: toDate('2016-01-01'),
      endDate: toDate('2017-01-01'),
      minCount: 3000,
      maxCount: 4000,
    });
    expect(records.length).toBe(1);
  });

  test('When minCount and maxCount are same, the records having same totalCount should be returned', async () => {
    const records = await RecordService.search({
      startDate: toDate('2010-01-01'),
      endDate: toDate('2020-01-01'),
      minCount: 1399,
      maxCount: 1399,
    });
    expect(records.length).toBe(1);
  });
});
