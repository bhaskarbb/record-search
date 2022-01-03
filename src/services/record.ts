import { RecordModel } from '../models/Record';
import { RecordSearchParams } from '../types';

export const RecordService = {
  search,
};

/**
 * Record search service
 * In the first step of aggregation pipeline, it sums up the counts array
 * in the second step, filters based on createdAt and totalCount
 */
export async function search(searchParams: RecordSearchParams) {
  const { minCount, maxCount, startDate, endDate } = searchParams;
  const records = await RecordModel.aggregate([
    {
      $project: {
        _id: 0,
        key: '$key',
        createdAt: '$createdAt',
        totalCount: { $sum: '$counts' },
      },
    },
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate },
        totalCount: { $gte: minCount, $lte: maxCount },
      },
    },
  ]);

  return records;
}
